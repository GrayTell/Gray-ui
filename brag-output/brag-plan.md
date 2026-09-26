# Brag Plan: Gray UI

## What is this app?
Gray UI is a shadcn-style component registry for React/Next.js — 168 monochrome UI components plus 60 Vercel AI Elements (228 total), every one delivered as copy-paste source code you own, in a strict grayscale design system by Graytell Labs (owned by Anubhav Sapkota).

## The angle
The video obeys the product's own law: **strict monochrome**. Not one colored pixel appears in 60 seconds — the brag is that it doesn't need color. A polished, typographic "product film" where grayscale *is* the flex: black on white, cards sliding in shades of gray, a terminal doing real work, a dark-mode flip. The design system is the art direction.

## Hook (first 6 seconds)
Black frame. A thin gray rule draws across. Count-up statements land one at a time: **"168 components." → "60 AI elements." → "0 colors."** — beat — **"1 backbone."** The "0 colors" line is the joke and the claim in one. Title slams in after.

## Key moments (the middle)
- A real terminal types `npx gray-ui@latest add date-picker` character-by-character with keypress sounds → install check → the working date-picker card drops into a browser frame.
- Three live dashboard cards (Payments, Savings Targets, Contribution Chart) slide in one by one — "rendered in shades of gray only," the chart bars rise.
- An AI chat mock: prompt input types, Reasoning block expands, message streams — "AI elements, pre-themed."
- The full scene radial-wipes light→dark: same cards, re-skinned instantly. "One toggle. Every component adapts."

## Outro / punchline
Stat slams on music beats — **228 components · 100% source code · MIT** — then the GRAY UI wordmark, `gray-ui.vercel.app`, and the ownership line: "Graytell Labs — owned by Anubhav Sapkota." Bell rings once over the fading music.

## User flow worth showing
Registry → key action → result:
1. Run `npx gray-ui@latest add date-picker` in the terminal (entry + key action)
2. Component installs — check mark (result)
3. The working date-picker sits inside a real app frame, interactive (proof)

Second flow: theme toggle flips the entire system light→dark with all components adapting.

## Tone
- Preset: `polished`
- Creative direction: "A monochrome product film — precise, typographic, engineered. The video itself obeys the design system."
- Interpretation: Longer holds than usual, restrained motion, soft crossfades and slow wipes, generous negative space, zero decorative color, typography does the heavy lifting. Pace comes from confident cuts, not flash.

## Format: landscape — 1920x1080
## Duration: 60 seconds (explicit user request; overrides the 15-25s default)

## Visual identity (from the project)
- Background (light): `oklch(1 0 0)` → **#ffffff**; ink: `oklch(0% 0 0)` → **#000000**
- Background (dark): `oklch(0.145 0 0)` → **#232323** (oklch 0.145 ≈ #212121 range); dark ink: `oklch(0.985 0 0)` ≈ **#fafafa**
- Grays in use: borders `#ebebeb` (0.922), muted text `#8a8a8a` (0.556), chart ramp 0.205/0.37/0.556/0.708
- Accent: **none — the absence of accent is the accent.** Destructive red exists in the system but stays offscreen.
- Display font: **Geist** (700/900) — matches the site's heading font
- Body font: **Geist** (400/500); code: **Geist Mono**
- Strongest visual element: the 64px grid backdrop + monochrome dashboard cards (payments, savings targets, contribution chart) + terminal install command

## Share copy (draft)
Gray UI is a component registry in strict monochrome — 228 React components, shadcn-style plus all Vercel AI Elements, shipped as source code you own. No colors. No noise. Just the backbone of your design system.

## Audio direction
- Role: warm, steady bed + sparse professional accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean — the polished pick), from 0s, volume 0.32, fade-in 0.5s, fade-out over the final 2s under the outro bell
- Music treatment: straight bed at 0.30-0.32; duck nothing (no voiceover); let `impactBell_heavy_000` ring over the fade at the end
- Music cue guidance: bundled preset `assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json` (109.96 BPM) covers 0-25s; for the full 60s grid run `npx hyperframes beats` at composition time. Strong cues in window: 8.74s, 13.11s, 17.47s, 18.56s, 22.93s, 24.56s. Target locks: title slam ≈ 8.74s, stat slams in the outro grid. Beyond 25s: highest-strength beats from the `beats` file.
- Audio-reactive treatment: subtle; bass RMS breathes the grid-backdrop glow and hero card presence; treble adds a faint textShadow lift to the active headline. No waveform/equalizer visuals.
- SFX posture: sparse, motion-matched, professional restraint (polished)
- Audio-coupled moments: terminal typing (randomized keypress WAVs), card landings (drop_001), toggle click (mouseclick1), logo reveal (bong_001 / impactBell_heavy_000), stat slams (impactSoft_medium_000 at low volume)
- Restraint rule: audio never calls attention to itself; no SFX during the quiet reading holds; the final bell is the loudest moment in the film

## Storyboard

### Scene 1 — Hook: the count — 6s (0:00-0:06)
Black. A 1px gray rule draws left→right across center. Text lines land one at a time, left-aligned to the rule: "168 components." (0.8s hold) → "60 AI elements." → "0 colors." (slightly longer — the line the viewer remembers) → cut.
Sequential/interaction: yes — three lines arrive on consecutive downbeats.
Audio intent: sparse; music fades in underneath, first tick lands with line 2.
Audio-coupled idea: each line arrival gets a soft drop_001 at ~0.5 volume; nothing on line 1 (it starts naked).
Music: vol-12 fading in from silence.
Transition mood: hard cut → Scene 2.

### Scene 2 — Title: the backbone — 6s (0:06-0:12)
The rule becomes the baseline. "GRAY UI" wordmark scales in with a slow settle (0.9s power4.out), tagline "The Backbone of Your Design System" fades up beneath, "A component registry by Graytell Labs" in muted gray under it. Grid backdrop breathes in faintly behind.
Sequential/interaction: none.
Audio intent: warm reveal; one soft bong under the wordmark landing (beat-locked ≈ 8.74s strong cue).
Audio-coupled idea: wordmark scale lands on the 8.74s strong cue (±0.15s).
Music: bed fully in.
Transition mood: soft crossfade → Scene 3.

### Scene 3 — Terminal: the install — 9s (0:12-0:21)
A real terminal window (dark #171717 chrome, mono type). Prompt line: `npx gray-ui@latest add date-picker` types character-by-character with randomized keypress sounds (~12 chars/s). Beat of silence → spinner → `✓ Installed 1 component — date-picker` prints. The line stays; terminal holds.
Sequential/interaction: yes — simulated typing, then install output.
Audio intent: the busiest SFX scene; typing feels real, then quiet.
Audio-coupled idea: per-character keypress WAVs, randomized across the 10-file set; completion gets click_002.
Music: bed continues.
Transition mood: clean wipe → Scene 4.

### Scene 4 — Result: the component works — 8s (0:21-0:29)
The terminal shrinks to a top strip; a browser frame fills the frame containing the working date-picker card (calendar grid, month header, a selected day). Caption below in display type: "Copy the command. Keep the component." Sub-line in muted gray: "Every piece arrives as source code you own."
Sequential/interaction: yes — calendar days pop in staggered; one day gets "selected" (fills black, check).
Audio intent: gentle; one drop_001 when the calendar lands.
Audio-coupled idea: calendar day stagger aligned to beat grid (every other beat).
Music: bed continues.
Transition mood: soft crossfade → Scene 5.

### Scene 5 — Dashboard cards: shades of gray — 9s (0:29-0:38)
Three monochrome dashboard cards slide up in sequence across the frame: **Payments** (amount + trend), **Savings Targets** (progress arcs/bars), **Contribution Chart** (bar chart whose bars rise to full height). Caption card top-left: "Rendered in shades of gray only."
Sequential/interaction: yes — card-by-card arrival; chart bars rise after their card lands.
Audio intent: rhythm section — each card arrival is a beat; the chart rise is the swell.
Audio-coupled idea: card 1/2/3 land on consecutive beats (±0.10s); bars rise on the next 4 beats.
Music: bed continues, mid-section energy.
Transition mood: soft crossfade → Scene 6.

### Scene 6 — AI elements — 8s (0:38-0:46)
A chat mock on the same grid backdrop: prompt input types "Summarize this registry." → a Reasoning block expands ("Reading 228 components… matching your design system…") → the assistant message streams in. Component name labels ("PromptInput", "Reasoning", "Conversation") float beside each part in mono type.
Sequential/interaction: yes — typed prompt, expanding reasoning, streaming reply.
Audio intent: quieter than Scene 3; typing here is soft, streaming is silent.
Audio-coupled idea: prompt typing gets 4-6 quiet keypresses; reasoning expansion gets one drop_001.
Music: bed continues.
Transition mood: clean wipe → Scene 7.

### Scene 7 — Dark mode flip — 7s (0:46-0:53)
The Payments card returns, now inside a settings row with a theme switch. A cursor reaches it, clicks (mouseclick1) — a radial wipe from the switch floods the whole scene dark: every element re-skins (white ink, #212121 surfaces, gray borders intact). Caption: "One toggle. Every component adapts."
Sequential/interaction: yes — simulated cursor click on the switch, radial dark wipe.
Audio intent: the single most satisfying moment; one click, then bass lets the wipe land.
Audio-coupled idea: mouseclick1 exactly at click; nothing else — let the wipe carry.
Music: bed continues.
Transition mood: the wipe IS the transition → Scene 8.

### Scene 8 — Stats: the proof — 5s (0:53-0:58)
Three stat blocks slam in on three consecutive strong beats, center-aligned: **228** components · **100%** source code · **MIT** licensed. Numbers in 900-weight Geist; labels muted.
Sequential/interaction: yes — three slams on beat-grid high-strength points.
Audio intent: percussive, short.
Audio-coupled idea: impactSoft_medium_000 at low volume under each slam, beat-locked.
Music: bed continues.
Transition mood: hard cut → Scene 9.

### Scene 9 — Outro: the wordmark — 2.8s (0:58-1:00.8)
BLACK background (true dark). GRAY UI wordmark fades up, `gray-ui.vercel.app` in mono beneath, then the ownership line: "Graytell Labs — owned by Anubhav Sapkota." Music fades out; one bell rings and decays into the last second.
Sequential/interaction: none.
Audio intent: resolution; the bell is the loudest moment, then silence.
Audio-coupled idea: impactBell_heavy_000 at ~0.8 volume at wordmark land.
Music: fades to 0 by 60.5s; bell rings over the fade.

**Music mood for this video:** steady, clean, corporate-polished
**Audio summary:** A quiet typographic open grows into a steady bed that carries typing, card rhythms and one satisfying dark-mode click, then resolves on a single bell over silence.
