#!/usr/bin/env bash
# Verification pipeline that NEVER touches .next/ (the live `next dev` output).
# Production build + smoke test run against .next-verify on port 3100.
#
# Usage: bash scripts/verify.sh
# Safe to run while the user's `next dev` server is running.
set -euo pipefail
cd "$(dirname "$0")/.."

PORT=3100
DIST=.next-verify

echo "==> typecheck"
npx tsc --noEmit
echo "==> lint"
npx eslint src
echo "==> unit tests"
npx vitest run
# Build the static export exactly like CI does (GitHub Pages base path), so
# the smoke test exercises the same asset/link paths that Pages will serve.
# Note: `next start` cannot be used with `output: "export"` — the export is
# served statically instead (GH Pages behaves like a static file server).
echo "==> production build (export) -> $DIST"
NEXT_DIST_DIR="$DIST" NEXT_PUBLIC_BASE_PATH=/project_sora npx next build

echo "==> smoke test on :$PORT"
node scripts/serve-out.mjs "$PORT" "$DIST" /project_sora >/tmp/sora-verify-start.log 2>&1 &
START_PID=$!
trap 'kill "$START_PID" 2>/dev/null' EXIT

ok=0
for _ in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/project_sora/" || true)
  [ "$code" = "200" ] && ok=1 && break
  sleep 1
done
[ "$ok" = "1" ] || { echo "smoke test failed (last code: $code)"; tail -20 /tmp/sora-verify-start.log; exit 1; }

# No-slash URLs (deep links) must resolve like they do on GitHub Pages.
for path in /project_sora/ /project_sora/calculate /project_sora/packages /project_sora/book-site-survey; do
  printf '  %-30s %s\n' "$path" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT$path")"
done

echo "==> verification complete (user's next dev on .next/ untouched)"
