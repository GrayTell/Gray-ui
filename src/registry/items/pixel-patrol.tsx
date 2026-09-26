'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * PixelPatrol — a train of shaded cells pacing the perimeter of an
 * invisible rectangle, head to tail, forever.
 */
function PixelPatrol({
  className,
  columns = 6,
  rows = 3,
  ...props
}: React.ComponentProps<'span'> & { columns?: number; rows?: number }) {
  const cols = Math.max(3, Math.floor(columns))
  const rowCount = Math.max(2, Math.floor(rows))
  const glyphs = ['█', '▓', '▒', '░']
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'relative inline-flex overflow-hidden font-mono text-xl leading-none select-none',
        className,
      )}
      style={
        { height: `${rowCount}ch`, width: `${cols}ch`, ...props.style } as React.CSSProperties
      }
      {...props}
    >
      <style>{`@keyframes gl-pixel-patrol {
        0% { transform: translate(0, 0); }
        33.3% { transform: translate(var(--gl-x), 0); }
        66.6% { transform: translate(var(--gl-x), var(--gl-y)); }
        100% { transform: translate(0, var(--gl-y)); }
      }`}</style>
      {glyphs.map((glyph, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-0 flex h-[1ch] w-[1ch] items-center justify-center"
          style={
            {
              '--gl-x': `${cols - 1}ch`,
              '--gl-y': `${rowCount - 1}ch`,
              animation: 'gl-pixel-patrol var(--duration, 2.8s) linear infinite',
              animationDelay: `calc(var(--duration, 2.8s) / -${glyphs.length} * ${glyphs.length - 1 - i})`,
              zIndex: glyphs.length - i,
            } as React.CSSProperties
          }
        >
          {glyph}
        </span>
      ))}
    </span>
  )
}

export { PixelPatrol }
