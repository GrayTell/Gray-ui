'use client'

import '@xyflow/react/dist/style.css'

import * as React from 'react'
import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  type Connection as ReactFlowConnection,
  type Edge as ReactFlowEdge,
  type Node as ReactFlowNode,
  type NodeProps,
} from '@xyflow/react'
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BoxIcon,
  CheckIcon,
  ChevronsUpDownIcon,
  CopyIcon,
  FeatherIcon,
  GemIcon,
  PlusIcon,
  RotateCcwIcon,
  RotateCwIcon,
  SparklesIcon,
  Trash2Icon,
  WorkflowIcon,
  type LucideIcon,
} from 'lucide-react'

import { Attachments, Attachment, AttachmentEmpty, AttachmentInfo, AttachmentPreview, AttachmentRemove, type AttachmentData } from '@/components/ai-elements/attachments'
import { AudioPlayer, AudioPlayerControlBar, AudioPlayerDurationDisplay, AudioPlayerElement, AudioPlayerMuteButton, AudioPlayerPlayButton, AudioPlayerSeekBackwardButton, AudioPlayerSeekForwardButton, AudioPlayerTimeDisplay, AudioPlayerTimeRange, AudioPlayerVolumeRange } from '@/components/ai-elements/audio-player'
import { Canvas } from '@/components/ai-elements/canvas'
import { Checkpoint, CheckpointIcon, CheckpointTrigger } from '@/components/ai-elements/checkpoint'
import { Connection as ConnectionLine } from '@/components/ai-elements/connection'
import { Controls } from '@/components/ai-elements/controls'
import { Edge } from '@/components/ai-elements/edge'
import { Image } from '@/components/ai-elements/image'
import { InlineCitation, InlineCitationCard, InlineCitationCardBody, InlineCitationCardTrigger, InlineCitationCarousel, InlineCitationCarouselContent, InlineCitationCarouselHeader, InlineCitationCarouselIndex, InlineCitationCarouselItem, InlineCitationCarouselNext, InlineCitationCarouselPrev, InlineCitationQuote, InlineCitationSource, InlineCitationText } from '@/components/ai-elements/inline-citation'
import { MicSelectorContent, MicSelectorEmpty, MicSelectorInput, MicSelectorItem, MicSelectorLabel, MicSelectorList, MicSelectorTrigger } from '@/components/ai-elements/mic-selector'
import { ModelSelector, ModelSelectorContent, ModelSelectorEmpty, ModelSelectorGroup, ModelSelectorInput, ModelSelectorItem, ModelSelectorList, ModelSelectorName, ModelSelectorSeparator, ModelSelectorShortcut, ModelSelectorTrigger } from '@/components/ai-elements/model-selector'
import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from '@/components/ai-elements/node'
import { type PersonaState } from '@/components/ai-elements/persona'
import { Panel } from '@/components/ai-elements/panel'
import { SpeechInput } from '@/components/ai-elements/speech-input'
import { Source, Sources, SourcesContent, SourcesTrigger } from '@/components/ai-elements/sources'
import { Toolbar } from '@/components/ai-elements/toolbar'
import { Transcription, TranscriptionSegment } from '@/components/ai-elements/transcription'
import { useVoiceSelector, VoiceSelector, VoiceSelectorAccent, VoiceSelectorAge, VoiceSelectorAttributes, VoiceSelectorBullet, VoiceSelectorContent, VoiceSelectorDescription, VoiceSelectorEmpty, VoiceSelectorGender, VoiceSelectorGroup, VoiceSelectorInput, VoiceSelectorItem, VoiceSelectorList, VoiceSelectorName, VoiceSelectorPreview, VoiceSelectorTrigger } from '@/components/ai-elements/voice-selector'
import { WebPreview, WebPreviewBody, WebPreviewConsole, WebPreviewNavigation, WebPreviewNavigationButton, WebPreviewUrl } from '@/components/ai-elements/web-preview'

import { Button } from '@/components/ui/button'
import { Popover } from '@/components/ui/popover'

/* ------------------------------------------------------------------ */
/* Static assets                                                       */
/* ------------------------------------------------------------------ */

const SILENT_WAV =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='

// Monochrome "generated artwork" encoded inline so the demo never touches
// the network: zinc gradient, concentric rings and a stepped gray ramp.
const GENERATED_IMAGE_BASE64 =
  'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjQwIDQwMCI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjM2YzZjQ2Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDkwOTBiIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjY0MCIgaGVpZ2h0PSI0MDAiIGZpbGw9InVybCgjZykiLz48Y2lyY2xlIGN4PSIzMjAiIGN5PSIxNzYiIHI9IjEyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmFmYWZhIiBzdHJva2Utb3BhY2l0eT0iLjMiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE3NiIgcj0iODAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZhZmFmYSIgc3Ryb2tlLW9wYWNpdHk9Ii41IiBzdHJva2Utd2lkdGg9IjIiLz48Y2lyY2xlIGN4PSIzMjAiIGN5PSIxNzYiIHI9IjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmYWZhZmEiIHN0cm9rZS1vcGFjaXR5PSIuNzUiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjMyMCIgY3k9IjE3NiIgcj0iMTAiIGZpbGw9IiNmYWZhZmEiLz48cGF0aCBkPSJNMCAzNDBoNjQwIiBzdHJva2U9IiNmYWZhZmEiIHN0cm9rZS1vcGFjaXR5PSIuMjUiLz48cGF0aCBkPSJNOTYgMzQwdi01Mk0xNjAgMzQwdi04NE0yMjQgMzQwdi0zNk0yODggMzQwdi0xMDRNMzUyIDM0MHYtNjhNNDE2IDM0MHYtOTJNNDgwIDM0MHYtNDRNNTQ0IDM0MHYtNzYiIHN0cm9rZT0iI2ExYTFhYSIgc3Ryb2tlLXdpZHRoPSI4IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4+'

const GENERATED_IMAGE_BYTES = Uint8Array.from(
  atob(GENERATED_IMAGE_BASE64),
  (char) => char.charCodeAt(0)
)

const GENERATED_IMAGE_URI = `data:image/svg+xml;base64,${GENERATED_IMAGE_BASE64}`

/* ------------------------------------------------------------------ */
/* Image                                                               */
/* ------------------------------------------------------------------ */

export function ImageDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-3">
        <Image
          alt="Generated artwork: concentric gray rings above a stepped ramp"
          base64={GENERATED_IMAGE_BASE64}
          className="w-full rounded-lg border"
          mediaType="image/svg+xml"
          uint8Array={GENERATED_IMAGE_BYTES}
        />
        <p className="text-center text-muted-foreground text-xs">
          Rendered from an inline data URI - no network request is made.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Inline citation                                                     */
/* ------------------------------------------------------------------ */

const CITATION_SOURCES = [
  {
    description:
      'Monochrome systems reduce visual noise and let hierarchy carry the meaning.',
    title: 'Designing in grayscale',
    url: 'https://graytell.com/notes/designing-in-grayscale',
  },
  {
    description:
      'A single neutral ramp scales across backgrounds, borders and foreground text.',
    title: 'The zinc ramp in practice',
    url: 'https://graytell.com/notes/zinc-ramp-in-practice',
  },
]

export function InlineCitationDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-2">
        <p className="text-sm leading-relaxed">
          Monochrome interfaces keep attention on hierarchy and rhythm.
          <InlineCitation>
            <InlineCitationText>
              {' '}Readers follow contrast first and color second, so a single
              neutral ramp is enough to guide the eye.
            </InlineCitationText>
            <InlineCitationCard>
              <InlineCitationCardTrigger
                sources={CITATION_SOURCES.map((source) => source.url)}
              />
              <InlineCitationCardBody>
                <InlineCitationCarousel>
                  <InlineCitationCarouselHeader>
                    <InlineCitationCarouselPrev />
                    <InlineCitationCarouselIndex />
                    <InlineCitationCarouselNext />
                  </InlineCitationCarouselHeader>
                  <InlineCitationCarouselContent>
                    {CITATION_SOURCES.map((source) => (
                      <InlineCitationCarouselItem key={source.url}>
                        <InlineCitationSource
                          description={source.description}
                          title={source.title}
                          url={source.url}
                        />
                        <InlineCitationQuote>
                          {source.description}
                        </InlineCitationQuote>
                      </InlineCitationCarouselItem>
                    ))}
                  </InlineCitationCarouselContent>
                </InlineCitationCarousel>
              </InlineCitationCardBody>
            </InlineCitationCard>
          </InlineCitation>
        </p>
        <p className="text-muted-foreground text-xs">
          Hover the source badge to flip through the citation carousel.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sources                                                             */
/* ------------------------------------------------------------------ */

export function SourcesDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Sources>
          <SourcesTrigger count={4} />
          <SourcesContent>
            <Source href="https://ui.shadcn.com/docs" title="shadcn/ui - Docs" />
            <Source
              href="https://tailwindcss.com/docs"
              title="Tailwind CSS - Docs"
            />
            <Source
              href="https://react.dev/reference/react"
              title="React - Reference"
            />
            <Source
              href="https://www.w3.org/WAI/ARIA/apg"
              title="WAI-ARIA Authoring Practices"
            />
          </SourcesContent>
        </Sources>
        <p className="mt-2 text-muted-foreground text-xs">
          Click the trigger to collapse or expand the source list.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Attachments                                                         */
/* ------------------------------------------------------------------ */

const ATTACHMENT_POOL: AttachmentData[] = [
  {
    filename: 'design-review.pdf',
    id: 'att-pool-pdf',
    mediaType: 'application/pdf',
    type: 'file',
    url: 'https://example.com/design-review.pdf',
  },
  {
    filename: 'gradient-ramp.svg',
    id: 'att-pool-svg',
    mediaType: 'image/svg+xml',
    type: 'file',
    url: GENERATED_IMAGE_URI,
  },
  {
    filename: 'release-notes.md',
    id: 'att-pool-md',
    mediaType: 'text/markdown',
    type: 'file',
    url: 'https://example.com/release-notes.md',
  },
  {
    id: 'att-pool-source',
    mediaType: 'text/plain',
    sourceId: 'src-brand-guidelines',
    title: 'Brand guidelines',
    type: 'source-document',
  },
]

export function AttachmentsDemo() {
  const [items, setItems] = React.useState<AttachmentData[]>(() =>
    ATTACHMENT_POOL.slice(0, 3)
  )
  const [cursor, setCursor] = React.useState(3)

  const addItem = () => {
    const template = ATTACHMENT_POOL[cursor % ATTACHMENT_POOL.length]
    setItems((previous) => [...previous, { ...template, id: `att-${cursor}` }])
    setCursor((value) => value + 1)
  }

  const removeItem = (id: string) => {
    setItems((previous) => previous.filter((item) => item.id !== id))
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-3">
        <Attachments variant="inline">
          {items.length === 0 ? (
            <AttachmentEmpty>Nothing attached yet</AttachmentEmpty>
          ) : (
            items.map((item) => (
              <Attachment
                data={item}
                key={item.id}
                onRemove={() => removeItem(item.id)}
              >
                <AttachmentPreview />
                <AttachmentInfo />
                <AttachmentRemove />
              </Attachment>
            ))
          )}
          <Button onClick={addItem} size="sm" variant="outline">
            <PlusIcon className="size-3.5" />
            Add
          </Button>
        </Attachments>
        <p className="text-muted-foreground text-xs">
          Add chips from the pool; hover a chip to reveal its remove button.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Audio player                                                        */
/* ------------------------------------------------------------------ */

export function AudioPlayerDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AudioPlayer className="w-full">
          <AudioPlayerElement src={SILENT_WAV} />
          <AudioPlayerControlBar>
            <AudioPlayerPlayButton />
            <AudioPlayerSeekBackwardButton />
            <AudioPlayerSeekForwardButton />
            <AudioPlayerTimeDisplay />
            <AudioPlayerTimeRange className="w-20" />
            <AudioPlayerDurationDisplay />
            <AudioPlayerMuteButton />
            <AudioPlayerVolumeRange className="w-16" />
          </AudioPlayerControlBar>
        </AudioPlayer>
        <p className="mt-3 text-center text-muted-foreground text-xs">
          Loaded with a tiny silent WAV - play, scrub the range and adjust the
          volume.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Mic selector                                                        */
/* ------------------------------------------------------------------ */

type StaticMicrophone = { deviceId: string; kind: MediaDeviceKind; label: string }

// Static stand-in for navigator.mediaDevices.enumerateDevices() so the
// demo never requests permission or touches getUserMedia.
const STATIC_MICROPHONES: StaticMicrophone[] = [
  { deviceId: 'mic-default', kind: 'audioinput', label: 'Default - System Microphone' },
  { deviceId: 'mic-condenser', kind: 'audioinput', label: 'Studio USB Condenser (0d8c:0012)' },
  { deviceId: 'mic-headset', kind: 'audioinput', label: 'Headset Array (8086:0806)' },
]

export function MicSelectorDemo() {
  const [open, setOpen] = React.useState(false)
  const [selectedId, setSelectedId] = React.useState<string>()
  const selected = STATIC_MICROPHONES.find((mic) => mic.deviceId === selectedId)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <Popover onOpenChange={setOpen} open={open}>
          <MicSelectorTrigger className="w-50 justify-between">
            <span
              className={
                selected
                  ? 'flex-1 truncate text-left'
                  : 'flex-1 truncate text-left text-muted-foreground'
              }
            >
              {selected ? selected.label : 'Select microphone...'}
            </span>
          </MicSelectorTrigger>
          <MicSelectorContent>
            <MicSelectorInput />
            <MicSelectorList>
              {() =>
                STATIC_MICROPHONES.map((mic) => (
                  <MicSelectorItem
                    key={mic.deviceId}
                    onSelect={() => {
                      setSelectedId(mic.deviceId)
                      setOpen(false)
                    }}
                    value={mic.label}
                  >
                    <MicSelectorLabel
                      className="truncate"
                      device={mic as MediaDeviceInfo}
                    />
                  </MicSelectorItem>
                ))
              }
            </MicSelectorList>
            <MicSelectorEmpty>No microphone matched your search.</MicSelectorEmpty>
          </MicSelectorContent>
        </Popover>
        <p className="text-center text-muted-foreground text-xs">
          Idle trigger with a static device list - no permission prompt.
          Labels ending in a device id are dimmed by MicSelectorLabel.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Speech input                                                        */
/* ------------------------------------------------------------------ */

export function SpeechInputDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <SpeechInput
          aria-label="Start voice input"
          className="size-12 rounded-full"
          disabled
        />
        <p className="text-center text-muted-foreground text-xs">
          Idle trigger state. In a live session, activating this button starts
          speech recognition and requires microphone permission.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Transcription                                                       */
/* ------------------------------------------------------------------ */

const TRANSCRIPT_SEGMENTS = [
  { endSecond: 1.6, startSecond: 0, text: 'Design systems fail' },
  { endSecond: 3.2, startSecond: 1.6, text: 'when every team invents' },
  { endSecond: 4.8, startSecond: 3.2, text: 'its own shade of gray.' },
  { endSecond: 6.4, startSecond: 4.8, text: 'Share one ramp,' },
  { endSecond: 8, startSecond: 6.4, text: 'and the whole product' },
  { endSecond: 9.6, startSecond: 8, text: 'starts to rhyme.' },
]

export function TranscriptionDemo() {
  const [currentTime, setCurrentTime] = React.useState(5.2)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-3">
        <Transcription
          currentTime={currentTime}
          onSeek={setCurrentTime}
          segments={TRANSCRIPT_SEGMENTS}
        >
          {(segment, index) => (
            <TranscriptionSegment index={index} key={index} segment={segment} />
          )}
        </Transcription>
        <p className="text-muted-foreground text-xs">
          Playhead at {currentTime.toFixed(1)}s - past phrases dim, the active
          phrase highlights, and clicking any phrase seeks.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Voice selector                                                      */
/* ------------------------------------------------------------------ */

type VoiceOption = {
  accent: string
  age: string
  description: string
  gender: 'female' | 'male' | 'non-binary'
  id: string
  name: string
}

const VOICE_GROUPS: { heading: string; voices: VoiceOption[] }[] = [
  {
    heading: 'Recommended',
    voices: [
      {
        accent: 'American',
        age: '24',
        description: 'Warm and articulate narrator',
        gender: 'female',
        id: 'aria',
        name: 'Aria',
      },
      {
        accent: 'British',
        age: '38',
        description: 'Calm documentary voice',
        gender: 'male',
        id: 'atlas',
        name: 'Atlas',
      },
    ],
  },
  {
    heading: 'More voices',
    voices: [
      {
        accent: 'Irish',
        age: '29',
        description: 'Bright conversational tone',
        gender: 'non-binary',
        id: 'ember',
        name: 'Ember',
      },
      {
        accent: 'Australian',
        age: '33',
        description: 'Measured and precise',
        gender: 'female',
        id: 'sage',
        name: 'Sage',
      },
    ],
  },
]

const ALL_VOICES = VOICE_GROUPS.flatMap((group) => group.voices)

function VoiceSelectorValueLabel() {
  const { value } = useVoiceSelector()
  const voice = ALL_VOICES.find((candidate) => candidate.id === value)

  return (
    <span className="flex-1 truncate text-left">
      {voice ? voice.name : 'Select voice'}
    </span>
  )
}

export function VoiceSelectorDemo() {
  const [previewingId, setPreviewingId] = React.useState<string | null>(null)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <VoiceSelector>
          <VoiceSelectorTrigger asChild>
            <Button className="w-56 justify-between" variant="outline">
              <VoiceSelectorValueLabel />
              <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          </VoiceSelectorTrigger>
          <VoiceSelectorContent>
            <VoiceSelectorInput placeholder="Search voices..." />
            <VoiceSelectorList>
              <VoiceSelectorEmpty>No voice matches your search.</VoiceSelectorEmpty>
              {VOICE_GROUPS.map((group) => (
                <VoiceSelectorGroup heading={group.heading} key={group.heading}>
                  {group.voices.map((voice) => (
                    <VoiceSelectorItem key={voice.id} value={voice.name}>
                      <VoiceSelectorPreview
                        onPlay={() =>
                          setPreviewingId((previous) =>
                            previous === voice.id ? null : voice.id
                          )
                        }
                        playing={previewingId === voice.id}
                      />
                      <div className="flex min-w-0 flex-1 flex-col">
                        <span className="flex items-center gap-2">
                          <VoiceSelectorName>{voice.name}</VoiceSelectorName>
                          <VoiceSelectorGender value={voice.gender} />
                          <VoiceSelectorAccent>{voice.accent}</VoiceSelectorAccent>
                        </span>
                        <VoiceSelectorDescription className="truncate">
                          {voice.description}
                        </VoiceSelectorDescription>
                      </div>
                      <VoiceSelectorAttributes>
                        <VoiceSelectorBullet />
                        <VoiceSelectorAge className="ml-1">
                          {voice.age}
                        </VoiceSelectorAge>
                      </VoiceSelectorAttributes>
                    </VoiceSelectorItem>
                  ))}
                </VoiceSelectorGroup>
              ))}
            </VoiceSelectorList>
          </VoiceSelectorContent>
        </VoiceSelector>
        <p className="text-center text-muted-foreground text-xs">
          Opens a searchable, grouped dialog; the preview button toggles
          playback state (silent in this demo).
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Persona                                                             */
/* ------------------------------------------------------------------ */

const PERSONA_STATES: PersonaState[] = [
  'idle',
  'listening',
  'thinking',
  'speaking',
  'asleep',
]

const PERSONA_VARIANTS = [
  'command',
  'glint',
  'halo',
  'mana',
  'obsidian',
  'opal',
] as const

const PERSONA_STATE_HINTS: Record<PersonaState, string> = {
  asleep: 'asleep = true, all others false',
  idle: 'every state machine input false',
  listening: 'listening = true, all others false',
  speaking: 'speaking = true, all others false',
  thinking: 'thinking = true, all others false',
}

// The real <Persona> mounts a WebGL2 Rive canvas whose .riv asset is a
// mandatory remote URL, so this preview stands in for it: same state API,
// same size-16 canvas footprint, zero network traffic.
function PersonaStage({ state }: { state: PersonaState }) {
  return (
    <div
      aria-label={`Persona stage: ${state} state`}
      className="relative flex h-44 items-center justify-center overflow-hidden rounded-lg border bg-muted/40"
      role="img"
    >
      {state === 'listening' &&
        [0, 1, 2].map((ring) => (
          <span
            className="absolute size-16 animate-ping rounded-full border border-foreground/25"
            key={ring}
            style={{
              animationDelay: `${ring * 0.3}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      {state === 'thinking' && (
        <span className="size-16 animate-spin rounded-full border-2 border-dashed border-foreground/40" />
      )}
      {state === 'speaking' && (
        <span className="flex items-end gap-1">
          {[10, 22, 14, 26, 12].map((height, bar) => (
            <span
              className="w-1.5 animate-pulse rounded-full bg-foreground/60"
              key={bar}
              style={{
                animationDelay: `${bar * 0.15}s`,
                height: `${height}px`,
              }}
            />
          ))}
        </span>
      )}
      {state === 'asleep' && (
        <span className="size-16 rounded-full border border-foreground/15" />
      )}
      {state === 'idle' && (
        <span className="size-16 rounded-full border-2 border-foreground/30" />
      )}
      <span className="absolute bottom-2 right-3 font-mono text-[10px] text-muted-foreground uppercase">
        rive canvas
      </span>
    </div>
  )
}

export function PersonaDemo() {
  const [state, setState] = React.useState<PersonaState>('idle')
  const [variant, setVariant] =
    React.useState<(typeof PERSONA_VARIANTS)[number]>('obsidian')

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <PersonaStage state={state} />
        <div className="flex flex-wrap justify-center gap-1.5">
          {PERSONA_STATES.map((option) => (
            <Button
              className="capitalize"
              key={option}
              onClick={() => setState(option)}
              size="sm"
              variant={state === option ? 'default' : 'outline'}
            >
              {option}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {PERSONA_VARIANTS.map((option) => (
            <Button
              className="capitalize"
              key={option}
              onClick={() => setVariant(option)}
              size="sm"
              variant={variant === option ? 'secondary' : 'ghost'}
            >
              {option}
            </Button>
          ))}
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Offline stand-in for the Rive visual. Persona maps the selected
          state to one state-machine input ({PERSONA_STATE_HINTS[state]});
          the live canvas streams a .riv asset for the {variant} variant.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Web preview                                                         */
/* ------------------------------------------------------------------ */

type PreviewPage = 'components' | 'docs'

const PREVIEW_PAGE_DOCS = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;padding:28px 32px;background:#fafafa;color:#18181b;font-family:ui-sans-serif,system-ui,sans-serif}h1{margin:0 0 10px;font-size:20px}p{margin:0 0 14px;font-size:13px;line-height:1.6;color:#52525b}code{background:#e4e4e7;border-radius:6px;color:#18181b;font-size:12px;padding:3px 8px}strong{color:#18181b}</style></head><body><h1>Installation</h1><p>Every component ships from one registry. Add the alias once, then install anything with a single command.</p><code>npx shadcn@latest add @gray/button</code><p style="margin-top:18px"><strong>Theming.</strong> Monochrome tokens are plain CSS custom properties - swap the ramp, keep the system.</p></body></html>`

const PREVIEW_PAGE_COMPONENTS = `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;padding:28px 32px;background:#fafafa;color:#18181b;font-family:ui-sans-serif,system-ui,sans-serif}h1{margin:0 0 10px;font-size:20px}p{margin:0 0 14px;font-size:13px;line-height:1.6;color:#52525b}.pill{background:#e4e4e7;border-radius:9999px;color:#3f3f46;font-size:12px;padding:4px 10px}</style></head><body><h1>Components</h1><p>61 live components, all neutral by default.</p><div style="display:flex;flex-wrap:wrap;gap:8px;max-width:360px"><span class="pill">button</span><span class="pill">dialog</span><span class="pill">command</span><span class="pill">sidebar</span><span class="pill">chart</span><span class="pill">date-picker</span><span class="pill">audio-player</span><span class="pill">canvas</span></div></body></html>`

const PREVIEW_LOGS = [
  {
    level: 'log' as const,
    message: '[gray-ui] preview frame mounted',
    timestamp: new Date('2025-06-01T09:30:00'),
  },
  {
    level: 'warn' as const,
    message: 'srcdoc body ignores the address bar in this demo',
    timestamp: new Date('2025-06-01T09:30:01'),
  },
  {
    level: 'log' as const,
    message: '0 requests left the sandbox',
    timestamp: new Date('2025-06-01T09:30:02'),
  },
]

const PREVIEW_URLS: Record<PreviewPage, string> = {
  components: 'https://gray-ui.space-z.ai/components',
  docs: 'https://gray-ui.space-z.ai/docs',
}

function PreviewNavigationBar({
  onNavigate,
  onReload,
  onUrlChange,
  page,
  url,
}: {
  onNavigate: (page: PreviewPage) => void
  onReload: () => void
  onUrlChange: (url: string) => void
  page: PreviewPage
  url: string
}) {
  return (
    <WebPreviewNavigation>
      <WebPreviewNavigationButton
        disabled={page === 'docs'}
        onClick={() => onNavigate('docs')}
        tooltip="Back to docs"
      >
        <ArrowLeftIcon />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton
        disabled={page === 'components'}
        onClick={() => onNavigate('components')}
        tooltip="Forward to components"
      >
        <ArrowRightIcon />
      </WebPreviewNavigationButton>
      <WebPreviewNavigationButton onClick={onReload} tooltip="Reload page">
        <RotateCwIcon />
      </WebPreviewNavigationButton>
      <WebPreviewUrl
        onChange={(event) => onUrlChange(event.currentTarget.value)}
        value={url}
      />
    </WebPreviewNavigation>
  )
}

export function WebPreviewDemo() {
  const [page, setPage] = React.useState<PreviewPage>('docs')
  const [url, setUrl] = React.useState(PREVIEW_URLS.docs)
  const [reloadToken, setReloadToken] = React.useState(0)

  const navigateTo = (next: PreviewPage) => {
    setPage(next)
    setUrl(PREVIEW_URLS[next])
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-xl flex-col gap-2">
        <div className="h-72 w-full">
          <WebPreview defaultUrl={PREVIEW_URLS.docs}>
            <PreviewNavigationBar
              onNavigate={navigateTo}
              onReload={() => setReloadToken((token) => token + 1)}
              onUrlChange={setUrl}
              page={page}
              url={url}
            />
            <WebPreviewBody
              className="bg-background"
              srcDoc={`${page === 'docs' ? PREVIEW_PAGE_DOCS : PREVIEW_PAGE_COMPONENTS}\n<!-- render ${reloadToken} -->`}
            />
            <WebPreviewConsole logs={PREVIEW_LOGS} />
          </WebPreview>
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Navigation buttons swap between two inline srcdoc pages; the address
          bar is editable and the console folds out at the bottom.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* React Flow plumbing (shared by the flow demos)                      */
/* ------------------------------------------------------------------ */

type FlowNodeData = { hint?: string; label: string }
type FlowNode = ReactFlowNode<FlowNodeData, 'flow'>

function FlowNodeView({ data, selected }: NodeProps<FlowNode>) {
  return (
    <Node
      className={selected ? 'w-44 ring-2 ring-ring' : 'w-44'}
      handles={{ source: true, target: true }}
    >
      <NodeHeader>
        <NodeTitle className="text-sm">{data.label}</NodeTitle>
        {data.hint ? (
          <NodeDescription className="text-xs">{data.hint}</NodeDescription>
        ) : null}
      </NodeHeader>
    </Node>
  )
}

const FLOW_NODE_TYPES = { flow: FlowNodeView }

const DEMO_EDGE_TYPES = {
  animated: Edge.Animated,
  temporary: Edge.Temporary,
}

/* ------------------------------------------------------------------ */
/* Canvas                                                              */
/* ------------------------------------------------------------------ */

const CANVAS_DEMO_NODES: FlowNode[] = [
  { data: { hint: 'chat input', label: 'User prompt' }, id: 'prompt', position: { x: 0, y: 40 }, type: 'flow' },
  { data: { hint: 'reasoning', label: 'Model' }, id: 'model', position: { x: 250, y: -40 }, type: 'flow' },
  { data: { hint: 'vector search', label: 'Retriever' }, id: 'retriever', position: { x: 250, y: 120 }, type: 'flow' },
  { data: { hint: 'streamed', label: 'Response' }, id: 'response', position: { x: 500, y: 40 }, type: 'flow' },
]

const CANVAS_DEMO_EDGES: ReactFlowEdge[] = [
  { animated: true, id: 'canvas-e1', source: 'prompt', target: 'model' },
  { id: 'canvas-e2', source: 'prompt', target: 'retriever' },
  { id: 'canvas-e3', source: 'model', target: 'response' },
  { animated: true, id: 'canvas-e4', source: 'retriever', target: 'response' },
]

export function CanvasDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-64 w-full overflow-hidden rounded-lg border">
          <Canvas
            defaultEdges={CANVAS_DEMO_EDGES}
            defaultNodes={CANVAS_DEMO_NODES}
            nodeTypes={FLOW_NODE_TYPES}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Drag nodes to rearrange the graph; scroll to pan and ctrl/cmd +
          scroll (or pinch) to zoom.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Node                                                                */
/* ------------------------------------------------------------------ */

type ModelNodeData = { note: string; subtitle: string; title: string }
type ModelNode = ReactFlowNode<ModelNodeData, 'model'>

function ModelNodeView({ data, selected }: NodeProps<ModelNode>) {
  return (
    <Node
      className={selected ? 'ring-2 ring-ring' : undefined}
      handles={{ source: true, target: true }}
    >
      <NodeHeader>
        <NodeTitle className="text-sm">{data.title}</NodeTitle>
        <NodeDescription className="text-xs">{data.subtitle}</NodeDescription>
      </NodeHeader>
      <NodeContent className="text-xs text-muted-foreground">{data.note}</NodeContent>
      <NodeFooter className="text-xs">
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-foreground/70" />
          healthy
        </span>
        <span className="ml-auto tabular-nums">142 ms</span>
      </NodeFooter>
    </Node>
  )
}

const MODEL_NODE_TYPES = { model: ModelNodeView }

const NODE_DEMO_NODES: ModelNode[] = [
  {
    data: { note: 'Streaming first tokens', subtitle: 'anthropic', title: 'claude-sonnet-4' },
    id: 'model-primary',
    position: { x: 0, y: 0 },
    type: 'model',
  },
  {
    data: { note: 'Standing by for failover', subtitle: 'openai', title: 'gpt-4o' },
    id: 'model-fallback',
    position: { x: 340, y: 0 },
    type: 'model',
  },
]

const NODE_DEMO_EDGES: ReactFlowEdge[] = [
  { id: 'node-demo-edge', source: 'model-primary', target: 'model-fallback' },
]

export function NodeDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas
            defaultEdges={NODE_DEMO_EDGES}
            defaultNodes={NODE_DEMO_NODES}
            nodeTypes={MODEL_NODE_TYPES}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Each node is the Node compound (header, content, footer) with left
          and right handles. Click a node to select it.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Edge                                                                */
/* ------------------------------------------------------------------ */

const EDGE_DEMO_NODES: FlowNode[] = [
  { data: { label: 'Source' }, id: 'edge-source', position: { x: 0, y: 40 }, type: 'flow' },
  { data: { label: 'Animated' }, id: 'edge-animated', position: { x: 260, y: -30 }, type: 'flow' },
  { data: { label: 'Temporary' }, id: 'edge-temporary', position: { x: 260, y: 110 }, type: 'flow' },
]

const EDGE_DEMO_EDGES: ReactFlowEdge[] = [
  { id: 'edge-demo-animated', source: 'edge-source', target: 'edge-animated', type: 'animated' },
  { id: 'edge-demo-temporary', source: 'edge-source', target: 'edge-temporary', type: 'temporary' },
]

export function EdgeDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas
            defaultEdges={EDGE_DEMO_EDGES}
            defaultNodes={EDGE_DEMO_NODES}
            edgeTypes={DEMO_EDGE_TYPES}
            nodeTypes={FLOW_NODE_TYPES}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Edge.Animated draws a traveling pulse; Edge.Temporary renders the
          dashed hand-drag style.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Connection                                                          */
/* ------------------------------------------------------------------ */

const CONNECTION_DEMO_NODES: FlowNode[] = [
  { data: { label: 'Prompt' }, id: 'conn-prompt', position: { x: 0, y: 40 }, type: 'flow' },
  { data: { label: 'Model' }, id: 'conn-model', position: { x: 280, y: -30 }, type: 'flow' },
  { data: { label: 'Guardrail' }, id: 'conn-guard', position: { x: 280, y: 110 }, type: 'flow' },
]

export function ConnectionDemo() {
  const [nodes, , onNodesChange] = useNodesState<ReactFlowNode>(
    CONNECTION_DEMO_NODES
  )
  const [edges, setEdges, onEdgesChange] = useEdgesState<ReactFlowEdge>([])

  const onConnect = React.useCallback(
    (connection: ReactFlowConnection) => {
      setEdges((current) => addEdge(connection, current))
    },
    [setEdges]
  )

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas
            connectionLineComponent={ConnectionLine}
            edges={edges}
            nodes={nodes}
            nodeTypes={FLOW_NODE_TYPES}
            onConnect={onConnect}
            onEdgesChange={onEdgesChange}
            onNodesChange={onNodesChange}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Drag from a right handle toward a left handle - the dashed curve with
          the dot is the Connection component; drop to create a real edge.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

const CONTROLS_DEMO_NODES: FlowNode[] = [
  { data: { label: 'Ingest' }, id: 'controls-a', position: { x: 0, y: 30 }, type: 'flow' },
  { data: { label: 'Transform' }, id: 'controls-b', position: { x: 240, y: -20 }, type: 'flow' },
  { data: { label: 'Publish' }, id: 'controls-c', position: { x: 480, y: 30 }, type: 'flow' },
]

export function ControlsDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas defaultNodes={CONTROLS_DEMO_NODES} nodeTypes={FLOW_NODE_TYPES}>
            <Controls position="bottom-right" showInteractive={false} />
          </Canvas>
        </div>
        <p className="text-center text-muted-foreground text-xs">
          The control cluster zooms in and out, centers on the last change and
          fits the viewport.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Panel                                                               */
/* ------------------------------------------------------------------ */

const PANEL_DEMO_NODES: FlowNode[] = [
  { data: { hint: 'gather context', label: 'Research' }, id: 'panel-a', position: { x: 0, y: 30 }, type: 'flow' },
  { data: { hint: 'draft answer', label: 'Compose' }, id: 'panel-b', position: { x: 260, y: 30 }, type: 'flow' },
]

export function PanelDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas defaultNodes={PANEL_DEMO_NODES} nodeTypes={FLOW_NODE_TYPES}>
            <Panel position="top-left">
              <div className="flex items-center gap-2 px-1.5 py-1 text-xs">
                <WorkflowIcon className="size-3.5 text-muted-foreground" />
                Streaming pipeline
              </div>
            </Panel>
            <Panel position="top-right">
              <div className="px-1.5 py-1 text-muted-foreground text-xs tabular-nums">
                2 nodes
              </div>
            </Panel>
          </Canvas>
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Panel pins floating cards to the viewport corners - here a label and
          a node counter.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Toolbar                                                             */
/* ------------------------------------------------------------------ */

type ToolNodeData = { kind: string; label: string }
type ToolNode = ReactFlowNode<ToolNodeData, 'tool'>

function ToolNodeView({ data, id, selected }: NodeProps<ToolNode>) {
  const { setNodes } = useReactFlow<ToolNode>()

  const duplicateNode = React.useCallback(() => {
    setNodes((current) => {
      const source = current.find((node) => node.id === id)
      if (!source) {
        return current
      }
      return [
        ...current,
        {
          ...source,
          id: `${id}-copy-${current.length}`,
          position: { x: source.position.x + 48, y: source.position.y + 48 },
          selected: false,
        },
      ]
    })
  }, [id, setNodes])

  const deleteNode = React.useCallback(() => {
    setNodes((current) => current.filter((node) => node.id !== id))
  }, [id, setNodes])

  return (
    <>
      <Node
        className={selected ? 'w-40 ring-2 ring-ring' : 'w-40'}
        handles={{ source: true, target: true }}
      >
        <NodeHeader>
          <NodeTitle className="text-sm">{data.label}</NodeTitle>
          <NodeDescription className="text-xs">{data.kind}</NodeDescription>
        </NodeHeader>
      </Node>
      <Toolbar isVisible={selected}>
        <Button aria-label="Duplicate node" onClick={duplicateNode} size="icon-sm" variant="ghost">
          <CopyIcon />
        </Button>
        <Button aria-label="Delete node" onClick={deleteNode} size="icon-sm" variant="ghost">
          <Trash2Icon />
        </Button>
      </Toolbar>
    </>
  )
}

const TOOL_NODE_TYPES = { tool: ToolNodeView }

const TOOLBAR_DEMO_NODES: ToolNode[] = [
  { data: { kind: 'template', label: 'System prompt' }, id: 'tool-prompt', position: { x: 0, y: 30 }, type: 'tool' },
  { data: { kind: 'quality gate', label: 'Eval suite' }, id: 'tool-eval', position: { x: 260, y: 30 }, type: 'tool' },
]

const TOOLBAR_DEMO_EDGES: ReactFlowEdge[] = [
  { id: 'toolbar-edge', source: 'tool-prompt', target: 'tool-eval' },
]

export function ToolbarDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-2">
        <div className="h-60 w-full overflow-hidden rounded-lg border">
          <Canvas
            defaultEdges={TOOLBAR_DEMO_EDGES}
            defaultNodes={TOOLBAR_DEMO_NODES}
            nodeTypes={TOOL_NODE_TYPES}
          />
        </div>
        <p className="text-center text-muted-foreground text-xs">
          Click a node to reveal its Toolbar below it - duplicate or delete
          the node from the cluster.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Checkpoint                                                          */
/* ------------------------------------------------------------------ */

export function CheckpointDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-3">
        <Checkpoint>
          <CheckpointIcon />
          <CheckpointTrigger tooltip="Restore the conversation to this point">
            Restore
          </CheckpointTrigger>
          <span className="pr-2 text-xs">v3 - yesterday, 4:12 PM</span>
        </Checkpoint>
        <Checkpoint>
          <CheckpointTrigger tooltip="Jump to the first saved branch">
            Branch
          </CheckpointTrigger>
          <CheckpointTrigger
            aria-label="Restore checkpoint v1"
            size="icon-sm"
            tooltip="Restore checkpoint v1"
          >
            <RotateCcwIcon />
          </CheckpointTrigger>
          <span className="pr-2 text-xs">v1 - 3 days ago</span>
        </Checkpoint>
        <p className="text-muted-foreground text-xs">
          Checkpoint renders a quiet meta row with tooltip triggers; the
          trailing separator extends to the message edge.
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Model selector                                                      */
/* ------------------------------------------------------------------ */

const MODEL_PROVIDER_ICONS: Record<string, LucideIcon> = {
  Anthropic: FeatherIcon,
  Google: GemIcon,
  OpenAI: SparklesIcon,
}

const MODEL_GROUPS = [
  {
    group: 'OpenAI',
    items: [
      { id: 'openai/gpt-4o', name: 'GPT-4o', shortcut: 'Flagship' },
      { id: 'openai/gpt-4o-mini', name: 'GPT-4o mini', shortcut: 'Fast' },
    ],
  },
  {
    group: 'Anthropic',
    items: [
      { id: 'anthropic/claude-sonnet-4', name: 'Claude Sonnet 4', shortcut: 'Balanced' },
      { id: 'anthropic/claude-haiku-3.5', name: 'Claude Haiku 3.5', shortcut: 'Fast' },
    ],
  },
  {
    group: 'Google',
    items: [{ id: 'google/gemini-2.0-flash', name: 'Gemini 2.0 Flash', shortcut: 'Fast' }],
  },
]

export function ModelSelectorDemo() {
  const [selectedId, setSelectedId] = React.useState('openai/gpt-4o')
  const selectedGroup = MODEL_GROUPS.find((group) =>
    group.items.some((model) => model.id === selectedId)
  )
  const selectedModel = selectedGroup?.items.find(
    (model) => model.id === selectedId
  )
  const TriggerIcon = selectedGroup
    ? MODEL_PROVIDER_ICONS[selectedGroup.group]
    : BoxIcon

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <ModelSelector>
          <ModelSelectorTrigger asChild>
            <Button className="w-64 justify-between" role="combobox" variant="outline">
              <span className="flex min-w-0 items-center gap-2">
                <TriggerIcon className="size-3.5 shrink-0 text-muted-foreground" />
                <span className="truncate">
                  {selectedModel ? selectedModel.name : 'Select model'}
                </span>
              </span>
              <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
            </Button>
          </ModelSelectorTrigger>
          <ModelSelectorContent>
            <ModelSelectorInput placeholder="Search models..." />
            <ModelSelectorList>
              <ModelSelectorEmpty>No model found.</ModelSelectorEmpty>
              {MODEL_GROUPS.map((group, groupIndex) => (
                <React.Fragment key={group.group}>
                  <ModelSelectorGroup heading={group.group}>
                    {group.items.map((model) => (
                      <ModelSelectorItem
                        key={model.id}
                        onSelect={() => setSelectedId(model.id)}
                        value={model.name}
                      >
                        <ModelSelectorName>{model.name}</ModelSelectorName>
                        <ModelSelectorShortcut>{model.shortcut}</ModelSelectorShortcut>
                        {selectedId === model.id ? (
                          <CheckIcon className="size-4" />
                        ) : null}
                      </ModelSelectorItem>
                    ))}
                  </ModelSelectorGroup>
                  {groupIndex < MODEL_GROUPS.length - 1 ? (
                    <ModelSelectorSeparator />
                  ) : null}
                </React.Fragment>
              ))}
            </ModelSelectorList>
          </ModelSelectorContent>
        </ModelSelector>
        <p className="text-center text-muted-foreground text-xs">
          Searchable dialog grouped by provider. Production builds pull
          provider logos from models.dev; this preview uses neutral icons.
        </p>
      </div>
    </div>
  )
}
