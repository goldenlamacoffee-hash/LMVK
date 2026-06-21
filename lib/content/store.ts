import 'server-only'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { siteContent } from '@/lib/db/schema'
import { defaultContent, defaultContentFor } from './defaults'
import { ensureImageFields } from './images'
import type { SiteContent } from './types'
import { defaultLocale, locales, type Locale } from '@/lib/i18n'

type PlainObject = Record<string, unknown>

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value)
  )
}

/**
 * Deep-merge a stored (possibly partial) document over the defaults so that any
 * missing field falls back safely. Arrays are replaced wholesale when present.
 */
function mergeWithDefaults<T>(base: T, override: unknown): T {
  if (override === undefined || override === null) return base
  if (!isPlainObject(base) || !isPlainObject(override)) {
    return override as T
  }
  const result: PlainObject = { ...base }
  for (const key of Object.keys(base)) {
    result[key] = mergeWithDefaults(
      (base as PlainObject)[key],
      override[key],
    )
  }
  return result as T
}

/**
 * Build a complete, safe SiteContent from a stored partial document.
 * Missing fields fall back to the locale's localized defaults (or the
 * English/EU defaults when no locale is provided).
 */
export function withDefaults(stored: unknown, locale?: Locale): SiteContent {
  const base = locale ? defaultContentFor(locale) : defaultContent
  // Normalize image fields last so documents that predate the media system
  // (whose `projects` array would otherwise replace the defaults wholesale)
  // always end up with safe, well-formed image references.
  return ensureImageFields(mergeWithDefaults(base, stored))
}

/**
 * Load content for a locale with a safe fallback chain:
 *   1. the requested locale's stored content
 *   2. the English/EU stored content
 *   3. the hardcoded defaults
 * Missing individual fields always fall back to defaults via withDefaults().
 */
export async function getContent(locale: Locale): Promise<SiteContent> {
  try {
    await seedOnce()
    const rows = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.locale, locale))
      .limit(1)

    if (rows[0]?.content) return withDefaults(rows[0].content, locale)

    if (locale !== defaultLocale) {
      const fallback = await db
        .select()
        .from(siteContent)
        .where(eq(siteContent.locale, defaultLocale))
        .limit(1)
      if (fallback[0]?.content)
        return withDefaults(fallback[0].content, defaultLocale)
    }
  } catch (error) {
    console.error('[v0] getContent failed, using defaults:', error)
  }
  return defaultContentFor(locale)
}

/** Save the full content document for a locale (upsert). */
export async function saveContent(
  locale: Locale,
  content: SiteContent,
): Promise<void> {
  const normalized = withDefaults(content, locale)
  await db
    .insert(siteContent)
    .values({ locale, content: normalized, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteContent.locale,
      set: { content: normalized, updatedAt: new Date() },
    })
}

let seedPromise: Promise<void> | null = null

/** Run the seed at most once per server process; tolerant of failures. */
function seedOnce(): Promise<void> {
  if (!seedPromise) {
    seedPromise = ensureSeeded().catch((error) => {
      console.error('[v0] ensureSeeded failed:', error)
      seedPromise = null
    })
  }
  return seedPromise
}

/** Seed any missing locale rows with the default content. Safe to run repeatedly. */
export async function ensureSeeded(): Promise<void> {
  const existing = await db
    .select({ locale: siteContent.locale })
    .from(siteContent)
  const have = new Set(existing.map((r) => r.locale))
  const missing = locales.filter((l) => !have.has(l))
  if (missing.length === 0) return
  await db
    .insert(siteContent)
    .values(
      missing.map((locale) => ({
        locale,
        content: defaultContentFor(locale),
        updatedAt: new Date(),
      })),
    )
    .onConflictDoNothing()
}

/** Read raw stored content for the admin editor (no English cross-fallback). */
export async function getEditableContent(
  locale: Locale,
): Promise<SiteContent> {
  try {
    await seedOnce()
    const rows = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.locale, locale))
      .limit(1)
    if (rows[0]?.content) return withDefaults(rows[0].content, locale)
  } catch (error) {
    console.error('[v0] getEditableContent failed, using defaults:', error)
  }
  return defaultContentFor(locale)
}
