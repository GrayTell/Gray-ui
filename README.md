<div align="center">

<img src="https://gray-ui.vercel.app/opengraph-image" alt="Gray UI — The Backbone of Your Design System" width="100%">

# Gray UI

**The Backbone of Your Design System**

110 copy-paste React components in a strict monochrome design system —
core UI primitives, dashboard cards and a full AI chat suite, all installable
from one registry.

[Live site](https://gray-ui.vercel.app) · [Docs](https://gray-ui.vercel.app/docs) · [Browse components](https://gray-ui.vercel.app/components) · [Report an issue](https://github.com/graytell/gray-ui/issues)

![Components](https://img.shields.io/badge/components-110-black)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black)
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind_CSS-4-black)
![License](https://img.shields.io/badge/license-MIT-black)

</div>

---

## Why Gray UI

Most component libraries give you a `npm install` and a black box. Gray UI gives you **the source** — every component lands in your project via the CLI, ready to bend to your will.

- **Monochrome by conviction** — a strict chroma-0 zinc palette. Hierarchy comes from weight, contrast and spacing, not color.
- **Geist only** — one typeface family (sans + mono), zero font roulette.
- **Own the code** — components are copied into your repo, not locked behind `node_modules`.
- **AI-native** — a complete AI chat suite (Conversation, Reasoning, Chain of Thought, Shimmer, Tool, Task, Prompt Input…) installable from the same registry.
- **Dark & light, responsive, accessible** — every component ships with keyboard support, ARIA semantics and mobile-safe layouts.

## Installation

Install any component straight from the registry with the CLI:

```bash
# Direct URL
npx shadcn@latest add https://gray-ui.vercel.app/r/button.json

# Or the @gray namespace
npx shadcn@latest add @gray/button
```

To use the `@gray` namespace, add the registry to your `components.json`:

```json
{
  "registries": {
    "@gray": "https://gray-ui.vercel.app/r/{name}.json"
  }
}
```

Then browse the whole catalog at [gray-ui.vercel.app/components](https://gray-ui.vercel.app/components) — every component page has a live preview, usage code and a one-click install command.

## What's inside

| Category | Highlights |
| --- | --- |
| AI | conversation, message, reasoning, chain-of-thought, shimmer, tool, task, prompt-input, code-block, web-preview, agent… |
| Controls | button, toggle, switch, checkbox, radio-group, slider… |
| Inputs | input, textarea, select, combobox, date-picker, calendar, form… |
| Overlays | dialog, sheet, drawer, popover, command, context-menu… |
| Navigation | tabs, menubar, navigation-menu, breadcrumb, pagination, sidebar… |
| Display | card, avatar, badge, accordion, hover-card, kbd, skeleton… |
| Data | table, chart, progress, scroll-area, plus dashboard cards (claimable-balance, contribution-chart, savings-targets, dividend, payments) |

The dashboard cards are finance-grade primitives (balance, dividends, contribution charts, payment settings) built on the monochrome system.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript 5**
- **Tailwind CSS 4** with CSS-variable design tokens
- **Radix UI** primitives behind every component
- **Geist** — self-hosted, no external font requests
- Prisma + SQLite for the site's own data bits

## Development

```bash
bun install        # install dependencies
bun run dev        # start the dev server on :3000
bun run lint       # ESLint
bun run db:push    # sync the Prisma schema
bun run build      # production build (standalone output)
```

The site is a Next.js app *and* a live registry: component demos live in `src/components/site/demos/`, while `src/app/r/[name]/route.ts` serves the registry JSON at `/r/<name>.json`.

## Contributing

Contributions are welcome! Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — project layout, the component checklist (monochrome tokens, Geist, dark mode, responsiveness, a11y) and how to get a new component into the registry.

Good first issues: new dashboard primitives, docs improvements, component demos.

## License

[MIT](LICENSE) © 2026 Graytell Labs — owned by Anubhav Sapkota

## Credits

**Created by [Graytell Labs](https://github.com/graytell) 2026 — owned by [Anubhav Sapkota](https://github.com/GrayTell)** — visit [github.com/graytell](https://github.com/graytell) for more info and our other products.
