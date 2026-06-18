'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** delay in ms */
  delay?: number
  as?: 'div' | 'section' | 'span' | 'li'
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Respect users who prefer reduced motion: reveal immediately.
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    if (prefersReducedMotion) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as

  return (
    <Tag
      // @ts-expect-error -- ref typing across polymorphic tags
      ref={ref}
      className={cn(
        'transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform',
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0',
        className,
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
