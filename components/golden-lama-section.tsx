import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function GoldenLamaSection() {
  return (
    <section className="border-t border-border px-6 py-32 lg:px-10 lg:py-44">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal className="order-2 lg:order-1">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.5em] text-warm-grey">
            Featured — Golden Lama Coffee
          </p>
          <h2 className="mt-10 text-balance font-heading text-4xl font-normal leading-[1.15] text-foreground lg:text-5xl">
            The first public expression of the LMVK philosophy.
          </h2>
          <p className="mt-8 max-w-md text-pretty text-lg leading-relaxed text-graphite">
            Golden Lama Coffee brings together precise execution, memorable
            identity and genuine human experience. It is built on the belief
            that hospitality is not only about product quality, but about
            making people feel better.
          </p>
          <a
            href="https://goldenlama.sk"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 inline-flex items-center gap-3 border border-foreground px-8 py-4 text-xs font-medium uppercase tracking-[0.25em] text-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
          >
            Open goldenlama.sk
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal delay={150} className="order-1 lg:order-2">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/golden-lama-coffee.png"
              alt="A premium cup of Golden Lama coffee in warm golden light"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-105"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
