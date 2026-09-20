'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { COMPONENT_COUNT } from '@/lib/component-registry'

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden px-4 pb-16 pt-20 sm:pb-24 sm:pt-28 lg:pt-32"
      aria-labelledby="hero-heading"
    >
      {/* Subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Announcement badge */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}>
          <Link
            href="/components"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 py-1 pl-3 pr-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <span className="hidden rounded-full bg-foreground px-1.5 py-0.5 text-[10px] font-semibold text-background sm:inline">
              New
            </span>
            {COMPONENT_COUNT} live components — every one works
            <ArrowRight
              className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* Headline */}
        <motion.h1
          id="hero-heading"
          initial="hidden"
          animate="visible"
          custom={1}
          variants={fadeUp}
          className="mt-6 text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          The Canvas for your Next Interface
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial="hidden"
          animate="visible"
          custom={2}
          variants={fadeUp}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          Gray UI ships composable, accessible components with taste baked in. Copy the source,
          bend it to your will, and ship interfaces that feel engineered.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          variants={fadeUp}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" className="h-11 rounded-full px-6 text-sm font-medium" asChild>
            <a href="#installation">Get Started</a>
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="h-11 rounded-full px-6 text-sm font-medium"
            asChild
          >
            <Link href="/components">Browse Components</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
