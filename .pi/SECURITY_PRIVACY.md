# Security and Privacy

## Context

Project Sora may collect electricity bills, contact information, addresses, roof/property photos, IDs, contracts, and net-metering documents.

Treat privacy as a core system constraint.

## Principles

- collect only what is needed for a defined purpose
- state the purpose clearly
- capture consent where required
- restrict access by role
- encrypt in transit and at rest where supported
- keep uploads private
- define retention/deletion rules
- maintain backups and recovery procedures
- do not leak operational data into analytics tools

## Upload requirements

Bills and documents:

- private bucket/container only
- signed temporary access
- server-authorized upload flow
- MIME/type validation
- size limits
- malware scanning when operationally appropriate
- randomized object keys
- explicit deletion/retention process

Never expose a stable public URL to an uploaded bill.

## Authentication

MVP does not require customer authentication.

Phase 3 preference:

- passwordless magic link or email OTP
- separate customer/staff authorization
- least-privilege access
- audit sensitive staff actions

## Forms

- server validation
- rate limits
- anti-spam/bot controls
- CSRF protections appropriate to chosen submission pattern
- normalized and length-bounded strings
- upload restrictions

## Secrets

- server-side environment variables only
- no service-role keys in browser code
- no secrets in git
- no secrets in client-visible error messages

## Analytics

Do not send uploaded document contents, IDs, exact sensitive customer data, or unnecessary PII to GA4/Meta/advertising systems.

Use internal lead IDs or privacy-safe event metadata when attribution requires correlation.

## Regulatory content

Net-metering information changes.

- store in updateable content
- show last reviewed date
- identify source/reference internally
- avoid promises that depend on utility/agency approval
