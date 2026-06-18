import { MonogramBackdrop } from '@/components/monogram-backdrop'

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-32 lg:px-10"
    >
      <MonogramBackdrop
        mark="LM"
        className="justify-end"
        sizeClassName="text-[42vw] leading-none lg:text-[26vw]"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-3xl">
          <p className="animate-fade-up text-[0.7rem] font-medium uppercase tracking-[0.55em] text-warm-grey">
            Private Venture Group
          </p>

          <h1
            className="animate-fade-up mt-10 text-balance font-heading text-5xl font-light leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '120ms' }}
          >
            Building brands with control.
          </h1>

          <p
            className="animate-fade-up mt-10 max-w-xl text-pretty text-lg leading-relaxed text-graphite lg:text-xl"
            style={{ animationDelay: '240ms' }}
          >
            LMVK Group is a disciplined home for long-term ventures across
            hospitality, technology and commerce. Stable, precise and
            selective — a house of companies, built to last.
          </p>

          <div
            className="animate-fade-up mt-14 flex flex-col items-start gap-6 sm:flex-row sm:items-center"
            style={{ animationDelay: '360ms' }}
          >
            <a
              href="#group"
              className="inline-flex items-center justify-center bg-primary px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground transition-colors duration-300 hover:bg-gold hover:text-gold-foreground"
            >
              Explore group
            </a>
            <a
              href="#brands"
              className="group inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-foreground"
            >
              View brands
              <span className="block h-px w-8 bg-gold transition-all duration-500 group-hover:w-12" />
            </a>
          </div>

          <div
            className="animate-fade-up mt-20 flex flex-wrap items-center gap-x-4 gap-y-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-warm-grey sm:tracking-[0.35em]"
            style={{ animationDelay: '500ms' }}
          >
            <span>Hospitality</span>
            <span className="h-px w-5 bg-gold/60" />
            <span>Technology</span>
            <span className="h-px w-5 bg-gold/60" />
            <span>Commerce</span>
          </div>
        </div>
      </div>
    </section>
  )
}
