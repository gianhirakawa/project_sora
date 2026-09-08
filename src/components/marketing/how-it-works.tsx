import { Container } from "../ui/container";

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
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-20 border-y border-line bg-ink text-paper"
    >
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2
            id="how-it-works-heading"
            className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
          >
            From estimate to installed — four steps.
          </h2>
          <p className="mt-3 text-paper/70">
            No account, no jargon, and you always know what happens next.
          </p>
        </div>

        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="rounded-2xl border border-paper/15 bg-paper/5 p-6"
            >
              <span className="font-display text-3xl font-extrabold text-sun">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-paper/70">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
