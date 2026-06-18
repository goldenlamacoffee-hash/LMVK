import { cn } from '@/lib/utils'

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl'
type BrandMarkTone = 'dark' | 'light'

interface BrandMarkProps {
  /** Visual scale of the lockup. */
  size?: BrandMarkSize
  /** "dark" = black wordmark on ivory · "light" = ivory wordmark on black. */
  tone?: BrandMarkTone
  className?: string
}

/**
 * Per-size styling for the locked LMVK Group lockup.
 *
 * The wordmark carries letter-spacing, which adds a trailing space after the
 * final glyph. Each text element is given a negative right margin equal to its
 * tracking value (`mr-[-<tracking>]`) so the trailing space is cancelled and
 * the glyphs sit perfectly centered above the gold divider. The divider width
 * is tuned to ~45% of the wordmark for a refined, manual-faithful proportion.
 */
const sizeMap: Record<
  BrandMarkSize,
  { word: string; line: string; descriptor: string }
> = {
  sm: {
    word: 'text-xl tracking-[0.3em] mr-[-0.3em]',
    line: 'mt-2 h-px w-9',
    descriptor: 'mt-2 text-[0.55rem] tracking-[0.58em] mr-[-0.58em]',
  },
  md: {
    word: 'text-2xl tracking-[0.32em] mr-[-0.32em]',
    line: 'mt-2.5 h-px w-12',
    descriptor: 'mt-2.5 text-[0.62rem] tracking-[0.6em] mr-[-0.6em]',
  },
  lg: {
    word: 'text-5xl tracking-[0.34em] mr-[-0.34em] sm:text-6xl',
    line: 'mt-4 h-px w-24',
    descriptor: 'mt-4 text-sm tracking-[0.66em] mr-[-0.66em]',
  },
  xl: {
    word: 'text-6xl tracking-[0.32em] mr-[-0.32em] sm:text-7xl lg:text-8xl',
    line: 'mt-6 h-px w-32 lg:w-44',
    descriptor: 'mt-5 text-sm tracking-[0.7em] mr-[-0.7em] lg:text-base',
  },
}

/**
 * The LMVK Group logo lockup, built as typography per the Brand Manual
 * (§02 Logo System): a bold sans-serif "LMVK" wordmark, a thin gold divider
 * centered to the wordmark, and a spaced "GROUP" descriptor in strict
 * vertical hierarchy. This is a single locked unit — the divider and
 * descriptor are always centered to the wordmark and must never be shifted,
 * scaled, or repositioned independently. Callers may position the whole unit
 * but must not override its internal alignment.
 */
export function BrandMark({
  size = 'sm',
  tone = 'dark',
  className,
}: BrandMarkProps) {
  const s = sizeMap[size]
  const wordColor =
    tone === 'light' ? 'text-primary-foreground' : 'text-foreground'
  const descriptorColor =
    tone === 'light' ? 'text-primary-foreground/70' : 'text-foreground/80'

  return (
    <span
      className={cn('inline-flex flex-col items-center leading-none', className)}
      aria-label="LMVK Group"
    >
      <span className={cn('font-sans font-semibold', s.word, wordColor)}>
        LMVK
      </span>
      <span aria-hidden="true" className={cn('bg-gold', s.line)} />
      <span
        className={cn(
          'font-sans font-medium uppercase',
          s.descriptor,
          descriptorColor,
        )}
      >
        Group
      </span>
    </span>
  )
}
