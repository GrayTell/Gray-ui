'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BreatheDots — a wider, slower breath than most dot rows: each dot
 * inflates to half again its size before settling back.
 */
function BreatheDots({
  className,
  count = 3,
  ...props
}: React.ComponentProps<'span'> & { count?: number }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex items-center justify-center gap-[0.3em] text-xl', className)}
      {...props}
    >
      <style>{`@keyframes gl-breathe-dots { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.45); opacity: 1; } }`}</style>
      {Array.from({ length: Math.max(1, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[0.32em] rounded-full bg-current"
          style={{
            animation: 'gl-breathe-dots var(--duration, 1.4s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.25s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { BreatheDots }
