import { NextResponse, type NextRequest } from "next/server";

import { isBlockedBot } from "@/lib/bot-blocklist";

/**
 * Edge bot policy (Next 16 proxy, formerly middleware).
 *
 * Bots may READ the site but must not screenshot it or copy its content:
 * screenshot services and content-scraping bots get an immediate 403.
 * Search engines, link unfurlers, the shadcn CLI and humans pass untouched.
 *
 * Registry (/r) and API routes are always exempt so the component registry
 * stays fully bot-accessible by design (`npx shadcn add` must keep working
 * from any client).
 */

/** Routes that must never be gated by the UA policy. */
const EXEMPT_PATTERNS = [
  /^\/api(?:\/|$)/, // Gray AI chat + API surface
  /^\/r(?:\/|$)/, // shadcn registry — the product's core, always open
  /^\/_next(?:\/|$)/, // build assets (matcher also skips static/image)
  /^\/robots\.txt$/, // must be readable to declare the rules
  /^\/sitemap\.xml$/,
  /^\/manifest\.webmanifest$/,
  /^\/icon\.svg$/,
  /^\/favicon\.ico$/,
  /^\/opengraph-image(?:\/|$)/, // brand plate used by link unfurls
  /^\/fonts(?:\/|$)/, // self-hosted Satoshi
  /^\/og(?:\/|$)/,
  /^\/images(?:\/|$)/,
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (EXEMPT_PATTERNS.some((pattern) => pattern.test(pathname))) {
    return NextResponse.next();
  }

  if (isBlockedBot(request.headers.get("user-agent"))) {
    return new NextResponse(
      "403 — screenshot and content-copying bots are not allowed on Gray UI.\n",
      {
        status: 403,
        headers: {
          "content-type": "text/plain; charset=utf-8",
          "x-robots-tag": "noindex, noimageindex",
          "cache-control": "no-store",
        },
      },
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on everything except heavy Next static assets; route exemptions are
  // handled by EXEMPT_PATTERNS above so they live next to the policy.
  matcher: ["/((?!_next/static|_next/image).*)"],
};
