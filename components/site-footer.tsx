import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'
import { LanguageSwitcher } from '@/components/language-switcher'
import type { ProjectContent, SiteContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n'

export function SiteFooter({
  nav,
  footer,
  projects,
  locale,
}: {
  nav: SiteContent['nav']
  footer: SiteContent['footer']
  projects: ProjectContent[]
  locale: Locale
}) {
  const groupLinks = [
    { label: nav.about, href: '/#about' },
    { label: nav.philosophy, href: '/#philosophy' },
    { label: nav.portfolio, href: '/#portfolio' },
    { label: nav.contact, href: '/#contact' },
  ]

  return (
    <footer className="border-t border-border/60 bg-background px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <BrandMark size="md" />
            <p className="mt-8 max-w-xs text-pretty leading-relaxed text-warm-grey">
              {footer.description}
            </p>
            <LanguageSwitcher current={locale} className="mt-8" />
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label={nav.about}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              {footer.navigateLabel}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {groupLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm tracking-wide text-foreground/75 transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-3" aria-label={footer.projectsLabel}>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              {footer.projectsLabel}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-sm tracking-wide text-foreground/75 transition-colors hover:text-gold"
                  >
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-8 text-xs tracking-wide text-warm-grey sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {footer.company} All rights reserved.
          </p>
          <p>{footer.claim}</p>
        </div>
      </div>
    </footer>
  )
}
