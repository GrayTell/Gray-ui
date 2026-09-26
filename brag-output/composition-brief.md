# Hyperframes Composition Brief: Gray UI

## Objective
Create a 60-second launch-style brag video for Gray UI — a monochrome component registry — in a strict-grayscale "product film" style where the video itself obeys the product's design system.

## Output
- Composition directory: `/home/z/my-project/brag-output/composition/`
- Rendered video: `/home/z/my-project/brag-output/brag.mp4`
- Format: landscape — 1920x1080
- Duration: **60 seconds** (explicit user request — this overrides brag's default 15-25s)

## Source Material
- Project root: `/home/z/my-project` (Gray UI, Next.js 16 + Tailwind 4 site)
- Primary files read: `src/lib/site.ts`, `src/app/page.tsx`, `src/app/globals.css`, `src/components/site/hero.tsx`, `src/components/site/cards/*`, `package.json`
- Product name: Gray UI
- Tagline / strongest claim: "The Backbone of Your Design System" — 168 components + 60 AI elements = 228, all copy-paste source code you own
- Key UI or visual moment to recreate: terminal install flow → working date-picker card → monochrome dashboard cards (Payments, Savings Targets, Contribution Chart) → AI chat mock → dark-mode flip
- Copy that must appear verbatim:
  - "The Backbone of Your Design System"
  - "npx gray-ui@latest add date-picker"
  - "Rendered in shades of gray only."
  - "One toggle. Every component adapts."
  - "Graytell Labs — owned by Anubhav Sapkota"
  - "gray-ui.vercel.app"

## Creative Direction
- Tone preset: `polished`
- Creative direction: "A monochrome product film — precise, typographic, engineered. The video itself obeys the design system."
- Interpretation: longer holds, restrained motion, soft crossfades, generous negative space, zero decorative color; typography carries the film; pace from confident cuts not flash
- Angle: the brag is that 60 seconds of video contain not a single colored pixel — the absence of accent is the accent
- Hook: three count-up lines on black — "168 components." / "60 AI elements." / "0 colors." — then "1 backbone." implied by the title slam
- Outro / punchline: stat slams (228 · 100% · MIT) → wordmark + domain + ownership line, bell over fading music
- Avoid:
  - Generic SaaS language
  - Abstract filler visuals
  - Any saturated color anywhere (charts stay gray; destructive red never appears)
  - Unrelated visual redesign

## Visual Identity
- Background (light scenes): #ffffff; ink #000000
- Background (dark scenes): #212121 (oklch 0.145); dark ink #fafafa
- Grays: border #ebebeb, muted text #8a8a8a, chart ramp #343434/#5e5e5e/#8a8a8a/#b3b3b3 approximations of oklch 0.205/0.37/0.556/0.708
- Terminal chrome: #171717 bg, #fafafa text, gray title dots
- Display font: Geist 700/900 (local `assets/fonts/geist-*.woff2`, declare `@font-face` in-file)
- Body font: Geist 400/500; code: Geist Mono 400/500/700 (local `assets/fonts/geist-mono-*.woff2`)
- Visual references from the project: 64px grid backdrop (1px lines at 45% border color), rounded-lg cards (10px radius), muted badge pills, dashboard card typography

## Storyboard
Use the storyboard in `/home/z/my-project/brag-output/brag-plan.md` as the creative contract. 9 scenes:

1. Hook: the count — 6s — three lines land on beats; "0 colors." is the memory line
2. Title: the backbone — 6s — GRAY UI wordmark + tagline; beat-lock ≈ 8.74s
3. Terminal: the install — 9s — typed `npx gray-ui@latest add date-picker` + install check
4. Result: the component works — 8s — browser frame, working calendar, staggered days
5. Dashboard cards: shades of gray — 9s — Payments / Savings Targets / Contribution Chart slide in on beats; bars rise
6. AI elements — 8s — typed prompt, expanding Reasoning, streaming reply, floating mono labels
7. Dark mode flip — 7s — cursor clicks switch (mouseclick1), radial wipe floods scene dark
8. Stats: the proof — 5s — 228 / 100% / MIT slam on strong beats
9. Outro — 2.8s — wordmark + domain + "Graytell Labs — owned by Anubhav Sapkota"; bell

Scene sum = 60.8s; author root `data-duration="60.8"` and keep every clip inside it.

## Audio
- Audio role: warm steady bed + sparse professional accents
- Audio arc: fades in over the naked hook, steady through the middle, dies under the final bell
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`, `data-start="0"`, volume 0.32, fade-in 0.5s, fade-out across the final ~2.5s (59.5s → 62s of track time)
- Music cue guidance: bundled preset at `/tmp/brag-skill/skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (109.96 BPM; strong cues 8.74 / 13.11 / 17.47 / 18.56 / 22.93 / 24.56 within 0-25s). For the full 60s grid run `npx hyperframes beats /home/z/my-project/brag-output/composition` after wiring audio and use highest-strength beats for scenes 5-8 locks. Readability wins over any cue.
- Audio-reactive treatment: subtle; pre-extract per-frame bands with `~/.claude/skills/hyperframes-creative/scripts/extract-audio-data.py` into the composition, then bass (bands[0]) breathes the grid-backdrop glow and card presence; treble adds faint textShadow to active headlines only. No equalizer/waveform visuals.
- Audio-coupled moments:
  - Scene 2 wordmark — beat-locked scale settle (±0.15s of a strong cue)
  - Scene 3 terminal — randomized keypress WAVs per typed char; click_002 at install check
  - Scene 4 calendar — day stagger on every-other-beat (±0.10s); drop_001 at card land
  - Scene 5 cards — three arrivals on consecutive beats (±0.10s), chip of impactSoft at most
  - Scene 6 — 4-6 quiet keypresses; drop_001 on reasoning expand
  - Scene 7 — mouseclick1 exactly at switch click
  - Scene 8 — three slams on high-strength beats, impactSoft_medium_000 at ≤0.5 volume
  - Scene 9 — impactBell_heavy_000 at ~0.8 volume, rings over the music fade
- SFX selection guidance: polished restraint; low HF-risk files; never more than one SFX per beat
- SFX analysis guidance: `/tmp/brag-skill/skills/brag/assets/sfx/sfx-analysis.md`
- Exact SFX choice: Hyperframes chooses filenames/timestamps/density from the files already copied under `assets/sfx/` (keyboard ×10, interface: bong_001/drop_001/click_002, impact: impactBell_heavy_000/impactSoft_medium_000, ui: mouseclick1)
- Audio files: already copied into `composition/assets/` (music + sfx). Fonts already in `composition/assets/fonts/`.

## Hyperframes Instructions
Load and follow `hyperframes-core`, `hyperframes-animation`, `hyperframes-creative`, `hyperframes-keyframes`, `hyperframes-cli` (installed at `~/.claude/skills/`). `/brag` owns positioning/copy/tone; Hyperframes owns composition structure, exact timing, animation mechanics, runtime, lint/render workflow. Prefer native Hyperframes conventions over anything in `/brag`.

Requirements:
- Standalone composition: single `index.html`, root `<div id="root" data-composition-id="gray-brag" data-width="1920" data-height="1080" data-duration="60.8">`, no `<template>` wrapper
- Show real product material: terminal command, calendar component, dashboard cards, chat mock — no abstract filler
- All text readable: reading-time floors per scene (0.8s label / 0.3s per word sentence)
- Monochrome only — every hex in the file must be a gray (R=G=B); WCAG contrast must pass `check`
- Include the music/SFX layer as specified; audio-reactive sampling via `tl.call()` per-frame loop on the same paused timeline
- `@font-face` in-file for every named font family, pointing at shipped local woff2 files (avoids `font_family_without_font_face`)
- Determinism: no `Math.random()` (seed the keystroke-file choice), no `Date.now()`, no `repeat: -1`, no CSS-transform + GSAP-transform conflicts, no tweening `.clip` visibility, one paused GSAP timeline registered as `window.__timelines["gray-brag"]`
- Every `<audio>` needs an `id`; unique `data-track-index` per overlapping audio (music 10, SFX 11+)
- Run `npx hyperframes check` before render — brag's single gate
