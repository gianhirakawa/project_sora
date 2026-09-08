import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing the use of the Sora Solar website, including indicative estimates and proposals.",
};

export default function TermsPage() {
  return (
    <Container className="max-w-3xl py-14 sm:py-20">
      <h1 className="font-display text-4xl font-extrabold tracking-tight">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-ink-soft">
        Last updated:{" "}
        <time dateTime="2026-01-01">January 1, 2026</time>
      </p>

      <div className="mt-8 space-y-6 text-ink-soft">
        <section>
          <h2 className="font-display text-xl font-bold text-ink">1. About this site</h2>
          <p className="mt-2">
            This website is provided by Sora Solar to help Philippine
            homeowners understand and plan residential solar installations.
            Using the site means you agree to these terms.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">
            2. Estimates are indicative
          </h2>
          <p className="mt-2">
            Calculator outputs, package ranges, and savings/payback figures on
            this site are indicative planning estimates, not engineering
            designs, guarantees, or quotations. They depend on inputs you
            provide, assumptions that are shown with them, and conditions that
            only a site survey can verify. Binding pricing is provided only in
            a written proposal after a survey.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">
            3. No implied backup for grid-tied systems
          </h2>
          <p className="mt-2">
            Standard grid-tied systems stop during grid outages for electrical
            safety. Backup capability requires a properly designed hybrid or
            off-grid system with batteries and is described as such in any
            proposal.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">
            4. Net metering
          </h2>
          <p className="mt-2">
            Net-metering availability, credit values, and procedures are set
            by your distribution utility and applicable regulations, and change
            over time. Statements about net metering on this site are
            general guidance, not a guarantee of any credit or approval.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">
            5. Proposals and commitments
          </h2>
          <p className="mt-2">
            Nothing on the site is a binding offer. An agreement exists only
            when you accept a written proposal and we execute a contract.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">6. Content</h2>
          <p className="mt-2">
            We work to keep content accurate and current, but we make no
            warranty that it is error-free. Where guidance conflicts with your
            utility&apos;s published rules or an executed contract, those
            prevail.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-ink">7. Changes</h2>
          <p className="mt-2">
            We may update these terms; material changes will be reflected on
            this page with a new &ldquo;last updated&rdquo; date.
          </p>
        </section>
      </div>
    </Container>
  );
}
