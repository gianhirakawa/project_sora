import { Container } from "../ui/container";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

/**
 * Package preview cards (M1).
 * NOTE: names, sizes, and price bands are illustrative placeholders —
 * confirm real package offerings with the business before launch.
 */
const packages = [
  {
    name: "Sora Small",
    size: "≈ 3 kW · 6–8 panels",
    price: "₱350k – ₱450k",
    fits: "Condos and small homes wanting daytime bill relief",
    includes: ["Grid-tied inverter", "Net-metering assistance", "Standard warranty"],
    highlight: false,
  },
  {
    name: "Sora Family",
    size: "≈ 6 kW · 12–16 panels",
    price: "₱700k – ₱900k",
    fits: "Family houses with AC, laundry, and WFH loads",
    includes: ["Grid-tied inverter", "Net-metering assistance", "Option to add battery later"],
    highlight: true,
  },
  {
    name: "Sora Premium",
    size: "≈ 10 kW+ · 18+ panels",
    price: "₱1.2M+",
    fits: "Large homes and hybrid + battery backup targets",
    includes: ["Hybrid inverter + battery ready", "Backup-circuit planning", "Priority service"],
    highlight: false,
  },
];

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
              your bill, roof, and goals.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {packages.map((pkg) => (
            <Card
              key={pkg.name}
              className={`flex flex-col gap-4 ${
                pkg.highlight
                  ? "border-2 border-sun shadow-[0_16px_40px_-16px_rgba(227,155,0,0.45)]"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-display text-xl font-bold">{pkg.name}</h3>
                {pkg.highlight && <Badge>Most popular</Badge>}
              </div>
              <p className="text-sm font-semibold text-ink-soft">{pkg.size}</p>
              <p className="font-display text-3xl font-extrabold">{pkg.price}</p>
              <p className="text-sm text-ink-soft">{pkg.fits}</p>
              <ul className="flex-1 space-y-2">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    {item}
                  </li>
                ))}
              </ul>
              <Button
                href="/book-site-survey"
                variant={pkg.highlight ? "primary" : "secondary"}
                className="w-full"
              >
                Get My Actual Quote
              </Button>
            </Card>
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
