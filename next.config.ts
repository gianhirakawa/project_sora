import type { NextConfig } from "next";

// distDir is env-driven so agent verification builds (`NEXT_DIST_DIR=.next-verify`)
// never clobber the `.next/` that a running `next dev` server depends on.
// Normal dev/prod usage is unaffected (defaults to `.next`).
const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR ?? ".next",
};

export default nextConfig;
