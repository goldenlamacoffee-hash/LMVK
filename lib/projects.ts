export type ProjectStatus = 'Active project' | 'In preparation' | 'Coming next'

export type ProjectValue = {
  title: string
  description: string
}

export type Project = {
  slug: string
  index: string
  /** Full brand / project name. */
  name: string
  /** Short field label used in the portfolio index. */
  field: string
  /** Full category line shown on the detail page. */
  category: string
  status: ProjectStatus
  /** One-line summary used on the home portfolio list. */
  summary: string
  /** Longer lead paragraph for the detail hero. */
  description: string
  /** Optional philosophy statement. */
  philosophy?: string
  /** Optional set of brand values. */
  values?: ProjectValue[]
  /** Optional external website. */
  website?: { label: string; href: string }
  /** Monogram mark rendered behind the detail hero. */
  mark: string
}

export const projects: Project[] = [
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
    website: { label: 'goldenlama.sk', href: 'https://goldenlama.sk' },
    mark: 'GL',
  },
  {
    slug: 'monocool',
    index: '02',
    name: 'MonoCool',
    field: 'B2B Cooling',
    category: 'B2B Cooling / Installations',
    status: 'In preparation',
    summary:
      'A B2B cooling and installation brand built on reliable engineering, clean execution and dependable service.',
    description:
      'MonoCool is a business-to-business cooling and installation brand in preparation under LMVK Group. It is built for clients who value precise engineering, clean installation and service they can depend on — without compromise or noise.',
    philosophy:
      'Infrastructure should be quiet and dependable. We focus on correct specification, careful installation and long-term reliability, so the systems we build are remembered for never causing a problem.',
    values: [
      {
        title: 'Engineering',
        description:
          'Correct specification and precise execution, sized for the real demands of each site.',
      },
      {
        title: 'Installation',
        description:
          'Clean, professional installation carried out with discipline and respect for the space.',
      },
      {
        title: 'Service',
        description:
          'Dependable maintenance and support that keeps systems running quietly for years.',
      },
    ],
    mark: 'MC',
  },
  {
    slug: 'golden-studio',
    index: '03',
    name: 'Golden Studio',
    field: 'Technology',
    category: 'Digital Products / AI / Websites / Apps',
    status: 'In preparation',
    summary:
      'A digital product studio focused on websites, applications, AI-assisted workflows and practical business automation.',
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
    mark: 'GS',
  },
  {
    slug: 'future-ventures',
    index: '04',
    name: 'Future Ventures',
    field: 'Commerce & Lifestyle',
    category: 'Brands / Commerce / Lifestyle',
    status: 'Coming next',
    summary:
      'New brands and strategic projects developed and held under the LMVK Group structure.',
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
    mark: 'LMVK',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
