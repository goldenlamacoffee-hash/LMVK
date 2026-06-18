import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/projects'
import { MonogramBackdrop } from '@/components/monogram-backdrop'
import { GoldDivider } from '@/components/gold-divider'
import { Reveal } from '@/components/reveal'

export function ProjectDetail({ project }: { project: Project }) {
  return (
    <article>
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-24 pt-40 lg:px-10 lg:pb-32 lg:pt-52">
        <MonogramBackdrop mark={project.mark} />

        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <Link
              href="/#portfolio"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
              LMVK Group
            </Link>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-12 text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
              {project.status}
            </p>
            <h1 className="mt-8 text-balance font-heading text-5xl font-normal leading-[1.08] text-foreground sm:text-6xl lg:text-7xl">
              {project.name}
            </h1>
            <GoldDivider variant="short" className="mt-10 w-24" />
            <p className="mt-8 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              {project.category}
            </p>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-12 max-w-2xl text-pretty text-xl font-light leading-relaxed text-foreground/85 lg:text-2xl">
              {project.description}
            </p>
          </Reveal>

          {project.website ? (
            <Reveal delay={240}>
              <a
                href={project.website.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-12 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground"
              >
                <span className="relative">
                  Visit {project.website.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/60 transition-all duration-300 group-hover:bg-gold" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-gold transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Philosophy */}
      {project.philosophy ? (
        <section className="border-t border-border/50 px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-4xl">
            <Reveal>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
                Philosophy
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-12 max-w-3xl text-balance font-heading text-2xl font-normal leading-snug text-foreground sm:text-3xl lg:text-4xl">
                {project.philosophy}
              </p>
            </Reveal>
          </div>
        </section>
      ) : null}

      {/* Brand values */}
      {project.values && project.values.length > 0 ? (
        <section className="border-t border-border/50 px-6 py-28 lg:px-10 lg:py-40">
          <div className="mx-auto max-w-5xl">
            <Reveal>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
                Brand Values
              </p>
            </Reveal>

            <div className="mt-16 lg:mt-20">
              {project.values.map((value, i) => (
                <Reveal key={value.title} delay={i * 120}>
                  <div className="grid grid-cols-1 gap-4 border-t border-border/50 py-10 md:grid-cols-12 md:items-baseline md:gap-10 last:border-b lg:py-14">
                    <span className="font-mono text-xs tracking-widest text-warm-grey md:col-span-1">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading text-3xl font-normal leading-none text-foreground md:col-span-4 lg:text-4xl">
                      {value.title}
                    </h2>
                    <p className="max-w-md text-pretty leading-relaxed text-warm-grey md:col-span-7 lg:text-lg">
                      {value.description}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing */}
      <section className="border-t border-border/50 px-6 py-28 lg:px-10 lg:py-36">
        <div className="mx-auto max-w-4xl">
          <GoldDivider variant="short" className="w-24" />
          <p className="mt-12 max-w-xl text-pretty text-lg leading-relaxed text-graphite">
            {project.name} is a company of LMVK Group — a private venture group
            building brands that people remember, through precision, patience
            and emotional value.
          </p>
          <Link
            href="/#portfolio"
            className="group mt-10 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-500 group-hover:-translate-x-1" />
            <span className="relative">
              Back to portfolio
              <span className="absolute -bottom-1 left-0 h-px w-full bg-gold/60 transition-all duration-300 group-hover:bg-gold" />
            </span>
          </Link>
        </div>
      </section>
    </article>
  )
}
