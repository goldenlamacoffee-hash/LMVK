import type { MetadataRoute } from 'next'
import { getLocale, localeConfig, locales } from '@/lib/i18n'
import { defaultContent } from '@/lib/content/defaults'

function alternatesFor(path: string) {
  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[localeConfig[l].hreflang] = `${localeConfig[l].origin}${path}`
  }
  return languages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const locale = await getLocale()
  const origin = localeConfig[locale].origin
  const now = new Date()

  const slugs = defaultContent.projects
    .filter((p) => p.visible)
    .sort((a, b) => a.order - b.order)
    .map((p) => p.slug)

  return [
    {
      url: origin,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: alternatesFor('') },
    },
    ...slugs.map((slug) => ({
      url: `${origin}/projects/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: { languages: alternatesFor(`/projects/${slug}`) },
    })),
  ]
}
