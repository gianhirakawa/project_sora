import type { PropertyRole } from "@/features/calculator/types";
import type { CalculatorResult } from "@/features/calculator/calculator";
import {
  ACTIVE_ASSUMPTION_SET,
} from "@/features/calculator/assumptions";
import {
  formatPhp,
  formatPhpRange,
  formatNumber,
  formatUnitRange,
} from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CalculatorResultsProps {
  result: CalculatorResult;
  propertyRole: PropertyRole;
  prefillUrl: string;
  onCtaClick?: () => void;
}

function StatTile({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-4">
      <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
        {label}
      </div>
      <div className="mt-1 font-display text-xl font-bold">
        {value}
      </div>
      {sub ? (
        <div className="mt-0.5 text-xs text-ink-soft">{sub}</div>
      ) : null}
    </div>
  );
}

export function CalculatorResults({
  result,
  propertyRole,
  prefillUrl,
  onCtaClick,
}: CalculatorResultsProps) {
  const a = ACTIVE_ASSUMPTION_SET;
  const kwpHi = result.systemKwp[1];
  const fullOffsetCost: readonly [number, number] = [
    kwpHi * a.installedCostPerKwpRange[0],
    kwpHi * a.installedCostPerKwpRange[1],
  ];

  return (
    <Card className="space-y-6 border-2 border-sun">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full bg-sun px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ink">
          Indicative estimate
        </span>
        <span className="text-sm text-ink-soft">
          Assumption set {a.version} · not a final quote
        </span>
      </div>

      {propertyRole === "renter" ? (
        <p className="rounded-xl bg-sky p-3 text-sm">
          Since you rent, we’ll discuss what’s possible with your landlord and
          which options make sense for your lease. Nothing here is a final
          quote.
        </p>
      ) : null}

      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Estimated monthly savings
        </div>
        <div className="mt-1 font-display text-4xl font-bold sm:text-5xl">
          {formatPhpRange(result.monthlySavingsPhp)}
          <span className="text-xl font-semibold text-ink-soft"> / month</span>
        </div>
        <div className="mt-1 text-sm text-ink-soft">
          ≈ {formatPhpRange(result.annualSavingsPhp)} per year, based on an
          estimated {formatNumber(result.monthlyKwh)} kWh monthly usage.
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile
          label="Suggested system size"
          value={formatUnitRange(result.systemKwp, "kWp")}
          sub="From ~30% offset to full bill offset"
        />
        <StatTile
          label="Estimated panels"
          value={`${formatNumber(result.panelCount[0])} – ${formatNumber(result.panelCount[1])}`}
          sub={`${formatNumber(a.panelWattage)} Wp panels`}
        />
        <StatTile
          label="Approx. roof area"
          value={`${formatNumber(result.roofAreaSqm[0])} – ${formatNumber(result.roofAreaSqm[1])} m²`}
          sub="Including spacing — confirmed on site"
        />
        <StatTile
          label="Est. annual generation"
          value={`${formatNumber(result.annualGenerationKwh[0], 0)} – ${formatNumber(result.annualGenerationKwh[1], 0)} kWh`}
        />
        <StatTile
          label="Simple payback"
          value={`${result.paybackYears[0].toFixed(1)} – ${result.paybackYears[1].toFixed(1)} yrs`}
          sub={`For the ${kwpHi} kWp full-offset system`}
        />
        <StatTile
          label={`Long-term (${a.longTermYears}-year) savings`}
          value={formatPhpRange(result.longTermSavingsPhp.range)}
          sub="No escalation or degradation applied"
        />
      </div>

      {result.battery ? (
        <div className="rounded-2xl bg-sky p-4">
          <div className="font-display font-semibold">
            Backup estimate: ~{result.battery.capacityKwh} kWh battery
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Sized to carry about {result.battery.essentialLoadKw} kW of
            essential loads (lights, fan, small fridge, router) for{" "}
            {result.battery.backupHours} hours of backup during an outage.
            Battery backup is a separate line item from the solar array — your
            survey will confirm what fits your setup.
          </p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-line p-4">
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Indicative installed cost
        </div>
        <div className="mt-1 font-display text-xl font-bold">
          {formatPhpRange(fullOffsetCost)}
          <span className="ml-2 text-sm font-normal text-ink-soft">
            for the {kwpHi} kWp full-offset system
          </span>
        </div>
      </div>

      <div className="space-y-1 text-sm text-ink-soft">
        <div className="font-semibold text-ink">Assumptions behind this estimate</div>
        <ul className="list-inside list-disc space-y-1">
          <li>
            Reference tariff of {formatPhp(a.tariffPhpPerKwh)}/kWh — real
            bills vary by DUTY, season, and billing period.
          </li>
          <li>
            Sun hours for your region, a {Math.round(a.systemLossFraction * 100)}%
            system loss factor, and a {Math.round(result.selfConsumptionFraction * 100)}%
            self-consumption estimate from your occupancy answers.
          </li>
          <li>
            Exported energy credited at {formatPhp(a.exportCreditPhpPerKwh)}/kWh
            (conservative net-metering deferral), not your full tariff.
          </li>
          <li>
            Installed cost of {formatPhpRange(a.installedCostPerKwpRange)}/kWp;
            actual cost depends on roof, structure, electrical work, and
            equipment.
          </li>
        </ul>
      </div>

      <p className="text-sm text-ink-soft">
        Indicative estimate based on the information provided. Final system
        sizing and quotation require a site survey and engineering review.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <Button href={prefillUrl} size="lg" onClick={onCtaClick}>
          Book a Free Site Survey
        </Button>
        <span className="text-sm text-ink-soft">
          Your estimate is pre-filled — 10-minute form.
        </span>
      </div>
    </Card>
  );
}
