'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlockCorners — a block touring a drawn grid and pausing at every
 * corner, with two shaded companions following a beat behind.
 */
function BlockCorners({
  className,
  size = 5,
  ...props
}: React.ComponentProps<'span'> & { size?: number }) {
  const cells = Math.max(3, Math.floor(size))
  const glyphs = ['█', '▓', '▒']
  const rail = Array.from({ length: cells * cells }, (_, i) => {
    const r = Math.floor(i / cells)
    const c = i % cells
    return r === 0 || r === cells - 1 || c === 0 || c === cells - 1 ? '░' : ' '
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
        { height: `${cells}ch`, width: `${cells}ch`, ...props.style } as React.CSSProperties
      }
      {...props}
    >
      <style>{`@keyframes gl-block-corners {
        0% { transform: translate(0, 0); }
        16% { transform: translate(var(--gl-x), 0); }
        28% { transform: translate(var(--gl-x), 0); }
        44% { transform: translate(var(--gl-x), var(--gl-y)); }
        56% { transform: translate(var(--gl-x), var(--gl-y)); }
        72% { transform: translate(0, var(--gl-y)); }
        84% { transform: translate(0, var(--gl-y)); }
        100% { transform: translate(0, 0); }
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
              '--gl-x': `${cells - 1}ch`,
              '--gl-y': `${cells - 1}ch`,
              animation: 'gl-block-corners var(--duration, 4.2s) linear infinite',
              animationDelay: `calc(var(--delay, 0.12s) * ${i})`,
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

export { BlockCorners }
