'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Ellipsis — your message followed by dots appearing one at a time and
 * fading as a set. The dot count is yours to choose.
 */
function Ellipsis({
  className,
  children,
  dots = 3,
  ...props
}: React.ComponentProps<'span'> & { dots?: number }) {
  return (
    <span
      role="status"
      className={cn('inline-flex items-center', className)}
      {...props}
    >
      <style>{`@keyframes gl-ellipsis { 0%, 100% { opacity: 0.15; } 40% { opacity: 1; } }`}</style>
      <span>{children}</span>
      <span aria-hidden="true" className="inline-flex">
        {Array.from({ length: Math.max(1, dots) }, (_, i) => (
          <span
            key={i}
            style={{
              animation: 'gl-ellipsis var(--duration, 1.4s) infinite',
              animationDelay: `calc(var(--delay, 0.2s) * ${i + 1})`,
            }}
          >
            .
          </span>
        ))}
      </span>
    </span>
  )
}

export { Ellipsis }
