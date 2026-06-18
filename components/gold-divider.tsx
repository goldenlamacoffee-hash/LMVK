import { cn } from '@/lib/utils'

interface GoldDividerProps {
  className?: string
  style?: React.CSSProperties
  /**
   * "short" — a small underline accent echoing the logo divider.
   * "full" — a straight hairline that spans its container.
   *
   * Per the Design Manual (§09) the gold line stays thin, straight and
   * calm — never ornamental.
   */
  variant?: 'short' | 'full'
}

export function GoldDivider({
  className,
  style,
  variant = 'short',
}: GoldDividerProps) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className={cn(
        'block h-px bg-gold',
        variant === 'full' ? 'w-full' : 'w-16',
        className,
      )}
    />
  )
}
