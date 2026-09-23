'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Halo — an open ring chasing its own tail. Sized by the parent or the
 * `size-*` utilities; stroke width follows the viewBox, color follows
 * `currentColor`. Tune pace with `--duration`.
 */
function Halo({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      role="status"
      aria-label="Loading"
      className={cn('size-6', className)}
      style={{
        animation: 'gl-halo-spin var(--duration, 0.9s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-halo-spin { to { transform: rotate(360deg); } }`}</style>
      <path
        d="M12 3a9 9 0 1 0 9 9"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export { Halo }
