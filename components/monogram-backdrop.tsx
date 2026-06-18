import { cn } from '@/lib/utils'

interface MonogramBackdropProps {
  /** The mark to render. Defaults to the minimal "LM" monogram. */
  mark?: string
  className?: string
  /** Tailwind text size classes controlling the scale of the mark. */
  sizeClassName?: string
  /** "dark" = faint dark mark on light · "light" = faint ivory mark on black. */
  tone?: 'dark' | 'light'
}

/**
 * A subtle, oversized monogram set behind a section to reinforce the
 * LMVK Group identity. Purely decorative and never announced to
 * screen readers.
 */
export function MonogramBackdrop({
  mark = 'LM',
  className,
  sizeClassName = 'text-[40vw] lg:text-[28vw]',
  tone = 'dark',
}: MonogramBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none',
        className,
      )}
    >
      <span
        className={cn(
          'font-heading font-light leading-none tracking-[0.05em]',
          tone === 'light'
            ? 'text-primary-foreground/[0.06]'
            : 'text-foreground/[0.035]',
          sizeClassName,
        )}
      >
        {mark}
      </span>
    </div>
  )
}
