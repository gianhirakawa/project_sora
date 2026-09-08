# Architecture

## Target architecture

```text
Browser
  |
  v
Next.js application
  |-- public SSR/SSG marketing pages
  |-- interactive calculator
  |-- server-side lead endpoints
  |-- authenticated portal later
  |
  +--> Postgres / Supabase
  +--> private object storage
  +--> CMS adapter
  +--> CRM adapter
  +--> n8n webhook/automation
  +--> email/SMS providers
  +--> analytics / conversion APIs
```

## Rendering strategy

### Server-render / statically generate by default

- home
- system pages
- packages/pricing explanations
- product pages
- projects/case studies
- guides/blog
- service-area pages
- net-metering content
- about/credentials

### Client interactivity only where needed

- calculator controls
- multi-step forms
- filters
- appointment picker
- upload widgets
- later portal interactions

## Suggested route map

```text
/
/get-solar
/get-solar/home-solar
/get-solar/solar-battery
/get-solar/off-grid
/get-solar/upgrade-existing
/packages
/calculate
/calculate/solar-savings
/calculate/battery-backup
/how-it-works
/how-it-works/solar-101
/how-it-works/installation
/how-it-works/net-metering-philippines
/how-it-works/warranties-after-sales
/faq
/products
/products/panels
/products/inverters
/products/batteries
/products/mounting-protection
/products/monitoring
/projects
/learn
/learn/cost-roi
/learn/net-metering
/learn/brownout-backup
/learn/roof-installation
/learn/brands
/about
/about/team
/about/credentials
/service-areas
/contact
/book-site-survey
/privacy
/terms
```

Later:

```text
/customer
/customer/project
/customer/documents
/customer/payments
/customer/net-metering
/customer/monitoring
/customer/support
```

## Module boundaries

Suggested source structure:

```text
src/
  app/
  components/
    ui/
    marketing/
    calculator/
    forms/
  features/
    calculator/
    leads/
    projects/
    content/
    service-areas/
  lib/
    env/
    db/
    validation/
    analytics/
    storage/
    crm/
    automation/
  server/
    repositories/
    services/
    integrations/
  types/
```

## Integration rule

External providers must not leak throughout page/component code.

Use adapter boundaries such as:

- `LeadRepository`
- `CrmClient`
- `AutomationClient`
- `PrivateFileStore`
- `EmailClient`
- `ContentRepository`

This keeps the site replaceable if operations later move between monday.com, HubSpot, Zoho, Supabase, WordPress, or another CMS/CRM.

## Caching/content freshness

- Marketing pages may cache aggressively.
- Regulatory/net-metering pages need an editorial timestamp and controlled revalidation.
- Calculator assumptions require versioning.
- Lead/project data must never be statically cached.
