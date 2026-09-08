# Backend / API Standards

## Backend objective

Support the acquisition workflow reliably without overbuilding an ERP.

MVP backend responsibilities:

- calculator assumption delivery/versioning
- lead intake
- validation
- consent logging
- calculator snapshot persistence
- private uploads
- CRM/automation handoff
- transactional acknowledgement
- analytics/conversion event support

## API boundary

All lead submissions are validated server-side even if already validated in the browser.

Use Zod schemas shared where safe, with server validation authoritative.

## Suggested endpoints/actions

Conceptual operations:

- `calculateSolarEstimate(input)`
- `createLead(input)`
- `requestSiteSurvey(input)`
- `createPrivateUpload(input)`
- `completePrivateUpload(input)`
- `sendLeadToCrm(leadId)`
- `triggerLeadAutomation(leadId)`

Do not expose raw database writes directly from UI components.

## CRM / automation

The application database should retain enough information to audit what happened even if the CRM or n8n is temporarily unavailable.

Recommended pattern:

1. validate request
2. persist lead locally
3. persist calculator snapshot/assumption version
4. enqueue or invoke automation
5. return success to customer once the lead is safely recorded
6. retry integration failures asynchronously where infrastructure supports it

Do not make a transient CRM outage lose a valid website lead.

## Uploads

Uploaded bills and roof photos must:

- use private storage
- use unpredictable keys
- be associated to a lead/project
- use signed/time-limited URLs for viewing
- be validated for type and size
- never be stored under public URLs
- never be logged as raw payloads

## Rate limiting / abuse

Protect:

- lead forms
- upload creation
- calculator endpoints if server-intensive
- appointment requests
- auth endpoints later

Add spam protection without making legitimate mobile users fight excessive challenges.

## Observability

Log:

- request correlation ID
- operation result
- integration result
- timing
- non-sensitive identifiers

Never log:

- raw bills/documents
- passwords/OTP
- access tokens
- full sensitive request payloads by default
