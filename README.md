# Project Sora

Project Sora is a Philippine residential solar installation website and future customer platform.

The product direction is based on the September 2026 PH residential solar market research included under `docs/reference/`.

## Product thesis

Build the acquisition experience around a simple homeowner question:

> "My electric bill is PHP X. How much solar do I need, what will it cost, and how much can I save?"

The MVP should be a transparent, mobile-first acquisition engine rather than a portal-heavy application:

1. Educate the homeowner.
2. Let them estimate a system from their monthly bill.
3. Show clear assumptions and indicative outputs.
4. Qualify the lead without forcing account creation.
5. Convert to a free consultation/site survey.
6. Send the lead and calculator context into the CRM/automation workflow.

## Recommended stack

### Application
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui-style accessible component primitives
- Lucide icons

### Forms and validation
- React Hook Form
- Zod
- Server-side validation for all submitted lead data

### Data and backend
- Supabase Postgres as the initial application database
- Supabase Storage for private bill/roof uploads
- Route Handlers / Server Actions for application APIs
- Row-level security and signed URLs where applicable

### Content
- Headless CMS abstraction for guides, packages, projects, FAQs, service areas, and regulatory updates
- Start with a simple CMS-compatible content layer; do not tightly couple public pages to one vendor

### Automation / CRM
- n8n for lead routing, acknowledgements, follow-ups, survey tasks, appointment workflows, and later proposal automation
- CRM can be monday.com, HubSpot, Zoho, or another system of record depending on operations

### Analytics
- GA4
- Google Ads conversion tracking
- Meta CAPI / server-side events when paid acquisition begins

### Communications
- Transactional email
- SMS where appropriate
- Messenger / Viber / WhatsApp links or integrations when operationally supported

### Deployment
- Vercel or another Node-compatible platform for the Next.js app
- Managed Postgres / Supabase
- Object storage with private-by-default access

## MVP scope

P0:
- Home
- Residential system pages: On-grid, Hybrid + Battery, Off-grid
- Packages / indicative pricing
- Solar savings calculator
- Quote / free site survey form
- Projects / case studies
- Testimonials / credentials
- Net-metering guide
- About / warranties
- FAQ
- Blog / guides
- Contact
- Privacy / terms / data privacy notice
- CRM handoff + automatic acknowledgement
- Analytics foundation

P1:
- Bill upload
- Financing page/calculator
- Online appointment scheduling
- Product catalog
- Richer case studies and service-area landing pages

P2+:
- Deposit/payment flows
- Optional customer account after proposal stage
- Project tracker
- Documents / net-metering tracker
- Monitoring links/integrations
- Maintenance tickets
- Warranty registry
- Referrals and upgrades

## Pi harness

The `.pi/` directory contains the operating context for Pi. Start with:

- `AGENTS.md`
- `.pi/PROJECT.md`
- `.pi/TASKS.md`
- `.pi/ARCHITECTURE.md`
- `.pi/FRONTEND.md`
- `.pi/BACKEND.md`
- `.pi/CALCULATOR.md`
- `.pi/DATA_MODEL.md`
- `.pi/SEO_CONTENT.md`
- `.pi/SECURITY_PRIVACY.md`
- `.pi/TESTING.md`
- `.pi/DEPLOYMENT.md`
- `.pi/EVAL_TASKS.md`
- `.pi/prompts/fd.md`

## Suggested local path

```text
D:\dev-works\project_sora
```

Pi Docker mount:

```yaml
- D:/dev-works/project_sora:/workspace/sora
```

Launch:

```powershell
cd D:\pi-agent
docker compose up -d
docker compose exec -w /workspace/sora pi-agent pi
```
