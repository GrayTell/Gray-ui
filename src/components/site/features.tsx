'use client'

import { motion } from 'framer-motion'
import { Accessibility, Brush, Code2, Unplug } from 'lucide-react'

const FEATURES = [
  {
    icon: Unplug,
    title: 'No lock-in',
    description:
      'Gray components live in your repo, not a black-box package. Own every line, forever.',
  },
  {
    icon: Brush,
    title: 'Beautiful by default',
    description:
      'Thoughtful typography, spacing, and color out of the box. Look world-class without a designer.',
  },
  {
    icon: Accessibility,
    title: 'Accessible to the core',
    description:
      'Built on Radix UI primitives. Keyboard nav, focus management, and ARIA handled for you.',
  },
  {
    icon: Code2,
    title: 'Free. Forever.',
    description:
      'MIT licensed and open source. Inspect it, fork it, ship it — no strings attached.',
  },
]

export function Features() {
  return (
    <section
      id="features"
      className="scroll-mt-14 border-t border-border/60 px-4 py-20 sm:py-24"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2
            id="features-heading"
            className="text-balance text-3xl font-bold tracking-tighter sm:text-4xl"
          >
            Built to be owned
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-muted-foreground">
            Not a dependency. Not a wrapper. Your Gray design system starts here.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted transition-colors group-hover:bg-foreground group-hover:text-background">
                <feature.icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
