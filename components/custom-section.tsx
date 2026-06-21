import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import type { CustomBlock, ProjectContent } from '@/lib/content/types'

/** Internal vs external link helper for CTAs. */
function CtaLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const isExternal = /^https?:\/\//i.test(href)
  const className =
    'group inline-flex items-center gap-3 border border-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold'
  const inner = (
    <>
      {children}
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
    </>
  )
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {inner}
      </a>
    )
  }
  return (
    <Link href={href || '#'} className={className}>
      {inner}
    </Link>
  )
}

const SECTION_CLASS = 'border-t border-border px-6 py-32 lg:px-10 lg:py-44'

function Eyebrow({ children }: { children: React.ReactNode }) {
  if (!children) return null
  return (
    <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
      {children}
    </p>
  )
}

/* -------------------------------------------------------------------------- */
/*  Individual block renderers                                                */
/* -------------------------------------------------------------------------- */

function TextBlock({ block }: { block: CustomBlock }) {
  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          {block.title ? (
            <h2 className="mt-10 text-balance font-heading text-3xl font-normal leading-[1.15] text-foreground sm:text-4xl lg:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.text ? (
            <div className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-graphite">
              {block.text.split('\n').map((line, i) =>
                line.trim() ? (
                  <p key={i} className="mt-4 first:mt-0">
                    {line}
                  </p>
                ) : null,
              )}
            </div>
          ) : null}
          {block.ctaText ? (
            <div className="mt-12">
              <CtaLink href={block.ctaLink}>{block.ctaText}</CtaLink>
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

function ImageTextBlock({ block }: { block: CustomBlock }) {
  const imageLeft = block.imagePosition === 'left'
  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal
          className={imageLeft ? 'order-2 lg:order-2' : 'order-2 lg:order-1'}
        >
          <Eyebrow>{block.eyebrow}</Eyebrow>
          {block.title ? (
            <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.15] text-foreground lg:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.text ? (
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-graphite">
              {block.text}
            </p>
          ) : null}
          {block.ctaText ? (
            <div className="mt-12">
              <CtaLink href={block.ctaLink}>{block.ctaText}</CtaLink>
            </div>
          ) : null}
        </Reveal>

        {block.image?.url ? (
          <Reveal
            delay={150}
            className={imageLeft ? 'order-1 lg:order-1' : 'order-1 lg:order-2'}
          >
            <figure className="relative">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={block.image.url || '/placeholder.svg'}
                  alt={block.image.alt || block.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                />
              </div>
              {block.image.caption ? (
                <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-warm-grey">
                  {block.image.caption}
                </figcaption>
              ) : null}
            </figure>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

function CtaBlock({ block }: { block: CustomBlock }) {
  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          {block.title ? (
            <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.15] text-foreground lg:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.text ? (
            <p className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-graphite">
              {block.text}
            </p>
          ) : null}
          {block.ctaText || block.secondaryCtaText ? (
            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              {block.ctaText ? (
                <CtaLink href={block.ctaLink}>{block.ctaText}</CtaLink>
              ) : null}
              {block.secondaryCtaText ? (
                <CtaLink href={block.secondaryCtaLink}>
                  {block.secondaryCtaText}
                </CtaLink>
              ) : null}
            </div>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

function StatementBlock({ block }: { block: CustomBlock }) {
  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          {block.showDivider ? (
            <div className="mx-auto mb-12 h-px w-16 bg-gold" />
          ) : null}
          <Eyebrow>{block.eyebrow}</Eyebrow>
          {block.title ? (
            <h2 className="mt-10 text-balance font-heading text-3xl font-normal leading-[1.25] text-foreground sm:text-4xl lg:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.text ? (
            <p className="mx-auto mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-graphite">
              {block.text}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  )
}

function GalleryBlock({ block }: { block: CustomBlock }) {
  const images = block.gallery.filter((g) => g?.url)
  if (images.length === 0 && !block.title) return null
  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          {block.title ? (
            <h2 className="mt-10 max-w-2xl text-balance font-heading text-3xl font-normal leading-tight text-foreground sm:text-4xl lg:text-5xl">
              {block.title}
            </h2>
          ) : null}
          {block.intro ? (
            <p className="mt-8 max-w-xl text-pretty leading-relaxed text-graphite">
              {block.intro}
            </p>
          ) : null}
        </Reveal>

        {images.length > 0 ? (
          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
            {images.map((img, i) => (
              <Reveal key={i} delay={(i % 3) * 120}>
                <figure>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={img.url || '/placeholder.svg'}
                      alt={img.alt || block.title || `Gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
                    />
                  </div>
                  {img.caption ? (
                    <figcaption className="mt-3 text-xs uppercase tracking-[0.2em] text-warm-grey">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              </Reveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ProjectHighlightBlock({
  block,
  project,
}: {
  block: CustomBlock
  project?: ProjectContent
}) {
  // Allow block-level overrides; fall back to the referenced project.
  const title = block.title || project?.name || ''
  const text = block.text || project?.summary || ''
  const image = block.image?.url ? block.image : project?.coverImage
  const href = block.ctaLink || (project ? `/projects/${project.slug}` : '#')
  const ctaText = block.ctaText || 'View project'
  const field = project?.field

  if (!title && !image?.url) return null

  return (
    <section className={SECTION_CLASS}>
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        {image?.url ? (
          <Reveal className="order-1">
            <Link href={href} className="group block">
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={image.url || '/placeholder.svg'}
                  alt={image.alt || title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
            </Link>
          </Reveal>
        ) : null}

        <Reveal delay={150} className="order-2">
          <Eyebrow>{block.eyebrow || 'Featured project'}</Eyebrow>
          <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.15] text-foreground lg:text-5xl">
            {title}
          </h2>
          {field ? (
            <p className="mt-4 text-[0.7rem] font-medium uppercase tracking-[0.35em] text-warm-grey">
              {field}
            </p>
          ) : null}
          {text ? (
            <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-graphite">
              {text}
            </p>
          ) : null}
          <div className="mt-12">
            <CtaLink href={href}>{ctaText}</CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Dispatcher                                                                */
/* -------------------------------------------------------------------------- */

export function CustomSection({
  block,
  projects,
}: {
  block: CustomBlock
  projects: ProjectContent[]
}) {
  if (!block.visible) return null

  switch (block.type) {
    case 'text':
      return <TextBlock block={block} />
    case 'imageText':
      return <ImageTextBlock block={block} />
    case 'cta':
      return <CtaBlock block={block} />
    case 'statement':
      return <StatementBlock block={block} />
    case 'gallery':
      return <GalleryBlock block={block} />
    case 'projectHighlight':
      return (
        <ProjectHighlightBlock
          block={block}
          project={projects.find((p) => p.slug === block.projectSlug)}
        />
      )
    default:
      return null
  }
}

/** Render all custom blocks for a given placement, sorted by order. */
export function CustomSections({
  blocks,
  placement,
  projects,
}: {
  blocks: CustomBlock[]
  placement: CustomBlock['placement']
  projects: ProjectContent[]
}) {
  const matching = blocks
    .filter((b) => b.placement === placement && b.visible)
    .sort((a, b) => a.order - b.order)

  if (matching.length === 0) return null

  return (
    <>
      {matching.map((block) => (
        <CustomSection key={block.id} block={block} projects={projects} />
      ))}
    </>
  )
}
