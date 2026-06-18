import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { AboutSection } from '@/components/about-section'
import { BrandStatementSection } from '@/components/brand-statement-section'
import { PhilosophySection } from '@/components/philosophy-section'
import { PortfolioSection } from '@/components/portfolio-section'
import { GoldenLamaSection } from '@/components/golden-lama-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <BrandStatementSection />
        <PhilosophySection />
        <PortfolioSection />
        <GoldenLamaSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  )
}
