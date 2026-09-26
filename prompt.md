# prompt.md — Prompting the Agent Suite

How to prompt **Gray AI** (the ⌘K chat on this site) and any coding agent to
extend, restyle, or build new AI components in this repository.

---

## 1. What lives in this repo

| Layer | Path | Role |
|---|---|---|
| Component | `src/components/ai-elements/agent-*.tsx` | The actual component (self-playing, monochrome, reduced-motion aware) |
| Demo | `src/components/site/demos/ai-agents.tsx` | The scenario shown in the catalog (`*Demo` export) |
| Catalog wiring | `src/lib/component-registry-ai.ts` | `DEMOS` map (slug → demo) + `USAGE` code snippet |
| Registry metadata | `src/registry/ai-elements-meta.json` | Name, title, description, deps, file targets |
| Registry payload | `src/registry/ai-elements/<slug>.json` | Full shadcn registry item (inlined file content) served at `/r/<slug>.json` |
| Catalog surfacing | `src/lib/component-registry.ts` → `NEW_COMPONENTS` | Puts the component in the "New Components" grid |

## 2. The current agent suite (12)

| Component | Prompt it with | Signature |
|---|---|---|
| `agent-reasoning-steps` | *reasoning trace, thinking steps* | `stages: {title, reasoning?}[]`, `stageMs=1750`, `reasonMs=650`, `onDone` |
| `agent-streaming-text` | *streaming reply, typewriter text* | `text`, `wordMs=16`, `caret`, `onDone` |
| `agent-task-list` | *task checklist, todo progress* | `tasks: {title}[]`, `taskMs=1600`, `onDone` |
| `agent-plan-card` | *plan proposal, run plan* | `title`, `description`, `items`, `onRun` |
| `agent-file-diff` | *animated diff, file changes* | `path`, `lines: {kind, text, oldNo?, newNo?}[]`, `lineMs=220` |
| `agent-image-generation` | *image gen progress* | `prompt`, `phases`, `phaseMs=1100`, `children?` |
| `agent-inline-citations` | *citations, sources* | `text`, `sources: {id, title, url?}[]`, `wordMs=18` |
| `agent-code-reveal` | *code writing itself* | `filename`, `lines: string[]`, `lineMs=260` |
| `agent-chat-input` | *prompt composer* | `suggestion`, `typeMs=45`, `onSubmit` |
| `agent-question-card` | *agent asks human* | `question`, `options`, `onAnswer` |
| `agent-message-bubble` | *chat bubble* | `from: "user" \| "assistant"`, `delay` |
| `agent-message-scroller` | *self-playing conversation* | `turns: {from, text, delayMs?}[]`, `turnMs=2100` |

## 3. Prompting Gray AI to restyle / extend an existing component

Gray AI knows this design system. Paste prompts like these:

```text
Make AgentTaskList announce each completed task via aria-live instead of
only a role=status wrapper. Keep the monochrome styling and the 1600ms pace.
```

```text
Add a paused/running state to AgentMessageScroller: when paused, show a
"Resume" control instead of "Skip to latest". Do not touch the demo copy.
```

```text
Give AgentFileDiff a "hunk headers" prop: optional @@ labels rendered as
dividers. Reveal them on the same lineMs clock.
```

**Prompt formula:** `[Component name] + [behavior change] + [constraints:
monochrome / reduced-motion / no new deps] + [what not to touch]`.

## 4. Prompting an agent to add a NEW AI component

Use this template — it encodes the repo's conventions so the result passes
lint, the catalog guard, and the registry build on the first try:

```text
Add a new AI component called <Name> to this repo (a Next.js 16 + Tailwind 4 +
shadcn/ui registry site).

1. Create src/components/ai-elements/<name>.tsx:
   - "use client", typed props exported as <Name>Props = React.ComponentProps<"div"> & {...}
   - Self-playing animation with autoplay + timing props (default ms), an
     onDone callback, and a reduced-motion path (useReducedMotion → jump to
     the final state, no timers).
   - Strictly monochrome: foreground/muted-foreground/border/secondary only,
     no color states. Add data-slot="<name>" to the root. Use cn() and
     lucide-react icons only.

2. Add a demo to src/components/site/demos/ai-agents.tsx:
   - export function <Name>PascalCaseDemo() using the useReplay() + DemoShell
     helpers, with original scenario copy.

3. Wire the catalog in src/lib/component-registry-ai.ts:
   - const <Name>PascalCaseDemo = fromAgents('<Name>PascalCaseDemo')
   - DEMOS entry: '<name>': <Name>PascalCaseDemo
   - USAGE entry with a minimal import + usage snippet.

4. Registry: append the meta entry to src/registry/ai-elements-meta.json
   (name, title, description, type registry:component, dependencies,
   registryDependencies, files with path registry/default/ai-elements/<name>.tsx
   and target components/ai-elements/<name>.tsx) and generate
   src/registry/ai-elements/<name>.json with the full file content inlined
   (mirror the shape of an existing file, e.g. agent-task-list.json).

5. Add '<name>' to NEW_COMPONENTS in src/lib/component-registry.ts.

Constraints: monochrome palette, framer-motion + lucide-react only (no new
runtime deps), keep every timing a prop, and make the demo copy original.
```

## 5. Design rules every prompt should keep

1. **Monochrome only** — status is communicated with motion (pulse, stagger,
   strikethrough, dim), never with color.
2. **Every timing is a prop** — stageMs, wordMs, taskMs… with sensible
   defaults; demos never hardcode magic numbers.
3. **Reduced motion is a first-class state** — `useReducedMotion()` jumps to
   the settled layout; no infinite loops, no autoplay timers.
4. **Original copy** — demo scenarios are written for Gray UI; do not paste
   third-party marketing or demo text.
5. **Registry honesty** — a component only exists if the meta entry, the
   registry JSON, the demo and the DEMOS guard all agree on the slug.

## 6. Install any of them

```bash
npx shadcn@latest add https://gray-ui.vercel.app/r/agent-reasoning-steps
npx shadcn@latest add https://gray-ui.vercel.app/r/agent-task-list
# …or browse all of them under /components → AI
```
