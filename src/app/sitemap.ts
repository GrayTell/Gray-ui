import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { COMPONENTS } from "@/lib/component-registry";

/**
 * /sitemap.xml — every public route.
 * `<priority>` and `<changefreq>` are deliberately omitted: Google ignores
 * both, so the file stays minimal with only loc + accurate lastmod.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now },
    { url: `${siteConfig.url}/components`, lastModified: now },
    { url: `${siteConfig.url}/docs`, lastModified: now },
    ...COMPONENTS.map((component) => ({
      url: `${siteConfig.url}/components/${component.slug}`,
      lastModified: now,
    })),
  ];
}
