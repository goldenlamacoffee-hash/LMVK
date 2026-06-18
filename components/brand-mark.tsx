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

const sizeMap: Record<
  BrandMarkSize,
  { word: string; line: string; descriptor: string; gap: string }
> = {
  sm: {
    word: 'text-xl',
    line: 'mt-1 h-px w-8',
    descriptor: 'mt-1 text-[0.55rem] tracking-[0.45em]',
    gap: '',
  },
  md: {
    word: 'text-3xl',
    line: 'mt-2 h-px w-10',
    descriptor: 'mt-2 text-[0.65rem] tracking-[0.5em]',
    gap: '',
  },
  lg: {
    word: 'text-6xl sm:text-7xl',
    line: 'mt-4 h-px w-16',
    descriptor: 'mt-4 text-xs tracking-[0.6em] sm:text-sm',
    gap: '',
  },
  xl: {
    word: 'text-7xl sm:text-8xl lg:text-9xl',
    line: 'mt-6 h-px w-20 lg:w-24',
    descriptor: 'mt-5 text-sm tracking-[0.6em] lg:text-base',
    gap: '',
  },
}

/**
 * The LMVK Group wordmark lockup, built as typography per the Design
 * Manual (§02): high-contrast serif wordmark, a thin gold divider, and a
 * spaced sans-serif descriptor in strict vertical hierarchy.
 */
export function BrandMark({
  size = 'sm',
  tone = 'dark',
  className,
}: BrandMarkProps) {
  const s = sizeMap[size]
  const wordColor = tone === 'light' ? 'text-primary-foreground' : 'text-foreground'
  const descriptorColor =
    tone === 'light' ? 'text-primary-foreground/55' : 'text-muted-foreground'

  return (
    <span
      className={cn('inline-flex flex-col items-center leading-none', className)}
      aria-label="LMVK Group"
    >
      <span
        className={cn('font-heading font-medium tracking-[0.22em]', s.word, wordColor)}
      >
        LMVK
      </span>
      <span aria-hidden="true" className={cn('bg-gold', s.line)} />
      <span
        className={cn('font-sans font-medium uppercase', s.descriptor, descriptorColor)}
      >
        Group
      </span>
    </span>
  )
}
