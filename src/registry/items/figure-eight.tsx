'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * FigureEight — a loop of thread that keeps retying itself between a
 * circle and an infinity sign, drawn with native SVG path morphing.
 */
function FigureEight({ className, ...props }: React.ComponentProps<'svg'>) {
  const circle = 'M12 7c2.5 0 4.5 2 4.5 5s-2 5-4.5 5-4.5-2-4.5-5 2-5 4.5-5Z'
  const circleBack = 'M12 17c2.5 0 4.5-2 4.5-5s-2-5-4.5-5-4.5 2-4.5 5 2 5 4.5 5Z'
  const eight = 'M12 12c2-3 6-3 6 0s-4 3-6 0c-2 3-6 3-6 0s4-3 6 0Z'
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        d={circle}
      >
        <animate
          attributeName="d"
          dur="4.5s"
          repeatCount="indefinite"
          values={`${circle};${eight};${circleBack};${eight};${circle}`}
        />
      </path>
    </svg>
  )
}

export { FigureEight }
