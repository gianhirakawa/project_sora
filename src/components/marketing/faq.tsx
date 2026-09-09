import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";
import { Accordion } from "../ui/accordion";

/**
 * FAQ (M1). Questions map to the customer-question list in PROJECT.md.
 * Net-metering answers are intentionally general; the detailed guide
 * (Milestone 5) carries utility-specific, versioned details.
 */
const items = [
  {
    question: "How much solar do I need for my electric bill?",
    answer:
      "Start with your average monthly bill. Our calculator converts it into an indicative system size and savings range, and the free site survey refines it to your roof, shading, and load profile.",
  },
  {
    question: "Will solar still help during a brownout?",
    answer:
      "To be clear: a standard grid-tied system pauses during an outage for electrical safety and does not provide backup. If backup matters to you, a hybrid system with a battery can keep your chosen circuits (lights, fridge, Wi-Fi) running — that's what the battery option is for.",
  },
  {
    question: "What is net metering and is it worth it?",
    answer:
      "Net metering lets you earn credit for the excess solar you export to the grid, applied against your bill. In the Philippines the terms are set by your distribution utility and are being updated by the regulator, so exact credit values vary by utility and over time. We handle the filing with your utility as part of the project.",
  },
  {
    question: "Is my roof suitable for solar?",
    answer:
      "Most roofs can carry solar, but structural strength, orientation, and shading decide the design. Your bill gives us the size; the free site survey confirms the roof can do the job and where the panels should go.",
  },
  {
    question: "How long does it take to see a return?",
    answer:
      "Payback depends on system size, bill, and daily usage. Homeowners commonly see several years of simple payback with grid-tied systems in the Philippines — the calculator shows you a range, and your proposal shows a firm number with its assumptions.",
  },
  {
    question: "What happens after I request a quote?",
    answer:
      "You get a confirmation right away, then a Sora engineer follows up to schedule the free site survey. After the survey you receive a firm proposal with hardware, pricing, and the net-metering steps. Nothing is binding until you approve a proposal.",
  },
];

export function Faq() {
  return (
    <Section id="faq" labelledBy="faq-heading" tone="surface">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div>
          <SectionHeading
            id="faq-heading"
            title="Questions, answered straight"
            intro={
              <>
                Still unsure about something?{" "}
              <a
                href="/contact"
                className="font-semibold text-ink underline underline-offset-4 hover:decoration-sun hover:decoration-2"
              >
                Ask us directly
              </a>{" "}
                — a real person replies.
              </>
            }
          />
          </div>
          <Accordion items={items} />
        </div>
    </Section>
  );
}
