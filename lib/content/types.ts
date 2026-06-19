/**
 * The full editable content document for a single locale.
 * One row per locale is stored in the `site_content` table as JSONB.
 * Every field is editable from the /admin CMS.
 */

export type SocialLink = { label: string; href: string }

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
  /** Display order in the portfolio. */
  order: number
  /** Whether the project is shown publicly. */
  visible: boolean
}

export type SiteContent = {
  settings: {
    siteTitle: string
    siteDescription: string
    seoTitle: string
    seoDescription: string
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
  }
  contact: {
    visible: boolean
    eyebrow: string
    title: string
    text: string
    email: string
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
  projects: ProjectContent[]
}
