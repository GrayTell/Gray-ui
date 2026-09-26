'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlockMarch — three shaded cells marching across a dim track from left
 * to right, fading as they exit. Loop resets cleanly at the far edge.
 */
function BlockMarch({
  className,
  columns = 10,
  ...props
}: React.ComponentProps<'span'> & { columns?: number }) {
  const cols = Math.max(4, Math.floor(columns))
  const glyphs = ['█', '▓', '▒']
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
      <style>{`@keyframes gl-block-march { 0% { transform: translateX(-3ch); } 100% { transform: translateX(var(--gl-march-x)); } }`}</style>
      <span aria-hidden="true" className="absolute inset-0 whitespace-nowrap text-current/30">
        {'░'.repeat(cols)}
      </span>
      {glyphs.map((glyph, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-0 flex h-full w-[1ch] items-center justify-center"
          style={
            {
              '--gl-march-x': `${cols + 3}ch`,
              animation: 'gl-block-march var(--duration, 1.6s) linear infinite',
              animationDelay: `calc(var(--delay, 0.09s) * ${i})`,
              zIndex: 10 - i,
            } as React.CSSProperties
          }
        >
          {glyph}
        </span>
      ))}
    </span>
  )
}

export { BlockMarch }
