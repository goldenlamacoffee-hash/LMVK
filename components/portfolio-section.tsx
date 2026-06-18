import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { projects } from '@/lib/projects'

export function PortfolioSection() {
  return (
    <section
      id="brands"
      className="border-t border-border/50 px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            03 — Brands
          </p>
          <h2 className="mt-10 max-w-2xl text-balance font-heading text-3xl font-light leading-tight text-foreground sm:text-4xl lg:text-5xl">
            A small, curated house of brands.
          </h2>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-graphite">
            Portfolio brands can carry their own identity. LMVK Group remains
            the quiet guarantee behind each of them.
          </p>
        </Reveal>

        <div className="mt-20 lg:mt-24">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-t border-border/50 py-12 transition-colors duration-500 last:border-b lg:py-16"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline md:gap-10">
                  <div className="flex items-baseline gap-4 md:col-span-1">
                    <span className="font-mono text-xs tracking-widest text-warm-grey">
                      {project.index}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    <h3 className="font-heading text-4xl font-light leading-none text-foreground transition-colors duration-500 group-hover:text-gold lg:text-5xl">
                      {project.name}
                    </h3>
                    <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
                      {project.field}
                    </p>
                  </div>

                  <p className="max-w-md text-pretty leading-relaxed text-warm-grey md:col-span-4 lg:text-lg">
                    {project.summary}
                  </p>

                  <div className="flex items-center gap-3 md:col-span-2 md:justify-end">
                    <span className="whitespace-nowrap text-[0.65rem] font-medium uppercase tracking-[0.3em] text-warm-grey">
                      {project.status}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-foreground transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
