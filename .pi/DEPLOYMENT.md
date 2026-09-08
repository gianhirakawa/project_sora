# Deployment and Environments

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
