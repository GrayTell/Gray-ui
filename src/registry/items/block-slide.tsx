'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlockSlide — a pair of shaded cells gliding back and forth along a dim
 * ASCII track, like a slider being nudged from both ends.
 */
function BlockSlide({
  className,
  columns = 12,
  ...props
}: React.ComponentProps<'span'> & { columns?: number }) {
  const cols = Math.max(4, Math.floor(columns))
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'relative inline-flex h-[1em] items-center overflow-hidden font-mono text-xl leading-none select-none',
        className,
      )}
      style={{ width: `${cols}ch`, ...props.style } as React.CSSProperties}
      {...props}
    >
      <style>{`@keyframes gl-block-slide { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(var(--gl-slide-x)); } }`}</style>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap text-current/30">
        {'░'.repeat(cols)}
      </span>
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 flex h-full items-center whitespace-nowrap"
        style={
          {
            '--gl-slide-x': `${cols - 2}ch`,
            animation: 'gl-block-slide var(--duration, 2.2s) ease-in-out infinite',
          } as React.CSSProperties
        }
      >
        <span className="w-[1ch] text-center">█</span>
        <span className="w-[1ch] text-center text-current/60">▓</span>
      </span>
    </span>
  )
}

export { BlockSlide }
