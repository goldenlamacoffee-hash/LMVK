import Image from 'next/image'
import { cn } from '@/lib/utils'

type BrandMarkSize = 'sm' | 'md' | 'lg' | 'xl'
type BrandMarkTone = 'dark' | 'light'

interface BrandMarkProps {
  /** Controls the rendered scale of the logo lockup. */
  size?: BrandMarkSize
  /**
   * Tone is accepted for API compatibility. The logo uses a black wordmark,
   * so on dark surfaces ("light") the artwork is inverted to ivory.
   */
  tone?: BrandMarkTone
  /** Prioritize loading (use for the above-the-fold hero lockup). */
  priority?: boolean
  className?: string
}

/**
 * Per-size box dimensions for the logo lockup. The transparent source
 * artwork is ~2.1:1 (1010x482), so each box preserves that ratio and the
 * image is drawn with `object-contain` to keep the full lockup intact.
 */
const sizeMap: Record<BrandMarkSize, string> = {
  sm: 'h-10 w-[84px]',
  md: 'h-14 w-[118px]',
  lg: 'h-28 w-[236px]',
  xl: 'h-36 w-[300px] sm:h-44 sm:w-[368px]',
}

/**
 * The official LMVK Group logo lockup (serif "LMVK" wordmark, gold divider,
 * spaced "GROUP" descriptor), rendered from the approved transparent image
 * asset. This is a single locked unit; callers may position the whole mark
 * but must not alter its internal proportions.
 */
export function BrandMark({
  size = 'sm',
  tone = 'dark',
  priority = false,
  className,
}: BrandMarkProps) {
  return (
    <span
      className={cn('relative inline-block', sizeMap[size], className)}
      aria-label="LMVK Group"
    >
      <Image
        src="/lmvk-group-logo-transparent.png"
        alt="LMVK Group"
        fill
        priority={priority}
        sizes="(max-width: 640px) 60vw, 380px"
        className={cn('object-contain', tone === 'light' && 'invert')}
      />
    </span>
  )
}
