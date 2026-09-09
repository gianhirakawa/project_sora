import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { PACKAGE_OPTIONS } from "./package-options";
import { PackageCard } from "./package-card";

/**
 * Package preview cards (M1). Data lives in package-options.ts so the
 * homepage and /packages page share one source of truth.
 * NOTE: names, sizes, and price bands are illustrative placeholders —
 * confirm real package offerings with the business before launch.
 */
export function Packages() {
  return (
    <Section id="packages" labelledBy="packages-heading">
      <SectionHeading
        id="packages-heading"
        title="Package examples to start the conversation"
        intro={
          <>
            Illustrative starting points — your actual proposal is sized to
            your bill, roof, and goals.{" "}
            <a
              href="/packages"
              className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
            >
              Full packages &amp; pricing →
            </a>
          </>
        }
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {PACKAGE_OPTIONS.map((option) => (
          <PackageCard key={option.name} option={option} />
        ))}
      </div>
      <p className="mt-5 text-xs text-ink-soft">
        Prices are illustrative starting points in Philippine pesos and are
        not quotations. Final pricing depends on the site survey.
      </p>
    </Section>
  );
}
