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
  title: "Inverters",
  description:
    "Home solar inverters in the Philippines: grid-tied vs hybrid, what the difference actually does for your bill and your brownout days, and how we choose.",
};

const types = [
  {
    title: "Grid-tied inverter",
    body: "Converts panel DC to AC for your home and the grid. Lowest cost per kilowatt. Shuts off when the grid goes down — by design, for line-worker safety.",
    fits: "Most households where backup is not the priority.",
  },
  {
    title: "Hybrid inverter + battery",
    body: "Does everything a grid-tied inverter does, plus charges and discharges a battery. This is what makes brownout backup possible.",
    fits: "Brownout-prone areas, WFH, medical loads.",
  },
];

const matters = [
  {
    title: "Continuous vs surge rating",
    body: "Aircon compressors and pumps need surge headroom. The rating is matched to your load list, not a default.",
  },
  {
    title: "Efficiency",
    body: "The difference between inverters is real but modest; we optimize total system cost, not a single spec line.",
  },
  {
    title: "Monitoring",
    body: "The inverter is also your data source. We pick units whose monitoring we can set up and support without a support ticket.",
  },
  {
    title: "Warranty & support",
    body: "Inverter warranty terms vary by model and region. The proposal states the warranty you actually get, here.",
  },
];

const faqs = [
  {
    question: "Do I need a hybrid inverter?",
    answer:
      "Only if you want backup. A grid-tied inverter is cheaper and sufficient for pure bill relief. If brownouts matter to you, hybrid + battery is the path — see Solar + Battery for the honest sizing trade-offs.",
  },
  {
    question: "What happens to my solar during a brownout?",
    answer:
      "A grid-tied system shuts off completely. That's mandatory protection for utility line workers. A hybrid system can switch your priority loads to the battery — that's the difference the inverter class buys you.",
  },
  {
    question: "Which inverter brand do you use?",
    answer:
      "Selected per project from established manufacturers, matched to your system size and whether it's grid-tied or hybrid. The model and its warranty are named in your proposal.",
  },
];

export default function InvertersPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Inverters"
        title="The inverter: the one decision with two answers"
        lead="Grid-tied or hybrid. That single choice sets your cost, your backup capability, and part of your future upgrade path. Everything else about inverters is engineering detail."
      />

      <PageSection
        id="types"
        title="The two types"
        intro="There is no third category that matters for a residential Philippine home."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {types.map((t) => (
            <Card key={t.title} className="flex flex-col gap-3">
              <h3 className="font-display text-xl font-bold">{t.title}</h3>
              <p className="flex-1 text-sm text-ink-soft">{t.body}</p>
              <p className="rounded-lg bg-sky px-3 py-2 text-sm font-medium">
                {t.fits}
              </p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="No backup without a battery — and a grid-tied system has no backup at all">
            <p>
              A grid-tied system shuts off during any grid outage, brownout
              or blackout. If you want power during outages, the system must
              be hybrid with a battery, sized for the loads you choose to
              keep running.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageSection
        id="matters"
        title="What we actually check"
        intro="The spec lines that change a household's experience."
        className="bg-white"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {matters.map((m) => (
            <Card key={m.title}>
              <h3 className="font-display font-bold">{m.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{m.body}</p>
            </Card>
          ))}
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
