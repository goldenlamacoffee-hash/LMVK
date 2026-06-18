export const locales = ['sk', 'cs', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

/** Per-locale domain + presentation metadata. */
export const localeConfig: Record<
  Locale,
  {
    /** Canonical production domain for this locale. */
    domain: string
    /** Absolute https origin for this locale. */
    origin: string
    /** BCP-47 language tag for hreflang / html lang. */
    htmlLang: string
    hreflang: string
    /** Short label used in the language switcher. */
    label: string
    /** Full label used in the CMS tabs. */
    longLabel: string
  }
> = {
  sk: {
    domain: 'lmvk.sk',
    origin: 'https://lmvk.sk',
    htmlLang: 'sk',
    hreflang: 'sk-SK',
    label: 'SK',
    longLabel: 'Slovensky',
  },
  cs: {
    domain: 'lmvk.cz',
    origin: 'https://lmvk.cz',
    htmlLang: 'cs',
    hreflang: 'cs-CZ',
    label: 'CZ',
    longLabel: 'Česky',
  },
  en: {
    domain: 'lmvk.eu',
    origin: 'https://lmvk.eu',
    htmlLang: 'en',
    hreflang: 'en',
    label: 'EU',
    longLabel: 'English / EU',
  },
}

/** Map a request host (any casing, optional port / www) to a locale. */
export function localeFromHost(host: string | null | undefined): Locale {
  if (!host) return defaultLocale
  const clean = host.toLowerCase().split(':')[0].replace(/^www\./, '')

  if (clean === 'lmvk.sk') return 'sk'
  if (clean === 'lmvk.cz') return 'cs'
  if (clean === 'lmvk.eu') return 'en'

  // Unknown hosts (previews, localhost, vercel.app) fall back safely.
  return defaultLocale
}

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}
