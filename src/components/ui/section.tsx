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

type Tone = "default" | "surface" | "dark";

const TONE_CLASSES: Record<Tone, string> = {
  default: "",
  surface: "bg-white",
  dark: "bg-ink text-paper",
};

/**
 * Full-width page section with shared rhythm, Container, and a scroll
 * offset so anchor jumps clear the sticky header.
 *
 * Pass tone classes (e.g. `border-y border-line`) via `className`; the
 * Container padding class goes in `containerClassName`.
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
      <Container
        className={
          containerClassName ? `${sectionRhythm} ${containerClassName}` : sectionRhythm
        }
      >
        {children}
      </Container>
    </section>
  );
}
