'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * FrameScan — an image placeholder being swept by a scanner line: a faint
 * landscape sits inside the frame while the beam passes over it.
 */
function FrameScan({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'relative h-16 w-24 overflow-hidden rounded-lg border border-current/40',
        className,
      )}
      style={props.style}
      {...props}
    >
      <style>{`@keyframes gl-frame-scan { 0% { top: -12%; } 100% { top: 104%; } }`}</style>
      <svg
        viewBox="0 0 24 16"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 size-full text-current/50"
      >
        <circle cx="17" cy="5" r="2" fill="currentColor" />
        <path
          d="m3 13 5-5 4 4 3-3 6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div
        aria-hidden="true"
        className="absolute left-0 h-[35%] w-full bg-gradient-to-b from-transparent via-current/15 to-transparent"
        style={{
          animation: 'gl-frame-scan var(--duration, 1.9s) ease-in-out infinite',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute left-0 h-[2px] w-full bg-current"
        style={{
          animation: 'gl-frame-scan var(--duration, 1.9s) ease-in-out infinite',
        }}
      />
    </div>
  )
}

export { FrameScan }
