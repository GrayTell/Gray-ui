/**
 * AI catalog entries — chat, agent and reasoning UI components.
 * Descriptions come from the registry metadata
 * (src/registry/ai-elements-meta.json) so the catalog and the /r registry
 * never drift. Demos live in src/components/site/demos/ai-{chat,code,media}.
 */
import type { ComponentType } from 'react'

import dynamic from 'next/dynamic'

import type { ComponentEntry } from '@/lib/component-registry'
import { AI_ELEMENTS_ITEMS, type GrayItem } from '@/lib/registry'

/**
 * Demos are code-split with next/dynamic: the AI demo files pull heavy deps
 * (shiki, streamdown, @xyflow/react, @rive-app) that must NOT be compiled
 * into every page graph. Each chunk loads on demand when its element is
 * selected in the /components explorer.
 */
const loadChat = () => import('@/components/site/demos/ai-chat')
const loadCode = () => import('@/components/site/demos/ai-code')
const loadMedia = () => import('@/components/site/demos/ai-media')

function fromChat(key: string): ComponentType {
  return dynamic(
    () => loadChat().then((m) => m[key as keyof Awaited<ReturnType<typeof loadChat>>] as ComponentType)
  )
}
function fromCode(key: string): ComponentType {
  return dynamic(
    () => loadCode().then((m) => m[key as keyof Awaited<ReturnType<typeof loadCode>>] as ComponentType)
  )
}
function fromMedia(key: string): ComponentType {
  return dynamic(
    () => loadMedia().then((m) => m[key as keyof Awaited<ReturnType<typeof loadMedia>>] as ComponentType)
  )
}

const ShimmerDemo = fromChat('ShimmerDemo')
const ConversationDemo = fromChat('ConversationDemo')
const MessageDemo = fromChat('MessageDemo')
const PromptInputDemo = fromChat('PromptInputDemo')
const ReasoningDemo = fromChat('ReasoningDemo')
const ChainOfThoughtDemo = fromChat('ChainOfThoughtDemo')
const TaskDemo = fromChat('TaskDemo')
const PlanDemo = fromChat('PlanDemo')
const ToolDemo = fromChat('ToolDemo')
const ConfirmationDemo = fromChat('ConfirmationDemo')
const SuggestionDemo = fromChat('SuggestionDemo')
const QueueDemo = fromChat('QueueDemo')
const ArtifactDemo = fromChat('ArtifactDemo')
const ContextDemo = fromChat('ContextDemo')
const AgentDemo = fromChat('AgentDemo')

const CodeBlockDemo = fromCode('CodeBlockDemo')
const SnippetDemo = fromCode('SnippetDemo')
const TerminalDemo = fromCode('TerminalDemo')
const StackTraceDemo = fromCode('StackTraceDemo')
const TestResultsDemo = fromCode('TestResultsDemo')
const EnvironmentVariablesDemo = fromCode('EnvironmentVariablesDemo')
const FileTreeDemo = fromCode('FileTreeDemo')
const PackageInfoDemo = fromCode('PackageInfoDemo')
const SchemaDisplayDemo = fromCode('SchemaDisplayDemo')
const JsxPreviewDemo = fromCode('JsxPreviewDemo')
const SandboxDemo = fromCode('SandboxDemo')
const CommitDemo = fromCode('CommitDemo')
const OpenInChatDemo = fromCode('OpenInChatDemo')

const ImageDemo = fromMedia('ImageDemo')
const InlineCitationDemo = fromMedia('InlineCitationDemo')
const SourcesDemo = fromMedia('SourcesDemo')
const AttachmentsDemo = fromMedia('AttachmentsDemo')
const AudioPlayerDemo = fromMedia('AudioPlayerDemo')
const MicSelectorDemo = fromMedia('MicSelectorDemo')
const SpeechInputDemo = fromMedia('SpeechInputDemo')
const TranscriptionDemo = fromMedia('TranscriptionDemo')
const VoiceSelectorDemo = fromMedia('VoiceSelectorDemo')
const PersonaDemo = fromMedia('PersonaDemo')
const WebPreviewDemo = fromMedia('WebPreviewDemo')
const CanvasDemo = fromMedia('CanvasDemo')
const NodeDemo = fromMedia('NodeDemo')
const EdgeDemo = fromMedia('EdgeDemo')
const ConnectionDemo = fromMedia('ConnectionDemo')
const ControlsDemo = fromMedia('ControlsDemo')
const PanelDemo = fromMedia('PanelDemo')
const ToolbarDemo = fromMedia('ToolbarDemo')
const CheckpointDemo = fromMedia('CheckpointDemo')
const ModelSelectorDemo = fromMedia('ModelSelectorDemo')

/** Registry metadata for an AI element by slug (guaranteed present). */
function aiMeta(slug: string): GrayItem {
  const item = AI_ELEMENTS_ITEMS.find((entry) => entry.name === slug)
  if (!item) throw new Error(`Unknown AI element: ${slug}`)
  return item
}

/** Guard so slugs stay honest. */
const DEMOS: Record<string, ComponentType> = {
  shimmer: ShimmerDemo,
  conversation: ConversationDemo,
  message: MessageDemo,
  'prompt-input': PromptInputDemo,
  reasoning: ReasoningDemo,
  'chain-of-thought': ChainOfThoughtDemo,
  task: TaskDemo,
  plan: PlanDemo,
  tool: ToolDemo,
  confirmation: ConfirmationDemo,
  suggestion: SuggestionDemo,
  queue: QueueDemo,
  artifact: ArtifactDemo,
  context: ContextDemo,
  agent: AgentDemo,
  'code-block': CodeBlockDemo,
  snippet: SnippetDemo,
  terminal: TerminalDemo,
  'stack-trace': StackTraceDemo,
  'test-results': TestResultsDemo,
  'environment-variables': EnvironmentVariablesDemo,
  'file-tree': FileTreeDemo,
  'package-info': PackageInfoDemo,
  'schema-display': SchemaDisplayDemo,
  'jsx-preview': JsxPreviewDemo,
  sandbox: SandboxDemo,
  commit: CommitDemo,
  'open-in-chat': OpenInChatDemo,
  image: ImageDemo,
  'inline-citation': InlineCitationDemo,
  sources: SourcesDemo,
  attachments: AttachmentsDemo,
  'audio-player': AudioPlayerDemo,
  'mic-selector': MicSelectorDemo,
  'speech-input': SpeechInputDemo,
  transcription: TranscriptionDemo,
  'voice-selector': VoiceSelectorDemo,
  persona: PersonaDemo,
  'web-preview': WebPreviewDemo,
  canvas: CanvasDemo,
  node: NodeDemo,
  edge: EdgeDemo,
  connection: ConnectionDemo,
  controls: ControlsDemo,
  panel: PanelDemo,
  toolbar: ToolbarDemo,
  checkpoint: CheckpointDemo,
  'model-selector': ModelSelectorDemo,
}

/** Concise usage snippet per element, shown in the Code tab. */
const USAGE: Record<string, string> = {
  shimmer: `import { Shimmer } from "@/components/ai-elements/shimmer"

export function Demo() {
  return <Shimmer>Generating response...</Shimmer>
}`,
  conversation: `import {
  Conversation, ConversationContent, ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"

export function Demo() {
  return (
    <Conversation className="h-80">
      <ConversationContent>
        {messages.map((m) => (
          <Message key={m.id} from={m.role}>
            <MessageContent>
              <MessageResponse>{m.text}</MessageResponse>
            </MessageContent>
          </Message>
        ))}
      </ConversationContent>
      <ConversationScrollButton />
    </Conversation>
  )
}`,
  message: `import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message"

export function Demo() {
  return (
    <Message from="assistant">
      <MessageContent>
        <MessageResponse>Markdown-safe streaming output.</MessageResponse>
      </MessageContent>
    </Message>
  )
}`,
  'prompt-input': `import {
  PromptInput, PromptInputBody, PromptInputTextarea,
  PromptInputToolbar, PromptInputActions, PromptInputSubmit,
} from "@/components/ai-elements/prompt-input"

export function Demo() {
  return (
    <PromptInput onSubmit={(message) => send(message)}>
      <PromptInputBody>
        <PromptInputTextarea placeholder="Ask anything..." />
      </PromptInputBody>
      <PromptInputToolbar>
        <PromptInputActions>{/* tools, mic, model */}</PromptInputActions>
        <PromptInputSubmit status="ready" />
      </PromptInputToolbar>
    </PromptInput>
  )
}`,
  reasoning: `import { Reasoning, ReasoningTrigger, ReasoningContent } from "@/components/ai-elements/reasoning"

export function Demo() {
  return (
    <Reasoning isStreaming={false} duration={6}>
      <ReasoningTrigger />
      <ReasoningContent>{thinkingText}</ReasoningContent>
    </Reasoning>
  )
}`,
  'chain-of-thought': `import {
  ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtStep,
} from "@/components/ai-elements/chain-of-thought"

export function Demo() {
  return (
    <ChainOfThought defaultOpen>
      <ChainOfThoughtHeader label="Researching" />
      <ChainOfThoughtStep status="complete">Parsed the query</ChainOfThoughtStep>
      <ChainOfThoughtStep status="active">Comparing sources</ChainOfThoughtStep>
    </ChainOfThought>
  )
}`,
  task: `import { Task, TaskTrigger, TaskContent, TaskItem } from "@/components/ai-elements/task"

export function Demo() {
  return (
    <Task defaultOpen>
      <TaskTrigger title="Deploying site" />
      <TaskContent>
        <TaskItem status="complete">Build passed</TaskItem>
      </TaskContent>
    </Task>
  )
}`,
  plan: `import { Plan, PlanHeader, PlanTitle, PlanContent, PlanAction } from "@/components/ai-elements/plan"

export function Demo() {
  return (
    <Plan>
      <PlanHeader>
        <PlanTitle>Migrate to the new registry</PlanTitle>
        <PlanAction>Approve</PlanAction>
      </PlanHeader>
      <PlanContent>{steps}</PlanContent>
    </Plan>
  )
}`,
  tool: `import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@/components/ai-elements/tool"

export function Demo() {
  return (
    <Tool defaultOpen>
      <ToolHeader type="tool-get_weather" state="output-available" />
      <ToolContent>
        <ToolInput input={{ city: "Dubai" }} />
        <ToolOutput output={{ temp: 34 }} />
      </ToolContent>
    </Tool>
  )
}`,
  confirmation: `import { Confirmation, ConfirmationActions, ConfirmationAction } from "@/components/ai-elements/confirmation"

export function Demo() {
  return (
    <Confirmation state="approval-requested" onChange={respond}>
      <ConfirmationActions>
        <ConfirmationAction variant="outline">Reject</ConfirmationAction>
        <ConfirmationAction>Allow</ConfirmationAction>
      </ConfirmationActions>
    </Confirmation>
  )
}`,
  suggestion: `import { Suggestions, Suggestion } from "@/components/ai-elements/suggestion"

export function Demo() {
  return (
    <Suggestions>
      {prompts.map((p) => <Suggestion key={p} suggestion={p} />)}
    </Suggestions>
  )
}`,
  queue: `import { Queue, QueueItem, QueueItemContent, QueueItemIndicator } from "@/components/ai-elements/queue"

export function Demo() {
  return (
    <Queue>
      {queued.map((q) => (
        <QueueItem key={q.id}>
          <QueueItemIndicator status="queued" />
          <QueueItemContent>{q.text}</QueueItemContent>
        </QueueItem>
      ))}
    </Queue>
  )
}`,
  artifact: `import {
  Artifact, ArtifactHeader, ArtifactTitle, ArtifactActions, ArtifactContent,
} from "@/components/ai-elements/artifact"

export function Demo() {
  return (
    <Artifact>
      <ArtifactHeader>
        <ArtifactTitle>launch-plan.md</ArtifactTitle>
        <ArtifactActions>{/* copy, download, close */}</ArtifactActions>
      </ArtifactHeader>
      <ArtifactContent>{markdown}</ArtifactContent>
    </Artifact>
  )
}`,
  context: `import { Context, ContextTrigger, ContextContent } from "@/components/ai-elements/context"

export function Demo() {
  return (
    <Context usage={usage} modelId="anthropic/claude-sonnet-4">
      <ContextTrigger />
      <ContextContent>{/* header, body rows, footer */}</ContextContent>
    </Context>
  )
}`,
  agent: `import {
  Agent, AgentHeader, AgentInstructions, AgentTools, AgentTool,
} from "@/components/ai-elements/agent"

export function Demo() {
  return (
    <Agent>
      <AgentHeader name="Researcher" model="claude-sonnet-4" />
      <AgentInstructions>{instructions}</AgentInstructions>
      <AgentTools>
        {tools.map((t) => <AgentTool key={t.name} tool={t} />)}
      </AgentTools>
    </Agent>
  )
}`,
  'code-block': `import { CodeBlock } from "@/components/ai-elements/code-block"

export function Demo() {
  return <CodeBlock code={source} language="tsx" filename="app/page.tsx" />
}`,
  snippet: `import { Snippet, SnippetText, SnippetCopyButton } from "@/components/ai-elements/snippet"

export function Demo() {
  return (
    <Snippet>
      <SnippetText>npx shadcn@latest add @gray/shimmer</SnippetText>
      <SnippetCopyButton value="npx shadcn@latest add @gray/shimmer" />
    </Snippet>
  )
}`,
  terminal: `import { Terminal, TerminalHeader, TerminalTitle, TerminalContent } from "@/components/ai-elements/terminal"

export function Demo() {
  return (
    <Terminal>
      <TerminalHeader>
        <TerminalTitle>build</TerminalTitle>
      </TerminalHeader>
      <TerminalContent>{lines}</TerminalContent>
    </Terminal>
  )
}`,
  'stack-trace': `import { StackTrace, StackTraceError, StackTraceContent } from "@/components/ai-elements/stack-trace"

export function Demo() {
  return (
    <StackTrace>
      <StackTraceError errorType="TypeError" message="x is not a function" />
      <StackTraceContent>{frames}</StackTraceContent>
    </StackTrace>
  )
}`,
  'test-results': `import { TestResults, TestResultsHeader, TestResultsContent } from "@/components/ai-elements/test-results"

export function Demo() {
  return (
    <TestResults>
      <TestResultsHeader passed={6} failed={1} skipped={1} duration={1240} />
      <TestResultsContent>{suites}</TestResultsContent>
    </TestResults>
  )
}`,
  'environment-variables': `import { EnvironmentVariables, EnvironmentVariable } from "@/components/ai-elements/environment-variables"

export function Demo() {
  return (
    <EnvironmentVariables>
      {vars.map((v) => <EnvironmentVariable key={v.key} {...v} />)}
    </EnvironmentVariables>
  )
}`,
  'file-tree': `import { FileTree, FileTreeFolder, FileTreeFile, FileTreeName } from "@/components/ai-elements/file-tree"

export function Demo() {
  return (
    <FileTree>
      <FileTreeFolder name="app">
        <FileTreeFile name="page.tsx" />
      </FileTreeFolder>
    </FileTree>
  )
}`,
  'package-info': `import { PackageInfo, PackageInfoName, PackageInfoVersion } from "@/components/ai-elements/package-info"

export function Demo() {
  return (
    <PackageInfo changeType="minor">
      <PackageInfoName>ai</PackageInfoName>
      <PackageInfoVersion from="5.0.0" to="5.1.0" />
    </PackageInfo>
  )
}`,
  'schema-display': `import { SchemaDisplay, SchemaDisplayHeader, SchemaDisplayMethod } from "@/components/ai-elements/schema-display"

export function Demo() {
  return (
    <SchemaDisplay>
      <SchemaDisplayHeader>
        <SchemaDisplayMethod method="POST" />
        /v1/products
      </SchemaDisplayHeader>
      {/* parameters + body */}
    </SchemaDisplay>
  )
}`,
  'jsx-preview': `import { JSXPreview, JSXPreviewContent } from "@/components/ai-elements/jsx-preview"

export function Demo() {
  return (
    <JSXPreview code={jsxString} components={{ Card, Badge }}>
      <JSXPreviewContent />
    </JSXPreview>
  )
}`,
  sandbox: `import { Sandbox, SandboxHeader, SandboxContent, SandboxTabs } from "@/components/ai-elements/sandbox"

export function Demo() {
  return (
    <Sandbox>
      <SandboxHeader status="completed" />
      <SandboxContent>
        <SandboxTabs>{/* preview, console, files */}</SandboxTabs>
      </SandboxContent>
    </Sandbox>
  )
}`,
  commit: `import { Commit, CommitHash, CommitMessage, CommitMetadata } from "@/components/ai-elements/commit"

export function Demo() {
  return (
    <Commit>
      <CommitHash>a1b2c3d</CommitHash>
      <CommitMessage>feat: add AI components</CommitMessage>
      <CommitMetadata author="graytell" time="2h ago" />
    </Commit>
  )
}`,
  'open-in-chat': `import { OpenIn, OpenInTrigger, OpenInContent, OpenInItem } from "@/components/ai-elements/open-in-chat"

export function Demo() {
  return (
    <OpenIn query={prompt}>
      <OpenInTrigger />
      <OpenInContent>
        <OpenInItem provider="chatgpt" />
        <OpenInItem provider="claude" />
      </OpenInContent>
    </OpenIn>
  )
}`,
  image: `import { Image } from "@/components/ai-elements/image"

export function Demo() {
  return <Image base64={...} mediaType="image/png" status="uploaded" />
}`,
  'inline-citation': `import { InlineCitation, InlineCitationText, InlineCitationCard } from "@/components/ai-elements/inline-citation"

export function Demo() {
  return (
    <InlineCitation>
      <InlineCitationText>Claim is supported by research</InlineCitationText>
      <InlineCitationCard sources={sources} />
    </InlineCitation>
  )
}`,
  sources: `import { Sources, SourcesTrigger, SourcesContent, Source } from "@/components/ai-elements/sources"

export function Demo() {
  return (
    <Sources count={sources.length}>
      <SourcesTrigger />
      <SourcesContent>
        {sources.map((s) => <Source key={s.href} {...s} />)}
      </SourcesContent>
    </Sources>
  )
}`,
  attachments: `import { Attachments, Attachment, AttachmentPreview } from "@/components/ai-elements/attachments"

export function Demo() {
  return (
    <Attachments>
      {files.map((f) => (
        <Attachment key={f.id} data={f}>
          <AttachmentPreview />
        </Attachment>
      ))}
    </Attachments>
  )
}`,
  'audio-player': `import { AudioPlayer, AudioPlayerElement, AudioPlayerControlBar } from "@/components/ai-elements/audio-player"

export function Demo() {
  return (
    <AudioPlayer src={audioUrl}>
      <AudioPlayerElement />
      <AudioPlayerControlBar>{/* play, seek, speed */}</AudioPlayerControlBar>
    </AudioPlayer>
  )
}`,
  'mic-selector': `import { MicSelector } from "@/components/ai-elements/mic-selector"

export function Demo() {
  return <MicSelector value={deviceId} onChange={setDeviceId} />
}`,
  'speech-input': `import { SpeechInput } from "@/components/ai-elements/speech-input"

export function Demo() {
  return <SpeechInput onTranscriptionChange={setText} />
}`,
  transcription: `import { Transcription, TranscriptionSegment } from "@/components/ai-elements/transcription"

export function Demo() {
  return (
    <Transcription>
      {segments.map((s) => <TranscriptionSegment key={s.id} {...s} />)}
    </Transcription>
  )
}`,
  'voice-selector': `import { VoiceSelector } from "@/components/ai-elements/voice-selector"

export function Demo() {
  return <VoiceSelector value={voiceId} onChange={setVoiceId} />
}`,
  persona: `import { Persona } from "@/components/ai-elements/persona"

export function Demo() {
  return <Persona state="thinking" size="md" />
}`,
  'web-preview': `import {
  WebPreview, WebPreviewNavigation, WebPreviewUrl, WebPreviewBody,
} from "@/components/ai-elements/web-preview"

export function Demo() {
  return (
    <WebPreview defaultUrl="https://gray-ui.vercel.app">
      <WebPreviewNavigation />
      <WebPreviewUrl />
      <WebPreviewBody>{iframe}</WebPreviewBody>
    </WebPreview>
  )
}`,
  canvas: `import { Canvas } from "@/components/ai-elements/canvas"
import "@xyflow/react/dist/style.css"

export function Demo() {
  return <Canvas nodes={nodes} edges={edges} fitView className="h-64" />
}`,
  node: `import { Canvas } from "@/components/ai-elements/canvas"
import { Node, NodeHeader, NodeTitle } from "@/components/ai-elements/node"

const nodeTypes = { gray: (props) => (
  <Node {...props}>
    <NodeHeader><NodeTitle>Generate copy</NodeTitle></NodeHeader>
  </Node>
) }`,
  edge: `import { Edge } from "@/components/ai-elements/edge"

export const edges = [
  { id: "e1", source: "a", target: "b", type: "gray" },
]`,
  connection: `import { Connection } from "@/components/ai-elements/connection"

export const nodeTypes = { gray: (props) => (
  <Node {...props}>
    <NodeHeader>
      <Connection />
    </NodeHeader>
  </Node>
) }`,
  controls: `import { Canvas } from "@/components/ai-elements/canvas"
import { Controls } from "@/components/ai-elements/controls"

export function Demo() {
  return (
    <Canvas nodes={nodes} edges={edges} fitView className="h-56">
      <Controls position="bottom-right" />
    </Canvas>
  )
}`,
  panel: `import { Canvas } from "@/components/ai-elements/canvas"
import { Panel } from "@/components/ai-elements/panel"

export function Demo() {
  return (
    <Canvas nodes={nodes} edges={edges} fitView className="h-56">
      <Panel position="top-left">{/* overlay content */}</Panel>
    </Canvas>
  )
}`,
  toolbar: `import { Canvas } from "@/components/ai-elements/canvas"
import { NodeToolbar } from "@xyflow/react"
import { Toolbar } from "@/components/ai-elements/toolbar"

export function Demo() {
  return <Toolbar>{/* actions shown on node selection */}</Toolbar>
}`,
  checkpoint: `import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@/components/ai-elements/checkpoint"

export function Demo() {
  return (
    <Checkpoint>
      <CheckpointIcon />
      <CheckpointTrigger onClick={restore}>Restore checkpoint</CheckpointTrigger>
    </Checkpoint>
  )
}`,
  'model-selector': `import { ModelSelector, ModelSelectorTrigger, ModelSelectorContent } from "@/components/ai-elements/model-selector"

export function Demo() {
  return (
    <ModelSelector value={modelId} onChange={setModelId}>
      <ModelSelectorTrigger />
      <ModelSelectorContent>{/* searchable model list */}</ModelSelectorContent>
    </ModelSelector>
  )
}`,
}

/** AI catalog entries — category "AI". */
export const AI_ENTRIES: ComponentEntry[] = AI_ELEMENTS_ITEMS.map((meta) => {
  const slug = meta.name
  const Demo = DEMOS[slug]
  if (!Demo) throw new Error(`Missing demo for AI element: ${slug}`)
  const title = meta.title
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bJsx\b/g, 'JSX')
    .replace(/\bApi\b/g, 'API')
  return {
    slug,
    name: title,
    category: 'AI',
    description: aiMeta(slug).description,
    Demo,
    code: USAGE[slug] ?? `import { ${title.replace(/\s+/g, '')} } from "@/components/ai-elements/${slug}"\n\nexport function Demo() {\n  return <${title.replace(/\s+/g, '')} />\n}`,
  }
})

/** Marquee elements worth surfacing first inside the AI group. */
export const AI_ENTRY_ORDER: string[] = [
  'shimmer',
  'chain-of-thought',
  'conversation',
  'message',
  'prompt-input',
  'reasoning',
  'task',
  'tool',
  'suggestion',
  'artifact',
  'code-block',
  'context',
]

/** Reordered copy — marquee elements first, then the rest alphabetically. */
export const AI_ENTRIES_SORTED: ComponentEntry[] = [
  ...AI_ENTRY_ORDER.map(
    (slug) => AI_ENTRIES.find((entry) => entry.slug === slug) as ComponentEntry
  ),
  ...AI_ELEMENTS_ITEMS.map((meta) => meta.name)
    .filter((slug) => !AI_ENTRY_ORDER.includes(slug))
    .map((slug) => AI_ENTRIES.find((entry) => entry.slug === slug) as ComponentEntry),
]
