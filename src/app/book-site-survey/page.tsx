import type { Metadata } from "next";
import { ClipboardCheck, MapPin, Timer, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { BookSiteSurveyForm } from "@/components/forms/book-site-survey-form";

export const metadata: Metadata = {
  title: "Book a Free Site Survey",
  description:
    "Request a free site survey from Sora Solar. We assess your roof, loads, and backup goals, then send a firm proposal.",
};

const benefits = [
  {
    icon: Timer,
    title: "Free, no obligation",
    body: "The survey costs nothing and commits you to nothing.",
  },
  {
    icon: MapPin,
    title: "Roof & load check",
    body: "Structural fit, orientation, shading, and your actual circuits.",
  },
  {
    icon: ClipboardCheck,
    title: "Firm proposal after",
    body: "Hardware, pricing, warranty, and net-metering steps — in writing.",
  },
  {
    icon: ShieldCheck,
    title: "Honest fit check",
    body: "If solar isn't the right call for your situation, we'll tell you.",
  },
];

export default function BookSiteSurveyPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Book a free site survey
          </h1>
          <p className="mt-4 max-w-lg text-lg text-ink-soft">
            Two minutes to request. A Sora engineer confirms the visit, assesses
            your property, and follows up with a firm proposal.
          </p>

          <ul className="mt-8 space-y-5">
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky">
                  <Icon className="h-5 w-5 text-ink" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-display font-bold">{title}</p>
                  <p className="text-sm text-ink-soft">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="sr-only">Site survey request form</h2>
          <BookSiteSurveyForm />
        </div>
      </div>
    </Container>
  );
}
