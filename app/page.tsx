import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { GoldenLamaSection } from '@/components/golden-lama-section'
import { CustomSections } from '@/components/custom-section'
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
      title: settings.ogTitle || settings.seoTitle || settings.siteTitle,
      description:
        settings.ogDescription ||
        settings.seoDescription ||
        settings.siteDescription,
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
  const blocks = content.sections.customBlocks

  return (
    <>
      <SiteHeader nav={content.nav} locale={locale} />
      <main>
        <HeroSection content={content.hero} />
        <CustomSections
          blocks={blocks}
          placement="afterHero"
          projects={projects}
        />
        <AboutSection content={content.brandEssence} />
        <CustomSections
          blocks={blocks}
          placement="afterBrandEssence"
          projects={projects}
        />
        <PhilosophySection content={content.philosophy} />
        <CustomSections
          blocks={blocks}
          placement="afterPhilosophy"
          projects={projects}
        />
        <PortfolioSection content={content.portfolio} projects={projects} />
        <CustomSections
          blocks={blocks}
          placement="afterPortfolio"
          projects={projects}
        />
        <GoldenLamaSection content={content.featured} />
        <CustomSections
          blocks={blocks}
          placement="beforeContact"
          projects={projects}
        />
        <ContactSection content={content.contact} />
        <CustomSections
          blocks={blocks}
          placement="beforeFooter"
          projects={projects}
        />
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
