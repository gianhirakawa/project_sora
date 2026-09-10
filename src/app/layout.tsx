import type { Metadata } from "next";
import { Instrument_Sans, Sora } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/scroll-progress";
import { StickyCta } from "@/components/sticky-cta";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Sora Solar — Home Solar for Philippine Households",
    template: "%s | Sora Solar",
  },
  description:
    "Estimate your home solar savings in minutes. Sora designs, installs, and services residential solar systems across the Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${instrument.variable} [font-family:var(--font-instrument)]`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:font-semibold focus:text-paper"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Header />
        <div className="flex min-h-svh flex-1 flex-col">
          <main id="main" className="flex-1">{children}</main>
        </div>
        <Footer />
        <StickyCta />
      </body>
    </html>
  );
}
