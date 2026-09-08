"use client";

import { useState } from "react";
import {
  submitSiteSurvey,
  type ActionResult,
} from "@/server/actions/leads";
import { Button } from "../ui/button";
import {
  Field,
  TextField,
  SelectField,
  FormErrorBanner,
  FormSuccessBanner,
} from "../ui/field";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  city: string;
  propertyRole: string;
  interest: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  mobile: "",
  email: "",
  city: "",
  propertyRole: "",
  interest: "grid_tied",
  notes: "",
};

export function BookSiteSurveyForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  // Preserve user input on validation errors: only clear on submit start.
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setBanner(null);
    const result = await submitSiteSurvey({ ...values, email: values.email || undefined });
    setPending(false);
    if (result.ok) {
      setBanner(result);
      setValues(initialState);
      setFieldErrors({});
    } else {
      setBanner(result);
      setFieldErrors(result.fieldErrors);
    }
  }

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {banner?.ok === false && <FormErrorBanner message={banner.message} />}
      {banner?.ok === true && <FormSuccessBanner message={banner.message} />}

      <Field label="Full name" htmlFor="survey-name" error={fieldErrors.name}>
        <TextField
          id="survey-name"
          name="name"
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          error={fieldErrors.name}
          required
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mobile number" htmlFor="survey-mobile" error={fieldErrors.mobile}>
          <TextField
            id="survey-mobile"
            name="mobile"
            type="tel"
            inputMode="tel"
            placeholder="09XX XXX XXXX"
            value={values.mobile}
            onChange={set("mobile")}
            autoComplete="tel"
            error={fieldErrors.mobile}
            required
          />
        </Field>
        <Field label="Email (optional)" htmlFor="survey-email" error={fieldErrors.email}>
          <TextField
            id="survey-email"
            name="email"
            type="email"
            inputMode="email"
            value={values.email}
            onChange={set("email")}
            autoComplete="email"
            error={fieldErrors.email}
          />
        </Field>
      </div>

      <Field label="City / municipality" htmlFor="survey-city" error={fieldErrors.city}>
        <TextField
          id="survey-city"
          name="city"
          value={values.city}
          onChange={set("city")}
          placeholder="e.g. Cebu City"
          error={fieldErrors.city}
          required
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Are you the property owner?"
          htmlFor="survey-role"
          error={fieldErrors.propertyRole}
        >
          <SelectField
            id="survey-role"
            name="propertyRole"
            value={values.propertyRole}
            onChange={set("propertyRole")}
            error={fieldErrors.propertyRole}
            required
          >
            <option value="" disabled>
              Choose one
            </option>
            <option value="owner">I own the property</option>
            <option value="renter">I rent</option>
            <option value="property_manager">I manage the property</option>
            <option value="undecided">Not sure / other</option>
          </SelectField>
        </Field>

        <Field label="I'm interested in" htmlFor="survey-interest" error={fieldErrors.interest}>
          <SelectField
            id="survey-interest"
            name="interest"
            value={values.interest}
            onChange={set("interest")}
            error={fieldErrors.interest}
          >
            <option value="grid_tied">On-grid (grid-tied)</option>
            <option value="hybrid_battery">Hybrid + battery (backup)</option>
            <option value="off_grid">Off-grid</option>
            <option value="not_sure">Not sure yet</option>
          </SelectField>
        </Field>
      </div>

      <Field
        label="Anything we should know? (optional)"
        htmlFor="survey-notes"
        error={fieldErrors.notes}
        hint="Roof type, outage frequency, existing solar — anything helpful."
      >
        <textarea
          id="survey-notes"
          name="notes"
          rows={4}
          value={values.notes}
          onChange={set("notes")}
          className="min-h-24 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-2 focus:-outline-offset-1 focus:outline-ink/30"
        />
      </Field>

      <Button size="lg" disabled={pending}>
        {pending ? "Sending…" : "Request Free Site Survey"}
      </Button>

      <p className="text-xs text-ink-soft">
        By submitting, you consent to Sora contacting you about this request.
        See our{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
