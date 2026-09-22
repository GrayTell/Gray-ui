import { NextRequest } from 'next/server'

import {
  ensureShadcnUpstream,
  SHADCN_UPSTREAM_ORIGIN,
  ShadcnUpstreamError,
} from '@/lib/shadcn-upstream'

/**
 * Reverse proxy: /shadcn/** -> vendored original shadcn/ui docs (apps/v4)
 * running on 127.0.0.1:3010 with basePath "/shadcn".
 *
 * The upstream carries the same "/shadcn" prefix, so the pathname is
 * forwarded as-is. All internal links/assets in the upstream HTML are
 * basePath-prefixed, which keeps the browser pinned to this origin.
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const UPSTREAM_TIMEOUT_MS = 240_000

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'transfer-encoding',
  'upgrade',
  'host',
])

function errorPage(status: number, title: string, message: string): Response {
  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #09090b; color: #fafafa; font-family: ui-sans-serif, system-ui, sans-serif; }
  main { max-width: 34rem; padding: 2rem; text-align: center; }
  h1 { font-size: 1.25rem; font-weight: 600; letter-spacing: -0.01em; margin: 0 0 .75rem; }
  p { color: #a1a1aa; line-height: 1.6; margin: 0; font-size: .925rem; }
  code { background: #27272a; padding: .1rem .35rem; border-radius: .375rem; font-size: .85em; }
  .badge { display: inline-block; border: 1px solid #3f3f46; border-radius: 9999px; padding: .2rem .7rem; font-size: .75rem; color: #d4d4d8; margin-bottom: 1.25rem; }
</style>
</head>
<body>
<main>
  <span class="badge">shadcn/ui (original)</span>
  <h1>${title}</h1>
  <p>${message}</p>
</main>
</body>
</html>`
  return new Response(html, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
  })
}

async function proxy(request: NextRequest): Promise<Response> {
  try {
    await ensureShadcnUpstream()
  } catch (error) {
    if (error instanceof ShadcnUpstreamError) {
      if (error.code === 'CLONE_MISSING') {
        return errorPage(
          503,
          'Original shadcn/ui clone is not available here',
          'The upstream repository is cloned into <code>shadcn-ui/</code> locally (gitignored) and is not part of deployed builds. On the sandbox, run <code>.zscripts/shadcn-setup.sh</code> once to restore it.'
        )
      }
      return errorPage(
        503,
        'Booting the original shadcn/ui dev server…',
        'The upstream docs app on port 3010 is starting up. Retry in a minute — first boot compiles the whole workspace.'
      )
    }
    return errorPage(500, 'Unexpected upstream error', 'Failed to prepare the original shadcn/ui dev server.')
  }

  const upstreamUrl = SHADCN_UPSTREAM_ORIGIN + request.nextUrl.pathname + request.nextUrl.search

  const requestHeaders = new Headers()
  request.headers.forEach((value, key) => {
    if (HOP_BY_HOP.has(key) || key === 'accept-encoding') return
    requestHeaders.set(key, value)
  })
  // Ask for identity so the streamed body needs no decoding.
  requestHeaders.set('accept-encoding', 'identity')

  const method = request.method.toUpperCase()
  const hasBody = method !== 'GET' && method !== 'HEAD'
  const body = hasBody ? await request.arrayBuffer() : undefined

  let upstream: Response
  try {
    upstream = await fetch(upstreamUrl, {
      method,
      headers: requestHeaders,
      body,
      redirect: 'manual',
      cache: 'no-store',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    })
  } catch {
    return errorPage(
      504,
      'The original shadcn/ui dev server did not respond',
      'It may still be compiling a page for the first time. Retry in a minute — subsequent loads are fast.'
    )
  }

  const responseHeaders = new Headers()
  upstream.headers.forEach((value, key) => {
    const lower = key.toLowerCase()
    if (HOP_BY_HOP.has(key) || lower === 'content-encoding' || lower === 'content-length') return
    responseHeaders.set(key, value)
  })
  const location = upstream.headers.get('location')
  if (location?.startsWith(SHADCN_UPSTREAM_ORIGIN)) {
    responseHeaders.set('location', location.slice(SHADCN_UPSTREAM_ORIGIN.length) || '/')
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  })
}

export {
  proxy as GET,
  proxy as POST,
  proxy as PUT,
  proxy as PATCH,
  proxy as DELETE,
  proxy as HEAD,
  proxy as OPTIONS,
}
