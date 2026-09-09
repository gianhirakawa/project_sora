import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import {
  PageHero,
  PageSection,
  PageNote,
  PageFaq,
} from "@/components/marketing/content";
import { FinalCta } from "@/components/marketing/final-cta";

export const metadata: Metadata = {
  title: "Batteries",
  description:
    "Home solar batteries in the Philippines: what a battery backup actually covers, how backup load lists are sized, and the honest trade-offs before you buy.",
};

const uses = [
  {
    title: "Brownout backup",
    body: "Keep a priority list of loads running when the grid drops: lights, fan, Wi-Fi, refrigerator, TV. The battery is sized for that list and the outage durations that matter to you.",
  },
  {
    title: "Peak shifting (where it pays)",
    body: "Storing midday solar for evening use. Whether it improves your economics depends on your utility's rate structure — we check the math for your area before promising anything.",
  },
];

const faqs = [
  {
    question: "Can a battery back up my whole house?",
    answer:
      "Technically yes, but it usually isn't worth it. Whole-home backup needs a much larger battery bank. The better design is a priority load list — the circuits that matter — which costs less and does what you actually need. We build that list with you at the survey.",
  },
  {
    question: "How long will the battery last during an outage?",
    answer:
      "It depends on the battery size and your backup load list. A modest battery can run lights, a fan, Wi-Fi, and a refrigerator for many hours; add aircon and the math changes fast. Your proposal includes the load-by-load estimate for your specific list.",
  },
  {
    question: "What about battery lifespan?",
    answer:
      "Batteries are rated in cycles and come with warranties that cover the bulk of their life. We select battery products with meaningful warranties and state the terms in the proposal. Replacement is a real long-term cost — we show it as one, not hide it.",
  },
];

export default function BatteriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Batteries"
        title="Batteries: buy them for a reason"
        lead="A battery is the most expensive option in a solar system after the panels. It's worth it when you know exactly what it's for. It's a mistake when it's just anxiety with a price tag."
      />

      <PageSection
        id="uses"
        title="The two legitimate uses"
        intro="If your goal isn't one of these, we'll say a battery probably isn't worth it yet."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {uses.map((u) => (
            <Card key={u.title}>
              <h3 className="font-display text-xl font-bold">{u.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{u.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="The sizing rule: load list first, capacity second">
            <p>
              We don&apos;t start with &ldquo;how many kilowatt-hours?&rdquo;
              We start with which circuits stay on and for how long. The
              battery size falls out of that conversation — and it&apos;s
              almost always smaller (and cheaper) than people&apos;s first
              guess.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="tradeoffs"
        title="The trade-offs, plainly"
        intro="So you can decide with open eyes."
        className="bg-white"
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="font-display font-bold">Cost</h3>
            <p className="mt-2 text-sm text-ink-soft">
              A battery is a significant add-on — typically a large share of a
              grid-tied system&apos;s price, depending on size.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Not a generator</h3>
            <p className="mt-2 text-sm text-ink-soft">
              A battery bridges an outage; it doesn&apos;t replace a power
              source. Multi-day outages with heavy loads need a bigger plan.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">End-of-life</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Batteries eventually need replacement. The panels and inverter
              keep working; only the storage gets swapped.
            </p>
          </Card>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
