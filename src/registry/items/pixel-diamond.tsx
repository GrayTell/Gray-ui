'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * PixelDiamond — eight square facets lighting up in sequence around a
 * diamond, a retro gem polishing itself.
 */
function PixelDiamond({ className, ...props }: React.ComponentProps<'svg'>) {
  const facets = [
    [8, 0], [12, 4], [16, 8], [12, 12], [8, 16], [4, 12], [0, 8], [4, 4],
  ]
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      {...props}
    >
      <style>{`@keyframes gl-pixel-diamond { 0% { opacity: 0.15; } 15% { opacity: 1; } 45% { opacity: 0.15; } 100% { opacity: 0.15; } }`}</style>
      {facets.map(([x, y], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="4"
          height="4"
          style={{
            animation: 'gl-pixel-diamond 1.6s linear infinite',
            animationDelay: `calc(var(--duration, 1.6s) / 8 * ${i})`,
          }}
        />
      ))}
    </svg>
  )
}

export { PixelDiamond }
