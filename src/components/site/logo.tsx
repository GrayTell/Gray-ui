import { cn } from '@/lib/utils'

/**
 * Gray UI mark — "the Twin Shards".
 *
 * A pure black rounded tile (always black, light and dark mode alike)
 * carrying two angular white shards split by a parallel diagonal slash —
 * vectorized 1:1 from the founder's original mark. No border, no stroke:
 * just the tile and the glass.
 */
const SHARDS = [
  // Left shard: wide top bar → diagonal cut → narrow foot
  'M11.8 13.2 L24.2 13.2 L15.8 34.8 L11.8 34.8 Z',
  // Right shard: apex at top-right → wide base at bottom
  'M33.2 13.2 L35.9 13.9 L37.2 34.8 L24.2 34.8 Z',
] as const

export function GrayMark({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      role="img"
      aria-label="Gray UI logo"
      className={cn('h-6 w-6', className)}
    >
      {/* Black tile */}
      <rect width="48" height="48" rx="12" fill="#0A0A0A" />
      {/* The Twin Shards — white, razor-sharp, borderless */}
      {SHARDS.map((d) => (
        <path key={d} d={d} fill="#FAFAFA" />
      ))}
    </svg>
  )
}

export function GrayLogo({ className }: { className?: string }) {
  return (
    <span className={cn('flex items-center gap-2.5 font-semibold tracking-tight', className)}>
      <GrayMark />
      <span>Gray&nbsp;UI</span>
    </span>
  )
}
