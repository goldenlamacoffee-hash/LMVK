import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { ProjectContent, SiteContent } from '@/lib/content/types'

export function PortfolioSection({
  content,
  projects,
}: {
  content: SiteContent['portfolio']
  projects: ProjectContent[]
}) {
  if (!content.visible) return null

  return (
    <section
      id="portfolio"
      className="border-t border-border px-6 py-32 lg:px-10 lg:py-44"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            {content.eyebrow}
          </p>
          <h2 className="mt-10 max-w-2xl text-balance font-heading text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-graphite">
            {content.intro}
          </p>
        </Reveal>

        <div className="mt-20 lg:mt-24">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block border-t border-border py-12 transition-colors duration-500 last:border-b lg:py-16"
              >
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:items-baseline md:gap-10">
                  <div className="flex items-baseline gap-4 md:col-span-1">
                    <span className="font-mono text-xs tracking-widest text-warm-grey">
                      {project.index}
                    </span>
                  </div>

                  <div className="md:col-span-5">
                    {project.coverImage?.url ? (
                      <div className="mb-5 aspect-[16/10] overflow-hidden">
                        <Image
                          src={project.coverImage.url || '/placeholder.svg'}
                          alt={project.coverImage.alt || project.name}
                          width={640}
                          height={400}
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                        />
                      </div>
                    ) : null}
                    <h3 className="font-heading text-4xl font-normal leading-none text-foreground transition-colors duration-500 group-hover:text-gold lg:text-5xl">
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
