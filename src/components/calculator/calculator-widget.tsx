"use client";

import { useEffect, useRef, useState } from "react";
import {
  CITY_OPTIONS,
  OTHER_CITY,
  OTHER_CITY_KEY,
  getCityOption,
} from "@/features/calculator/cities";
import { calculateSolarEstimate, type CalculatorResult } from "@/features/calculator/calculator";
import { buildSurveyPrefillUrl } from "@/features/calculator/prefill";
import {
  calculatorInputSchema,
  DAYTIME_USAGE,
  type FieldErrors,
  GOALS,
  PROPERTY_ROLES,
  ROOF_TYPES,
} from "@/features/calculator/schema";
import type { DaytimeUsage, Goal, PropertyRole, RoofType } from "@/features/calculator/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, SelectField, TextField } from "@/components/ui/field";
import { trackEvent } from "@/lib/analytics";
import { CalculatorResults } from "./results";

interface FormState {
  bill: string;
  kwh: string;
  acUnits: string;
  city: string;
  duty: string;
  propertyRole: string;
  roofType: string;
  goal: string;
  daytimeUsage: string;
}

const initialState: FormState = {
  bill: "",
  kwh: "",
  acUnits: "",
  city: "",
  duty: "",
  propertyRole: "",
  roofType: "",
  goal: "",
  daytimeUsage: "",
};

interface ResultState {
  result: CalculatorResult;
  propertyRole: PropertyRole;
  cityKey: string;
  duty: string;
  roofType: RoofType;
  goal: Goal;
  monthlyBillPhp: number;
  monthlyKwh?: number;
  systemKwp: readonly [number, number];
  panelCount: readonly [number, number];
}

const PROPERTY_ROLE_LABELS: Record<PropertyRole, string> = {
  owner: "Homeowner",
  renter: "Renter",
  property_manager: "Property manager",
  undecided: "Not sure yet",
};

const ROOF_TYPE_LABELS: Record<RoofType, string> = {
  long_span_gi: "Long span / GI sheet",
  tile: "Tile",
  concrete_deck: "Concrete deck / slab",
  other: "Other / not sure",
};

const GOAL_LABELS: Record<Goal, string> = {
  savings: "Lower my electric bill",
  backup: "Backup during brownouts",
  both: "Both savings and backup",
};

const DAYTIME_USAGE_LABELS: Record<DaytimeUsage, string> = {
  low: "Low — mostly evenings/night",
  medium: "Medium — home all day sometimes",
  high: "High — home during the day",
};

const radioGroupClass = "space-y-1";
const radioLabelClass =
  "flex min-h-11 cursor-pointer items-center gap-2 rounded-xl px-1";
const radioInputClass = "size-4 accent-ink";

/** Validatable fields in DOM order — used to land on the first invalid one. */
const FIELD_ORDER: ReadonlyArray<readonly [keyof FieldErrors, string]> = [
  ["monthlyBillPhp", "#calculator-bill"],
  ["city", "#calculator-city"],
  ["propertyRole", "#calculator-role"],
  ["roofType", "#calculator-roof"],
  ["goal", "#calculator-goal"],
  ["daytimeUsage", "#calculator-daytime"],
  ["monthlyKwh", "#calculator-kwh"],
  ["acUnits", "#calculator-ac"],
];

/**
 * After a failed submit, move the viewport to the first invalid field (DOM
 * order) and focus it, so mobile users are never left staring at the submit
 * button while the error sits off-screen. Radio groups land on their first
 * option so focus is visible and announced by assistive tech.
 */
function focusFirstInvalidField(errors: FieldErrors) {
  const entry = FIELD_ORDER.find(([key]) => errors[key]);
  if (!entry) return;
  const [, selector] = entry;
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "center" });
  const target =
    el instanceof HTMLInputElement || el instanceof HTMLSelectElement
      ? el
      : el.querySelector<HTMLInputElement>("input");
  requestAnimationFrame(() => target?.focus({ preventScroll: true }));
}

function RadioGroup({
  id,
  legend,
  error,
  name,
  options,
  value,
  onChange,
}: {
  id?: string;
  legend: string;
  error?: string;
  name: string;
  options: readonly { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const errorId = `${name}-error`;
  return (
    <fieldset id={id} aria-describedby={error ? errorId : undefined} className="space-y-2">
      <legend className="font-display text-sm font-semibold">{legend}</legend>
      <div className={radioGroupClass}>
        {options.map((opt) => (
          <label key={opt.value} className={radioLabelClass}>
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className={radioInputClass}
            />
            {opt.label}
          </label>
        ))}
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function CalculatorWidget() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<ResultState | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("calculator_view");
  }, []);

  const set = (key: keyof FormState) => (value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleCityChange = (city: string) => {
    setForm((f) => ({ ...f, city, duty: getCityOption(city).duty }));
  };

  const dutyOptions =
    form.city === OTHER_CITY_KEY || !form.city
      ? ["Not sure"]
      : [getCityOption(form.city).duty, "Not sure"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = calculatorInputSchema.safeParse({
      monthlyBillPhp: form.bill ? Number(form.bill) : NaN,
      monthlyKwh: form.kwh ? Number(form.kwh) : undefined,
      acUnits: form.acUnits ? Number(form.acUnits) : undefined,
      city: form.city,
      propertyRole: form.propertyRole,
      roofType: form.roofType,
      goal: form.goal,
      daytimeUsage: form.daytimeUsage,
    });

    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "_form");
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setResult(null);
      setErrors(fieldErrors);
      focusFirstInvalidField(fieldErrors);
      return;
    }

    const values = parsed.data;
    const cityKey = values.city;
    const input = {
      monthlyBillPhp: values.monthlyBillPhp,
      monthlyKwh: values.monthlyKwh,
      region: getCityOption(cityKey).region,
      daytimeUsage: values.daytimeUsage,
      acUnits: values.acUnits,
      goal: values.goal,
    };
    const calc = calculateSolarEstimate(input);

    setResult({
      result: calc,
      propertyRole: values.propertyRole,
      cityKey,
      duty: form.duty || getCityOption(cityKey).duty,
      roofType: values.roofType,
      goal: values.goal,
      monthlyBillPhp: values.monthlyBillPhp,
      monthlyKwh: values.monthlyKwh,
      systemKwp: calc.systemKwp,
      panelCount: calc.panelCount,
    });
    setErrors({});
    trackEvent("calculator_result", {
      goal: values.goal,
      kwp_min: calc.systemKwp[0],
      kwp_max: calc.systemKwp[1],
      panels_min: calc.panelCount[0],
      panels_max: calc.panelCount[1],
      battery: calc.battery !== undefined,
    });
    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const handleReset = () => {
    setForm(initialState);
    setErrors({});
    setResult(null);
  };

  return (
    <div className="space-y-8">
      <Card>
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <Field
            label="Average monthly electric bill (PHP)"
            htmlFor="calculator-bill"
            error={errors.monthlyBillPhp}
            hint="Check the “Total amount due” on your latest bill — that’s all we need to start."
          >
            <TextField
              id="calculator-bill"
              name="monthlyBillPhp"
              type="number"
              inputMode="numeric"
              min={500}
              max={200000}
              step={100}
              placeholder="e.g. 8000"
              value={form.bill}
              onChange={(e) => set("bill")(e.target.value)}
              error={errors.monthlyBillPhp}
            />
          </Field>

          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="City / province" htmlFor="calculator-city" error={errors.city}>
              <SelectField
                id="calculator-city"
                name="city"
                value={form.city}
                onChange={(e) => handleCityChange(e.target.value)}
                error={errors.city}
              >
                <option value="">Select…</option>
                <optgroup label="Luzon">
                  {CITY_OPTIONS.filter((c) => c.region === "luzon").map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Visayas">
                  {CITY_OPTIONS.filter((c) => c.region === "visayas").map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Mindanao">
                  {CITY_OPTIONS.filter((c) => c.region === "mindanao").map((c) => (
                    <option key={c.key} value={c.key}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
                <option value={OTHER_CITY_KEY}>{OTHER_CITY.label}</option>
              </SelectField>
            </Field>

            <Field
              label="Distribution utility (DUTY)"
              htmlFor="calculator-duty"
              hint={
                form.city && form.city !== OTHER_CITY_KEY
                  ? "Auto-filled — change if yours differs"
                  : undefined
              }
            >
              <SelectField
                id="calculator-duty"
                name="duty"
                value={form.duty}
                onChange={(e) => set("duty")(e.target.value)}
              >
                <option value="">Select…</option>
                {dutyOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </SelectField>
            </Field>
          </div>

          <Field
            label="Do you own the property?"
            htmlFor="calculator-role"
            error={errors.propertyRole}
          >
            <SelectField
              id="calculator-role"
              name="propertyRole"
              value={form.propertyRole}
              onChange={(e) => set("propertyRole")(e.target.value)}
              error={errors.propertyRole}
            >
              <option value="">Select…</option>
              {PROPERTY_ROLES.map((r) => (
                <option key={r} value={r}>
                  {PROPERTY_ROLE_LABELS[r]}
                </option>
              ))}
            </SelectField>
          </Field>

          <RadioGroup
            id="calculator-roof"
            legend="Roof type"
            name="roofType"
            error={errors.roofType}
            value={form.roofType}
            onChange={set("roofType")}
            options={ROOF_TYPES.map((r) => ({ value: r, label: ROOF_TYPE_LABELS[r] }))}
          />

          <RadioGroup
            id="calculator-goal"
            legend="Your main goal with solar"
            name="goal"
            error={errors.goal}
            value={form.goal}
            onChange={set("goal")}
            options={GOALS.map((g) => ({ value: g, label: GOAL_LABELS[g] }))}
          />

          <RadioGroup
            id="calculator-daytime"
            legend="Home occupancy during the day"
            name="daytimeUsage"
            error={errors.daytimeUsage}
            value={form.daytimeUsage}
            onChange={set("daytimeUsage")}
            options={DAYTIME_USAGE.map((d) => ({
              value: d,
              label: DAYTIME_USAGE_LABELS[d],
            }))}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <Field
              label="Monthly consumption (kWh) — optional"
              htmlFor="calculator-kwh"
              error={errors.monthlyKwh}
              hint="Shown on your bill — improves the estimate."
            >
              <TextField
                id="calculator-kwh"
                name="monthlyKwh"
                type="number"
                inputMode="numeric"
                min={50}
                max={10000}
                step={10}
                placeholder="e.g. 500"
                value={form.kwh}
                onChange={(e) => set("kwh")(e.target.value)}
                error={errors.monthlyKwh}
              />
            </Field>
            <Field
              label="Daytime AC units — optional"
              htmlFor="calculator-ac"
              error={errors.acUnits}
              hint="How many ACs run while you’re home."
            >
              <TextField
                id="calculator-ac"
                name="acUnits"
                type="number"
                inputMode="numeric"
                min={0}
                max={10}
                step={1}
                placeholder="e.g. 2"
                value={form.acUnits}
                onChange={(e) => set("acUnits")(e.target.value)}
                error={errors.acUnits}
              />
            </Field>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Button type="submit" size="lg">
              Calculate My Savings
            </Button>
            {result ? (
              <Button type="button" variant="ghost" onClick={handleReset}>
                Start over
              </Button>
            ) : null}
          </div>
        </form>
      </Card>

      <div ref={resultRef} role="region" aria-label="Your indicative solar estimate">
        {result ? (
          <CalculatorResults
            result={result.result}
            propertyRole={result.propertyRole}
            onCtaClick={() => trackEvent("calculator_survey_cta", { goal: result.goal })}
            prefillUrl={buildSurveyPrefillUrl({
              monthlyBillPhp: result.monthlyBillPhp,
              monthlyKwh: result.monthlyKwh,
              cityKey: result.cityKey,
              duty: result.duty,
              propertyRole: result.propertyRole,
              roofType: result.roofType,
              goal: result.goal,
              systemKwp: result.systemKwp,
              panelCount: result.panelCount,
            })}
          />
        ) : null}
      </div>
    </div>
  );
}
