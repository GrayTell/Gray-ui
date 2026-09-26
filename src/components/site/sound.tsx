'use client'

import type { SoundPatch } from '@web-kits/audio'
import { SoundProvider, usePatch } from '@web-kits/audio/react'
import { useEffect, useRef, useSyncExternalStore } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

import { Button } from '@/components/ui/button'

/**
 * Gray UI interface sounds.
 *
 * A tiny synthesized sound patch (no audio assets) played through a global
 * delegated listener: every interactive component — buttons, toggles, menus,
 * dialogs, sliders, inputs — gets a matching cue automatically based on its
 * `data-slot` / ARIA semantics. Individual elements can opt into a specific
 * cue with `data-sound="<name>"` (e.g. the code-block copy button).
 *
 * Muted state and volume persist in localStorage and sync across tabs.
 */

const STORAGE_KEY = 'gray-sound-muted'
const VOLUME_KEY = 'gray-sound-volume'
const DEFAULT_VOLUME = 0.5

const PATCH = {
  name: 'gray-ui',
  sounds: {
    tap: {
      source: { type: 'sine', frequency: 1300, fm: { ratio: 0.5, depth: 100 } },
      envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.005 },
      gain: 0.2,
    },
    select: {
      source: { type: 'triangle', frequency: { start: 900, end: 780 } },
      envelope: { attack: 0.001, decay: 0.055 },
      gain: 0.26,
    },
    toggleOn: {
      source: { type: 'sine', frequency: { start: 520, end: 880 } },
      envelope: { attack: 0.002, decay: 0.085 },
      gain: 0.3,
    },
    toggleOff: {
      source: { type: 'sine', frequency: { start: 780, end: 420 } },
      envelope: { attack: 0.002, decay: 0.085 },
      gain: 0.28,
    },
    open: {
      source: { type: 'triangle', frequency: { start: 320, end: 620 } },
      filter: { type: 'lowpass', frequency: 2600 },
      envelope: { attack: 0.006, decay: 0.13 },
      gain: 0.24,
    },
    close: {
      source: { type: 'triangle', frequency: { start: 560, end: 300 } },
      filter: { type: 'lowpass', frequency: 2200 },
      envelope: { attack: 0.004, decay: 0.11 },
      gain: 0.22,
    },
    tick: {
      source: { type: 'square', frequency: 1400 },
      filter: { type: 'lowpass', frequency: 3000 },
      envelope: { decay: 0.014 },
      gain: 0.1,
    },
    sliderTick: {
      source: { type: 'triangle', frequency: 1050 },
      filter: { type: 'lowpass', frequency: 2400 },
      envelope: { attack: 0.0004, decay: 0.011 },
      gain: 0.045,
    },
    destructive: {
      layers: [
        {
          source: { type: 'triangle', frequency: { start: 300, end: 170 } },
          filter: { type: 'lowpass', frequency: 1400 },
          envelope: { attack: 0.002, decay: 0.12 },
          gain: 0.32,
        },
        {
          source: { type: 'noise', color: 'brown' },
          filter: { type: 'bandpass', frequency: 700, resonance: 1.1 },
          envelope: { decay: 0.05 },
          gain: 0.06,
        },
      ],
    },
    key: {
      layers: [
        {
          source: { type: 'sine', frequency: { start: 1000, end: 900 } },
          envelope: { attack: 0.001, decay: 0.028 },
          gain: 0.14,
        },
        {
          source: { type: 'noise', color: 'white' },
          filter: { type: 'bandpass', frequency: 3200, resonance: 2 },
          envelope: { decay: 0.01 },
          gain: 0.035,
        },
      ],
    },
    success: {
      layers: [
        {
          source: { type: 'triangle', frequency: 784 },
          envelope: { attack: 0.004, decay: 0.16 },
          gain: 0.22,
        },
        {
          source: { type: 'triangle', frequency: 1175 },
          envelope: { attack: 0.004, decay: 0.22 },
          gain: 0.18,
          delay: 0.075,
        },
      ],
    },
    error: {
      layers: [
        {
          source: { type: 'triangle', frequency: 300 },
          filter: { type: 'lowpass', frequency: 1200 },
          envelope: { attack: 0.003, decay: 0.13 },
          gain: 0.26,
        },
        {
          source: { type: 'triangle', frequency: 224 },
          filter: { type: 'lowpass', frequency: 1000 },
          envelope: { attack: 0.003, decay: 0.2 },
          gain: 0.24,
          delay: 0.09,
        },
      ],
    },
    warning: {
      layers: [
        {
          source: { type: 'triangle', frequency: 622 },
          filter: { type: 'lowpass', frequency: 2800 },
          envelope: { attack: 0.003, decay: 0.14 },
          gain: 0.2,
        },
        {
          source: { type: 'triangle', frequency: 622 },
          filter: { type: 'lowpass', frequency: 2800 },
          envelope: { attack: 0.003, decay: 0.18 },
          gain: 0.17,
          delay: 0.085,
        },
      ],
    },
    copy: {
      layers: [
        {
          source: { type: 'sine', frequency: 1200 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.006 },
          gain: 0.16,
        },
        {
          source: { type: 'sine', frequency: 1400 },
          envelope: { attack: 0, decay: 0.015, sustain: 0, release: 0.006 },
          delay: 0.04,
          gain: 0.14,
        },
      ],
    },
    notification: {
      layers: [
        {
          source: { type: 'triangle', frequency: 523 },
          envelope: { attack: 0.008, decay: 0.3, sustain: 0.03, release: 0.12 },
          gain: 0.14,
        },
        {
          source: { type: 'triangle', frequency: 784 },
          envelope: { attack: 0.008, decay: 0.25, sustain: 0.02, release: 0.1 },
          delay: 0.12,
          gain: 0.12,
        },
      ],
    },
    swoosh: {
      source: { type: 'sine', frequency: { start: 300, end: 2000 } },
      envelope: { attack: 0.008, decay: 0.12, sustain: 0, release: 0.04 },
      gain: 0.12,
    },
    chirp: {
      source: { type: 'sine', frequency: { start: 1200, end: 1500 } },
      envelope: { attack: 0, decay: 0.03, sustain: 0, release: 0.01 },
      gain: 0.08,
    },
    command: {
      layers: [
        {
          source: { type: 'triangle', frequency: { start: 1046, end: 784 } },
          envelope: { attack: 0.001, decay: 0.075 },
          gain: 0.2,
        },
        {
          source: { type: 'sine', frequency: 1568 },
          envelope: { attack: 0.001, decay: 0.045 },
          gain: 0.06,
          delay: 0.018,
        },
      ],
    },
    blocked: {
      source: { type: 'sine', frequency: 180 },
      filter: { type: 'lowpass', frequency: 700 },
      envelope: { attack: 0.004, decay: 0.06 },
      gain: 0.16,
    },
  },
} as const satisfies SoundPatch

export type SoundName = keyof (typeof PATCH)['sounds']

type Cue = { sound: SoundName; detune?: number; velocity?: number }

/** Max per-trigger pitch jitter (±cents) so repeats never feel robotic. */
const JITTER: Record<SoundName, number> = {
  tap: 26,
  select: 22,
  toggleOn: 14,
  toggleOff: 14,
  open: 10,
  close: 10,
  tick: 18,
  sliderTick: 10,
  key: 20,
  destructive: 12,
  blocked: 30,
  chirp: 24,
  command: 8,
  copy: 6,
  notification: 3,
  swoosh: 14,
  success: 5,
  error: 5,
  warning: 5,
}

function jitter(cents: number) {
  return (Math.random() * 2 - 1) * cents
}

type Patch = ReturnType<typeof usePatch>

function play(patch: Patch, cue: Cue) {
  patch.play(cue.sound, {
    detune: (cue.detune ?? 0) + jitter(JITTER[cue.sound]),
    velocity: (cue.velocity ?? 1) * (0.9 + Math.random() * 0.1),
  })
}

const TOGGLE_SLOTS = new Set([
  'switch',
  'checkbox',
  'toggle',
  'toggle-group-item',
  'radio-group-item',
  'context-menu-checkbox-item',
  'context-menu-radio-item',
  'dropdown-menu-checkbox-item',
  'dropdown-menu-radio-item',
  'menubar-checkbox-item',
  'menubar-radio-item',
])

const INTERACTIVE =
  '[data-slot], button, a[href], [role="button"], [role="option"], [role="menuitem"], input[type="checkbox"], input[type="radio"]'

const TEXT_ENTRY =
  'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, [contenteditable]'

const TOGGLE_SELECTOR =
  'input[type="checkbox"], input[type="radio"], [aria-pressed], [role="switch"], [role="menuitemcheckbox"], [role="menuitemradio"]'

function isOn(el: Element) {
  if (el instanceof HTMLInputElement) return el.checked
  return (
    el.getAttribute('aria-checked') === 'true' ||
    el.getAttribute('aria-pressed') === 'true' ||
    el.getAttribute('data-checked') !== null
  )
}

function classify(el: HTMLElement): Cue | null {
  const slot = el.dataset.slot ?? ''

  // Explicit per-element override, e.g. data-sound="copy".
  const named = el.dataset.sound
  if (named && named in PATCH.sounds) return { sound: named as SoundName }

  if (TOGGLE_SLOTS.has(slot) || el.matches(TOGGLE_SELECTOR)) {
    return { sound: isOn(el) ? 'toggleOff' : 'toggleOn' }
  }

  if (el.dataset.variant === 'destructive') return { sound: 'destructive' }
  if (slot.endsWith('-close')) return { sound: 'close' }
  if (slot.endsWith('-clear') || slot.endsWith('-remove')) return { sound: 'chirp' }
  if (slot.endsWith('-trigger')) {
    const expanded = el.getAttribute('aria-expanded')
    if (expanded === null) return { sound: 'select' }
    return { sound: expanded === 'true' ? 'close' : 'open' }
  }
  if (slot.endsWith('-item') || slot.endsWith('-link') || slot.endsWith('-option')) {
    return { sound: 'select', detune: rowPitch(el) }
  }
  if (slot === 'slider-thumb' || slot === 'slider-track') return { sound: 'tick' }
  if (slot === 'button' || el.matches('button, a[href], [role="button"]')) {
    const soft = el.dataset.variant === 'ghost' || el.dataset.variant === 'link'
    return { sound: 'tap', velocity: soft ? 0.78 : 1 }
  }
  return null
}

/** Menu rows rise slightly in pitch down the list. */
function rowPitch(el: HTMLElement) {
  const siblings = el.parentElement?.children
  if (!siblings) return 0
  return Math.min([...siblings].indexOf(el), 7) * 55
}

function soundFor(target: Element, keyed = false): Cue | null {
  const labeled = target.closest('label')?.control ?? target
  if (labeled.closest(TEXT_ENTRY)) return null

  let el = labeled.closest<HTMLElement>(INTERACTIVE)
  while (el) {
    if (el.matches(':disabled, [aria-disabled="true"], [data-disabled]')) {
      return { sound: 'blocked' }
    }
    const cue = classify(el)
    if (cue) return cue
    el = el.parentElement?.closest<HTMLElement>(INTERACTIVE) ?? null
  }
  return null
}

function span(min: number, max: number, value: number) {
  return max === min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min)))
}

function sliderRange(el: HTMLElement) {
  if (el instanceof HTMLInputElement) {
    return {
      min: Number(el.min || 0),
      max: Number(el.max || 100),
      step: Math.abs(Number(el.step)) || 1,
    }
  }
  const read = (name: string, fallback: number) => {
    const value = Number(el.getAttribute(name))
    return Number.isFinite(value) ? value : fallback
  }
  return { min: read('aria-valuemin', 0), max: read('aria-valuemax', 100), step: 1 }
}

function SoundEffectListener() {
  const patch = usePatch(PATCH)
  const muted = useSoundMuted()

  const wasMuted = useRef(muted)
  useEffect(() => {
    const cameBack = wasMuted.current && !muted
    wasMuted.current = muted
    if (cameBack) play(patch, { sound: 'swoosh' })
  }, [muted, patch])

  useEffect(() => {
    if (!patch.ready) return

    const TICK_GAP_MS = 28
    const TICK_LAG_MS = 60
    const DRAG_SLOP_PX = 3

    let grab: { x: number; y: number; dragged: boolean } | null = null
    let nextTickAt = 0
    const queued = new Set<ReturnType<typeof setTimeout>>()

    const stopTicking = () => {
      for (const timer of queued) clearTimeout(timer)
      queued.clear()
      nextTickAt = 0
    }

    // Slider ratchet: one tick per step crossed, capped at TICK_GAP_MS.
    const tick = (detune: number, now: number) => {
      if (nextTickAt - now > TICK_LAG_MS) return false
      const wait = nextTickAt - now
      nextTickAt += TICK_GAP_MS
      const cue = { sound: 'sliderTick', detune } as const
      if (wait <= 0) {
        play(patch, cue)
        return true
      }
      const timer = setTimeout(() => {
        queued.delete(timer)
        play(patch, cue)
      }, wait)
      queued.add(timer)
      return true
    }

    const ratchet = (el: HTMLElement, from: number, to: number) => {
      const { min, max, step } = sliderRange(el)
      const crossed = Math.round(Math.abs(to - from) / step)
      if (!Number.isFinite(crossed) || crossed < 1) return

      const now = performance.now()
      nextTickAt = Math.max(nextTickAt, now)
      const direction = Math.sign(to - from)
      for (let i = 1; i <= crossed; i++) {
        const value = from + direction * step * i
        if (!tick(span(min, max, value) * 900, now)) break
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0 || !(event.target instanceof Element)) return
      const cue = soundFor(event.target)
      if (!cue) return
      if (cue.sound === 'tick') grab = { x: event.clientX, y: event.clientY, dragged: false }
      play(patch, cue)
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      if (event.repeat || !(event.target instanceof Element)) return
      if (event.target.matches(TEXT_ENTRY)) return
      const cue = soundFor(event.target)
      if (cue) play(patch, cue)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!grab || grab.dragged) return
      if (Math.hypot(event.clientX - grab.x, event.clientY - grab.y) > DRAG_SLOP_PX)
        grab.dragged = true
    }

    const onPointerUp = () => {
      if (grab) stopTicking()
      grab = null
    }

    const onContextMenu = () => play(patch, { sound: 'open' })

    const onInput = (event: Event) => {
      if (!event.isTrusted) return
      const el = event.target
      if (!(el instanceof HTMLInputElement) || !el.closest('[data-slot="input-otp"]')) return
      const deleting = (event as InputEvent).inputType?.startsWith('delete') ?? false
      play(patch, { sound: 'key', detune: el.value.length * 45 - (deleting ? 260 : 0) })
    }

    // State changes that happen without a pointer event: form validation
    // (aria-invalid), async success flags (data-success), slider drags
    // (aria-valuenow on native range inputs and Radix sliders).
    const observer = new MutationObserver((records) => {
      let slid = false
      for (const record of records) {
        const el = record.target
        if (!(el instanceof HTMLElement)) continue
        const value = el.getAttribute(record.attributeName ?? '')
        const entered = value !== null && value !== 'false' && value !== record.oldValue

        switch (record.attributeName) {
          case 'aria-valuenow': {
            if (slid || !el.matches('input[type="range"], [role="slider"]')) break
            if (value === null || record.oldValue === null) break
            if (grab && !grab.dragged) break
            slid = true
            if (grab) {
              ratchet(el, Number(record.oldValue), Number(value))
              break
            }
            const { min, max } = sliderRange(el)
            const now = performance.now()
            nextTickAt = Math.max(nextTickAt, now)
            tick(span(min, max, Number(value)) * 900, now)
            break
          }
          case 'data-success': {
            if (entered) play(patch, { sound: 'success' })
            break
          }
          case 'aria-invalid': {
            if (entered) play(patch, { sound: 'error' })
            break
          }
          default:
            break
        }
      }
    })

    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['aria-valuenow', 'aria-invalid', 'data-success'],
    })

    document.addEventListener('pointerdown', onPointerDown, true)
    document.addEventListener('pointermove', onPointerMove, true)
    document.addEventListener('pointerup', onPointerUp, true)
    document.addEventListener('pointercancel', onPointerUp, true)
    document.addEventListener('keydown', onKeyDown, true)
    document.addEventListener('contextmenu', onContextMenu, true)
    document.addEventListener('input', onInput, true)
    return () => {
      observer.disconnect()
      stopTicking()
      document.removeEventListener('pointerdown', onPointerDown, true)
      document.removeEventListener('pointermove', onPointerMove, true)
      document.removeEventListener('pointerup', onPointerUp, true)
      document.removeEventListener('pointercancel', onPointerUp, true)
      document.removeEventListener('keydown', onKeyDown, true)
      document.removeEventListener('contextmenu', onContextMenu, true)
      document.removeEventListener('input', onInput, true)
    }
  }, [patch])

  return null
}

// ———————————————————————————————————————————————————————————— persisted state

const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  window.addEventListener('storage', onChange)
  return () => {
    listeners.delete(onChange)
    window.removeEventListener('storage', onChange)
  }
}

function notify() {
  for (const onChange of listeners) onChange()
}

export function setSoundMuted(muted: boolean) {
  localStorage.setItem(STORAGE_KEY, muted ? '1' : '0')
  notify()
}

export function useSoundMuted() {
  return useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(STORAGE_KEY) === '1',
    () => false,
  )
}

export function setSoundVolume(volume: number) {
  localStorage.setItem(VOLUME_KEY, String(volume))
  notify()
}

export function useSoundVolume() {
  return useSyncExternalStore(
    subscribe,
    () => {
      const stored = Number(localStorage.getItem(VOLUME_KEY))
      return Number.isFinite(stored) && stored > 0 && stored <= 1 ? stored : DEFAULT_VOLUME
    },
    () => DEFAULT_VOLUME,
  )
}

// —————————————————————————————————————————————————————————————————— provider

export function SoundEffects({ children }: { children: React.ReactNode }) {
  const muted = useSoundMuted()
  const volume = useSoundVolume()

  return (
    <SoundProvider enabled={!muted} volume={volume}>
      <SoundEffectListener />
      {children}
    </SoundProvider>
  )
}

// ———————————————————————————————————————————————————————————————————— toggle

export function SoundToggle({ className }: { className?: string }) {
  const muted = useSoundMuted()

  return (
    <Button
      variant="ghost"
      size="icon"
      data-sound="swoosh"
      aria-label={muted ? 'Unmute interface sounds' : 'Mute interface sounds'}
      aria-pressed={muted}
      onClick={() => setSoundMuted(!muted)}
      className={`group/toggle extend-touch-target size-8 ${className ?? ''}`}
    >
      {muted ? (
        <VolumeX className="size-4.5" aria-hidden="true" />
      ) : (
        <Volume2 className="size-4.5" aria-hidden="true" />
      )}
      <span className="sr-only">{muted ? 'Unmute sounds' : 'Mute sounds'}</span>
    </Button>
  )
}
