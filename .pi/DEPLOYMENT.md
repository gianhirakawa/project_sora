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

## Production deployment: GitHub Pages (static export)

**Current hosting decision (M1–M3): GitHub Pages**, not Vercel, because the
site is fully static. This is a hard constraint on features:

- The app builds with `output: "export"` (`next.config.ts`). The export HTML
  lands in `distDir` (Next 15 behavior), so CI builds with
  `NEXT_DIST_DIR=out` and uploads `./out`.
- Base path: the repo is served at `https://<user>.github.io/project_sora/`,
  so CI sets `NEXT_PUBLIC_BASE_PATH=/project_sora` (site deploys and PR
  preview deploys both live under the repo subpath). Local dev stays at root.
  If a custom domain is configured for Pages, leave the base path unset in CI
  and re-run the workflow.
- Workflow: `.github/workflows/nextjs.yml` (build → `actions/upload-pages-artifact`
  → `actions/deploy-pages`). `main` pushes deploy to production; PRs get
  preview deploys. Requires `Settings → Pages → Build and deployment → Source
  = GitHub Actions` on the repo.
- **Server actions are impossible on Pages.** M1 lead submissions therefore
  live in client-side `src/features/leads/actions.ts` (same zod validation +
  acknowledgement as the original server actions; nothing is persisted).
  **M4 requirement:** submissions must go to a real server-side boundary
  (n8n webhook or a small separate Next/Node service). Do not store leads
  client-side, and do not add `"use server"` code while Pages is the host.
  If the project moves to Vercel/Node hosting, the lead actions can move back
  to server actions at that point.
- Local verification of the export: `bash scripts/verify.sh` (builds with the
  CI base path and smoke-tests via `scripts/serve-out.mjs`).
- `npm ci` in CI requires `package-lock.json` to be committed — it is.

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
