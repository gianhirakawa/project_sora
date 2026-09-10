import Link from "next/link";
import { Section } from "../ui/section";
import { SectionHeading } from "../ui/section-heading";

const steps = [
  {
    n: "01",
    title: "Estimate online",
    body: "Run the bill-first calculator and get an indicative system size and savings range in minutes.",
  },
  {
    n: "02",
    title: "Free site survey",
    body: "A Sora engineer visits (or reviews your photos and bill) to confirm roof, structure, shading, and loads.",
  },
  {
    n: "03",
    title: "Clear proposal",
    body: "You get a firm proposal with real pricing, hardware, warranty, and net-metering steps explained.",
  },
  {
    n: "04",
    title: "Install & operate",
    body: "We install, coordinate net metering with your distribution utility, and hand over a working system with support.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-it-works-heading" tone="dark">
      <SectionHeading
        id="how-it-works-heading"
        dark
        className="sr"
        title="From estimate to installed — four steps."
        intro="No account, no jargon, and you always know what happens next."
      />

      <div className="relative mt-10">
        {/* connecting rail (desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-11 hidden h-px bg-gradient-to-r from-transparent via-sun/40 to-transparent lg:block"
        />
        <ol className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={`sr ${
                i > 0 ? `sr-d${i}` : ""
              } rounded-2xl border border-paper/15 bg-paper/5 p-6 transition hover:border-sun/50 hover:bg-paper/10`}
            >
              <span className="font-display text-3xl font-extrabold text-sun">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <div className="sr mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <Link
          href="/book-site-survey"
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-sun px-6 font-display text-sm font-semibold text-ink shadow-[0_2px_0_0_rgb(250_246_238)] transition hover:-translate-y-0.5 hover:bg-sun-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun"
        >
          Start at step 2 — book the free survey
        </Link>
        <p className="text-sm text-paper/60">
          Nothing is binding until you approve a proposal.
        </p>
      </div>
    </Section>
  );
}
