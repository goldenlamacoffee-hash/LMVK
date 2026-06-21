import type { SiteContent } from './types'
import type { Locale } from '@/lib/i18n'
import { ensureImageFields } from './images'
import enContent from './locales/en.json'
import skContent from './locales/sk.json'
import csContent from './locales/cs.json'

/**
 * Fully localized default content for each supported locale.
 *
 * The JSON files in ./locales are the single source of truth: they are used
 * both here (to seed locale rows and to provide a safe per-field fallback) and
 * by scripts/seed-content.mjs (to refresh the seeded rows in Neon).
 *
 *  - lmvk.sk  -> sk
 *  - lmvk.cz  -> cs
 *  - lmvk.eu  -> en  (also the localhost / preview fallback)
 */
export const localeDefaults: Record<Locale, SiteContent> = {
  en: ensureImageFields(enContent as unknown as SiteContent),
  sk: ensureImageFields(skContent as unknown as SiteContent),
  cs: ensureImageFields(csContent as unknown as SiteContent),
}

/**
 * English/EU document used as the universal final fallback when a field is
 * missing from the database or a locale row cannot be loaded.
 */
export const defaultContent: SiteContent = localeDefaults.en

/** Localized default document for a single locale. */
export function defaultContentFor(locale: Locale): SiteContent {
  return localeDefaults[locale] ?? defaultContent
}
