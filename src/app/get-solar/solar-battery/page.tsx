import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageNote,
  PageSection,
  PageFaq,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Solar + Battery (Hybrid)",
  description:
    "Hybrid home solar with battery backup in the Philippines: daytime bill savings plus backup for chosen essential loads during brownouts. Sized to your bill and the loads that matter.",
};

const audiences = [
  {
    title: "Brownout-prone areas",
    body: "Frequent or long outages — the battery keeps chosen essentials running when the grid goes dark.",
  },
  {
    title: "Work-from-home and medical loads",
    body: "Wi-Fi, laptops, home office, or medical equipment that should keep going through an outage.",
  },
  {
    title: "Savings plus resilience",
    body: "You want the bill relief of solar without giving up comfort when the grid fails.",
  },
];

const inclusions = [
  "Solar panel array sized to your bill and roof",
  "Hybrid inverter (grid-tied plus battery management)",
  "Battery storage, sized to your backup load list",
  "Backup circuit planning — the outlets and loads that stay on",
  "Net-metering assistance with your distribution utility",
  "Warranty and after-sales support",
];

const faqs = [
  {
    question: "Can a battery back up my whole house?",
    answer:
      "It can be designed to, but whole-home backup requires a much larger and more expensive battery bank. Most households choose a prioritized load list — lights, fan, Wi-Fi, refrigerator, TV — which is cheaper and covers what actually matters. We define the backup loads with you during the free site survey.",
  },
  {
    question: "How long will the battery last during an outage?",
    answer:
      "It depends on the battery size and what you run. A small load (lights, fan, Wi-Fi) can run for many hours on a modest battery; adding heavy loads (aircon, heater) drains it fast. Your proposal includes a load-by-load estimate for your specific backup list.",
  },
  {
    question: "What happens to the battery over time?",
    answer:
      "Batteries degrade with age and cycle count. We select battery products with warranties that cover the bulk of their useful life, and the proposal states the warranty terms plainly. Replacement cost at end of life is far lower than replacing the whole system.",
  },
  {
    question: "Is a battery worth it if brownouts are rare where I live?",
    answer:
      "Sometimes not — a grid-tied system is cheaper and may be enough. The honest test: how often are outages, how long do they last, and what would an outage actually cost you (missed work, spoiled food, safety)? If that answer is 'rare and cheap,' on-grid is the better value. We'll say so if we think it.",
  },
];

export default function SolarBatteryPage() {
  return (
    <>
      <PageHero
        eyebrow="Hybrid · Solar + Battery"
        title="Solar savings with brownout backup"
        lead="A hybrid system stores daytime solar in a battery — so your bill drops during the day, and your chosen essential loads keep running when the grid goes down. Bill relief and resilience, one system."
      />

      <PageSection
        id="who"
        title="Who hybrid + battery fits"
        intro="Backup is a design choice, not an afterthought — the system is right-sized around the loads you actually need to keep alive."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title}>
              <h3 className="font-display text-lg font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{a.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="Backup covers the loads you choose — not automatically your whole house">
            <p>
              By default, a home battery system backs up a{" "}
              <strong>priority circuit list</strong> (typically lights, fan,
              Wi-Fi, refrigerator, TV) — not every aircon and heater in the
              house. Whole-home backup is possible but costs significantly
              more. We set the backup load list with you during the site
              survey and price it explicitly.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="system"
        title="What's in the system"
        intro="Everything a grid-tied system has, plus the storage and planning that make backup real."
        className="bg-white"
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {inclusions.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-xl border border-line bg-paper p-4 text-sm"
            >
              <span
                aria-hidden="true"
                className="mt-1 h-2 w-2 shrink-0 rounded-full bg-moss"
              />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <PageNote title="Two numbers that drive the design">
            <p>
              <strong>Backup load list</strong> — which circuits stay on, and
              how many watts they draw. <strong>Battery size</strong> — how
              long that list should run. Change one, and the other moves.
              Both are decided at survey, not guessed at.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="tradeoffs"
        title="Honest trade-offs"
        intro="So you can compare fairly with a plain grid-tied system."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="font-display font-bold">Higher upfront cost</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Battery and hybrid inverter add real cost over grid-tied. The
              calculator shows the difference as a range for your size.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Battery lifespan</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Batteries carry a limited cycle life and a warranty that covers
              most of it. Budget for a replacement long-term; the rest of the
              system carries on.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Not a generator</h3>
            <p className="mt-2 text-sm text-ink-soft">
              A battery bridge, not a power plant. It covers the outage window
              and your priority loads — sized honestly, not inflated.
            </p>
          </Card>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
