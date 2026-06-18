import type { SiteContent } from './types'

/**
 * Default content seeded from the current live (English) website.
 * Used as:
 *  - the initial value copied into every locale row, and
 *  - the final safe fallback if a field is missing from the DB.
 *
 * Translations are intentionally left in English so nothing is invented;
 * editors translate per-locale from the /admin CMS.
 */
export const defaultContent: SiteContent = {
  settings: {
    siteTitle: 'LMVK Group — Private Venture Group',
    siteDescription:
      'LMVK Group is a private venture group creating premium projects across hospitality, technology, commerce and lifestyle. Building brands with taste, discipline and long-term vision.',
    seoTitle: 'LMVK Group — Private Venture Group',
    seoDescription:
      'Building brands with taste, discipline and long-term vision across hospitality, technology, commerce and lifestyle.',
    ogImage: '/og-image.png',
    contactEmail: 'vesely@goldenlama.sk',
    socialLinks: [],
  },
  nav: {
    about: 'About',
    philosophy: 'Philosophy',
    portfolio: 'Portfolio',
    contact: 'Contact',
  },
  hero: {
    visible: true,
    eyebrow: 'Private Holding & Venture Group',
    headline: 'Building brands with taste, discipline and long-term vision.',
    subtitle:
      'LMVK Group creates premium projects across hospitality, technology, commerce and lifestyle — built with patience, quality and clear identity.',
    primaryCtaText: 'View portfolio',
    primaryCtaLink: '#portfolio',
    secondaryCtaText: 'Contact LMVK Group',
    secondaryCtaLink: '#contact',
  },
  brandEssence: {
    visible: true,
    eyebrow: '01 — Brand Essence',
    statement:
      'A private holding and venture group focused on premium projects in hospitality, technology, commerce and lifestyle.',
    items: [
      { label: 'Purpose', statement: 'Build brands with long-term value.' },
      {
        label: 'Positioning',
        statement: 'Quiet luxury, disciplined growth, clear identity.',
      },
      {
        label: 'Attributes',
        statement: 'Premium, timeless, confident, restrained, precise.',
      },
    ],
  },
  philosophy: {
    visible: true,
    eyebrow: '02 — Philosophy',
    title: 'Principles that shape everything we build.',
    principles: [
      {
        title: 'Taste',
        description:
          'Every detail should feel intentional. Considered choices, made quietly, are what separate a brand from a product.',
      },
      {
        title: 'Discipline',
        description:
          'Strong brands are built through consistency, not noise. We move with restraint and let the work speak over time.',
      },
      {
        title: 'Value',
        description:
          'We build projects that can grow, mature and last — measured not only in numbers, but in trust and reputation.',
      },
    ],
  },
  portfolio: {
    visible: true,
    eyebrow: '03 — Portfolio',
    title: 'A small, curated group of projects.',
    intro:
      'Each project carries its own identity. LMVK Group remains the quiet structure and long-term vision behind them.',
  },
  featured: {
    visible: true,
    eyebrow: 'Featured — Golden Lama Coffee',
    title: 'The first public expression of the LMVK philosophy.',
    body: 'Golden Lama Coffee brings together precise execution, memorable identity and genuine human experience. It is built on the belief that hospitality is not only about product quality, but about making people feel better.',
    ctaText: 'Open goldenlama.sk',
    ctaLink: 'https://goldenlama.sk',
  },
  contact: {
    visible: true,
    eyebrow: '04 — Contact',
    title: "Let's build something with long-term value.",
    text: 'For partnerships, project opportunities or business communication, contact LMVK Group.',
    email: 'vesely@goldenlama.sk',
    personName: 'Marek Veselý',
    personRole: 'CEO',
  },
  footer: {
    description:
      'Private holding & venture group, building premium projects across hospitality, technology, commerce and lifestyle.',
    navigateLabel: 'Navigate',
    projectsLabel: 'Projects',
    company: 'LMVK Group s.r.o.',
    claim: 'Calm authority. Controlled growth. Long-term trust.',
  },
  projects: [
    {
      slug: 'golden-lama-coffee',
      index: '01',
      name: 'Golden Lama Coffee',
      field: 'Hospitality',
      category: 'Hospitality / Mobile Coffee',
      status: 'Active project',
      summary:
        'A premium mobile coffee concept built around hospitality, design and the belief that coffee is only the second product — the first is a better day.',
      description:
        'Golden Lama Coffee is the first active brand within LMVK Group — a premium mobile coffee concept where craft, design and genuine hospitality meet. Every detail, from the cup in your hand to the moment of service, is considered.',
      philosophy:
        'Coffee is only the second product. The first is a better day. We treat every interaction as a small, memorable ritual — precise in execution, warm in feeling, and consistent wherever we go.',
      values: [
        {
          title: 'Craft',
          description:
            'Carefully sourced beans, exacting preparation and a standard that never bends to convenience.',
        },
        {
          title: 'Hospitality',
          description:
            'A genuinely human welcome. Service that feels personal, unhurried and quietly generous.',
        },
        {
          title: 'Design',
          description:
            'A considered identity and presence — refined, recognisable and present in every detail.',
        },
      ],
      websiteLabel: 'goldenlama.sk',
      websiteHref: 'https://goldenlama.sk',
      mark: 'GL',
      order: 1,
      visible: true,
    },
    {
      slug: 'golden-studio',
      index: '02',
      name: 'Golden Studio',
      field: 'Technology',
      category: 'Digital Products / Websites / Apps / AI',
      status: 'In preparation',
      summary:
        'A future digital product studio focused on websites, apps, CMS systems and practical AI-assisted business workflows.',
      description:
        'Golden Studio is a digital product studio in preparation under LMVK Group. It helps small businesses establish a serious digital presence — websites, applications, CMS systems and AI-assisted workflows — without the cost and complexity of a large agency.',
      philosophy:
        'Technology should remove friction, not add it. We build practical, well-designed digital products that let small teams operate like much larger ones — and we keep them simple enough to actually use.',
      values: [
        {
          title: 'Websites & Apps',
          description:
            'Fast, modern websites and applications built on a foundation that scales with the business.',
        },
        {
          title: 'CMS Systems',
          description:
            'Content systems that put owners in control, without depending on a developer for every change.',
        },
        {
          title: 'AI Workflows',
          description:
            'AI-assisted automation that quietly handles the repetitive work, freeing people for the rest.',
        },
      ],
      websiteLabel: '',
      websiteHref: '',
      mark: 'GS',
      order: 2,
      visible: true,
    },
    {
      slug: 'future-ventures',
      index: '03',
      name: 'Future Ventures',
      field: 'Strategic Projects',
      category: 'Strategic Projects',
      status: 'Coming next',
      summary:
        'New brands and business concepts developed under the LMVK Group structure.',
      description:
        'LMVK Group is building a portfolio of premium brands and practical business projects. Future Ventures is where the next ideas take shape — held, developed and supported under a single, patient structure.',
      philosophy:
        'We are not in a hurry. New ventures are chosen with discipline and built with patience, each one expected to stand on its own while sharing the values of the group: taste, precision and long-term thinking.',
      values: [
        {
          title: 'Premium Brands',
          description:
            'Consumer brands with a clear identity, built to be remembered rather than merely noticed.',
        },
        {
          title: 'Practical Projects',
          description:
            'Grounded business projects that solve real problems and earn their place through results.',
        },
        {
          title: 'Long-Term Holding',
          description:
            'A patient structure that develops and supports each venture well beyond its launch.',
        },
      ],
      websiteLabel: '',
      websiteHref: '',
      mark: 'LMVK',
      order: 3,
      visible: true,
    },
  ],
}
