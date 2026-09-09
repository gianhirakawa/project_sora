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
  title: "Off-Grid Solar",
  description:
    "Off-grid home solar for the Philippines: a self-contained panel, battery, and inverter system for homes without reliable grid access, sized around your full 24-hour load.",
};

const audiences = [
  {
    title: "No grid access",
    body: "Remote barangays, farm sites, and upland properties where a utility connection is unavailable or years away.",
  },
  {
    title: "Unreliable grid",
    body: "Places where the line exists but outages are so frequent that the grid isn't a dependable power source.",
  },
  {
    title: "Deliberate independence",
    body: "Owners who want a defined, predictable power budget independent of the grid.",
  },
];

const inclusions = [
  "Solar panel array sized for your full daily load",
  "Battery bank sized for overnight and low-sun days",
  "Inverter / charge management built for battery operation",
  "Load planning — what runs, when, and from what",
  "Mounting, wiring, and protection hardware",
  "Warranty and after-sales support",
];

const faqs = [
  {
    question: "How is off-grid sizing different from grid-tied sizing?",
    answer:
      "A grid-tied system is sized mostly against your daytime bill. An off-grid system must cover your entire 24-hour load — including evenings — plus cloudy-day reserves, which means a larger panel array and a much larger battery bank. Sizing is conservative by design.",
  },
  {
    question: "What can it actually run?",
    answer:
      "Lighting, TV, fan, fridge, Wi-Fi, and small appliances comfortably, with good load planning. Heavy continuous loads (large aircon, well pumps, heaters) work but drive battery cost up fast. We plan the system around your actual load list, ranked by what matters.",
  },
  {
    question: "What happens on cloudy days?",
    answer:
      "The battery bank carries the load while panels produce less. That's why off-grid systems are sized with a reserve for several low-production days. If loads exceed what panels + batteries can sustain on the worst days, the plan says so and we adjust loads or sizing before you commit.",
  },
  {
    question: "Can I connect to the grid later if it reaches my area?",
    answer:
      "Usually yes, with conversion work — typically inverter changes and possibly panel/battery reconfiguration. If a grid connection is realistically coming, tell us now; it can simplify the initial design and lower cost.",
  },
];

export default function OffGridPage() {
  return (
    <>
      <PageHero
        eyebrow="Off-Grid"
        title="Power for homes without grid access"
        lead="A self-contained system — panels, batteries, and inverter — sized around your full 24-hour load. No utility connection, no net metering, no dependence on a line that may not reach your property."
      />

      <PageSection
        id="who"
        title="Who off-grid fits"
        intro="This is the system of last resort for grid-connected homes and the right answer where there is no practical grid."
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
          <PageNote title="Off-grid has no net metering">
            <p>
              There is no grid to export to, so every watt you use must be
              produced or stored by the system itself. That&apos;s why off-grid
              systems cost more per kilowatt than grid-tied systems — and
              why sizing is done around your complete daily load, not just
              your electric bill.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="system"
        title="What's in the system"
        intro="Self-contained by design: every component has to do a job the grid would normally do."
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
      </PageSection>

      <PageSection
        id="load"
        title="The honest part: your load list"
        intro="An off-grid system is only as good as the load plan behind it."
      >
        <div className="grid gap-5 sm:grid-cols-3">
          <Card>
            <h3 className="font-display font-bold">Size is conservative</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Arrays and battery banks are sized with weather and
              low-production reserves, so the system is bigger (and more
              expensive) than a grid-tied system of the same load.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">Load discipline pays</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Ranking loads by what matters — and trimming what doesn&apos;t — is
              the single biggest cost lever. We do this together in the
              survey.
            </p>
          </Card>
          <Card>
            <h3 className="font-display font-bold">No silent limits</h3>
            <p className="mt-2 text-sm text-ink-soft">
              If your desired loads exceed what a sensible system can
              sustain, you&apos;ll hear that before you sign anything — with
              options.
            </p>
          </Card>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
