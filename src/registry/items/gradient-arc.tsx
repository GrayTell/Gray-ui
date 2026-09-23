'use client'

import * as React from 'react'
import { useId } from 'react'

import { cn } from '@/lib/utils'

/**
 * GradientArc — an arc whose tail melts into nothing. The gradient rides
 * along the rotation so the head always leads, bright to invisible.
 */
function GradientArc({ className, ...props }: React.ComponentProps<'svg'>) {
  const uid = useId().replace(/[:]/g, '')
  const fade = `gl-arc-fade-${uid}`
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      style={{
        animation: 'gl-gradient-arc var(--duration, 1s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-gradient-arc { to { transform: rotate(360deg); } }`}</style>
      <defs>
        <linearGradient id={fade} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle
        cx="12"
        cy="12"
        r="9"
        stroke={`url(#${fade})`}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="42.4 14.1"
      />
    </svg>
  )
}

export { GradientArc }
