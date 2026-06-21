/**
 * The full editable content document for a single locale.
 * One row per locale is stored in the `site_content` table as JSONB.
 * Every field is editable from the /admin CMS.
 */

/**
 * A reference to a Media Gallery image stored per-locale inside the content
 * document. The underlying asset (binary + base metadata) lives once in the
 * `media_assets` table / Vercel Blob; `assetId` + `url` point at it while
 * `alt` and `caption` are localized per locale. An empty `url` means "no
 * image" and the public site falls back gracefully.
 */
export type ImageRef = {
  /** media_assets.id — empty string when no image is selected. */
  assetId: string
  /** Public Vercel Blob URL (denormalized for rendering). */
  url: string
  /** Localized alt text. */
  alt: string
  /** Localized caption / description. */
  caption: string
}

export type SocialLink = { label: string; href: string }

/* -------------------------------------------------------------------------- */
/*  Custom page sections / content blocks                                     */
/* -------------------------------------------------------------------------- */

/** The supported custom block types for V1. */
export type BlockType =
  | 'text'
  | 'imageText'
  | 'cta'
  | 'projectHighlight'
  | 'gallery'
  | 'statement'

/** Where a custom block is rendered relative to the fixed homepage sections. */
export type BlockPlacement =
  | 'afterHero'
  | 'afterBrandEssence'
  | 'afterPhilosophy'
  | 'afterPortfolio'
  | 'beforeContact'
  | 'beforeFooter'

/**
 * A single custom section/block stored per-locale in
 * `content.sections.customBlocks`. Uses a flat shape (all type-specific fields
 * optional) so normalization is lossless and fully backward compatible — older
 * documents simply have an empty array.
 */
export type CustomBlock = {
  id: string
  type: BlockType
  visible: boolean
  order: number
  placement: BlockPlacement
  /** Small label / eyebrow above the title. */
  eyebrow: string
  title: string
  /** Main body text. */
  text: string
  /** Optional intro paragraph (gallery sections). */
  intro: string
  /** Primary CTA. */
  ctaText: string
  ctaLink: string
  /** Secondary CTA (CTA sections). */
  secondaryCtaText: string
  secondaryCtaLink: string
  /** Single image (image+text, project highlight). */
  image: ImageRef
  /** Image side for image+text sections. */
  imagePosition: 'left' | 'right'
  /** Multiple images (gallery sections). */
  gallery: ImageRef[]
  /** Referenced project slug (project highlight sections). */
  projectSlug: string
  /** Whether to render the gold divider rule (statement sections). */
  showDivider: boolean
  createdAt: string
  updatedAt: string
}

export type EssenceItem = { label: string; statement: string }

export type Principle = { title: string; description: string }

export type ProjectValue = { title: string; description: string }

export type ProjectStatus = string

export type ProjectContent = {
  slug: string
  index: string
  /** Full brand / project name. */
  name: string
  /** Short tagline shown under the name on the detail page. */
  subtitle: string
  /** Short field label used in the portfolio index. */
  field: string
  /** Full category line shown on the detail page. */
  category: string
  status: ProjectStatus
  /** One-line summary used on the home portfolio list. */
  summary: string
  /** Longer lead paragraph for the detail hero. */
  description: string
  philosophy: string
  values: ProjectValue[]
  /** Optional external website. */
  websiteLabel: string
  websiteHref: string
  /** Monogram mark rendered behind the detail hero. */
  mark: string
  /** Per-project SEO title (falls back to the project name). */
  seoTitle: string
  /** Per-project SEO description (falls back to the summary). */
  seoDescription: string
  /** Display order in the portfolio. */
  order: number
  /** Whether the project is shown publicly. */
  visible: boolean
  /** Thumbnail shown on the portfolio index card. */
  coverImage: ImageRef
  /** Hero image on the project detail page. */
  heroImage: ImageRef
  /** Open Graph image override for the detail page (falls back to global). */
  ogImage: ImageRef
  /** Ordered gallery images on the detail page. */
  gallery: ImageRef[]
}

export type SiteContent = {
  settings: {
    siteTitle: string
    siteDescription: string
    seoTitle: string
    seoDescription: string
    /** Open Graph title (falls back to SEO title). */
    ogTitle: string
    /** Open Graph description (falls back to SEO description). */
    ogDescription: string
    ogImage: string
    contactEmail: string
    socialLinks: SocialLink[]
  }
  nav: {
    about: string
    philosophy: string
    portfolio: string
    contact: string
  }
  hero: {
    visible: boolean
    eyebrow: string
    headline: string
    subtitle: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
    /** Optional hero image (empty by default to preserve the current design). */
    image: ImageRef
    /** Optional background / texture image (empty by default). */
    backgroundImage: ImageRef
  }
  brandEssence: {
    visible: boolean
    eyebrow: string
    statement: string
    items: EssenceItem[]
  }
  philosophy: {
    visible: boolean
    eyebrow: string
    title: string
    intro: string
    principles: Principle[]
  }
  portfolio: {
    visible: boolean
    eyebrow: string
    title: string
    intro: string
  }
  featured: {
    visible: boolean
    eyebrow: string
    title: string
    body: string
    ctaText: string
    ctaLink: string
    /** Featured project image (the Golden Lama coffee visual). */
    image: ImageRef
  }
  contact: {
    visible: boolean
    eyebrow: string
    title: string
    text: string
    email: string
    /** Optional phone number (hidden when empty). */
    phone: string
    /** Optional company / legal line (hidden when empty). */
    company: string
    personName: string
    personRole: string
  }
  footer: {
    description: string
    navigateLabel: string
    projectsLabel: string
    company: string
    claim: string
  }
  /** Admin-created custom sections rendered on the public homepage. */
  sections: {
    customBlocks: CustomBlock[]
  }
  projects: ProjectContent[]
}
