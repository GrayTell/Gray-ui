<div align="center">

<img src="https://gray-ui.space-z.ai/opengraph-image" alt="Gray UI — The Canvas for your Next Interface" width="100%">

# Gray UI

**The Canvas for your Next Interface**

110 copy-paste React components in a strict monochrome design system —
55 stock shadcn/ui · 7 Gray originals · all 48 Vercel AI Elements.

[Live site](https://gray-ui.space-z.ai) · [Docs](https://gray-ui.space-z.ai/docs) · [Browse components](https://gray-ui.space-z.ai/components) · [Report an issue](https://github.com/graytell/gray-ui/issues)

![Components](https://img.shields.io/badge/components-110-black)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-black)
![Tailwind%20CSS](https://img.shields.io/badge/Tailwind_CSS-4-black)
![License](https://img.shields.io/badge/license-MIT-black)

</div>

---

## Why Gray UI

Most component libraries give you a `npm install` and a black box. Gray UI gives you **the source** — every component lands in your project via the shadcn CLI, ready to bend to your will.

- **Monochrome by conviction** — a strict chroma-0 zinc palette. Hierarchy comes from weight, contrast and spacing, not color.
- **Satoshi only** — one self-hosted typeface, four weights, zero font roulette.
- **Own the code** — components are copied into your repo, not vendored from `node_modules`. That's the shadcn philosophy, taken seriously.
- **AI-native** — the **complete** Vercel AI Elements set (Conversation, Reasoning, Chain of Thought, Shimmer, Tool, Task, Sources…) restyled for Gray and installable from the same registry.
- **Dark & light, responsive, accessible** — every component ships with keyboard support, ARIA semantics and mobile-safe layouts.

## Installation

Install any component straight from the registry with the shadcn CLI:

```bash
# Direct URL
npx shadcn@latest add https://gray-ui.space-z.ai/r/button.json

# Or the @gray namespace
npx shadcn@latest add @gray/button
```

To use the `@gray` namespace, add the registry to your `components.json`:

```json
{
  "registries": {
    "@gray": "https://gray-ui.space-z.ai/r/{name}.json"
  }
}
```

Then browse the whole catalog at [gray-ui.space-z.ai/components](https://gray-ui.space-z.ai/components) — every card shows a live preview, the source, and a one-click copy install command.

## What's inside

| Category | Count | Highlights |
| --- | --- | --- |
| Stock shadcn/ui | 55 | Button, Dialog, Command, Table, Charts, Sidebar… |
| Gray originals | 7 | settings-nav, claimable-balance, contribution-chart, savings-targets, dividend, payments, date-picker |
| AI Elements | 48 | conversation, message, reasoning, chain-of-thought, shimmer, tool, task, sources, prompt-input, code-block, web-preview, agent… |

Gray originals are finance-grade dashboard primitives (balance cards, dividend trackers, contribution charts) built on the monochrome system — the pieces the stock registry doesn't give you.

## Tech stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript 5**
- **Tailwind CSS 4** with CSS-variable design tokens
- **Radix UI** primitives behind every component
- **Vercel AI SDK** powering the AI Elements set
- **Satoshi** (Fontshare), self-hosted — no external font requests
- Prisma + SQLite for the site's own data bits

## Development

```bash
bun install        # install dependencies
bun run dev        # start the dev server on :3000
bun run lint       # ESLint
bun run db:push    # sync the Prisma schema
bun run build      # production build (standalone output)
```

The site is a Next.js app *and* a live registry: component sources live in `src/registry/items/` (Gray originals) and `src/components/` (stock + AI Elements), while `src/app/r/[name]/route.ts` serves the shadcn-compatible registry JSON at `/r/<name>.json`.

## Contributing

Contributions are welcome! Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide — project layout, the component checklist (monochrome tokens, Satoshi, dark mode, responsiveness, a11y) and how to get a new component into the registry.

Good first issues: new Gray originals (dashboard primitives), docs improvements, component demos.

## License

[MIT](LICENSE) © 2026 Graytell Labs

## Credits

**Created by [Graytell Labs](https://github.com/graytell) 2026** — visit [github.com/graytell](https://github.com/graytell) for more info and our other products.
