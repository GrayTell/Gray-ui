/**
 * Gray registry metadata — client-safe (no fs, no server imports).
 *
 * Three sources make up the registry:
 *  1. STOCK_META  — 53 official shadcn new-york-v4 items vendored under
 *     `src/registry/vendor/*.json` (content-stripped metadata only), plus the
 *     locally-rebuilt `toast` item (55 stock items total).
 *  2. EXCLUSIVE_ITEMS — 7 Gray originals living in `src/registry/items/`.
 *  3. AI_ELEMENTS_ITEMS — 48 Vercel AI Elements vendored under
 *     `src/registry/ai-elements/*.json` (full Vercel set, Gray-hosted).
 *  The public registry index therefore serves 55 + 7 + 48 = 110 items, while
 *  the component catalog (which folds date-picker into the stock list) shows 56+48.
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
 * `toast` was removed from the shadcn v4 registry, so Gray rebuilds it from
 * local sources (src/components/ui/toast.tsx, toaster.tsx, use-toast.ts).
 * The /r/toast.json route attaches the file contents at request time.
 */
export const TOAST_ITEM: GrayItem = {
  name: 'toast',
  type: 'registry:ui',
  title: 'Toast',
  description:
    'The official shadcn/ui Toast component (new-york-v4), rebuilt from source by the Gray registry. Ships the toaster, the toast primitives and the use-toast hook.',
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
 * The 48 Vercel AI Elements (chain-of-thought, shimmer, conversation, …),
 * vendored verbatim from elements.ai-sdk.dev and served Gray-hosted.
 * Sources live in `src/registry/ai-elements/*.json`; the /r route reads them
 * at request time. Cross-registry deps are rewritten to gray-ui.space-z.ai.
 */
export const AI_ELEMENTS_ITEMS: GrayItem[] = (
  aiElementsMetaJson as VendorMetaEntry[]
).map((entry) => ({ ...entry }))

export const AI_ELEMENT_NAMES = AI_ELEMENTS_ITEMS.map((item) => item.name)

/** Every item served by the registry — 55 stock + 7 originals + 48 AI Elements = 110. */
export const ALL_REGISTRY_ITEMS: GrayItem[] = [
  ...Object.values(STOCK_META),
  ...EXCLUSIVE_ITEMS,
  ...AI_ELEMENTS_ITEMS,
]

/**
 * The date-picker is a Gray original, not a stock shadcn item — this alias
 * points at its entry in EXCLUSIVE_ITEMS so callers never hard-code a lookup.
 */
export const DATE_PICKER: GrayItem = EXCLUSIVE_ITEMS.find(
  (item) => item.name === 'date-picker',
) as GrayItem

/** Union lookup across all 110 items (stock, toast, originals, AI Elements). */
export function getRegistryItemMeta(slug: string): GrayItem | null {
  return (
    EXCLUSIVE_ITEMS.find((item) => item.name === slug) ??
    STOCK_META[slug] ??
    AI_ELEMENTS_ITEMS.find((item) => item.name === slug) ??
    null
  )
}

/** Number of items served by the registry index. */
export const REGISTRY_COUNT = ALL_REGISTRY_ITEMS.length

/** Number of components in the public catalog: 54 stock + the date-picker original. */
export const CATALOG_COUNT = Object.keys(STOCK_META).length + 1
