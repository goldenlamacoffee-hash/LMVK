import type {
  BlockPlacement,
  BlockType,
  CustomBlock,
  ImageRef,
  SiteContent,
} from './types'

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

const BLOCK_TYPES: BlockType[] = [
  'text',
  'imageText',
  'cta',
  'projectHighlight',
  'gallery',
  'statement',
]

const BLOCK_PLACEMENTS: BlockPlacement[] = [
  'afterHero',
  'afterBrandEssence',
  'afterPhilosophy',
  'afterPortfolio',
  'beforeContact',
  'beforeFooter',
]

function str(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback
}

/** Build a fresh, empty CustomBlock of the given type. */
export function emptyBlock(
  type: BlockType,
  placement: BlockPlacement = 'beforeContact',
  order = 0,
): CustomBlock {
  const now = new Date().toISOString()
  return {
    id: `block-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    visible: true,
    order,
    placement,
    eyebrow: '',
    title: '',
    text: '',
    intro: '',
    ctaText: '',
    ctaLink: '',
    secondaryCtaText: '',
    secondaryCtaLink: '',
    image: emptyImage(),
    imagePosition: 'right',
    gallery: [],
    projectSlug: '',
    showDivider: true,
    createdAt: now,
    updatedAt: now,
  }
}

/** Coerce an unknown value into a safe, fully-formed CustomBlock. */
export function normalizeBlock(value: unknown, index = 0): CustomBlock {
  const v = (value && typeof value === 'object' ? value : {}) as Partial<
    Record<keyof CustomBlock, unknown>
  >
  const type = BLOCK_TYPES.includes(v.type as BlockType)
    ? (v.type as BlockType)
    : 'text'
  const placement = BLOCK_PLACEMENTS.includes(v.placement as BlockPlacement)
    ? (v.placement as BlockPlacement)
    : 'beforeContact'
  const now = new Date().toISOString()
  return {
    id: str(v.id) || `block-${Date.now()}-${index}`,
    type,
    visible: typeof v.visible === 'boolean' ? v.visible : true,
    order: typeof v.order === 'number' ? v.order : index,
    placement,
    eyebrow: str(v.eyebrow),
    title: str(v.title),
    text: str(v.text),
    intro: str(v.intro),
    ctaText: str(v.ctaText),
    ctaLink: str(v.ctaLink),
    secondaryCtaText: str(v.secondaryCtaText),
    secondaryCtaLink: str(v.secondaryCtaLink),
    image: toImageRef(v.image, emptyImage()),
    imagePosition: v.imagePosition === 'left' ? 'left' : 'right',
    gallery: Array.isArray(v.gallery)
      ? v.gallery.map((g) => toImageRef(g, emptyImage()))
      : [],
    projectSlug: str(v.projectSlug),
    showDivider: typeof v.showDivider === 'boolean' ? v.showDivider : true,
    createdAt: str(v.createdAt) || now,
    updatedAt: str(v.updatedAt) || now,
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
  const sections = content.sections ?? { customBlocks: [] }

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
    sections: {
      customBlocks: Array.isArray(sections.customBlocks)
        ? sections.customBlocks.map((b, i) => normalizeBlock(b, i))
        : [],
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
