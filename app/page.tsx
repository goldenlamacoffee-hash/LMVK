import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { GoldenLamaSection } from '@/components/golden-lama-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'
import type { Metadata } from 'next'
import { localeConfig } from '@/lib/i18n'
import { getLocale } from '@/lib/locale-server'
import { getContent } from '@/lib/content/store'
import { visibleProjects } from '@/lib/content/projects'
import { localizedAlternates, localeOrigin } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const content = await getContent(locale)
  const { settings } = content

  return {
    metadataBase: new URL(localeOrigin(locale)),
    title: { absolute: settings.seoTitle || settings.siteTitle },
    description: settings.seoDescription || settings.siteDescription,
    alternates: localizedAlternates(locale, '/'),
    openGraph: {
      title: settings.seoTitle || settings.siteTitle,
      description: settings.seoDescription || settings.siteDescription,
      type: 'website',
      siteName: 'LMVK Group',
      locale: localeConfig[locale].hreflang.replace('-', '_'),
      url: localeConfig[locale].origin,
      images: [
        {
          url: settings.ogImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: settings.siteTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seoTitle || settings.siteTitle,
      description: settings.seoDescription || settings.siteDescription,
      images: [settings.ogImage || '/og-image.png'],
    },
  }
}

export default async function Page() {
  const locale = await getLocale()
  const content = await getContent(locale)
  const projects = visibleProjects(content)

  return (
    <>
      <SiteHeader nav={content.nav} locale={locale} />
      <main>
        <HeroSection content={content.hero} />
        <AboutSection content={content.brandEssence} />
        <PhilosophySection content={content.philosophy} />
        <PortfolioSection content={content.portfolio} projects={projects} />
        <GoldenLamaSection content={content.featured} />
        <ContactSection content={content.contact} />
      </main>
      <SiteFooter
        nav={content.nav}
        footer={content.footer}
        projects={projects}
        locale={locale}
      />
    </>
  )
}
