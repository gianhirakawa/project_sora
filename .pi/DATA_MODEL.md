# Data Model

Use this as a conceptual model. Physical schema can evolve, but preserve the separation of concerns.

## Lead

- id
- name
- mobile
- email
- preferred_contact_channel
- source
- campaign
- consent_timestamp
- status
- created_at

## Property

- id
- lead_id / customer_id
- full_address
- city
- province
- distribution_utility
- account_holder_name
- occupancy_role
- roof_type
- roof_age
- latitude
- longitude

## EnergyProfile

- property_id
- monthly_bill_php
- monthly_kwh
- tariff_snapshot
- daytime_usage_band
- daytime_ac_count
- outage_frequency

## Goal

- lead_id
- wants_bill_savings
- wants_backup
- wants_net_metering
- wants_off_grid
- target_budget_php
- financing_interest

## Estimate

- id
- lead_id nullable until saved
- assumption_version
- recommended_kwp_min
- recommended_kwp_max
- panel_wattage
- panel_count_min
- panel_count_max
- roof_area_sqm_min
- roof_area_sqm_max
- monthly_generation_kwh_min
- monthly_generation_kwh_max
- monthly_savings_php_min
- monthly_savings_php_max
- estimated_cost_php_min
- estimated_cost_php_max
- payback_years_min
- payback_years_max
- battery_kwh nullable
- assumptions_snapshot JSON
- created_at

## Survey

Later operational data:

- property_id
- surveyor
- survey_date
- roof_dimensions
- shading_notes
- service_entrance_notes
- panelboard_notes
- structural_notes
- photo references

## Proposal

- project/customer reference
- BOM
- equipment brands/models
- warranties
- price
- financing
- production assumptions
- version
- status

## Project

- customer/property reference
- deposit status
- install schedule
- crew
- permit milestones
- install milestones
- commissioning status

## NetMetering

- project_id
- distribution_utility
- application_date
- CFEI_status
- NMA_status
- COC_fee_status
- meter_status
- energization_date

## Asset

- project_id
- asset_type
- manufacturer
- model
- serial_number
- warranty_start
- warranty_end
- monitoring_device_id

## ServiceTicket

- project_id
- ticket_type
- production_issue
- opened_at
- maintenance_date
- resolution
- parts_used

## Referral

- referrer_customer_id
- referred_lead_id
- reward
- conversion_status

## Content data

Keep public content models separate from operational entities:

- Guide
- FAQ
- Package
- Product
- ProjectCaseStudy
- Testimonial
- ServiceArea
- RegulatoryArticle

RegulatoryArticle should include `lastReviewedAt` and an editorial owner/reference field.
