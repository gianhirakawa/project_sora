# Deployment and Environments

## Local verification (agent-safe build)

Next.js dev and production builds share one output dir (`.next/`). A plain
`next build` or `next start` in this repo clobbers a running `next dev`
server's assets (HTML renders, CSS 404s until the dev server is restarted).

To keep agent verification from ever breaking the user's live dev server:

- `next.config.ts` reads `distDir` from `process.env.NEXT_DIST_DIR` (default `.next`).
- **Agents must verify with `bash scripts/verify.sh`**, which builds and smoke-tests
  with `NEXT_DIST_DIR=.next-verify` on port 3100. Plain `npx next build` /
  `npx next start -p 3000` are banned while the user's dev server may be running.
- `tsc`/`eslint`/`vitest` alone never touch `.next/` and are always safe.
- The one-time breakage caused by pre-fix builds is resolved by a single dev
  server restart; after that, no restarts should ever be needed.
- `.next-verify/` is gitignored.

## Environments

Use at least:

- local
- preview/staging
- production

Do not point local development at production CRM automation by default.

## Environment variable groups

Potential groups:

- application URL
- database
- storage
- CRM
- n8n webhook/auth
- email provider
- SMS provider
- analytics IDs
- Meta CAPI token/server endpoint
- map/geocoding provider
- auth provider later

Validate required environment variables at startup/server initialization.

## Suggested deployment shape

- Next.js: Vercel or equivalent Node hosting
- database: managed Postgres / Supabase
- storage: private Supabase Storage or compatible object storage
- CMS: headless provider or CMS adapter
- automation: n8n

## Release checklist

- lint/typecheck/test/build green
- database migrations reviewed
- environment variables present
- analytics verified
- form submissions verified
- CRM/n8n workflow verified
- privacy/consent copy reviewed for changed fields
- uploaded files confirmed private
- sitemap/robots/canonical behavior checked
- mobile smoke test completed
- rollback path understood

## Data migrations

- migrations are version-controlled
- avoid destructive migrations without explicit review
- backfill historical calculator assumption versions when schema changes require it

## Feature flags

Use flags for risky integrations such as:

- bill upload
- financing
- payment/deposit
- customer portal
- monitoring API integration
