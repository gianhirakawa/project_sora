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
  title: "Mounting & Protection",
  description:
    "Solar mounting and electrical protection for Philippine homes: racking, roof structure checks, wind loading, grounding, and the protection gear that keeps the system safe.",
};

const parts = [
  {
    title: "Racking & clamps",
    body: "The rails, legs, and clamps that hold the array to the roof. Specified for the roof type (metal, concrete, tile) and the wind loading of your location.",
  },
  {
    title: "Roof structure assessment",
    body: "Not every roof wants panels the first day you look at it. We check structure and, where needed, get an engineer's sign-off before installation.",
  },
  {
    title: "DC protection & disconnects",
    body: "Fuses, breakers, and the required disconnects — the parts nobody sees that make the system legal and safe to work on.",
  },
  {
    title: "Grounding & surge protection",
    body: "Lightning and surge protection for a system that is, by design, a very large antenna on your roof. Non-negotiable in the tropics.",
  },
];

const faqs = [
  {
    question: "Will the mounting damage my roof?",
    answer:
      "The mounting penetrates or attaches to the roof at discrete points, each flashed and sealed. When it's done right, the attachment points are no more leak-prone than a well-done roof penetration anywhere else — and the array itself shades and protects the roof beneath it. We document the approach per roof type in your proposal.",
  },
  {
    question: "What about typhoons?",
    answer:
      "Racking is specified for wind loading appropriate to your location and roof type, and the installation is made to match that spec. We document the ratings in the proposal rather than promise survival of an unbounded force — no equipment warrants that.",
  },
];

export default function MountingPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Mounting & Protection"
        title="The unglamorous part that holds everything"
        lead="Racking, roof structure, grounding, and protection gear don't make marketing photos — but they decide whether the system survives typhoon season and passes inspection. Here's how we spec them."
      />

      <PageSection
        id="parts"
        title="What's in the spec"
        intro="Four things, all named in the proposal for your specific roof."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {parts.map((p) => (
            <Card key={p.title}>
              <h3 className="font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-ink-soft">{p.body}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5">
          <PageNote title="Typhoons, honestly">
            <p>
              We spec racking for wind loading appropriate to your location
              and roof type. We will not promise survival of an unbounded
              force — no equipment warrants that. What we will do: document
              the ratings in the proposal and make sure the installation
              matches them.
            </p>
          </PageNote>
        </div>
      </PageSection>

      <PageFaq items={faqs} className="bg-white" />
      <FinalCta />
    </>
  );
}
