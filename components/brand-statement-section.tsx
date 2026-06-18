import { Reveal } from '@/components/reveal'
import { MonogramBackdrop } from '@/components/monogram-backdrop'

export function BrandStatementSection() {
  return (
    <section
      id="statement"
      className="relative overflow-hidden bg-primary px-6 py-36 text-primary-foreground lg:px-10 lg:py-52"
    >
      <MonogramBackdrop
        mark="LMVK"
        tone="light"
        className="justify-end"
        sizeClassName="text-[40vw] leading-none lg:text-[24vw]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <Reveal>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-gold">
              The LMVK Promise
            </p>
          </Reveal>

          <Reveal delay={120}>
            <span className="mt-10 block h-px w-16 bg-gold" />
          </Reveal>

          <Reveal delay={200}>
            <blockquote className="mt-12 text-balance font-heading text-3xl font-light leading-[1.25] sm:text-4xl lg:text-5xl lg:leading-[1.2]">
              LMVK Group exists to build brands that people remember — through
              precision, patience and emotional value.
            </blockquote>
          </Reveal>

          <Reveal delay={320}>
            <p className="mt-12 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/60">
              Calm authority. Controlled growth. Long-term trust.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
