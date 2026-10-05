import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/**
 * /sitemap.xml — a deliberately small sitemap: the 3 core routes plus the 7
 * flagship component pages (10 total, as requested). Deep component pages are
 * still crawlable via /components, just not individually listed here.
 * `<priority>` and `<changefreq>` are deliberately omitted: Google ignores
 * both, so the file stays minimal with only loc + accurate lastmod.
 * lastmod is a stable release date (not `new Date()`): a lastmod that always
 * reports "now" is treated as inaccurate and ignored by Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const paths = [
    "",
    "/components",
    "/docs",
    // Flagship components — highest search volume + unique AI primitives.
    "/components/button",
    "/components/card",
    "/components/dialog",
    "/components/input",
    "/components/table",
    "/components/conversation",
    "/components/reasoning",
  ];
  return paths.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified,
  }));
}
