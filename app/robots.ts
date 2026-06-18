import type { MetadataRoute } from 'next'
import { localeConfig } from '@/lib/i18n'
import { getLocale } from '@/lib/locale-server'

export default async function robots(): Promise<MetadataRoute.Robots> {
  const locale = await getLocale()
  const origin = localeConfig[locale].origin

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin',
    },
    sitemap: `${origin}/sitemap.xml`,
  }
}
