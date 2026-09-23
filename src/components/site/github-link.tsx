'use client'

import * as React from 'react'
import { Github } from 'lucide-react'

import { siteConfig } from '@/lib/site'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Gray UI header GitHub link.
 * Client-side fetch so the header works in both server and client
 * page graphs.
 */
export function GitHubLink() {
  const [stars, setStars] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const data = await fetch(
          'https://api.github.com/repos/GrayTell/Gray-ui'
        )
        const json = await data.json()
        if (cancelled) return

        const formatted =
          json.stargazers_count >= 1000
            ? `${Math.round(json.stargazers_count / 1000)}k`
            : json.stargazers_count?.toLocaleString()

        setStars(formatted ?? 'GitHub')
      } catch {
        if (!cancelled) setStars('GitHub')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
        <Github className="size-4" aria-hidden="true" />
        {stars === null ? (
          <Skeleton className="h-4 w-[42px]" />
        ) : (
          <span className="text-muted-foreground w-fit text-xs tabular-nums">
            {stars}
          </span>
        )}
      </a>
    </Button>
  )
}
