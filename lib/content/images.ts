import type { ImageRef, SiteContent } from './types'

/** The original hardcoded featured image, kept as the default so the existing
 *  Golden Lama visual is preserved until the owner replaces it from the CMS. */
export const LEGACY_FEATURED_IMAGE_URL = '/golden-lama-coffee.png'
export const LEGACY_FEATURED_IMAGE_ALT =
  'A premium cup of Golden Lama coffee in warm golden light'

/** An empty image reference (no image selected). */
export function emptyImage(): ImageRef {
  return { assetId: '', url: '', alt: '', caption: '' }
}

/** Whether an image reference actually points at an image. */
export function hasImage(ref: ImageRef | undefined | null): ref is ImageRef {
  return Boolean(ref && ref.url)
}

/** Coerce an unknown value into a safe ImageRef. */
function toImageRef(value: unknown, fallback: ImageRef): ImageRef {
  if (!value || typeof value !== 'object') return { ...fallback }
  const v = value as Partial<ImageRef>
  return {
    assetId: typeof v.assetId === 'string' ? v.assetId : fallback.assetId,
    url: typeof v.url === 'string' ? v.url : fallback.url,
    alt: typeof v.alt === 'string' ? v.alt : fallback.alt,
    caption: typeof v.caption === 'string' ? v.caption : fallback.caption,
  }
}

/**
 * Ensure every image field on a content document exists and is well-formed.
 * Idempotent and safe to run on stored documents that predate the media
 * system (their missing fields are filled with empty/legacy defaults).
 * Never throws and never drops existing data.
 */
export function ensureImageFields(content: SiteContent): SiteContent {
  const hero = content.hero ?? ({} as SiteContent['hero'])
  const featured = content.featured ?? ({} as SiteContent['featured'])

  return {
    ...content,
    hero: {
      ...hero,
      image: toImageRef(hero.image, emptyImage()),
      backgroundImage: toImageRef(hero.backgroundImage, emptyImage()),
    },
    featured: {
      ...featured,
      image: toImageRef(featured.image, {
        assetId: '',
        url: LEGACY_FEATURED_IMAGE_URL,
        alt: LEGACY_FEATURED_IMAGE_ALT,
        caption: '',
      }),
    },
    projects: (content.projects ?? []).map((p) => ({
      ...p,
      coverImage: toImageRef(p.coverImage, emptyImage()),
      heroImage: toImageRef(p.heroImage, emptyImage()),
      ogImage: toImageRef(p.ogImage, emptyImage()),
      gallery: Array.isArray(p.gallery)
        ? p.gallery.map((g) => toImageRef(g, emptyImage()))
        : [],
    })),
  }
}
