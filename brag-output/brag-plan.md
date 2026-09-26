# brag-plan.md — Gray UI × the Opus 5.5 launch film

**Skill:** /brag-slim (latent-spaces/brag) · **Deliverable:** `gray.mp4` · **Format:** 1920×1080 @ 24fps · **Duration:** 22.0s

## What the user asked for

"One more using brag, but make it like the Claude Opus 5.5 launch — see the video — and name it gray.mp4."

The reference video (analyzed frame-by-frame) is the Anthropic Opus 5.5 launch film:

- Extreme macro / analog **"horizon arc" shots** — Earth's limb at dusk, watermelon flesh,
  ancient pottery rim, trilobite fossil, a vintage scientific diagram — each composed as a
  dark upper two-thirds with a glowing curved arc low in frame.
- A single **serif word** appears above the arc, one at a time ("There's" … "discover" … "Opus 5.5"),
  cut on the word across shots.
- Slow dissolves, heavy film grain, calm pacing, ends back on the horizon.

## The product

**Gray UI** — open-source React component registry (shadcn-style), copy-paste components,
CLI install (`npx gray-ui@latest add <component>`). By Anubhav Sapkota (Graytell Labs).
Identity: strict monochrome gray, Geist Sans/Mono, radius 0.625rem.

## Angle

Give Gray UI the exact cinematic treatment Anthropic gives Opus: the macro arcs become
**Gray UI's own components photographed edge-on** — a card corner like a planet limb,
a toggle thumb rising like a moon, a date-picker panel edge with focus-ring ripples.
Monochrome silver instead of Anthropic's warmth, because Gray UI *is* gray. The words
carry the story; the end card does the explaining (what it is + real install command + credit).

**Script (cut on the word, like the ref):** "There's · a moment · every builder · knows. · Gray UI"

## Answers

- **What is it?** An open-source React component library you copy, paste and ship.
- **Who for / what for?** Builders who want polished UI without fighting a design system.
- **Set apart?** Monochrome, dependency-light shadcn-style registry with a real CLI.
- **Best claim?** "There's a moment every builder knows" — the calm relief of UI that just works.
- **Visual hook?** Opus-film macro arcs made of the actual components.
- **Real UI shown?** Card corner, Toggle, Calendar/date-picker, CLI typing — all real shadcn
  token styling (radius 10px, borders, Geist), rendered in-frame, not screenshots.
- **Tone?** `cinematic` preset filtered through the reference film: quiet, restrained, filmic.
- **Share caption?** see `share-copy.txt`.

## Storyboard (22.0s @ 24fps = 528 frames, 1920×1080)

| # | Time | Word / action | Visual | Sound |
|---|------|---------------|--------|-------|
| S1 | 0.00–2.80 | "There's" | Near-black; a silver-gray horizon arc (soft gradient limb) low in frame, barely rising; grain | Pad swell (D), soft pluck D3 |
| S2 | 2.80–5.60 | "a moment" | Macro **Card** corner — real shadcn card edge-lit silver, huge rounded corner as an arc, slow drift | Pad, pluck A3 |
| S3 | 5.60–8.40 | "every builder" | Macro **Toggle** — thumb as rising moon curve; it clicks ON at ~6.9s, rim light blooms | Pad, pluck F#3, switch SFX |
| S4 | 8.40–11.20 | "knows." | Macro **Calendar** panel edge; a focus-ring ripple (concentric arcs) expands as a date selects | Pad, pluck B3, click SFX |
| S5 | 11.20–14.20 | "Gray UI" | Dip to pure dark; serif wordmark scales in 1.00→1.015, holds settled | Impact-soft, chord swell |
| S6 | 14.20–22.00 | end card | Wordmark holds; tagline "Open-source React components. Copy. Paste. Ship."; CLI types `npx gray-ui@latest add date-picker` (15.4–17.2s); credit "Graytell Labs · by Anubhav Sapkota"; master fade 20.8→22.0 | Pad bloom, keypress SFX |

Dissolves: staggered dips through black between macros (0.5s out / 0.5s in — no muddy
double-exposure), longer 1.2s dissolve into S5. Words obey the readability law: each line
visible ≥2s settled (~0.3s+ per word).

## Creative-law checklist

- **Short:** 22s ✓ · **Clear to a stranger:** end card states what/who + real command ✓
- **Hook:** word "There's" over a rising silver limb in the first 2s ✓
- **Show the thing:** real component CSS, real CLI text, real credit ✓
- **Specific:** builder-focused line, actual registry name/command, no SaaS-speak ✓
- **Alive:** arcs drift, toggle clicks, ripples expand, CLI types ✓
- **Every frame postable:** grain + vignette + rim light on every frame ✓

## Build & render

1. `work/frame.html` — deterministic frame renderer, pure function of `?t=SECONDS`;
   fonts loaded via `document.fonts.ready` before capture.
2. `work/capture.js` — Playwright (Chromium) screenshots 528 PNGs at 1920×1080.
3. Stills check (every scene + mid-transition) → fix → render.
4. `work/audio.js` — additive-synthesis score (Dmaj9 pad + piano-ish plucks, 44.1kHz WAV)
   mixed with brag-bundled Kenney SFX (toggle, click, keypresses, soft impact) via ffmpeg.
5. `ffmpeg` → `gray.mp4` (libx264 crf17, yuv420p, faststart, AAC 192k) + `gray.jpg` poster
   (settled end-card frame) + `share-copy.txt`.

Music: original procedural score in D major (the bundled "Happy Beats" tracks clash with
the reference's calm film mood); SFX: Kenney via the brag skill, same-key, low-gain blend.

---

## v2 edit — "exactly like the Opus 5.5 film" (user steering)

User asked for a new edit that recreates the reference film faithfully rather than adapting it.
Reference was re-analyzed: scene detection found ~25 fast cuts in 20s — a wordless organic
montage for the first half, then words only in the back half ("There's" 8.5s → "more to"
10.5s → "discover" 12.5s → "Opus 5.5" 16.3s → logo lockup 17.4s → dusk limb finale).
ASR on the reference audio returned empty text → the film is music-only, no voiceover.

v2 structure (20.0s @ 24fps, 1920×1080), matching the ref beat-for-beat:
- 0.0–8.6s: 8-shot wordless montage of warm organic "arc" plates (dusk limb, coral rim,
  watermelon, blueprint dome, honey, stem cells, magenta droplets, cracked sphere), 0.3s dissolves
- 8.6–15.85s: "There's" / "more to" / "discover" in Source Serif over matched plates,
  words persisting across cuts, color adapting (cream on dark, near-black on cream)
- 15.85–19.3s: "Gray UI" reveal on night sky with faint blue limb glow → "◆ Gray UI" lockup
- 19.3–20.0s: dusk limb finale

Plates: 13 AI-generated 1344×768 images (image-generation skill), re-rolled where composition
missed; agate shot rotated −78° with scale ≥1.92 so the rotated plate covers the frame.
Score: original 20s piano-led piece in D (score2.wav, audio2.js) — no SFX, no VO, like the ref.
Deliverable: gray.mp4 (v1 silver adaptation archived as work/gray-v1-silver.mp4).
