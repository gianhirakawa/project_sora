"use client";

import { useState } from "react";
import { submitContact, type ActionResult } from "@/server/actions/leads";
import { Button } from "../ui/button";
import {
  Field,
  TextField,
  FormErrorBanner,
  FormSuccessBanner,
} from "../ui/field";

type FormState = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

const initialState: FormState = { name: "", mobile: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<ActionResult | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPending(true);
    setBanner(null);
    const result = await submitContact({ ...values, email: values.email || undefined });
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

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [key]: e.target.value }));

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {banner?.ok === false && <FormErrorBanner message={banner.message} />}
      {banner?.ok === true && <FormSuccessBanner message={banner.message} />}

      <Field label="Full name" htmlFor="contact-name" error={fieldErrors.name}>
        <TextField
          id="contact-name"
          name="name"
          value={values.name}
          onChange={set("name")}
          autoComplete="name"
          error={fieldErrors.name}
          required
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mobile number" htmlFor="contact-mobile" error={fieldErrors.mobile}>
          <TextField
            id="contact-mobile"
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
        <Field label="Email (optional)" htmlFor="contact-email" error={fieldErrors.email}>
          <TextField
            id="contact-email"
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

      <Field label="How can we help?" htmlFor="contact-message" error={fieldErrors.message}>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={set("message")}
          required
          className="min-h-28 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink placeholder:text-ink-soft/60 focus:border-ink focus:outline-2 focus:-outline-offset-1 focus:outline-ink/30"
        />
      </Field>

      <Button size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
      </Button>

      <p className="text-xs text-ink-soft">
        By submitting, you consent to Sora contacting you about this message.
        See our{" "}
        <a href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
