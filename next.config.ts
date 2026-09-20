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
  // Ship sharp's native runtime (@img/sharp-libvips-linux-x64 → libvips-cpp.so)
  // inside the standalone deploy bundle. File tracing alone misses the libvips
  // shared objects, which made `import sharp` dlopen-fail in production.
  outputFileTracingIncludes: {
    "/": ["./node_modules/sharp/**", "./node_modules/@img/**"],
    "/opengraph-image": ["./node_modules/sharp/**", "./node_modules/@img/**"],
  },
};

export default nextConfig;
