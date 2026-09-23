'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * FadeText — a line of text drifting in and out of focus. Set the floor
 * with `--gl-fade-min` (0–1); anything can be a child, not just strings.
 */
function FadeText({
  className,
  children,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      className={cn('inline-block font-medium', className)}
      style={{
        animation: 'gl-fade-text var(--duration, 2s) ease-in-out infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-fade-text { 0%, 100% { opacity: 1; } 50% { opacity: var(--gl-fade-min, 0.4); } }`}</style>
      {children}
    </span>
  )
}

export { FadeText }
