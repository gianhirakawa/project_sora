import { ArrowRight, Battery, PlugZap, Trees } from "lucide-react";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Card } from "../ui/card";

/**
 * Solution cards (M1). Page links point to Milestone 2 routes;
 * until those pages exist, cards use descriptive framing only.
 */
const solutions = [
  {
    icon: PlugZap,
    title: "On-Grid (Grid-Tied)",
    tagline: "Cut your bill, keep the grid",
    points: [
      "Powers daytime loads and banks excess via net metering",
      "No batteries — the most affordable entry point",
      "Note: grid-tied systems pause during an outage for safety",
    ],
    href: "/get-solar/home-solar",
  },
  {
    icon: Battery,
    title: "Hybrid + Battery",
    tagline: "Savings plus brownout backup",
    points: [
      "Stores daytime solar for evenings and outages",
      "Keeps chosen essentials running: lights, fan, Wi-Fi, fridge",
      "Right-sized for the loads that matter to you",
    ],
    href: "/get-solar/solar-battery",
  },
  {
    icon: Trees,
    title: "Off-Grid",
    tagline: "Independent, off the grid",
    points: [
      "For sites without reliable grid access",
      "Panels + batteries + inverter as a self-contained system",
      "Sized around your actual load profile",
    ],
    href: "/get-solar/off-grid",
  },
];

export function Solutions() {
  return (
    <Section id="solutions" labelledBy="solutions-heading" tone="surface">
      <SectionHeading
        id="solutions-heading"
        title="Three ways to go solar. One fits your home."
        intro="Every system is sized to your bill, roof, and goals — not to a catalog template."
      />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {solutions.map(({ icon: Icon, title, tagline, points, href }) => (
            <Card key={title} className="flex flex-col gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-sky">
                <Icon className="h-6 w-6 text-ink" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">{title}</h3>
                <p className="text-sm font-medium text-sun-deep">{tagline}</p>
              </div>
              <ul className="flex-1 space-y-2">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sun" />
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={href}
                className="inline-flex items-center gap-1.5 font-display text-sm font-bold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
              >
                Learn more
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-sm text-ink-soft">
          Already have solar?{" "}
          <a
            href="/get-solar/upgrade-solar"
            className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sun"
          >
            Upgrade or expand your existing system →
          </a>
        </p>
    </Section>
  );
}
