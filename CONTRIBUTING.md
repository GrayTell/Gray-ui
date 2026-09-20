# Contributing to Gray UI

First off — thanks for wanting to make Gray UI better. Every component in the registry was copied, bent and shipped by someone who cared about the details. Here's how to do the same.

## Setup

```bash
git clone https://github.com/graytell/gray-ui.git
cd gray-ui
bun install
bun run db:push   # one-time: sync the Prisma schema
bun run dev       # http://localhost:3000
bun run lint      # must pass before any PR
```

## Project layout

```
src/
├── app/
│   ├── page.tsx              # landing page
│   ├── docs/                 # installation & usage docs
│   ├── components/           # component explorer (all 110 items)
│   └── r/[name]/route.ts     # the registry API (/r/<name>.json)
├── registry/
│   ├── items/                # Gray originals (single source of truth)
│   ├── vendor/               # vendored shadcn/ui registry JSONs
│   └── ai-elements/          # vendored AI Elements registry JSONs
├── components/
│   ├── ui/                   # the shadcn/ui component set
│   ├── ai-elements/          # the AI Elements component set
│   ├── gray/                 # installed Gray originals (live previews)
│   └── site/                 # site chrome (header, footer, hero…)
└── lib/                      # registry metadata, catalogs, helpers
```

## Adding a Gray original

1. **Build the component** in `src/registry/items/<kebab-name>.tsx`. It must export a named `Demo` (rendered in the explorer) alongside the component itself.
2. **Register it** — add the item metadata (name, title, description, type, files, dependencies) to the catalog in `src/lib/registry.ts` / `component-registry.ts`.
3. **Serve it** — `/r/<name>.json` reads `src/registry/items/<name>.tsx` automatically once it's in `EXCLUSIVE_ITEMS`.
4. **Show it** — add it to the components explorer section and (if it's hero-worthy) the homepage showcase.
5. **Prove it** — install it from the registry into a scratch app with `npx shadcn@latest add https://gray-ui.space-z.ai/r/<name>.json` and make sure it compiles standalone.

## The component checklist

Every PR that touches components must satisfy **all** of these:

- [ ] **Monochrome only** — zinc/scale tokens (`foreground`, `muted-foreground`, `border`…). No chroma. The only color allowed is `--destructive` and deliberate status dots.
- [ ] **Satoshi** — text uses the `--font-sans` token. No new font families.
- [ ] **Dark & light** — verified in both themes (the tokens handle it if you don't hardcode colors).
- [ ] **Responsive** — mobile-first; cards stack, grids wrap, nothing overflows at 390px.
- [ ] **Accessible** — keyboard navigable, ARIA attributes where needed, visible focus states, ≥44px touch targets.
- [ ] **No new dependencies** without discussing it in an issue first.
- [ ] **Lint passes** — `bun run lint` with 0 errors.

## Style

- TypeScript strict — no `any`, no `as unknown as`.
- Functional components + hooks; `'use client'` only where interactivity demands it.
- Tailwind utility classes with shadcn semantic tokens (`bg-background`, `text-foreground`…), never raw hex.
- Small components; compose instead of piling props.

## Pull requests

1. Fork, then create a branch: `feat/<kebab-name>` or `fix/<what-it-fixes>`.
2. Keep PRs focused — one component or one fix per PR.
3. Describe **what** changed and **why**; screenshots/GIFs for visual changes are loved.
4. Make sure `bun run lint` passes and the site runs clean (`bun run dev`, click through your component in light + dark).

## Reporting bugs

Open an issue with: what you did, what you expected, what happened, and a minimal repro (or the failing `npx shadcn add` command + error output).

---

**Created by [Graytell Labs](https://github.com/graytell) 2026** — visit [github.com/graytell](https://github.com/graytell) for more info and our other products.
