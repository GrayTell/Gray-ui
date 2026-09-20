'use client'

import { useRouter, usePathname } from 'next/navigation'

/**
 * Navigate to a `#anchor` that lives on the homepage.
 * - On the homepage: smooth-scrolls straight to it.
 * - Elsewhere: routes home first, then scrolls once content has mounted.
 */
export function useAnchorNav() {
  const router = useRouter()
  const pathname = usePathname()

  return (id: string) => {
    if (pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    router.push('/')
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 500)
  }
}
