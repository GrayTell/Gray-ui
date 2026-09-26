'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlinkDots — a row of dots taking turns to light up. The count is
 * adjustable; stagger comes from `--delay` per dot.
 */
function BlinkDots({
  className,
  count = 3,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center gap-[0.2em] text-xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-blink-dots { 0%, 100% { opacity: 0.25; } 30% { opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(1, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[0.32em] rounded-full bg-current"
          style={{
            animation: 'gl-blink-dots var(--duration, 1.2s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.18s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { BlinkDots }
