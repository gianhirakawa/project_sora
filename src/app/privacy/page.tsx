import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Sora Solar collects, uses, and protects your information, including lead form details and uploaded documents.",
};

export default function PrivacyPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated:{" "}
        <time dateTime="2026-01-01">January 1, 2026</time>
      </p>

      <div className="mt-8 space-y-6 text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-bold text-ink">What we collect</h2>
          <p className="mt-2">
            When you request a quote, book a site survey, or contact us, we
            collect the details you provide: name, mobile number, email
            (optional), location, property role, and notes about your
            property or electric bill. Later features may include electric
            bills, roof photos, and project documents you choose to upload.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">How we use it</h2>
          <p className="mt-2">
            Your information is used to respond to your request, size a system,
            coordinate your site survey, prepare proposals, and — with your
            consent — follow up. Uploaded documents are private by default and
            are used only for your project.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">Consent</h2>
          <p className="mt-2">
            Submitting any form on this site is your consent to be contacted
            about that request. You can withdraw consent by contacting us at
            any time, and we will stop contacting you except where completion
            of an existing agreement requires it.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">Sharing</h2>
          <p className="mt-2">
            We share the minimum necessary information with our own team and
            with the service providers that operate our website, forms, and
            follow-up tooling. We do not sell your personal information.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">Analytics</h2>
          <p className="mt-2">
            We use privacy-respecting analytics to understand which pages help
            homeowners decide. Where analytics tools are enabled, we follow
            their documented privacy settings.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">Your rights</h2>
          <p className="mt-2">
            You may request access to, correction of, or deletion of your
            personal information at any time. Contact us through the contact
            page and we will respond within a reasonable period.
          </p>
        </section>
      </div>
    </Container>
  );
}
