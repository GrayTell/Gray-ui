import { readFile } from "fs/promises";
import path from "path";

import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The Twin Shards mark on its black tile, as a standalone SVG. */
const MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <rect width="48" height="48" rx="12" fill="#000000"/>
  <path d="M11.8 13.2 L24.2 13.2 L15.8 34.8 L11.8 34.8 Z" fill="#FAFAFA"/>
  <path d="M33.2 13.2 L35.9 13.9 L37.2 34.8 L24.2 34.8 Z" fill="#FAFAFA"/>
</svg>`;

/** Black brand plate: tile + wordmark + tagline + credit, set in Satoshi. */
export default async function OpengraphImage() {
  // Lazy-load sharp INSIDE the handler — never at module scope. A top-level
  // `import sharp` gets merged by Turbopack into the root server chunk, so a
  // broken/missing native sharp in the standalone bundle would dlopen-fail and
  // 500 every route on the site. This route is prerendered static, so in
  // production the body never even executes — sharp is only needed at build.
  const { default: sharp } = await import("sharp");

  // Satori requires static TTF/OTF outlines (WOFF2 is unsupported).
  const [satoshi900, satoshi500, tilePng] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/og/Satoshi-Black.otf")),
    readFile(path.join(process.cwd(), "public/fonts/og/Satoshi-Medium.otf")),
    // Satori has no SVG support — rasterize the exact vector mark to PNG (3x for crispness).
    sharp(Buffer.from(MARK_SVG))
      .resize(384, 384)
      .png()
      .toBuffer(),
  ]);
  const tileDataUrl = `data:image/png;base64,${tilePng.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "Satoshi",
        }}
      >
        {/* Black tile with the Twin Shards mark */}
        <img
          src={tileDataUrl}
          width={128}
          height={128}
          alt=""
          style={{ display: "flex" }}
        />

        <div
          style={{
            marginTop: 40,
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: "-0.04em",
            display: "flex",
          }}
        >
          Gray UI
        </div>

        <div
          style={{
            marginTop: 14,
            fontSize: 34,
            fontWeight: 500,
            color: "#a1a1aa",
            display: "flex",
          }}
        >
          {siteConfig.tagline}
        </div>

        <div
          style={{
            marginTop: 56,
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 23,
            color: "#a1a1aa",
          }}
        >
          <span style={{ display: "flex" }}>
            by Graytell Labs (owned by Anubhav Sapkota)
          </span>
          <span style={{ display: "flex", color: "#52525b" }}>·</span>
          <span style={{ display: "flex", color: "#71717a" }}>gray-ui.vercel.app</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Satoshi", data: satoshi900, weight: 900, style: "normal" },
        { name: "Satoshi", data: satoshi500, weight: 500, style: "normal" },
      ],
    },
  );
}
