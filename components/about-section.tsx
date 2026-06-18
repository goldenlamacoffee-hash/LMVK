import { Reveal } from '@/components/reveal'
import type { SiteContent } from '@/lib/content/types'

export function AboutSection({
  content,
}: {
  content: SiteContent['brandEssence']
}) {
  if (!content.visible) return null

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
                {content.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-10 text-pretty font-heading text-2xl font-normal leading-[1.4] text-foreground sm:text-3xl">
                {content.statement}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            {content.items.map((item, i) => (
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
