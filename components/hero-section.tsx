import { BrandMark } from '@/components/brand-mark'

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center lg:px-10"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="animate-fade-up text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
          Private Holding &amp; Venture Group
        </p>

        <div className="animate-fade-up mt-12" style={{ animationDelay: '120ms' }}>
          <BrandMark size="xl" priority />
        </div>

        <h1
          className="animate-fade-up mt-16 text-balance font-heading text-3xl font-normal leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
          style={{ animationDelay: '240ms' }}
        >
          Building brands with taste, discipline and long-term vision.
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-pretty text-base leading-relaxed text-graphite lg:text-lg"
          style={{ animationDelay: '340ms' }}
        >
          LMVK Group creates premium projects across hospitality, technology,
          commerce and lifestyle — built with patience, quality and clear
          identity.
        </p>

        <div
          className="animate-fade-up mt-14 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: '440ms' }}
        >
          <a
            href="#portfolio"
            className="inline-flex items-center justify-center border border-foreground px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            View portfolio
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center border border-border px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Contact LMVK Group
          </a>
        </div>
      </div>
    </section>
  )
}
