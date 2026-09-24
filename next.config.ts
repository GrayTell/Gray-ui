import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Deploy diagnostics: build into a throwaway dir (without touching the
  // running dev server's .next) via NEXT_DIST_DIR=… bun run next build.
  // Unset in every normal/dev/platform environment → stays ".next".
  distDir: process.env.NEXT_DIST_DIR || ".next",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Security headers (technical-SEO baseline). A strict CSP is
          // intentionally omitted: Next.js inline runtime + JSON-LD require a
          // nonce architecture; a broken CSP is worse than none.
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // SAMEORIGIN (not DENY): the site embeds its own component previews.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // Ignored over plain HTTP, enforced automatically once behind HTTPS.
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
    ];
  },
  // Ship sharp's native runtime (@img/sharp-libvips-linux-x64 → libvips-cpp.so)
  // inside the standalone deploy bundle. File tracing alone misses the libvips
  // shared objects, which made `import sharp` dlopen-fail in production.
  outputFileTracingIncludes: {
    "/": ["./node_modules/sharp/**", "./node_modules/@img/**"],
    "/opengraph-image": ["./node_modules/sharp/**", "./node_modules/@img/**"],
  },
};

export default nextConfig;
