# Solar Calculator Specification

## Purpose

The calculator is the highest-value MVP feature.

It translates a homeowner's monthly bill into an understandable indicative solar recommendation and leads naturally to a site survey.

## Required inputs

- average monthly electric bill
- city / province
- distribution utility

## Recommended qualification inputs

- home ownership: owner / renter / property manager
- roof type: long-span/GI / tile / roof deck / other
- goal: reduce bill / backup / both
- daytime usage: low / medium / high

## Optional inputs

- monthly kWh
- number of daytime AC units
- recent electric bill upload
- roof photo
- address / map pin
- financing interest

## Outputs

- recommended solar array size as a range, not false precision
- estimated panel count based on configured panel wattage
- approximate roof area
- monthly and annual production range
- monthly savings range
- simple payback range
- long-term savings scenario
- battery capacity / essential-load backup estimate where applicable

## Assumption model

Every result must be reproducible from a versioned assumption record.

Possible assumption fields:

```ts
type SolarAssumptionSet = {
  version: string;
  effectiveFrom: string;
  tariffPhpPerKwh: number;
  peakSunHours: number;
  systemLossFraction: number;
  selfConsumptionFraction: number;
  exportCreditPhpPerKwh?: number;
  panelWattage: number;
  roofAreaPerPanelSqm: number;
  installedCostPerKwpRange: [number, number];
};
```

Do not hard-code regulatory claims into calculator logic.

## Calculation architecture

Keep formulas in pure domain functions under a calculator feature/module.

Example pipeline:

```text
monthly bill
 -> estimated consumption
 -> candidate solar size range
 -> production estimate
 -> self-consumed energy + export estimate
 -> savings range
 -> indicative cost range
 -> payback range
```

## Important caveats

Results can vary based on:

- actual tariff
- actual kWh usage
- daytime load shape
- shading
- roof orientation/tilt
- usable roof area
- equipment selection
- system losses
- export/net-metering conditions
- installation constraints

## UX copy rule

Use language like:

`Indicative estimate based on the information provided. Final system sizing and quotation require a site survey and engineering review.`

## Deterministic testing

Calculator tests must freeze an assumption set and verify exact expected intermediate/final values.

Never allow tests to depend on the current date, live tariff APIs, or mutable CMS content unless explicitly integration-tested.
