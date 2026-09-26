'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Scaffold — a placeholder block that breathes while content loads.
 * Shape it with width/height utilities to sketch any layout.
 */
function Scaffold({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="scaffold"
      className={cn('h-4 w-full animate-none rounded-md bg-muted', className)}
      style={{
        animation: 'gl-scaffold var(--duration, 2s) cubic-bezier(0.4, 0, 0.6, 1) infinite',
        ...props.style,
      }}
      {...props}
    >
      <style>{`@keyframes gl-scaffold { 50% { opacity: 0.45; } }`}</style>
    </div>
  )
}

export { Scaffold }
