import { Hero } from "@/components/marketing/hero";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { CalculatorTeaser } from "@/components/marketing/calculator-teaser";
import { Solutions } from "@/components/marketing/solutions";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { Packages } from "@/components/marketing/packages";
import { Projects } from "@/components/marketing/projects";
import { WhySora } from "@/components/marketing/why-sora";
import { Faq } from "@/components/marketing/faq";
import { FinalCta } from "@/components/marketing/final-cta";
import { ScrollReveal } from "@/components/reveal";

// Mirrors the FAQ copy in faq.tsx. Keep the two in sync (or extract to a
// shared module if the list grows).
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much solar do I need for my electric bill?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start with your average monthly bill. Our calculator converts it into an indicative system size and savings range, and the free site survey refines it to your roof, shading, and load profile.",
      },
    },
    {
      "@type": "Question",
      name: "Will solar still help during a brownout?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A standard grid-tied system pauses during an outage for electrical safety and does not provide backup. A hybrid system with a battery can keep chosen circuits such as lights, fridge and Wi-Fi running.",
      },
    },
    {
      "@type": "Question",
      name: "What is net metering and is it worth it?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Net metering credits the excess solar you export to the grid against your bill. Terms are set by your distribution utility and vary. Sora handles the filing as part of the project.",
      },
    },
    {
      "@type": "Question",
      name: "Is my roof suitable for solar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most roofs can carry solar, but structural strength, orientation and shading decide the design. The free site survey confirms it.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to see a return?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Payback depends on system size, bill and daily usage. The calculator shows an indicative range and the proposal shows a firm number with its assumptions.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after I request a quote?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You get a confirmation, then a Sora engineer schedules the free site survey. After the survey you receive a firm proposal. Nothing is binding until you approve it.",
      },
    },
  ],
};

export default function HomePage() {
  // Section order follows the homepage order in .pi/FRONTEND.md
  return (
    <>
      <Hero />
      <TrustStrip />
      <CalculatorTeaser />
      <Solutions />
      <HowItWorks />
      <Packages />
      <Projects />
      <WhySora />
      <Faq />
      <FinalCta />

      {/* Observes every .sr element added by the sections above. */}
      <ScrollReveal />

      {/* FAQ structured data for rich results (mirrors faq.tsx copy). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}
