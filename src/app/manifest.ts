import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

/** /manifest.webmanifest — installable PWA metadata with the black brand theme. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: siteConfig.name,
    short_name: "Gray UI",
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "any",
    lang: "en",
    categories: ["developer", "design", "productivity"],
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
