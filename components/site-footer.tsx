import Link from 'next/link'
import { BrandMark } from '@/components/brand-mark'

const groupLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Philosophy', href: '/#philosophy' },
  { label: 'Portfolio', href: '/#portfolio' },
  { label: 'Contact', href: '/#contact' },
]

const brandLinks = [
  { label: 'Golden Lama Coffee', href: '/projects/golden-lama-coffee' },
  { label: 'Golden Studio', href: '/projects/golden-studio' },
  { label: 'Future Ventures', href: '/projects/future-ventures' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <BrandMark size="md" />
            <p className="mt-8 max-w-xs text-pretty leading-relaxed text-warm-grey">
              Private holding &amp; venture group, building premium projects
              across hospitality, technology, commerce and lifestyle.
            </p>
          </div>

          <nav className="md:col-span-3 md:col-start-7" aria-label="Navigate">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              Navigate
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {groupLinks.map((link) => (
                <li key={link.label}>
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

          <nav className="md:col-span-3" aria-label="Projects">
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              Projects
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {brandLinks.map((link) => (
                <li key={link.label}>
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
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-8 text-xs tracking-wide text-warm-grey sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LMVK Group s.r.o. All rights reserved.</p>
          <p>Calm authority. Controlled growth. Long-term trust.</p>
        </div>
      </div>
    </footer>
  )
}
