import { Reveal } from '@/components/reveal'
import type { SiteContent } from '@/lib/content/types'

export function ContactSection({
  content,
}: {
  content: SiteContent['contact']
}) {
  if (!content.visible) return null

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-border bg-primary px-6 py-36 text-primary-foreground lg:px-10 lg:py-52"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-gold">
                {content.eyebrow}
              </p>
              <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.12] sm:text-5xl lg:text-6xl">
                {content.title}
              </h2>
              <p className="mt-10 max-w-lg text-pretty text-lg leading-relaxed text-primary-foreground/65">
                {content.text}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <Reveal delay={160}>
              <span className="block h-px w-16 bg-gold" />
              <a
                href={`mailto:${content.email}`}
                className="mt-8 inline-block font-heading text-2xl font-light tracking-wide text-gold transition-opacity hover:opacity-80 lg:text-3xl"
              >
                {content.email}
              </a>
              <div className="mt-10 flex items-center gap-3 text-[0.7rem] uppercase tracking-[0.35em] text-primary-foreground/55">
                <span>{content.personName}</span>
                <span className="h-px w-6 bg-primary-foreground/30" />
                <span>{content.personRole}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
