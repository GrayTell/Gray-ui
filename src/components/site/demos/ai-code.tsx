'use client'

import * as React from 'react'
import {
  FileCode2Icon,
  FileJsonIcon,
  FileTextIcon,
  MoreHorizontalIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from '@/components/ai-elements/code-block'
import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariableValue,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
} from '@/components/ai-elements/environment-variables'
import {
  FileTree,
  FileTreeActions,
  FileTreeFile,
  FileTreeIcon,
  FileTreeName,
  FileTreeFolder,
} from '@/components/ai-elements/file-tree'
import {
  JSXPreview,
  JSXPreviewContent,
  JSXPreviewError,
} from '@/components/ai-elements/jsx-preview'
import {
  OpenIn,
  OpenInChatGPT,
  OpenInClaude,
  OpenInContent,
  OpenInCursor,
  OpenInItem,
  OpenInLabel,
  OpenInScira,
  OpenInSeparator,
  OpenInT3,
  OpenInTrigger,
  OpenInv0,
} from '@/components/ai-elements/open-in-chat'
import {
  Commit,
  CommitActions,
  CommitAuthor,
  CommitAuthorAvatar,
  CommitContent,
  CommitCopyButton,
  CommitFile,
  CommitFileAdditions,
  CommitFileChanges,
  CommitFileDeletions,
  CommitFileInfo,
  CommitFileIcon,
  CommitFilePath,
  CommitFileStatus,
  CommitFiles,
  CommitHash,
  CommitHeader,
  CommitInfo,
  CommitMessage,
  CommitMetadata,
  CommitSeparator,
  CommitTimestamp,
} from '@/components/ai-elements/commit'
import {
  PackageInfo,
  PackageInfoChangeType,
  PackageInfoContent,
  PackageInfoDependencies,
  PackageInfoDependency,
  PackageInfoDescription,
  PackageInfoHeader,
  PackageInfoName,
  PackageInfoVersion,
} from '@/components/ai-elements/package-info'
import { SchemaDisplay } from '@/components/ai-elements/schema-display'
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@/components/ai-elements/sandbox'
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
  SnippetText,
} from '@/components/ai-elements/snippet'
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from '@/components/ai-elements/stack-trace'
import {
  Terminal,
  TerminalActions,
  TerminalClearButton,
  TerminalContent,
  TerminalCopyButton,
  TerminalHeader,
  TerminalTitle,
} from '@/components/ai-elements/terminal'
import {
  Test,
  TestError,
  TestErrorMessage,
  TestErrorStack,
  TestResults,
  TestResultsContent,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsProgress,
  TestResultsSummary,
  TestSuite,
  TestSuiteContent,
  TestSuiteName,
  TestSuiteStats,
} from '@/components/ai-elements/test-results'

/* ------------------------------------------------------------------ */
/* Static fixtures                                                     */
/* ------------------------------------------------------------------ */

const CODE_SAMPLE = `import { Button } from "@/components/ui/button"

export function Actions() {
  return (
    <Button variant="outline">Deploy</Button>
  )
}`

const TERMINAL_SAMPLE = `\x1b[90m$\x1b[0m bun run build
\x1b[90m$ next build\x1b[0m
  creating an optimized production build
\x1b[32m done\x1b[0m compiled successfully in 1.8s
\x1b[32m done\x1b[0m collecting page data
\x1b[32m done\x1b[0m generating static pages (14/14)

Route (app)                  Size
- /                          5.2 kB
- /components               12.8 kB

Build completed in \x1b[32m3.4s\x1b[0m`

const STACK_TRACE_SAMPLE = `TypeError: Cannot read properties of undefined (reading 'map')
    at ProductGrid (app/products/page.tsx:42:19)
    at renderWithHooks (node_modules/react-dom/cjs/react-dom.development.js:15486:18)
    at mountIndeterminateComponent (node_modules/react-dom/cjs/react-dom.development.js:20074:13)
    at beginWork (node_modules/react-dom/cjs/react-dom.development.js:21694:16)`

const JSX_PREVIEW_SAMPLE = `
<PreviewPanel title="Parsed at runtime">
  <PreviewButton variant="outline">Outline</PreviewButton>
  <PreviewButton>Primary</PreviewButton>
</PreviewPanel>
`

const SCHEMA_PARAMETERS = [
  {
    name: 'productId',
    type: 'string',
    required: true,
    location: 'path' as const,
    description: 'Unique identifier of the product.',
  },
  {
    name: 'expand',
    type: 'string[]',
    location: 'query' as const,
    description: 'Related resources to include in the response.',
  },
]

const SCHEMA_REQUEST = [
  {
    name: 'name',
    type: 'string',
    required: true,
    description: 'Display name shown to customers.',
  },
  {
    name: 'price',
    type: 'number',
    required: true,
    description: 'Unit price in cents.',
  },
  {
    name: 'metadata',
    type: 'object',
    properties: [
      { name: 'source', type: 'string' },
      { name: 'campaign', type: 'string' },
    ],
  },
  {
    name: 'tags',
    type: 'array',
    items: { name: 'tag', type: 'string' },
  },
]

const SCHEMA_RESPONSE = [
  {
    name: 'id',
    type: 'string',
    description: 'The generated product id.',
  },
  {
    name: 'created',
    type: 'integer',
    description: 'Unix timestamp of creation.',
  },
]

const COMMIT_DATE = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

const PreviewPanel = ({
  title,
  children,
}: {
  title?: string
  children?: React.ReactNode
}) => (
  <div className="rounded-lg border bg-background p-4">
    <p className="font-medium text-sm">{title ?? 'Preview'}</p>
    <p className="mt-1 text-muted-foreground text-xs">
      Rendered by react-jsx-parser from a raw JSX string.
    </p>
    <div className="mt-3 flex items-center gap-2">{children}</div>
  </div>
)

const PreviewButton = ({
  children,
  variant = 'default',
}: {
  children?: React.ReactNode
  variant?: 'default' | 'outline' | 'ghost'
}) => (
  <Button size="sm" variant={variant}>
    {children}
  </Button>
)

/* ------------------------------------------------------------------ */
/* Code Block                                                          */
/* ------------------------------------------------------------------ */

export function CodeBlockDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <CodeBlock code={CODE_SAMPLE} language="tsx" showLineNumbers>
          <CodeBlockHeader>
            <CodeBlockTitle>
              <CodeBlockFilename>actions.tsx</CodeBlockFilename>
            </CodeBlockTitle>
            <CodeBlockActions>
              <CodeBlockLanguageSelector defaultValue="tsx">
                <CodeBlockLanguageSelectorTrigger aria-label="Language">
                  <CodeBlockLanguageSelectorValue />
                </CodeBlockLanguageSelectorTrigger>
                <CodeBlockLanguageSelectorContent>
                  <CodeBlockLanguageSelectorItem value="tsx">
                    TSX
                  </CodeBlockLanguageSelectorItem>
                  <CodeBlockLanguageSelectorItem value="ts">
                    TS
                  </CodeBlockLanguageSelectorItem>
                  <CodeBlockLanguageSelectorItem value="bash">
                    Bash
                  </CodeBlockLanguageSelectorItem>
                </CodeBlockLanguageSelectorContent>
              </CodeBlockLanguageSelector>
              <CodeBlockCopyButton />
            </CodeBlockActions>
          </CodeBlockHeader>
        </CodeBlock>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Snippet                                                             */
/* ------------------------------------------------------------------ */

export function SnippetDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md space-y-3">
        <Snippet code="npx shadcn@latest add @gray/button">
          <SnippetAddon align="inline-start">
            <SnippetText>$</SnippetText>
          </SnippetAddon>
          <SnippetInput aria-label="Install command" />
          <SnippetAddon align="inline-end">
            <SnippetCopyButton />
          </SnippetAddon>
        </Snippet>
        <Snippet code="https://gray-ui.vercel.app/r/button.json">
          <SnippetAddon align="inline-start">
            <SnippetText>URL</SnippetText>
          </SnippetAddon>
          <SnippetInput aria-label="Registry URL" />
          <SnippetAddon align="inline-end">
            <SnippetCopyButton />
          </SnippetAddon>
        </Snippet>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Terminal                                                            */
/* ------------------------------------------------------------------ */

export function TerminalDemo() {
  const [output, setOutput] = React.useState(TERMINAL_SAMPLE)

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Terminal
          output={output}
          onClear={() => setOutput('')}
        >
          <TerminalHeader>
            <TerminalTitle>gray-ui - zsh</TerminalTitle>
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton />
            </TerminalActions>
          </TerminalHeader>
          <TerminalContent />
        </Terminal>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Stack Trace                                                         */
/* ------------------------------------------------------------------ */

export function StackTraceDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <StackTrace trace={STACK_TRACE_SAMPLE}>
          <StackTraceHeader>
            <StackTraceError>
              <StackTraceErrorType />
              <StackTraceErrorMessage />
            </StackTraceError>
            <StackTraceActions>
              <StackTraceCopyButton />
              <StackTraceExpandButton />
            </StackTraceActions>
          </StackTraceHeader>
          <StackTraceContent maxHeight={220}>
            <StackTraceFrames showInternalFrames />
          </StackTraceContent>
        </StackTrace>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Test Results                                                        */
/* ------------------------------------------------------------------ */

export function TestResultsDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <TestResults
          summary={{
            passed: 6,
            failed: 1,
            skipped: 1,
            total: 8,
            duration: 3421,
          }}
        >
          <TestResultsHeader>
            <TestResultsSummary />
            <TestResultsDuration />
          </TestResultsHeader>
          <div className="px-4 pt-4">
            <TestResultsProgress />
          </div>
          <TestResultsContent className="max-h-72 overflow-y-auto">
            <TestSuite name="tests/auth/login.test.ts" status="passed">
              <div className="flex items-center">
                <TestSuiteName className="flex-1" />
                <TestSuiteStats passed={3} className="pr-4" />
              </div>
              <TestSuiteContent>
                <Test
                  duration={96}
                  name="accepts a valid email and password"
                  status="passed"
                />
                <Test
                  duration={54}
                  name="rejects an expired session token"
                  status="passed"
                />
                <Test
                  duration={121}
                  name="rate limits after five attempts"
                  status="passed"
                />
              </TestSuiteContent>
            </TestSuite>
            <TestSuite name="tests/cart/checkout.test.ts" status="failed">
              <div className="flex items-center">
                <TestSuiteName className="flex-1" />
                <TestSuiteStats failed={1} skipped={1} className="pr-4" />
              </div>
              <TestSuiteContent>
                <Test
                  duration={128}
                  name="requires an authenticated session"
                  status="passed"
                />
                <div className="px-4 py-2">
                  <Test
                    duration={412}
                    name="charges the saved payment method"
                    status="failed"
                  />
                  <TestError>
                    <TestErrorMessage>
                      Expected checkout to return an order id, received
                      undefined
                    </TestErrorMessage>
                    <TestErrorStack>
                      {`at Object.<anonymous> (tests/cart/checkout.test.ts:87:23)`}
                    </TestErrorStack>
                  </TestError>
                </div>
                <Test name="applies store credit" status="skipped" />
              </TestSuiteContent>
            </TestSuite>
            <TestSuite name="tests/utils/format.test.ts" status="passed">
              <div className="flex items-center">
                <TestSuiteName className="flex-1" />
                <TestSuiteStats passed={2} className="pr-4" />
              </div>
              <TestSuiteContent>
                <Test
                  duration={12}
                  name="formats currency in cents"
                  status="passed"
                />
                <Test
                  duration={8}
                  name="truncates long order notes"
                  status="passed"
                />
              </TestSuiteContent>
            </TestSuite>
          </TestResultsContent>
        </TestResults>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Environment Variables                                               */
/* ------------------------------------------------------------------ */

export function EnvironmentVariablesDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <EnvironmentVariables>
          <EnvironmentVariablesHeader>
            <EnvironmentVariablesTitle />
            <EnvironmentVariablesToggle />
          </EnvironmentVariablesHeader>
          <EnvironmentVariablesContent className="max-h-72 overflow-y-auto">
            <EnvironmentVariable
              name="GRAY_API_KEY"
              value="gry_live_9f2e8ab41c7d4e6f"
            >
              <div className="flex items-center gap-2">
                <EnvironmentVariableName />
                <EnvironmentVariableRequired />
              </div>
              <div className="flex items-center gap-1">
                <EnvironmentVariableValue />
                <EnvironmentVariableCopyButton />
              </div>
            </EnvironmentVariable>
            <EnvironmentVariable
              name="DATABASE_URL"
              value="postgresql://gray:s3cret@db.internal:5432/gray"
            >
              <div className="flex items-center gap-2">
                <EnvironmentVariableName />
                <EnvironmentVariableRequired />
              </div>
              <div className="flex items-center gap-1">
                <EnvironmentVariableValue />
                <EnvironmentVariableCopyButton />
              </div>
            </EnvironmentVariable>
            <EnvironmentVariable
              name="REGISTRY_ORIGIN"
              value="https://gray-ui.vercel.app"
            >
              <div className="flex items-center gap-2">
                <EnvironmentVariableName />
              </div>
              <div className="flex items-center gap-1">
                <EnvironmentVariableValue />
                <EnvironmentVariableCopyButton />
              </div>
            </EnvironmentVariable>
            <EnvironmentVariable
              name="NEXT_PUBLIC_SITE_URL"
              value="https://gray-ui.vercel.app"
            >
              <div className="flex items-center gap-2">
                <EnvironmentVariableName />
              </div>
              <div className="flex items-center gap-1">
                <EnvironmentVariableValue />
                <EnvironmentVariableCopyButton copyFormat="export" />
              </div>
            </EnvironmentVariable>
          </EnvironmentVariablesContent>
        </EnvironmentVariables>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* File Tree                                                           */
/* ------------------------------------------------------------------ */

const FILE_TREE_ICONS: Record<string, React.ReactNode> = {
  'button.tsx': <FileCode2Icon className="size-4 text-muted-foreground" />,
  'card.tsx': <FileCode2Icon className="size-4 text-muted-foreground" />,
  'utils.ts': <FileCode2Icon className="size-4 text-muted-foreground" />,
  'package.json': <FileJsonIcon className="size-4 text-muted-foreground" />,
  'README.md': <FileTextIcon className="size-4 text-muted-foreground" />,
}

function TreeFile({ name, path }: { name: string; path: string }) {
  return (
    <FileTreeFile name={name} path={path}>
      <span className="size-4 shrink-0" />
      <FileTreeIcon>
        {FILE_TREE_ICONS[name] ?? (
          <FileCode2Icon className="size-4 text-muted-foreground" />
        )}
      </FileTreeIcon>
      <FileTreeName>{name}</FileTreeName>
      <FileTreeActions>
        <Button
          aria-label={`Actions for ${name}`}
          className="size-6"
          size="icon"
          variant="ghost"
        >
          <MoreHorizontalIcon size={12} />
        </Button>
      </FileTreeActions>
    </FileTreeFile>
  )
}

export function FileTreeDemo() {
  const [selected, setSelected] = React.useState<
    string | undefined
  >('src/components/button.tsx')

  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-2">
        <FileTree
          className="max-h-72 overflow-y-auto"
          defaultExpanded={new Set(['src', 'src/components'])}
          onSelect={setSelected}
          selectedPath={selected}
        >
          <FileTreeFolder name="src" path="src">
            <FileTreeFolder name="components" path="src/components">
              <TreeFile name="button.tsx" path="src/components/button.tsx" />
              <TreeFile name="card.tsx" path="src/components/card.tsx" />
            </FileTreeFolder>
            <FileTreeFolder name="lib" path="src/lib">
              <TreeFile name="utils.ts" path="src/lib/utils.ts" />
            </FileTreeFolder>
          </FileTreeFolder>
          <TreeFile name="package.json" path="package.json" />
          <TreeFile name="README.md" path="README.md" />
        </FileTree>
        <p className="truncate font-mono text-muted-foreground text-xs">
          Selected: {selected ?? 'none'}
        </p>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Package Info                                                        */
/* ------------------------------------------------------------------ */

export function PackageInfoDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <PackageInfo
          changeType="minor"
          currentVersion="1.2.0"
          name="gray-ui"
          newVersion="1.3.0"
        >
          <PackageInfoHeader>
            <PackageInfoName />
            <PackageInfoChangeType />
          </PackageInfoHeader>
          <PackageInfoVersion />
          <PackageInfoDescription>
            A monochrome component registry by Graytell Labs.
          </PackageInfoDescription>
          <PackageInfoContent>
            <PackageInfoDependencies>
              <PackageInfoDependency name="react" version="^19.0.0" />
              <PackageInfoDependency
                name="class-variance-authority"
                version="^0.7.1"
              />
              <PackageInfoDependency name="clsx" version="^2.1.1" />
              <PackageInfoDependency name="tailwind-merge" version="^3.0.0" />
            </PackageInfoDependencies>
          </PackageInfoContent>
        </PackageInfo>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Schema Display                                                      */
/* ------------------------------------------------------------------ */

export function SchemaDisplayDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <SchemaDisplay
          className="max-h-96 overflow-y-auto"
          description="Create a new product in the store catalog."
          method="POST"
          parameters={SCHEMA_PARAMETERS}
          path="/v1/products"
          requestBody={SCHEMA_REQUEST}
          responseBody={SCHEMA_RESPONSE}
        />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* JSX Preview                                                         */
/* ------------------------------------------------------------------ */

export function JsxPreviewDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-md">
        <JSXPreview
          components={{ PreviewButton, PreviewPanel }}
          jsx={JSX_PREVIEW_SAMPLE}
        >
          <JSXPreviewContent />
          <JSXPreviewError />
        </JSXPreview>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Sandbox                                                             */
/* ------------------------------------------------------------------ */

export function SandboxDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <Sandbox>
          <SandboxHeader
            state="output-available"
            title="Build preview - gray-ui"
          />
          <SandboxContent>
            <SandboxTabs defaultValue="preview">
              <SandboxTabsBar>
                <SandboxTabsList>
                  <SandboxTabsTrigger value="preview">
                    Preview
                  </SandboxTabsTrigger>
                  <SandboxTabsTrigger value="console">
                    Console
                  </SandboxTabsTrigger>
                  <SandboxTabsTrigger value="files">
                    Files
                  </SandboxTabsTrigger>
                </SandboxTabsList>
                <span className="ml-auto pr-4 font-mono text-muted-foreground text-xs">
                  node 22 - bun 1.2
                </span>
              </SandboxTabsBar>
              <SandboxTabContent value="preview">
                <div className="p-4">
                  <div className="rounded-md border bg-muted/30 p-6 text-center">
                    <p className="font-medium text-sm">
                      Sandbox preview placeholder
                    </p>
                    <p className="mt-1 text-muted-foreground text-xs">
                      Switch tabs to inspect the build output.
                    </p>
                  </div>
                </div>
              </SandboxTabContent>
              <SandboxTabContent value="console">
                <div className="max-h-48 overflow-y-auto bg-zinc-950 p-4 font-mono text-xs leading-relaxed text-zinc-100">
                  <pre className="whitespace-pre-wrap break-words">
                    {'> gray-ui@1.3.0 dev\n'}
                    {'> next dev\n\n'}
                    {'  ready in 1.2s\n'}
                    {'  local:  http://localhost:3000\n'}
                    {'\x1b[32mcompiled / in 840ms\x1b[0m\n'}
                    {'\x1b[32mcompiled /components in 1.1s\x1b[0m\n'}
                  </pre>
                </div>
              </SandboxTabContent>
              <SandboxTabContent value="files">
                <ul className="space-y-1 p-4 font-mono text-xs">
                  {[
                    ['src/app/page.tsx', '2.1 kB'],
                    ['src/components/site/hero.tsx', '4.8 kB'],
                    ['src/components/ui/button.tsx', '3.3 kB'],
                  ].map(([name, size]) => (
                    <li
                      className="flex items-center justify-between text-muted-foreground"
                      key={name}
                    >
                      <span className="truncate">{name}</span>
                      <span className="shrink-0">{size}</span>
                    </li>
                  ))}
                </ul>
              </SandboxTabContent>
            </SandboxTabs>
          </SandboxContent>
        </Sandbox>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Commit                                                              */
/* ------------------------------------------------------------------ */

export function CommitDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Commit>
          <CommitHeader>
            <CommitHash>9c4f1ab</CommitHash>
            <CommitInfo>
              <CommitMessage>feat(ai-elements): add commit preview</CommitMessage>
              <CommitMetadata>
                <CommitAuthor>
                  <CommitAuthorAvatar className="mr-2 size-5" initials="LV" />
                  letsvan
                </CommitAuthor>
                <CommitSeparator />
                <CommitTimestamp date={COMMIT_DATE} />
              </CommitMetadata>
            </CommitInfo>
            <CommitActions>
              <CommitCopyButton hash="9c4f1ab" />
            </CommitActions>
          </CommitHeader>
          <CommitContent>
            <CommitFiles>
              <CommitFile>
                <CommitFileInfo>
                  <CommitFileStatus status="added" />
                  <CommitFileIcon />
                  <CommitFilePath>
                    src/components/site/demos/ai-code.tsx
                  </CommitFilePath>
                </CommitFileInfo>
                <CommitFileChanges>
                  <CommitFileAdditions count={96} />
                  <CommitFileDeletions count={0} />
                </CommitFileChanges>
              </CommitFile>
              <CommitFile>
                <CommitFileInfo>
                  <CommitFileStatus status="modified" />
                  <CommitFileIcon />
                  <CommitFilePath>
                    src/components/ai-elements/commit.tsx
                  </CommitFilePath>
                </CommitFileInfo>
                <CommitFileChanges>
                  <CommitFileAdditions count={18} />
                  <CommitFileDeletions count={4} />
                </CommitFileChanges>
              </CommitFile>
              <CommitFile>
                <CommitFileInfo>
                  <CommitFileStatus status="modified" />
                  <CommitFileIcon />
                  <CommitFilePath>worklog.md</CommitFilePath>
                </CommitFileInfo>
                <CommitFileChanges>
                  <CommitFileAdditions count={12} />
                  <CommitFileDeletions count={1} />
                </CommitFileChanges>
              </CommitFile>
            </CommitFiles>
          </CommitContent>
        </Commit>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Open In Chat                                                        */
/* ------------------------------------------------------------------ */

const OPEN_IN_QUERY =
  'Explain how the Gray UI registry resolves the @gray namespace alias'

export function OpenInChatDemo() {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <OpenIn query={OPEN_IN_QUERY}>
          <OpenInTrigger />
          <OpenInContent>
            <OpenInLabel>Continue this prompt in</OpenInLabel>
            <OpenInSeparator />
            <OpenInChatGPT />
            <OpenInClaude />
            <OpenInCursor />
            <OpenInv0 />
            <OpenInT3 />
            <OpenInScira />
            <OpenInSeparator />
            <OpenInItem disabled className="text-muted-foreground text-xs">
              The query is prefilled in every provider
            </OpenInItem>
          </OpenInContent>
        </OpenIn>
        <p className="text-center text-muted-foreground text-xs">
          Dropdown is live - items deep-link to each provider with the query
          prefilled.
        </p>
      </div>
    </div>
  )
}
