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
  { word: string; line: string; descriptor: string }
> = {
  sm: {
    word: 'text-lg tracking-[0.32em] mr-[-0.32em]',
    line: 'mt-1.5 h-px w-7',
    descriptor: 'mt-1.5 text-[0.5rem] tracking-[0.5em] mr-[-0.5em]',
  },
  md: {
    word: 'text-2xl tracking-[0.34em] mr-[-0.34em]',
    line: 'mt-2 h-px w-10',
    descriptor: 'mt-2 text-[0.6rem] tracking-[0.55em] mr-[-0.55em]',
  },
  lg: {
    word: 'text-5xl tracking-[0.36em] mr-[-0.36em] sm:text-6xl',
    line: 'mt-4 h-px w-16',
    descriptor: 'mt-3 text-xs tracking-[0.62em] mr-[-0.62em] sm:text-sm',
  },
  xl: {
    word: 'text-6xl tracking-[0.34em] mr-[-0.34em] sm:text-7xl lg:text-8xl',
    line: 'mt-6 h-px w-20 lg:w-28',
    descriptor: 'mt-5 text-sm tracking-[0.65em] mr-[-0.65em] lg:text-base',
  },
}

/**
 * The LMVK Group logo lockup, built as typography per the Brand Manual
 * (§02): a bold sans-serif "LMVK" wordmark, a thin gold divider centered
 * to the wordmark, and a spaced "GROUP" descriptor in strict vertical
 * hierarchy. The gold line must stay centered — never shifted or scaled
 * independently.
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
    tone === 'light' ? 'text-primary-foreground/65' : 'text-foreground/80'

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
