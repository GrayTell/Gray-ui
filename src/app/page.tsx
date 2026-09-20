'use client'

import * as React from 'react'

import { SiteHeader } from '@/components/site/site-header'
import { CommandMenu } from '@/components/site/command-menu'
import { Hero } from '@/components/site/hero'
import { Installation } from '@/components/site/installation'
import { ComponentsSection } from '@/components/site/components-section'
import { Showcase } from '@/components/site/showcase'
import { Features } from '@/components/site/features'
import { SiteFooter } from '@/components/site/site-footer'

export default function Home() {
  const [searchOpen, setSearchOpen] = React.useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />
      <SiteHeader onOpenSearch={() => setSearchOpen(true)} />
      <main id="main" className="flex-1">
        <Hero />
        <Installation />
        <ComponentsSection />
        <Showcase />
        <Features />
      </main>
      <SiteFooter />
    </div>
  )
}
