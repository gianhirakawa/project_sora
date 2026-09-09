import { Container } from "../ui/container";
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
    <section id="packages" aria-labelledby="packages-heading" className="scroll-mt-20">
      <Container className="py-16 sm:py-20">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2
              id="packages-heading"
              className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
            >
              Package examples to start the conversation
            </h2>
            <p className="mt-3 text-ink-soft">
              Illustrative starting points — your actual proposal is sized to
              your bill, roof, and goals.{" "}
              <a
                href="/packages"
                className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
              >
                Full packages &amp; pricing →
              </a>
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {PACKAGE_OPTIONS.map((option) => (
            <PackageCard key={option.name} option={option} />
          ))}
        </div>
        <p className="mt-5 text-xs text-ink-soft">
          Prices are illustrative starting points in Philippine pesos and are
          not quotations. Final pricing depends on the site survey.
        </p>
      </Container>
    </section>
  );
}
