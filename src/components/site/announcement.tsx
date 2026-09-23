import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'

/**
 * Gray UI announcement badge.
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
