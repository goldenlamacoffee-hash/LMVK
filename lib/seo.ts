import type { Metadata } from 'next'
import { localeConfig, locales, defaultLocale, type Locale } from '@/lib/i18n'

function normalizePath(path: string): string {
  if (!path || path === '/') return ''
  return path.startsWith('/') ? path : `/${path}`
}

/**
 * Build canonical + hreflang alternates for a given path across all locale domains.
 *   canonical  → current locale's domain + path
 *   languages  → one entry per locale domain, plus x-default → EU
 */
export function localizedAlternates(
  locale: Locale,
  path = '/',
): NonNullable<Metadata['alternates']> {
  const suffix = normalizePath(path)

  const languages: Record<string, string> = {}
  for (const l of locales) {
    languages[localeConfig[l].hreflang] = `${localeConfig[l].origin}${suffix}`
  }
  languages['x-default'] = `${localeConfig[defaultLocale].origin}${suffix}`

  return {
    canonical: `${localeConfig[locale].origin}${suffix}`,
    languages,
  }
}

/** Absolute origin for the active locale (used as metadataBase). */
export function localeOrigin(locale: Locale): string {
  return localeConfig[locale].origin
}
