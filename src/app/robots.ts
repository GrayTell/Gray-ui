import type { MetadataRoute } from "next";

import { BLOCKED_BOT_TOKENS } from "@/lib/bot-blocklist";
import { siteConfig } from "@/lib/site";

/**
 * /robots.txt — reading is welcome, copying is not.
 * Search engines may crawl everything; screenshot/scrape/copy bots are told
 * to stay out (and get real 403s at the edge regardless — see src/proxy.ts).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: [...BLOCKED_BOT_TOKENS], disallow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
