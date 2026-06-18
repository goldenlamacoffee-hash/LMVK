import { Reveal } from '@/components/reveal'

const essence = [
  {
    label: 'Purpose',
    statement: 'Build brands with long-term value.',
  },
  {
    label: 'Positioning',
    statement: 'Quiet luxury, disciplined growth, clear identity.',
  },
  {
    label: 'Attributes',
    statement: 'Premium, timeless, confident, restrained, precise.',
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="border-t border-border px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
                01 — Brand Essence
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 text-pretty font-heading text-2xl font-normal leading-[1.4] text-foreground sm:text-3xl">
                A private holding and venture group focused on premium projects
                in hospitality, technology, commerce and lifestyle.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {essence.map((item, i) => (
              <Reveal key={item.label} delay={160 + i * 100}>
                <div className="flex flex-col gap-3 border-t border-border py-10 first:border-t-0 first:pt-0 lg:py-12 lg:first:pt-0">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="block h-1.5 w-1.5 rotate-45 bg-gold"
                    />
                    <span className="text-[0.7rem] font-medium uppercase tracking-[0.4em] text-warm-grey">
                      {item.label}
                    </span>
                  </div>
                  <p className="text-balance font-heading text-2xl font-normal leading-snug text-foreground lg:text-3xl">
                    {item.statement}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
