'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * BlockSnake — four shaded cells chasing each other around an invisible
 * square, tail to head, with no rail to give the game away.
 */
function BlockSnake({
  className,
  size = 4,
  ...props
}: React.ComponentProps<'span'> & { size?: number }) {
  const cells = Math.max(3, Math.floor(size))
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
        { height: `${cells}ch`, width: `${cells}ch`, ...props.style } as React.CSSProperties
      }
      {...props}
    >
      <style>{`@keyframes gl-block-snake {
        0% { transform: translate(0, 0); }
        25% { transform: translate(var(--gl-x), 0); }
        50% { transform: translate(var(--gl-x), var(--gl-y)); }
        75% { transform: translate(0, var(--gl-y)); }
        100% { transform: translate(0, 0); }
      }`}</style>
      {glyphs.map((glyph, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute top-0 left-0 flex h-[1ch] w-[1ch] items-center justify-center"
          style={
            {
              '--gl-x': `${cells - 1}ch`,
              '--gl-y': `${cells - 1}ch`,
              animation: 'gl-block-snake var(--duration, 2.4s) linear infinite',
              animationDelay: `calc(var(--duration, 2.4s) / -${glyphs.length} * ${glyphs.length - 1 - i})`,
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

export { BlockSnake }
