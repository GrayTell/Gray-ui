import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

/**
 * Exact port of shadcn/ui v4 components/announcement.tsx.
 */
export function Announcement() {
  return (
    <Badge asChild variant="secondary" className="bg-muted">
      <Link href="/docs">
        New ButtonGroup and Item components <ArrowRightIcon />
      </Link>
    </Badge>
  )
}
