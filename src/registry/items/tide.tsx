'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Tide — a pulse of brightness rolling outward from the centre of a row
 * of cells and bouncing back, like water lapping a bulkhead.
 */
function Tide({
  className,
  columns = 11,
  ...props
}: React.ComponentProps<'span'> & { columns?: number }) {
  const cols = Math.max(3, Math.floor(columns) | 1)
  const mid = (cols - 1) / 2
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('inline-flex font-mono text-xl leading-none select-none', className)}
      {...props}
    >
      <style>{`@keyframes gl-tide { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.1; } }`}</style>
      {Array.from({ length: cols }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="flex h-[1em] w-[1ch] items-center justify-center"
          style={{
            animation: 'gl-tide var(--duration, 1.5s) ease-in-out infinite',
            animationDelay: `calc(var(--delay, 0.12s) * ${Math.abs(i - mid)})`,
          }}
        >
          █
        </span>
      ))}
    </span>
  )
}

export { Tide }
