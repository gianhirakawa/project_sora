import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Questions about home solar, net metering, or your roof? Contact Sora Solar — a real person replies, usually within one business day.",
};

export default function ContactPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Talk to a real person
          </h1>
          <p className="mt-4 max-w-md text-lg text-ink-soft">
            Questions about sizing, net metering, brownout backup, or an
            existing system? Send a message — we reply to every one, usually
            within one business day.
          </p>
          <div className="mt-8 rounded-2xl border border-line bg-white p-6 text-sm">
            <h2 className="font-display font-bold">Faster paths</h2>
            <ul className="mt-3 space-y-2 text-ink-soft">
              <li>
                Want numbers first?{" "}
                <a href="/calculate" className="font-semibold text-ink underline underline-offset-4">
                  Run the calculator
                </a>
              </li>
              <li>
                Ready to move?{" "}
                <a href="/book-site-survey" className="font-semibold text-ink underline underline-offset-4">
                  Book the free site survey
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div>
          <h2 className="sr-only">Contact form</h2>
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
