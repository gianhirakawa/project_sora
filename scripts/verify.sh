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
echo "==> production build -> $DIST"
NEXT_DIST_DIR="$DIST" npx next build

echo "==> smoke test on :$PORT"
NEXT_DIST_DIR="$DIST" npx next start -p "$PORT" >/tmp/sora-verify-start.log 2>&1 &
START_PID=$!
trap 'kill "$START_PID" 2>/dev/null; pkill -f "next-server" 2>/dev/null || true' EXIT

ok=0
for _ in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT/" || true)
  [ "$code" = "200" ] && ok=1 && break
  sleep 1
done
[ "$ok" = "1" ] || { echo "smoke test failed (last code: $code)"; tail -20 /tmp/sora-verify-start.log; exit 1; }

for path in / /calculate /packages /book-site-survey; do
  printf '  %-20s %s\n' "$path" "$(curl -s -o /dev/null -w '%{http_code}' "http://localhost:$PORT$path")"
done

echo "==> verification complete (user's next dev on .next/ untouched)"
