import 'server-only'
import { desc, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { mediaAssets, type MediaAssetRow } from '@/lib/db/schema'
import { siteContent } from '@/lib/db/schema'
import { withDefaults } from '@/lib/content/store'
import { localeConfig, type Locale } from '@/lib/i18n'
import type { ImageRef, SiteContent } from '@/lib/content/types'
import type { MediaAsset, MediaMetadataPatch } from './types'

function serialize(row: MediaAssetRow): MediaAsset {
  return {
    id: row.id,
    url: row.url,
    pathname: row.pathname,
    filename: row.filename,
    originalFilename: row.originalFilename,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    width: row.width,
    height: row.height,
    title: row.title,
    altText: row.altText,
    caption: row.caption,
    category: row.category,
    tags: Array.isArray(row.tags) ? row.tags : [],
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

/** List every media asset, newest first. */
export async function listMediaAssets(): Promise<MediaAsset[]> {
  try {
    const rows = await db
      .select()
      .from(mediaAssets)
      .orderBy(desc(mediaAssets.createdAt))
    return rows.map(serialize)
  } catch (error) {
    console.error('[v0] listMediaAssets failed:', error)
    return []
  }
}

export async function getMediaAsset(id: string): Promise<MediaAsset | null> {
  const rows = await db
    .select()
    .from(mediaAssets)
    .where(eq(mediaAssets.id, id))
    .limit(1)
  return rows[0] ? serialize(rows[0]) : null
}

export async function createMediaAsset(data: {
  url: string
  pathname: string
  filename: string
  originalFilename: string
  mimeType: string
  sizeBytes: number
  width: number | null
  height: number | null
  title: string
  altText: string
  category: string
}): Promise<MediaAsset> {
  const [row] = await db
    .insert(mediaAssets)
    .values({
      url: data.url,
      pathname: data.pathname,
      filename: data.filename,
      originalFilename: data.originalFilename,
      mimeType: data.mimeType,
      sizeBytes: data.sizeBytes,
      width: data.width,
      height: data.height,
      title: data.title,
      altText: data.altText,
      caption: '',
      category: data.category,
      tags: [],
    })
    .returning()
  return serialize(row)
}

export async function updateMediaAsset(
  id: string,
  patch: MediaMetadataPatch,
): Promise<MediaAsset | null> {
  const [row] = await db
    .update(mediaAssets)
    .set({
      title: patch.title,
      altText: patch.altText,
      caption: patch.caption,
      category: patch.category,
      tags: patch.tags,
      updatedAt: new Date(),
    })
    .where(eq(mediaAssets.id, id))
    .returning()
  return row ? serialize(row) : null
}

export async function deleteMediaAssetRow(id: string): Promise<void> {
  await db.delete(mediaAssets).where(eq(mediaAssets.id, id))
}

/**
 * Scan every locale's content document for references to an asset (by id or
 * URL) and return human-readable locations where it is currently used.
 * Used to block/warn before deletion.
 */
export async function findAssetUsage(
  assetId: string,
  url: string,
): Promise<string[]> {
  const usage: string[] = []
  let rows: { locale: string; content: SiteContent }[] = []
  try {
    rows = (await db.select().from(siteContent)) as typeof rows
  } catch (error) {
    console.error('[v0] findAssetUsage failed to load content:', error)
    return usage
  }

  const matches = (ref: ImageRef | undefined | null): boolean => {
    if (!ref) return false
    if (assetId && ref.assetId === assetId) return true
    if (url && ref.url === url) return true
    return false
  }

  for (const row of rows) {
    const locale = row.locale as Locale
    const label = localeConfig[locale]?.label ?? locale
    const content = withDefaults(row.content, locale)

    if (url && content.settings.ogImage === url) {
      usage.push(`${label}: Open Graph image`)
    }
    if (matches(content.hero.image)) usage.push(`${label}: Hero image`)
    if (matches(content.hero.backgroundImage)) {
      usage.push(`${label}: Hero background`)
    }
    if (matches(content.featured.image)) {
      usage.push(`${label}: Featured Project image`)
    }
    for (const p of content.projects) {
      const name = p.name || p.slug
      if (matches(p.coverImage)) usage.push(`${label}: ${name} — cover`)
      if (matches(p.heroImage)) usage.push(`${label}: ${name} — hero`)
      if (matches(p.ogImage)) usage.push(`${label}: ${name} — OG image`)
      p.gallery.forEach((g, i) => {
        if (matches(g)) usage.push(`${label}: ${name} — gallery #${i + 1}`)
      })
    }
  }

  return usage
}
