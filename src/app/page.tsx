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
    </>
  );
}
