'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { BrandMark } from '@/components/brand-mark'
import { LanguageSwitcher } from '@/components/language-switcher'
import type { SiteContent } from '@/lib/content/types'
import type { Locale } from '@/lib/i18n'

export function SiteHeader({
  nav,
  locale,
}: {
  nav: SiteContent['nav']
  locale: Locale
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const navLinks = [
    { label: nav.about, href: '/#about' },
    { label: nav.philosophy, href: '/#philosophy' },
    { label: nav.portfolio, href: '/#portfolio' },
    { label: nav.contact, href: '/#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/70 bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          aria-label="LMVK Group home"
          className="inline-flex items-center py-1"
        >
          <BrandMark size="sm" />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          <nav className="flex items-center gap-10" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-xs font-medium uppercase tracking-[0.25em] text-foreground/75 transition-colors hover:text-foreground"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
          <span aria-hidden="true" className="h-4 w-px bg-border" />
          <LanguageSwitcher current={locale} />
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-t border-border/60 bg-background/95 backdrop-blur-md transition-[max-height,opacity] duration-500 md:hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-border/40 py-4 font-heading text-xl text-foreground/90 transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
          <div className="py-5">
            <LanguageSwitcher current={locale} />
          </div>
        </nav>
      </div>
    </header>
  )
}
