import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { COMPONENTS, getComponent, getNeighbours } from '@/lib/component-registry'
import { ComponentPreview } from '@/components/site/component-preview'
import { ComponentInstall } from '@/components/site/component-install'
import { Button } from '@/components/ui/button'

/** Static params for every component in the catalog. */
export function generateStaticParams() {
  return COMPONENTS.map((component) => ({ slug: component.slug }))
}

export const dynamicParams = false

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const entry = getComponent(slug)

  if (!entry) {
    return {}
  }

  return {
    title: entry.name,
    description: entry.description,
    alternates: { canonical: `/components/${slug}` },
  }
}

export default async function ComponentPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const entry = getComponent(slug)

  if (!entry) {
    notFound()
  }

  const { prev, next } = getNeighbours(entry.slug)

  return (
    <div className="flex scroll-mt-24 items-stretch pb-8 text-[1.05rem] sm:text-[15px] xl:w-full">
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="mx-auto flex w-full max-w-160 min-w-0 flex-1 flex-col gap-6 px-4 py-6 text-foreground md:px-0 lg:py-8 dark:text-foreground">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between md:items-start">
              <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight sm:text-3xl">
                {entry.name}
              </h1>
              <div className="ml-auto flex gap-2">
                {prev ? (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="extend-touch-target size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href={`/components/${prev.slug}`}>
                      <ArrowLeft />
                      <span className="sr-only">Previous</span>
                    </Link>
                  </Button>
                ) : null}
                {next ? (
                  <Button
                    variant="secondary"
                    size="icon"
                    className="extend-touch-target size-8 shadow-none md:size-7"
                    asChild
                  >
                    <Link href={`/components/${next.slug}`}>
                      <span className="sr-only">Next</span>
                      <ArrowRight />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
            <p className="text-[1.05rem] text-muted-foreground sm:text-base sm:text-balance md:max-w-[80%]">
              {entry.description}
            </p>
          </div>

          <div className="w-full flex-1 pb-16 sm:pb-0">
            <h2 id="preview" className="scroll-mt-24 text-2xl font-semibold tracking-tight">
              Preview
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              A live demo you can click, type into and toggle — the actual
              component running, not a picture of it.
            </p>
            <ComponentPreview
              name={entry.name}
              slug={entry.slug}
              code={entry.code}
            >
              <entry.Demo />
            </ComponentPreview>

            <h2
              id="installation"
              className="scroll-mt-24 text-2xl font-semibold tracking-tight"
            >
              Installation
            </h2>
            <p className="mt-2 mb-4 text-sm text-muted-foreground">
              Drop {entry.name} into your project with a single CLI command.
            </p>
            <ComponentInstall slug={entry.slug} name={entry.name} />
          </div>

          <div className="hidden h-16 w-full items-center gap-2 px-4 sm:flex sm:px-0">
            {prev ? (
              <Button variant="secondary" size="sm" asChild className="shadow-none">
                <Link href={`/components/${prev.slug}`}>
                  <ArrowLeft /> {prev.name}
                </Link>
              </Button>
            ) : null}
            {next ? (
              <Button
                variant="secondary"
                size="sm"
                className="ml-auto shadow-none"
                asChild
              >
                <Link href={`/components/${next.slug}`}>
                  {next.name} <ArrowRight />
                </Link>
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      {/* On this page */}
      <div className="sticky top-[calc(var(--header-height)+1px)] z-30 ml-auto hidden h-[90svh] w-(--sidebar-width) flex-col gap-4 overflow-hidden overscroll-none pb-8 xl:flex">
        <div className="h-(--top-spacing) shrink-0" />
        <div className="flex flex-col gap-2 pr-4">
          <p className="flex h-8 shrink-0 items-center text-sm font-medium">
            On This Page
          </p>
          <nav aria-label="On this page" className="flex flex-col">
            <a
              href="#preview"
              className="ml-4 inline-block border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Preview
            </a>
            <a
              href="#installation"
              className="ml-4 inline-block border-l border-transparent pl-4 text-sm text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
            >
              Installation
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
