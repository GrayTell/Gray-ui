'use client'

import 'streamdown/styles.css'

import * as React from 'react'
import type { ChatStatus, LanguageModelUsage, Tool as AiTool, UIMessage } from 'ai'
import {
  AtSignIcon,
  CheckIcon,
  CircleDashedIcon,
  CopyIcon,
  DownloadIcon,
  FileCode2Icon,
  FileTextIcon,
  Image as ImageIcon,
  InboxIcon,
  ListTodoIcon,
  PaperclipIcon,
  PencilIcon,
  RefreshCwIcon,
  RotateCcwIcon,
  SearchIcon,
  SparklesIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  Trash2Icon,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools,
} from '@/components/ai-elements/agent'
import { Artifact, ArtifactAction, ArtifactActions, ArtifactClose, ArtifactContent, ArtifactDescription, ArtifactHeader, ArtifactTitle } from '@/components/ai-elements/artifact'
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import {
  Context,
  ContextContent,
  ContextContentBody,
  ContextContentFooter,
  ContextContentHeader,
  ContextInputUsage,
  ContextOutputUsage,
  ContextReasoningUsage,
  ContextCacheUsage,
  ContextTrigger,
} from '@/components/ai-elements/context'
import {
  Conversation,
  ConversationContent,
  ConversationDownload,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
  MessageToolbar,
} from '@/components/ai-elements/message'
import {
  Plan,
  PlanContent,
  PlanDescription,
  PlanFooter,
  PlanHeader,
  PlanTitle,
  PlanTrigger,
} from '@/components/ai-elements/plan'
import {
  PromptInput,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuItem,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'
import {
  Queue,
  QueueItem,
  QueueItemAction,
  QueueItemActions,
  QueueItemAttachment,
  QueueItemContent,
  QueueItemDescription,
  QueueItemFile,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from '@/components/ai-elements/queue'
import { Reasoning, ReasoningContent, ReasoningTrigger } from '@/components/ai-elements/reasoning'
import { Shimmer } from '@/components/ai-elements/shimmer'
import { Suggestions, Suggestion } from '@/components/ai-elements/suggestion'
import { Task, TaskContent, TaskItem, TaskItemFile, TaskTrigger } from '@/components/ai-elements/task'
import { Tool, ToolContent, ToolHeader, ToolInput, ToolOutput } from '@/components/ai-elements/tool'

/* ------------------------------------------------------------------ */
/* Static fixtures                                                     */
/* ------------------------------------------------------------------ */

const CONVERSATION_MESSAGES: UIMessage[] = [
  {
    id: 'msg-1',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'How do I publish a custom registry item for shadcn?',
      },
    ],
  },
  {
    id: 'msg-2',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Add a JSON file under `public/r` with a `$schema` pointing at the CLI schema, a `name`, and a `files` array.\n\nThe CLI resolves the URL, downloads each file, and writes it into the mapped target directory.',
      },
    ],
  },
  {
    id: 'msg-3',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'And how do I wire the namespace in components.json?',
      },
    ],
  },
  {
    id: 'msg-4',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'Map a namespace to your registry endpoint:\n\n```json\n{\n  "@gray": "https://gray-ui.vercel.app/r/{name}.json"\n}\n```\n\nFrom then on `npx shadcn add button` resolves against your own registry.',
      },
    ],
  },
]

const USER_QUESTION =
  'When should I use a Collapsible instead of an Accordion in a settings page?'

const RESPONSE_PRIMARY = `Use a **Collapsible** when a section owns a single independent toggle — for example an advanced options panel that users rarely touch.

Use an **Accordion** when:

- several sections share one container
- you want "only one open at a time" behavior
- the headers read like navigation`

const RESPONSE_ALT = `A \`Collapsible\` keeps each section fully independent. Reach for it when users may legitimately need two panels open at once, or when the trigger lives outside the section header.`

const REASONING_STREAMING = `The user wants a dense summary of the caching section.

- Skim the headings for the token cache flow
- Keep code references out of the summary
- Two sentences is enough`

const REASONING_DONE = `Checked the two candidate layouts against the container widths.

- A 12-column grid overflows at 390px
- Stacked layout with a sticky summary wins on every breakpoint`

const WEATHER_INPUT = {
  location: 'San Francisco, CA',
  unit: 'celsius',
  days: 3,
}

const WEATHER_OUTPUT = {
  temperature: 18,
  unit: 'celsius',
  conditions: 'Foggy',
  forecast: [
    { day: 'Tue', high: 19, low: 13 },
    { day: 'Wed', high: 21, low: 14 },
    { day: 'Thu', high: 20, low: 13 },
  ],
}

const FLIGHT_INPUT = {
  from: 'SFO',
  to: 'NRT',
  depart: '2025-03-14',
  passengers: 1,
}

const SUGGESTION_PROMPTS = [
  'Explain this codebase',
  'Write acceptance tests for checkout',
  'Summarize open pull requests',
  'Draft release notes for v2.4',
]

const INITIAL_QUEUE_PROMPTS = [
  {
    id: 'q-1',
    text: 'Audit the remaining zinc classes before release',
    description: 'Left over from the theming pass',
    attachment: 'audit-notes.md',
  },
  {
    id: 'q-2',
    text: 'Generate a changelog entry for the AI elements vendor pass',
    description: undefined,
    attachment: undefined,
  },
]

const QUEUE_TODOS = [
  { id: 'todo-1', title: 'Wire demo registry into the explorer grid', done: true },
  { id: 'todo-2', title: 'Screenshot sweep at 390px', done: false },
]

const ARTIFACT_DOC = `# Deploy checklist

Run these gates before promoting a build:

1. \`bun run lint\` — zero warnings
2. \`bunx tsc --noEmit\` — no new errors
3. Visual sweep at 390px and 1280px

> Ship the registry JSON before tagging the release.`

const CONTEXT_USAGE = {
  inputTokens: 143200,
  inputTokenDetails: {
    noCacheTokens: 134800,
    cacheReadTokens: 8400,
    cacheWriteTokens: 0,
  },
  outputTokens: 5200,
  outputTokenDetails: { textTokens: 4000, reasoningTokens: 1200 },
  totalTokens: 148400,
  // Read by the Context rows via passthrough casts.
  reasoningTokens: 1200,
  cachedInputTokens: 8400,
}

const TRIAGE_TOOLS = [
  {
    description: 'search_tickets — search the support inbox by keyword and status',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Free-text query' },
        status: { type: 'string', enum: ['open', 'pending', 'closed'] },
      },
      required: ['query'],
    },
  },
  {
    description: 'apply_label — attach a routing label to a ticket',
    inputSchema: {
      type: 'object',
      properties: {
        ticketId: { type: 'string' },
        label: { type: 'string', enum: ['billing', 'bug', 'feature-request'] },
      },
      required: ['ticketId', 'label'],
    },
  },
] as unknown as AiTool[]

const TRIAGE_OUTPUT_SCHEMA = `type TriageResult = {
  priority: 'low' | 'normal' | 'urgent'
  category: 'billing' | 'bug' | 'feature-request'
  suggestedAssignee: string
}`

/* ------------------------------------------------------------------ */
/* Shimmer                                                             */
/* ------------------------------------------------------------------ */

export function ShimmerDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4 text-center">
        <Shimmer className="font-medium text-lg" duration={1.6}>
          Generating response...
        </Shimmer>
        <Shimmer className="text-muted-foreground text-sm" duration={2} spread={3}>
          Searching 42 indexed documents
        </Shimmer>
        <Shimmer className="text-muted-foreground text-xs" duration={2.4}>
          Compiling the changelog
        </Shimmer>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Conversation                                                        */
/* ------------------------------------------------------------------ */

export function ConversationDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Conversation className="h-80 w-full max-w-md rounded-lg border bg-muted/20">
        <ConversationContent className="gap-5 text-sm">
          {CONVERSATION_MESSAGES.map((message) => (
            <Message key={message.id} from={message.role}>
              <MessageContent>
                {message.parts.map((part, index) =>
                  part.type === 'text' ? (
                    <MessageResponse key={index}>{part.text}</MessageResponse>
                  ) : null
                )}
              </MessageContent>
            </Message>
          ))}
        </ConversationContent>
        <ConversationDownload
          filename="gray-ui-conversation.md"
          messages={CONVERSATION_MESSAGES}
        />
        <ConversationScrollButton />
      </Conversation>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Message                                                             */
/* ------------------------------------------------------------------ */

export function MessageDemo() {
  const [copied, setCopied] = React.useState(false)
  const [feedback, setFeedback] = React.useState<'up' | 'down' | null>(null)
  const copyTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current)
      }
    },
    []
  )

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(RESPONSE_PRIMARY)
    } catch {
      // Clipboard may be unavailable; the pressed state still demonstrates.
    }
    setCopied(true)
    if (copyTimer.current) {
      clearTimeout(copyTimer.current)
    }
    copyTimer.current = setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Message from="user">
          <MessageContent>{USER_QUESTION}</MessageContent>
        </Message>
        <Message from="assistant">
          <MessageBranch defaultBranch={0}>
            <MessageBranchContent key="primary">
              <MessageContent>
                <MessageResponse>{RESPONSE_PRIMARY}</MessageResponse>
              </MessageContent>
            </MessageBranchContent>
            <MessageBranchContent key="alt">
              <MessageContent>
                <MessageResponse>{RESPONSE_ALT}</MessageResponse>
              </MessageContent>
            </MessageBranchContent>
            <MessageToolbar>
              <MessageBranchSelector>
                <MessageBranchPrevious />
                <MessageBranchPage />
                <MessageBranchNext />
              </MessageBranchSelector>
              <MessageActions>
                <MessageAction
                  label="Copy response"
                  onClick={handleCopy}
                  tooltip={copied ? 'Copied' : 'Copy'}
                >
                  {copied ? (
                    <CheckIcon className="size-4" />
                  ) : (
                    <CopyIcon className="size-4" />
                  )}
                </MessageAction>
                <MessageAction
                  label="Good response"
                  onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                  tooltip="Good response"
                  variant={feedback === 'up' ? 'secondary' : 'ghost'}
                >
                  <ThumbsUpIcon className="size-4" />
                </MessageAction>
                <MessageAction
                  label="Bad response"
                  onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                  tooltip="Bad response"
                  variant={feedback === 'down' ? 'secondary' : 'ghost'}
                >
                  <ThumbsDownIcon className="size-4" />
                </MessageAction>
                <MessageAction
                  label="Regenerate"
                  onClick={() => setFeedback(null)}
                  tooltip="Regenerate"
                >
                  <RefreshCwIcon className="size-4" />
                </MessageAction>
              </MessageActions>
            </MessageToolbar>
          </MessageBranch>
        </Message>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Prompt Input                                                        */
/* ------------------------------------------------------------------ */

export function PromptInputDemo() {
  const [status, setStatus] = React.useState<ChatStatus>('ready')
  const [model, setModel] = React.useState('gray-1')
  const [lastSent, setLastSent] = React.useState<string | null>(null)
  const timers = React.useRef<ReturnType<typeof setTimeout>[]>([])

  React.useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
    },
    []
  )

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const handleSubmit = ({ text }: PromptInputMessage) => {
    const value = text.trim()
    if (!value || status !== 'ready') {
      return
    }
    setLastSent(value)
    setStatus('submitted')
    // Short fake hand-off so the submit button cycles its states.
    timers.current.push(
      setTimeout(() => {
        setStatus('streaming')
        timers.current.push(setTimeout(() => setStatus('ready'), 800))
      }, 600)
    )
  }

  const handleStop = () => {
    clearTimers()
    setStatus('ready')
  }

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-2">
        <PromptInput onSubmit={handleSubmit}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Reply to the support thread..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputActionMenu>
                <PromptInputActionMenuTrigger tooltip="Add" />
                <PromptInputActionMenuContent>
                  <PromptInputActionMenuItem onSelect={(event) => event.preventDefault()}>
                    <PaperclipIcon className="size-4" />
                    Attach file
                  </PromptInputActionMenuItem>
                  <PromptInputActionMenuItem onSelect={(event) => event.preventDefault()}>
                    <ImageIcon className="size-4" />
                    Add image
                  </PromptInputActionMenuItem>
                </PromptInputActionMenuContent>
              </PromptInputActionMenu>
              <PromptInputButton tooltip="Mention teammate">
                <AtSignIcon className="size-4" />
              </PromptInputButton>
              <PromptInputSelect onValueChange={setModel} value={model}>
                <PromptInputSelectTrigger aria-label="Model" className="w-[8.5rem]">
                  <PromptInputSelectValue />
                </PromptInputSelectTrigger>
                <PromptInputSelectContent>
                  <PromptInputSelectItem value="gray-1">gray-1</PromptInputSelectItem>
                  <PromptInputSelectItem value="gray-1-mini">
                    gray-1-mini
                  </PromptInputSelectItem>
                  <PromptInputSelectItem value="gray-2-proto">
                    gray-2-proto
                  </PromptInputSelectItem>
                </PromptInputSelectContent>
              </PromptInputSelect>
            </PromptInputTools>
            <PromptInputSubmit onStop={handleStop} status={status} />
          </PromptInputFooter>
        </PromptInput>
        <p className="text-muted-foreground text-xs">
          {status === 'submitted' && 'Prompt queued...'}
          {status === 'streaming' && 'Streaming response...'}
          {status === 'ready' &&
            (lastSent ? `Last prompt: ${lastSent}` : 'Type a prompt and press Enter')}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Reasoning                                                           */
/* ------------------------------------------------------------------ */

export function ReasoningDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Reasoning isStreaming>
          <ReasoningTrigger />
          <ReasoningContent>{REASONING_STREAMING}</ReasoningContent>
        </Reasoning>
        <Reasoning defaultOpen={false} duration={6} isStreaming={false}>
          <ReasoningTrigger />
          <ReasoningContent>{REASONING_DONE}</ReasoningContent>
        </Reasoning>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Chain of Thought                                                    */
/* ------------------------------------------------------------------ */

export function ChainOfThoughtDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <ChainOfThought className="w-full max-w-md" defaultOpen>
        <ChainOfThoughtHeader>Comparing registry strategies</ChainOfThoughtHeader>
        <ChainOfThoughtContent>
          <ChainOfThoughtStep
            description="48 AI components found"
            icon={SearchIcon}
            label="Scanned the components directory"
            status="complete"
          />
          <ChainOfThoughtStep
            icon={FileTextIcon}
            label="Read the registry mapping"
            status="complete"
          >
            <ChainOfThoughtSearchResults>
              <ChainOfThoughtSearchResult>ai-chat.tsx</ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>
                components-explorer.tsx
              </ChainOfThoughtSearchResult>
              <ChainOfThoughtSearchResult>worklog.md</ChainOfThoughtSearchResult>
            </ChainOfThoughtSearchResults>
          </ChainOfThoughtStep>
          <ChainOfThoughtStep
            description="Grouping by component family and demo file"
            icon={SparklesIcon}
            label="Drafting the mapping table"
            status="active"
          />
          <ChainOfThoughtStep
            description="Publishes once the table is reviewed"
            icon={CircleDashedIcon}
            label="Publish the summary"
            status="pending"
          />
        </ChainOfThoughtContent>
      </ChainOfThought>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Task                                                                */
/* ------------------------------------------------------------------ */

export function TaskDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-5">
        <Task defaultOpen>
          <TaskTrigger title="Refactored the auth flow across 4 files" />
          <TaskContent>
            <TaskItem>
              Read <TaskItemFile><FileCode2Icon className="size-3" /> session.ts</TaskItemFile>{' '}
              to map the token refresh path
            </TaskItem>
            <TaskItem>
              Edited{' '}
              <TaskItemFile>
                <PencilIcon className="size-3" /> middleware.ts
              </TaskItemFile>{' '}
              to rotate cookies on 401
            </TaskItem>
            <TaskItem>Updated the session fixture and its snapshot</TaskItem>
            <TaskItem>Ran the auth test suite — 14 passing</TaskItem>
          </TaskContent>
        </Task>
        <Task defaultOpen={false}>
          <TaskTrigger title="Skipped 3 legacy files" />
          <TaskContent>
            <TaskItem>
              <TaskItemFile><FileCode2Icon className="size-3" /> oauth-v1.ts</TaskItemFile>{' '}
              — deprecated, removal tracked separately
            </TaskItem>
            <TaskItem>
              <TaskItemFile><FileCode2Icon className="size-3" /> hash-utils.js</TaskItemFile>{' '}
              — still imported by the CLI
            </TaskItem>
          </TaskContent>
        </Task>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Plan                                                                */
/* ------------------------------------------------------------------ */

export function PlanDemo() {
  const [approved, setApproved] = React.useState(false)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Plan className="w-full max-w-md" defaultOpen>
        <PlanHeader>
          <div className="space-y-1.5">
            <PlanTitle>Restructure the pricing page</PlanTitle>
            <PlanDescription>
              Three steps: extract the plan table, add the annual toggle, wire analytics.
            </PlanDescription>
          </div>
          <PlanTrigger />
        </PlanHeader>
        <PlanContent>
          <ol className="list-decimal space-y-2 pl-4 text-sm">
            <li>Extract the plan comparison into a shared PricingTable component</li>
            <li>Add the monthly/annual toggle with lifted state</li>
            <li>Emit pricing_view and pricing_toggle events</li>
          </ol>
        </PlanContent>
        <PlanFooter className="justify-end gap-2">
          {approved ? (
            <>
              <Badge variant="secondary">
                <CheckIcon className="size-3" />
                Approved
              </Badge>
              <Button
                onClick={() => setApproved(false)}
                size="sm"
                variant="ghost"
              >
                Undo
              </Button>
            </>
          ) : (
            <Button onClick={() => setApproved(true)} size="sm">
              Approve plan
            </Button>
          )}
        </PlanFooter>
      </Plan>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Tool                                                                */
/* ------------------------------------------------------------------ */

export function ToolDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-3">
        <Tool defaultOpen>
          <ToolHeader state="output-available" title="get_weather" type="tool-get_weather" />
          <ToolContent>
            <ToolInput input={WEATHER_INPUT} />
            <ToolOutput errorText={undefined} output={WEATHER_OUTPUT} />
          </ToolContent>
        </Tool>
        <Tool defaultOpen={false}>
          <ToolHeader state="input-available" title="search_flights" type="tool-search_flights" />
          <ToolContent>
            <ToolInput input={FLIGHT_INPUT} />
          </ToolContent>
        </Tool>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Confirmation                                                        */
/* ------------------------------------------------------------------ */

export function ConfirmationDemo() {
  const [decision, setDecision] = React.useState<'pending' | 'approved' | 'rejected'>(
    'pending'
  )

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-2">
        <Confirmation
          approval={
            decision === 'pending'
              ? { id: 'run-migration' }
              : { id: 'run-migration', approved: decision === 'approved' }
          }
          state={
            decision === 'pending' ? 'approval-requested' : 'approval-responded'
          }
        >
          <ConfirmationTitle>
            The agent wants to run{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-xs">
              bun run db:push
            </code>{' '}
            against the production database.
          </ConfirmationTitle>
          <ConfirmationRequest>
            <ConfirmationActions>
              <ConfirmationAction
                onClick={() => setDecision('rejected')}
                variant="outline"
              >
                Reject
              </ConfirmationAction>
              <ConfirmationAction onClick={() => setDecision('approved')}>
                Allow
              </ConfirmationAction>
            </ConfirmationActions>
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <p className="text-muted-foreground text-sm">
              Approved — command queued for execution.
            </p>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <p className="text-muted-foreground text-sm">
              Rejected — the agent will not run this command.
            </p>
          </ConfirmationRejected>
        </Confirmation>
        {decision !== 'pending' && (
          <Button onClick={() => setDecision('pending')} size="sm" variant="ghost">
            <RotateCcwIcon className="size-3.5" />
            Reset
          </Button>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Suggestion                                                          */
/* ------------------------------------------------------------------ */

export function SuggestionDemo() {
  const [picked, setPicked] = React.useState<string | null>(null)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-3">
        <Suggestions>
          {SUGGESTION_PROMPTS.map((prompt) => (
            <Suggestion
              key={prompt}
              onClick={setPicked}
              suggestion={prompt}
              variant={picked === prompt ? 'secondary' : 'outline'}
            />
          ))}
        </Suggestions>
        <p className="text-muted-foreground text-sm">
          {picked ? `Selected: ${picked}` : 'Pick a prompt to continue the conversation'}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Queue                                                               */
/* ------------------------------------------------------------------ */

export function QueueDemo() {
  const [prompts, setPrompts] = React.useState(INITIAL_QUEUE_PROMPTS)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <Queue className="w-full max-w-sm">
        <QueueSection defaultOpen>
          <QueueSectionTrigger>
            <QueueSectionLabel
              count={prompts.length}
              icon={<InboxIcon className="size-4" />}
              label="messages queued"
            />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {prompts.map((prompt) => (
                <QueueItem key={prompt.id}>
                  <div className="flex items-start gap-2">
                    <QueueItemIndicator />
                    <QueueItemContent>{prompt.text}</QueueItemContent>
                    <QueueItemActions>
                      <QueueItemAction
                        aria-label="Remove from queue"
                        onClick={() =>
                          setPrompts((previous) =>
                            previous.filter((item) => item.id !== prompt.id)
                          )
                        }
                      >
                        <Trash2Icon className="size-3.5" />
                      </QueueItemAction>
                    </QueueItemActions>
                  </div>
                  {prompt.description && (
                    <QueueItemDescription>{prompt.description}</QueueItemDescription>
                  )}
                  {prompt.attachment && (
                    <QueueItemAttachment>
                      <QueueItemFile>{prompt.attachment}</QueueItemFile>
                    </QueueItemAttachment>
                  )}
                </QueueItem>
              ))}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
        <QueueSection defaultOpen={false}>
          <QueueSectionTrigger>
            <QueueSectionLabel
              count={QUEUE_TODOS.length}
              icon={<ListTodoIcon className="size-4" />}
              label="todos"
            />
          </QueueSectionTrigger>
          <QueueSectionContent>
            <QueueList>
              {QUEUE_TODOS.map((todo) => (
                <QueueItem key={todo.id}>
                  <div className="flex items-start gap-2">
                    <QueueItemIndicator completed={todo.done} />
                    <QueueItemContent completed={todo.done}>{todo.title}</QueueItemContent>
                  </div>
                </QueueItem>
              ))}
            </QueueList>
          </QueueSectionContent>
        </QueueSection>
      </Queue>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Artifact                                                            */
/* ------------------------------------------------------------------ */

export function ArtifactDemo() {
  const [open, setOpen] = React.useState(true)

  return (
    <div className="flex w-full items-center justify-center p-4">
      {open ? (
        <Artifact className="h-80 w-full max-w-md">
          <ArtifactHeader>
            <div className="min-w-0 space-y-0.5">
              <ArtifactTitle>deploy-checklist.md</ArtifactTitle>
              <ArtifactDescription>Markdown · updated just now</ArtifactDescription>
            </div>
            <ArtifactActions>
              <ArtifactAction icon={CopyIcon} label="Copy" tooltip="Copy" />
              <ArtifactAction icon={DownloadIcon} label="Download" tooltip="Download" />
              <ArtifactClose onClick={() => setOpen(false)} />
            </ArtifactActions>
          </ArtifactHeader>
          <ArtifactContent className="text-sm">
            <MessageResponse>{ARTIFACT_DOC}</MessageResponse>
          </ArtifactContent>
        </Artifact>
      ) : (
        <Button onClick={() => setOpen(true)} size="sm" variant="outline">
          Reopen artifact
        </Button>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Context                                                             */
/* ------------------------------------------------------------------ */

export function ContextDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="space-y-2 text-center">
        <Context
          maxTokens={200000}
          modelId="anthropic/claude-sonnet-4"
          usage={CONTEXT_USAGE}
          usedTokens={148400}
        >
          <ContextTrigger />
          <ContextContent>
            <ContextContentHeader />
            <ContextContentBody className="space-y-1.5">
              <ContextInputUsage />
              <ContextOutputUsage />
              <ContextReasoningUsage />
              <ContextCacheUsage />
            </ContextContentBody>
            <ContextContentFooter />
          </ContextContent>
        </Context>
        <p className="text-muted-foreground text-xs">
          Hover the meter for the per-token cost breakdown
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Agent                                                               */
/* ------------------------------------------------------------------ */

export function AgentDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Agent className="w-full max-w-md">
        <AgentHeader model="gray-1" name="Support triage agent" />
        <AgentContent>
          <AgentInstructions>
            Classify incoming tickets by severity, route billing issues to the finance
            queue, and draft a first reply for reproducible bugs.
          </AgentInstructions>
          <AgentTools collapsible defaultValue="tool-0" type="single">
            {TRIAGE_TOOLS.map((tool, index) => (
              <AgentTool key={`tool-${index}`} tool={tool} value={`tool-${index}`} />
            ))}
          </AgentTools>
          <AgentOutput schema={TRIAGE_OUTPUT_SCHEMA} />
        </AgentContent>
      </Agent>
    </div>
  )
}
