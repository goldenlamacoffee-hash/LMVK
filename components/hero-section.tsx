import Image from 'next/image'
import { BrandMark } from '@/components/brand-mark'
import type { SiteContent } from '@/lib/content/types'

export function HeroSection({ content }: { content: SiteContent['hero'] }) {
  if (!content.visible) return null

  const hasBackground = Boolean(content.backgroundImage?.url)
  const hasImage = Boolean(content.image?.url)

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 text-center lg:px-10"
    >
      {hasBackground ? (
        <div className="pointer-events-none absolute inset-0 -z-10">
          <Image
            src={content.backgroundImage.url || '/placeholder.svg'}
            alt={content.backgroundImage.alt || ''}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-background/40" />
        </div>
      ) : null}

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <p className="animate-fade-up text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
          {content.eyebrow}
        </p>

        <div className="animate-fade-up mt-12" style={{ animationDelay: '120ms' }}>
          <BrandMark size="xl" priority />
        </div>

        <h1
          className="animate-fade-up mt-16 text-balance font-heading text-3xl font-normal leading-[1.18] text-foreground sm:text-4xl lg:text-5xl"
          style={{ animationDelay: '240ms' }}
        >
          {content.headline}
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-pretty text-base leading-relaxed text-graphite lg:text-lg"
          style={{ animationDelay: '340ms' }}
        >
          {content.subtitle}
        </p>

        {hasImage ? (
          <div
            className="animate-fade-up mt-14 w-full max-w-2xl overflow-hidden"
            style={{ animationDelay: '420ms' }}
          >
            <Image
              src={content.image.url || '/placeholder.svg'}
              alt={content.image.alt || content.headline}
              width={1280}
              height={720}
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        <div
          className="animate-fade-up mt-14 flex flex-col items-center gap-4 sm:flex-row"
          style={{ animationDelay: '440ms' }}
        >
          {content.primaryCtaText ? (
            <a
              href={content.primaryCtaLink}
              className="inline-flex items-center justify-center border border-foreground px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {content.primaryCtaText}
            </a>
          ) : null}
          {content.secondaryCtaText ? (
            <a
              href={content.secondaryCtaLink}
              className="inline-flex items-center justify-center border border-border px-9 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
            >
              {content.secondaryCtaText}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
