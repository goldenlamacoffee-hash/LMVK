import { Reveal } from '@/components/reveal'

const principles = [
  {
    number: 'I',
    title: 'Taste',
    description:
      'Every detail should feel intentional. Considered choices, made quietly, are what separate a brand from a product.',
  },
  {
    number: 'II',
    title: 'Discipline',
    description:
      'Strong brands are built through consistency, not noise. We move with restraint and let the work speak over time.',
  },
  {
    number: 'III',
    title: 'Value',
    description:
      'We build projects that can grow, mature and last — measured not only in numbers, but in trust and reputation.',
  },
]

export function PhilosophySection() {
  return (
    <section
      id="philosophy"
      className="border-t border-border/50 px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            02 — Philosophy
          </p>
          <h2 className="mt-10 max-w-2xl text-balance font-heading text-3xl font-light leading-tight text-foreground sm:text-4xl lg:text-5xl">
            Principles that shape everything we build.
          </h2>
        </Reveal>

        <div className="mt-20 lg:mt-28">
          {principles.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="grid grid-cols-1 gap-6 border-t border-border/50 py-12 md:grid-cols-12 md:gap-12 lg:py-16">
                <div className="md:col-span-3">
                  <span className="font-heading text-2xl font-light text-gold">
                    {item.number}
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
