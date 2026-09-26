'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * TickRing — twelve ticks around a dial lighting up one after another,
 * the calm spinner every operating system taught us to read.
 */
function TickRing({
  className,
  ticks = 12,
  ...props
}: React.ComponentProps<'span'> & { ticks?: number }) {
  const count = Math.max(6, Math.min(16, Math.floor(ticks)))
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-tick-ring { 0% { opacity: 1; } 100% { opacity: 0.15; } }`}</style>
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-1/2 block w-[9%] rounded-full bg-current"
          style={{
            height: '22%',
            marginLeft: '-4.5%',
            transformOrigin: '50% 227%',
            transform: `rotate(${(i / count) * 360}deg)`,
            animation: 'gl-tick-ring var(--duration, 1.2s) linear infinite',
            animationDelay: `calc(var(--duration, 1.2s) / ${count} * ${i - count})`,
          }}
        />
      ))}
    </span>
  )
}

export { TickRing }
