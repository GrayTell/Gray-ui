import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { COMPONENTS } from "@/lib/component-registry";

/**
 * /sitemap.xml — every public route.
 * `<priority>` and `<changefreq>` are deliberately omitted: Google ignores
 * both, so the file stays minimal with only loc + accurate lastmod.
 * lastmod is a stable release date (not `new Date()`): a lastmod that always
 * reports "now" is treated as inaccurate and ignored by Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  return [
    { url: siteConfig.url, lastModified },
    { url: `${siteConfig.url}/components`, lastModified },
    { url: `${siteConfig.url}/docs`, lastModified },
    ...COMPONENTS.map((component) => ({
      url: `${siteConfig.url}/components/${component.slug}`,
      lastModified,
    })),
  ];
}
