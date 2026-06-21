import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { SiteContent } from '@/lib/content/types'

export function GoldenLamaSection({
  content,
}: {
  content: SiteContent['featured']
}) {
  if (!content.visible) return null

  return (
    <section className="border-t border-border px-6 py-32 lg:px-10 lg:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            {content.eyebrow}
          </p>
          <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.15] text-foreground lg:text-5xl">
            {content.title}
          </h2>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-graphite">
            {content.body}
          </p>
          {content.ctaText ? (
            <a
              href={content.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-12 inline-flex items-center gap-3 border border-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {content.ctaText}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          ) : null}
        </Reveal>

        {content.image?.url ? (
          <Reveal delay={150} className="order-1 lg:order-2">
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={content.image.url || '/placeholder.svg'}
                  alt={content.image.alt || content.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
              </div>
              {content.image.caption ? (
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-warm-grey">
                  {content.image.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}
