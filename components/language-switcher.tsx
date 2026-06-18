import { cn } from '@/lib/utils'
import { localeConfig, locales, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({
  current,
  className,
  tone = 'light',
}: {
  current: Locale
  className?: string
  /** "light" for use on the ivory background, "dark" for the onyx footer/contact. */
  tone?: 'light' | 'dark'
}) {
  return (
    <div
      className={cn('flex items-center gap-3', className)}
      role="group"
      aria-label="Select language"
    >
      {locales.map((locale, i) => {
        const config = localeConfig[locale]
        const active = locale === current
        return (
          <span key={locale} className="flex items-center gap-3">
            {i > 0 ? (
              <span
                aria-hidden="true"
                className={cn(
                  'h-2.5 w-px',
                  tone === 'dark' ? 'bg-primary-foreground/25' : 'bg-border',
                )}
              />
            ) : null}
            <a
              href={config.origin}
              hrefLang={config.hreflang}
              aria-current={active ? 'true' : undefined}
              className={cn(
                'text-[0.7rem] font-medium uppercase tracking-[0.25em] transition-colors',
                active
                  ? 'text-gold'
                  : tone === 'dark'
                    ? 'text-primary-foreground/55 hover:text-primary-foreground'
                    : 'text-warm-grey hover:text-foreground',
              )}
            >
              {config.label}
            </a>
          </span>
        )
      })}
    </div>
  )
}
