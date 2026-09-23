'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * EchoRing — a quiet outer ring with a brighter inner arc answering it.
 * The inner arc orbits inside the halo, echoing the rotation.
 */
function EchoRing({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn('relative inline-block size-6', className)}
      style={{
        animation: 'gl-echo-ring var(--duration, 1s) linear infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-echo-ring { to { transform: rotate(360deg); } }`}</style>
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border-2 border-current/20"
      />
      <span
        aria-hidden="true"
        className="absolute inset-[18%] rounded-full border-2 border-transparent border-b-current"
      />
    </span>
  )
}

export { EchoRing }
