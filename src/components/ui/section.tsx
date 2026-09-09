import type { ReactNode } from "react";
import { Container } from "./container";

/**
 * Site section rhythm (M2 theme revamp).
 *
 * The single sanctioned vertical padding for content sections. Hero
 * headers may deviate; everything else should use this so pages have
 * one consistent vertical beat.
 */
export const sectionRhythm = "py-14 sm:py-20";

type Tone = "default" | "surface" | "tint" | "dark";

const TONE_CLASSES: Record<Tone, string> = {
  default: "",
  surface: "bg-white",
  tint: "bg-sand",
  dark: "relative overflow-hidden bg-ink text-paper",
};

/**
 * Full-width page section with shared rhythm, Container, and a scroll
 * offset so anchor jumps clear the sticky header.
 *
 * Tones (see .pi/DESIGN_THEME.md): `default` (paper), `surface` (white),
 * `tint` (sand), `dark` (ink with dawn glow + top sunline). Adjacent
 * sections must never share a tone.
 *
 * Pass extra classes via `className`; the Container padding class goes in
 * `containerClassName`.
 */
export function Section({
  id,
  labelledBy,
  ariaLabel,
  tone = "default",
  className = "",
  containerClassName,
  children,
}: {
  id?: string;
  labelledBy?: string;
  ariaLabel?: string;
  tone?: Tone;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}) {
  const classes = ["scroll-mt-20", TONE_CLASSES[tone], className]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      aria-label={ariaLabel}
      className={classes}
    >
      {tone === "dark" && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* Sunline across the top of every dark band */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-sunrise" />
          {/* Dawn glow */}
          <div className="absolute -top-28 left-1/2 h-80 w-[640px] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,183,3,0.16),transparent_72%)]" />
        </div>
      )}
      <Container
        className={
          `relative ${
            containerClassName ? `${sectionRhythm} ${containerClassName}` : sectionRhythm
          }`
        }
      >
        {children}
      </Container>
    </section>
  );
}
