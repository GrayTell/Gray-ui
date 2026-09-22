import { siteConfig } from '@/lib/site'

/**
 * Gray UI site footer
 * credited to Graytell Labs.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto">
      <div className="container-wrapper px-4 xl:px-6">
        <div className="flex h-(--footer-height) items-center justify-between">
          <div className="text-muted-foreground w-full px-1 text-center text-xs leading-loose sm:text-sm">
            Built by{' '}
            <a
              href={siteConfig.author.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Graytell Labs
            </a>{' '}
            at{' '}
            <a
              href={siteConfig.links.org}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Graytell
            </a>
            . The source code is available on{' '}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </div>
        </div>
      </div>
    </footer>
  )
}
