'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * JumpDots — dots swelling and dimming in a rolling wave, each one
 * hopping slightly ahead of the last.
 */
function JumpDots({
  className,
  count = 3,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center gap-[0.25em] text-xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-jump-dots { 0%, 100% { transform: scale(0.75); opacity: 0.45; } 50% { transform: scale(1.15); opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(1, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[0.34em] rounded-full bg-current"
          style={{
            animation: 'gl-jump-dots var(--duration, 1.3s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.2s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { JumpDots }
