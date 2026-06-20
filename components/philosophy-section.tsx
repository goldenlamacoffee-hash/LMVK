import { Reveal } from '@/components/reveal'
import type { SiteContent } from '@/lib/content/types'

const numerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

export function PhilosophySection({
  content,
}: {
  content: SiteContent['philosophy']
}) {
  if (!content.visible) return null

  return (
    <section
      id="philosophy"
      className="border-t border-border bg-secondary/40 px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            {content.eyebrow}
          </p>
          <h2 className="mt-10 max-w-2xl text-balance font-heading text-3xl font-light leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          {content.intro ? (
            <p className="mt-8 max-w-xl text-pretty leading-relaxed text-warm-grey lg:text-lg">
              {content.intro}
            </p>
          ) : null}
        </Reveal>

        <div className="mt-20 lg:mt-28">
          {content.principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="grid grid-cols-1 gap-6 border-t border-border py-12 md:grid-cols-12 md:gap-12 lg:py-16">
                <div className="md:col-span-3">
                  <span className="font-heading text-2xl font-light text-gold">
                    {numerals[i] ?? String(i + 1)}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-heading text-3xl font-normal text-foreground lg:text-4xl">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-md text-pretty leading-relaxed text-warm-grey md:col-span-5 lg:text-lg">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
