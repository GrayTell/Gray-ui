/**
 * Gray registry metadata — client-safe (no fs, no server imports).
 *
 * Four sources make up the registry:
 *  1. STOCK_META  — 53 core UI items under
 *     `src/registry/vendor/*.json` (content-stripped metadata only), plus the
 *     locally-rebuilt `toast` item (55 stock items total).
 *  2. EXCLUSIVE_ITEMS — 7 Gray originals living in `src/registry/items/`.
 *  3. AI_ELEMENTS_ITEMS — the AI component set under
 *     `src/registry/ai-elements/*.json` (full Vercel set, Gray-hosted).
 *  4. LOADING_ITEMS — the 47-piece loader suite under `src/registry/items/`.
 *  The public registry index therefore serves 55 + 7 + 48 + 47 = 157 items,
 *  while the component catalog (which folds date-picker into the stock list)
 *  shows 56 + 7 + 48 + 47.
 */
import vendorMetaJson from '@/registry/vendor-meta.json'
import aiElementsMetaJson from '@/registry/ai-elements-meta.json'

export interface GrayItem {
  name: string
  type: string
  title: string
  description: string
  dependencies: string[]
  registryDependencies: string[]
  files: {
    path: string
    type: string
    target?: string
  }[]
  exclusive?: boolean
}

interface VendorMetaEntry {
  name: string
  title: string
  description: string
  type: string
  dependencies: string[]
  registryDependencies: string[]
  files: GrayItem['files']
}

/** File entry for a Gray original — one self-contained .tsx per item. */
const exclusiveFile = (slug: string): GrayItem['files'][number] => ({
  path: `gray/${slug}.tsx`,
  type: 'registry:component',
  target: `@components/gray/${slug}.tsx`,
})

/**
 * The 7 Gray originals. Every file is self-contained ('use client',
 * inline default data, internal state) and imports only from
 * @/components/ui/*, lucide-react, date-fns and @/lib/utils.
 */
export const EXCLUSIVE_ITEMS: GrayItem[] = [
  {
    name: 'settings-nav',
    type: 'registry:component',
    title: 'Settings Nav',
    description:
      'Two independent settings navigation lists with selectable rows. A drop-in, keyboard-accessible pattern for settings pages.',
    dependencies: ['lucide-react'],
    registryDependencies: [],
    files: [exclusiveFile('settings-nav')],
    exclusive: true,
  },
  {
    name: 'claimable-balance',
    type: 'registry:component',
    title: 'Claimable Balance',
    description:
      'A payout summary card with balance, fees and a full line-by-line report behind one click. Built on Card-style layout, Badge and Dialog.',
    dependencies: [],
    registryDependencies: ['badge', 'button', 'dialog'],
    files: [exclusiveFile('claimable-balance')],
    exclusive: true,
  },
  {
    name: 'contribution-chart',
    type: 'registry:component',
    title: 'Contribution Chart',
    description:
      'GitHub-style contribution bar chart with 6-month and 1-year periods. Hover or focus any bar for a tooltip with the exact count.',
    dependencies: [],
    registryDependencies: [],
    files: [exclusiveFile('contribution-chart')],
    exclusive: true,
  },
  {
    name: 'savings-targets',
    type: 'registry:component',
    title: 'Savings Targets',
    description:
      'Savings goals with draggable sliders and live progress math — percentages, remaining amounts and currency formatting update in real time.',
    dependencies: [],
    registryDependencies: ['badge', 'slider'],
    files: [exclusiveFile('savings-targets')],
    exclusive: true,
  },
  {
    name: 'dividend',
    type: 'registry:component',
    title: 'Dividend',
    description:
      'Dividend income estimator with multi-select holdings. Toggle positions to watch the estimated quarterly payout update instantly.',
    dependencies: ['lucide-react'],
    registryDependencies: [],
    files: [exclusiveFile('dividend')],
    exclusive: true,
  },
  {
    name: 'payments',
    type: 'registry:component',
    title: 'Payments',
    description:
      'Payment settings panel with collapsible action rows and working switches, plus a breadcrumb header for nested-page contexts.',
    dependencies: ['lucide-react'],
    registryDependencies: ['collapsible', 'switch'],
    files: [exclusiveFile('payments')],
    exclusive: true,
  },
  {
    name: 'date-picker',
    type: 'registry:component',
    title: 'Date Picker',
    description:
      'A date picker composed from Popover and Calendar with an outline trigger. The selected date renders as MMM d, yyyy and the popover closes on selection.',
    dependencies: ['lucide-react', 'date-fns'],
    registryDependencies: ['calendar', 'popover', 'button'],
    files: [exclusiveFile('date-picker')],
    exclusive: true,
  },
]

/**
 * `toast` ships from Gray's own sources (src/components/ui/toast.tsx,
 * toaster.tsx, use-toast.ts).
 * The /r/toast.json route attaches the file contents at request time.
 */
export const TOAST_ITEM: GrayItem = {
  name: 'toast',
  type: 'registry:ui',
  title: 'Toast',
  description:
    'The Gray toast component. Ships the toaster, the toast primitives and the use-toast hook.',
  dependencies: ['@radix-ui/react-toast', 'class-variance-authority'],
  registryDependencies: [],
  files: [
    { path: 'ui/toast.tsx', type: 'registry:ui', target: '@ui/toast.tsx' },
    { path: 'ui/toaster.tsx', type: 'registry:ui', target: '@ui/toaster.tsx' },
    { path: 'hooks/use-toast.ts', type: 'registry:hook', target: '@hooks/use-toast.ts' },
  ],
}

/** Content-stripped metadata for every stock item, keyed by name (54 incl. toast). */
const stockEntries: [string, GrayItem][] = (vendorMetaJson as VendorMetaEntry[]).map(
  (entry) => [entry.name, entry],
)
stockEntries.push([TOAST_ITEM.name, TOAST_ITEM])

export const STOCK_META: Record<string, GrayItem> = Object.fromEntries(stockEntries)

/**
 * The AI component set (chain-of-thought, shimmer, conversation, …),
 * served from the Gray registry.
 * Sources live in `src/registry/ai-elements/*.json`; the /r route reads them
 * at request time. Cross-registry deps are rewritten to gray-ui.vercel.app.
 */
export const AI_ELEMENTS_ITEMS: GrayItem[] = (
  aiElementsMetaJson as VendorMetaEntry[]
).map((entry) => ({ ...entry }))

export const AI_ELEMENT_NAMES = AI_ELEMENTS_ITEMS.map((item) => item.name)

/**
 * The loader suite — 47 motion primitives (rings, dots, bars, text and
 * terminal effects). Self-contained single files under `src/registry/items/`,
 * styled with currentColor and paced by the `--duration` custom property.
 */
const loaderDefs: Array<[string, string, string]> = [
  ['halo', 'Halo', 'An open ring chasing its own tail. The every-project spinner.'],
  ['arc-sweep', 'Arc Sweep', 'A single bold arc riding a faint ring.'],
  ['twin-arc', 'Twin Arc', 'Two opposite arcs sharing one rotating orbit.'],
  ['fan-blade', 'Fan Blade', 'A quarter arc sweeping in circles.'],
  ['saturn', 'Saturn', 'A soft disc ringed by a faster orbiting arc.'],
  ['echo-ring', 'Echo Ring', 'A faint outer ring answered by a brighter inner arc.'],
  ['orbit-dot', 'Orbit Dot', 'A solid satellite riding the rim of a quiet ring.'],
  ['clockwork', 'Clockwork', 'A dial with a single hand sweeping the face.'],
  ['tick-ring', 'Tick Ring', 'Twelve ticks lighting up around the dial in sequence.'],
  ['turbine', 'Turbine', 'Eight blades spinning around an empty hub.'],
  ['dash-orbit', 'Dash Orbit', 'A dashed ring that breathes while it turns.'],
  ['dash-bloom', 'Dash Bloom', 'A stroke stretching and shrinking around a turning circle.'],
  ['gradient-arc', 'Gradient Arc', 'An arc whose tail fades to nothing as the head leads.'],
  ['shooting-star', 'Shooting Star', 'A bright head with a fading trail lapping a circular orbit.'],
  ['lemniscate', 'Lemniscate', 'A spark running laps around a figure-eight.'],
  ['figure-eight', 'Figure Eight', 'A loop morphing between a circle and an infinity sign.'],
  ['pixel-diamond', 'Pixel Diamond', 'Eight square facets lighting up around a diamond.'],
  ['blink-dots', 'Blink Dots', 'Dots taking turns to light up in a row.'],
  ['float-dots', 'Float Dots', 'Dots drifting up and down in a gentle relay.'],
  ['jump-dots', 'Jump Dots', 'Dots swelling and dimming in a rolling wave.'],
  ['breathe-dots', 'Breathe Dots', 'Dots inflating and settling in a slow breath.'],
  ['chat-typing', 'Chat Typing', 'The someone-is-typing bounce for message threads.'],
  ['heartbeat', 'Heartbeat', 'One dot breathing for single-point status.'],
  ['soft-pulse', 'Soft Pulse', 'An outlined circle inhaling, exhaling and dimming.'],
  ['sonar', 'Sonar', 'Rings radiating outward and dissolving, two beats apart.'],
  ['dot-halo', 'Dot Halo', 'A crown of dots brightening in turn around a centre.'],
  ['vortex', 'Vortex', 'Dots swirling and blooming on an invisible ring.'],
  ['trio-orbit', 'Trio Orbit', 'Three dots on a spinning rod, sweeping like a propeller.'],
  ['binary-orbit', 'Binary Orbit', 'A nucleus with two moons circling on opposite sides.'],
  ['pulse-bars', 'Pulse Bars', 'Slim bars contracting and brightening in sequence.'],
  ['sound-wave', 'Sound Wave', 'Five rounded bars swaying like a voice waveform.'],
  ['scaffold', 'Scaffold', 'A breathing placeholder block for loading layouts.'],
  ['frame-scan', 'Frame Scan', 'An image frame swept by a scanner beam.'],
  ['googly-eyes', 'Googly Eyes', 'Two eyes whose pupils wander and occasionally blink.'],
  ['block-slide', 'Block Slide', 'Shaded ASCII cells gliding along a dim track.'],
  ['block-march', 'Block March', 'Shaded ASCII cells marching across a dim track.'],
  ['pixel-patrol', 'Pixel Patrol', 'A train of cells pacing an invisible rectangle.'],
  ['block-track', 'Block Track', 'The paced patrol with its route drawn as a dim rail.'],
  ['block-corners', 'Block Corners', 'A block touring a drawn grid, pausing at corners.'],
  ['block-orbit', 'Block Orbit', 'A bright cell circling the rim of a drawn grid.'],
  ['block-snake', 'Block Snake', 'Cells chasing each other around an invisible square.'],
  ['tide', 'Tide', 'Brightness rolling outward from a row’s centre and back.'],
  ['prompt-caret', 'Prompt Caret', 'A shell prompt with a hard-blinking block cursor.'],
  ['fade-text', 'Fade Text', 'A line of text drifting in and out of focus.'],
  ['ellipsis', 'Ellipsis', 'A message followed by dots appearing one at a time.'],
  ['shimmer-wave', 'Shimmer Wave', 'Brightness rippling through text character by character.'],
  ['gloss-sweep', 'Gloss Sweep', 'A band of brightness sliding across muted text.'],
]

export const LOADING_ITEMS: GrayItem[] = loaderDefs.map(([name, title, description]) => ({
  name,
  type: 'registry:component',
  title,
  description,
  dependencies: [],
  registryDependencies: [],
  files: [exclusiveFile(name)],
  exclusive: true,
}))

/** Every item served by the registry — stock, originals, AI set and loaders. */
export const ALL_REGISTRY_ITEMS: GrayItem[] = [
  ...Object.values(STOCK_META),
  ...EXCLUSIVE_ITEMS,
  ...AI_ELEMENTS_ITEMS,
  ...LOADING_ITEMS,
]

/**
 * The date-picker is a Gray original — this alias
 * points at its entry in EXCLUSIVE_ITEMS so callers never hard-code a lookup.
 */
export const DATE_PICKER: GrayItem = EXCLUSIVE_ITEMS.find(
  (item) => item.name === 'date-picker',
) as GrayItem

/** Union lookup across every registry item. */
export function getRegistryItemMeta(slug: string): GrayItem | null {
  return (
    EXCLUSIVE_ITEMS.find((item) => item.name === slug) ??
    LOADING_ITEMS.find((item) => item.name === slug) ??
    STOCK_META[slug] ??
    AI_ELEMENTS_ITEMS.find((item) => item.name === slug) ??
    null
  )
}

/** Number of items served by the registry index. */
export const REGISTRY_COUNT = ALL_REGISTRY_ITEMS.length

/** Number of components in the public catalog: 54 stock + the date-picker original. */
export const CATALOG_COUNT = Object.keys(STOCK_META).length + 1
