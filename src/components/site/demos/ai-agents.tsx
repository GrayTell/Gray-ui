'use client'

import * as React from 'react'

import { RotateCcwIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { AgentChatInput } from '@/components/ai-elements/agent-chat-input'
import { AgentCodeReveal } from '@/components/ai-elements/agent-code-reveal'
import { AgentFileDiff } from '@/components/ai-elements/agent-file-diff'
import {
  AgentImageGeneration,
} from '@/components/ai-elements/agent-image-generation'
import {
  AgentInlineCitations,
} from '@/components/ai-elements/agent-inline-citations'
import {
  AgentMessage,
} from '@/components/ai-elements/agent-message'
import {
  AgentMessageScroller,
} from '@/components/ai-elements/agent-message-scroller'
import {
  AgentPlanCard,
} from '@/components/ai-elements/agent-plan-card'
import {
  AgentQuestionCard,
} from '@/components/ai-elements/agent-question-card'
import {
  AgentReasoningSteps,
} from '@/components/ai-elements/agent-reasoning-steps'
import {
  AgentStreamingText,
} from '@/components/ai-elements/agent-streaming-text'
import { AgentTaskList } from '@/components/ai-elements/agent-task-list'

/**
 * Agent demos — self-playing, replayable scenarios showing what each agent
 * primitive looks like mid-run. Every demo owns its own copy; replaying just
 * remounts the component via a key bump.
 */

function ReplayButton({ onReplay }: { onReplay: () => void }) {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-7 gap-1.5 text-xs text-muted-foreground"
      onClick={onReplay}
    >
      <RotateCcwIcon className="size-3" />
      Replay
    </Button>
  )
}

function DemoShell({
  children,
  replayKey,
  onReplay,
}: {
  children: React.ReactNode
  replayKey: number
  onReplay: () => void
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <ReplayButton onReplay={onReplay} />
      </div>
      <div key={replayKey}>{children}</div>
    </div>
  )
}

function useReplay() {
  const [replayKey, setReplayKey] = React.useState(0)
  return [replayKey, () => setReplayKey((k) => k + 1)] as const
}

export function AgentReasoningStepsDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentReasoningSteps
        stages={[
          {
            title: 'Reading the current dark-mode tokens',
            reasoning: [
              'The palette is zinc-based with a single surface scale.',
              'Semantic tokens already map to light/dark pairs.',
            ],
          },
          {
            title: 'Drafting the contrast pass',
            reasoning: [
              'Muted text sits at 4.6:1 on the dark surface — above AA.',
              'Borders need one step lighter in dark mode only.',
            ],
          },
          {
            title: 'Checking the motion budget',
            reasoning: [
              'Theme flips should not animate color transitions.',
            ],
          },
        ]}
        onDone={() => {}}
      />
    </DemoShell>
  )
}

export function AgentStreamingTextDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentStreamingText text="Gray UI ships as plain React and Tailwind source. You copy the component, you own the file, and nothing about it is hidden behind a runtime you did not choose." />
    </DemoShell>
  )
}

export function AgentTaskListDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentTaskList
        tasks={[
          { title: 'Scaffold the changelog route' },
          { title: 'Wire the markdown source' },
          { title: 'Add the RSS endpoint' },
          { title: 'Polish the empty states' },
          { title: 'Run the Lighthouse pass' },
        ]}
      />
    </DemoShell>
  )
}

export function AgentPlanCardDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentPlanCard
        title="Keyboard-first command menu"
        description="Index every route and dialog trigger, rank by recency, and bind it to ⌘K."
        items={[
          { title: 'Collect actions from the route tree' },
          { title: 'Score matches with a fuzzy ranker' },
          { title: 'Persist recency in local storage' },
        ]}
      />
    </DemoShell>
  )
}

export function AgentFileDiffDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentFileDiff
        path="src/lib/slugify.ts"
        lines={[
          { kind: 'context', text: 'export function slugify(input: string) {', oldNo: 1, newNo: 1 },
          { kind: 'del', text: 'return input.toLowerCase();', oldNo: 2 },
          { kind: 'add', text: 'return input', newNo: 2 },
          { kind: 'add', text: '  .toLowerCase()', newNo: 3 },
          { kind: 'add', text: '  .replace(/\\s+/g, "-");', newNo: 4 },
          { kind: 'context', text: '}', oldNo: 3, newNo: 5 },
        ]}
      />
    </DemoShell>
  )
}

export function AgentImageGenerationDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentImageGeneration prompt="Monochrome halftone landscape, strict gray palette" />
    </DemoShell>
  )
}

export function AgentInlineCitationsDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentInlineCitations
        text="Registry-driven component catalogs keep install payloads small because the CLI fetches only the files a component declares."
        sources={[
          { id: '[1]', title: 'Registry schema' },
          { id: '[2]', title: 'CLI reference' },
        ]}
      />
    </DemoShell>
  )
}

export function AgentCodeRevealDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <AgentCodeReveal
        filename="src/lib/rank.ts"
        lines={[
          'export function rank(a: string, b: string) {',
          '  const score = (s: string) =>',
          '    s.startsWith(a) ? 0 : s.includes(a) ? 1 : 2',
          '  return score(a) - score(b)',
          '}',
        ]}
      />
    </DemoShell>
  )
}

export function AgentChatInputDemo() {
  return (
    <div className="flex flex-col gap-3">
      <AgentChatInput
        suggestion="Draft the v0.3 release notes…"
        onSubmit={(message) => console.log('agent chat:', message)}
      />
      <p className="text-muted-foreground text-xs">
        The loop types a suggestion until you focus the field — then it is all
        yours.
      </p>
    </div>
  )
}

export function AgentQuestionCardDemo() {
  return (
    <div className="flex flex-col gap-3">
      <AgentQuestionCard
        question="Where should the example app live?"
        options={[
          { label: 'App Router route group' },
          { label: 'Standalone example folder' },
        ]}
      />
      <p className="text-muted-foreground text-xs">
        The agent stops and asks instead of guessing. Try picking one.
      </p>
    </div>
  )
}

export function AgentMessageDemo() {
  const [replayKey, replay] = useReplay()
  return (
    <DemoShell replayKey={replayKey} onReplay={replay}>
      <div className="flex flex-col gap-3">
        <AgentMessage from="user" delay={0.1}>
          Can the registry serve a single component?
        </AgentMessage>
        <AgentMessage from="assistant" delay={0.7}>
          Yes — every component is addressable at its own registry URL, so the
          CLI can install one file without pulling the catalog.
        </AgentMessage>
      </div>
    </DemoShell>
  )
}

export function AgentMessageScrollerDemo() {
  return (
    <AgentMessageScroller
      turns={[
        { from: 'user', text: 'How do I add the Gray registry to a fresh app?' },
        {
          from: 'assistant',
          text: 'Run shadcn init, then add the registry URL to components.json. After that every install resolves through Gray.',
        },
        { from: 'user', text: 'And a single component?' },
        {
          from: 'assistant',
          text: 'npx shadcn add with the component URL — it pulls exactly the files that component declares.',
        },
      ]}
    />
  )
}
