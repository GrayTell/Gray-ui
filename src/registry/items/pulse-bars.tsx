'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * PulseBars — slim columns contracting and brightening in sequence.
 * Height is inherited from the container, so it fits any line of text.
 */
function PulseBars({
  className,
  count = 3,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex h-[1em] items-stretch gap-[0.18em]', className)}
      {...props}
    >
      <style>{`@keyframes gl-pulse-bars { 0%, 100% { transform: scaleY(1); opacity: 0.45; } 50% { transform: scaleY(0.45); opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(2, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="w-[0.14em] rounded-full bg-current"
          style={{
            animation: 'gl-pulse-bars var(--duration, 1.1s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.18s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { PulseBars }
