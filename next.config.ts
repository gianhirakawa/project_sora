import type { NextConfig } from "next";

// distDir is env-driven so agent verification builds (`NEXT_DIST_DIR=.next-verify`)
// never clobber the `.next/` that a running `next dev` server depends on.
// Normal dev/prod usage is unaffected (defaults to `.next`).
const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",

  // GitHub Pages: static export.
  // The site is fully static (no server actions/API routes yet), so it exports
  // to `out/` and is deployed via GitHub Actions (see .github/workflows/nextjs.yml).
  output: "export",
  // Required for GitHub Pages: export must produce `route/index.html` dirs.
  // Next 15.5 defaults to flat `route.html` files, which 404 on Pages.
  trailingSlash: true,

  // GitHub Pages serves this repo at https://<user>.github.io/project_sora/,
  // so the CI build sets NEXT_PUBLIC_BASE_PATH=/project_sora. Local dev stays
  // at the root. If a custom domain is ever configured, leave it unset in CI.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
};

export default nextConfig;
