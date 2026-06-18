import { Reveal } from '@/components/reveal'

const pillars = [
  {
    title: 'Legacy',
    description:
      'Continuity and responsibility. We build companies meant to outlast trends and stand for something over time.',
  },
  {
    title: 'Control',
    description:
      'Clear rules, precise systems and measured decisions. Discipline is what makes the work look effortless.',
  },
  {
    title: 'Trust',
    description:
      'A professional, consistent and transparent presence — in every brand we hold and every interaction we have.',
  },
  {
    title: 'Growth',
    description:
      'A structure built to hold many future brands under one roof, each given the patience it needs to mature.',
  },
]

export function AboutSection() {
  return (
    <section
      id="group"
      className="border-t border-border/50 px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
                01 — The Group
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 text-balance font-heading text-3xl font-light leading-[1.25] text-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.2]">
                A house of trusted companies — not a loud startup.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={200}>
              <p className="max-w-xl text-pretty text-lg leading-relaxed text-graphite">
                LMVK Group is the umbrella brand for serious business building:
                stable, precise, long-term and selective. Every project must
                carry lasting value in experience, trust and reputation.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-border/60 bg-border/60 sm:grid-cols-2">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.title} delay={280 + i * 100}>
                  <div className="h-full bg-card p-8 lg:p-10">
                    <h3 className="font-heading text-2xl font-normal text-foreground">
                      {pillar.title}
                    </h3>
                    <span className="mt-4 block h-px w-10 bg-gold" />
                    <p className="mt-5 text-pretty leading-relaxed text-warm-grey">
                      {pillar.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
