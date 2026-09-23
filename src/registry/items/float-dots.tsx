'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * FloatDots — dots drifting gently up and down, one after another, like
 * slow bubbles in a glass.
 */
function FloatDots({
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
      <style>{`@keyframes gl-float-dots { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-0.5em); } }`}</style>
      {Array.from({ length: Math.max(1, count) }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="size-[0.32em] rounded-full bg-current"
          style={{
            animation: 'gl-float-dots var(--duration, 1.1s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.16s) * ${i})`,
          }}
        />
      ))}
    </span>
  )
}

export { FloatDots }
