'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlockTrack — the same paced patrol, but the rectangle itself is drawn
 * as a dim ASCII rail so the route stays visible.
 */
function BlockTrack({
  className,
  columns = 7,
  rows = 3,
  ...props
}: React.ComponentProps<'span'> & { columns?: number; rows?: number }) {
  const cols = Math.max(3, Math.floor(columns))
  const rowCount = Math.max(2, Math.floor(rows))
  const glyphs = ['█', '▓', '▒']
  const rail = Array.from({ length: rowCount * cols }, (_, i) => {
    const r = Math.floor(i / cols)
    const c = i % cols
    return r === 0 || r === rowCount - 1 || c === 0 || c === cols - 1 ? '░' : ' '
  })
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
      <style>{`@keyframes gl-block-track {
        0% { transform: translate(0, 0); }
        33.3% { transform: translate(var(--gl-x), 0); }
        66.6% { transform: translate(var(--gl-x), var(--gl-y)); }
        100% { transform: translate(0, var(--gl-y)); }
      }`}</style>
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre text-current/30">
        {rail.join('')}
      </span>
      {glyphs.map((glyph, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-0 flex h-[1ch] w-[1ch] items-center justify-center"
          style={
            {
              '--gl-x': `${cols - 1}ch`,
              '--gl-y': `${rowCount - 1}ch`,
              animation: 'gl-block-track var(--duration, 3s) linear infinite',
              animationDelay: `calc(var(--duration, 3s) / -${glyphs.length} * ${glyphs.length - 1 - i})`,
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

export { BlockTrack }
