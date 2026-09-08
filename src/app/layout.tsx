import type { Metadata } from "next";
import { Instrument_Sans, Sora } from "next/font/google";
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
      <body>{children}</body>
    </html>
  );
}
