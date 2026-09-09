import type { ReactNode } from "react";
import { Badge } from "./badge";

/**
 * Standard content-section heading: optional eyebrow badge, h2 title,
 * intro line (M2 theme revamp). The only sanctioned h2 title style —
 * `font-display text-3xl font-extrabold tracking-tight sm:text-4xl` —
 * with a `text-lg` intro underneath.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  dark = false,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  dark?: boolean;
  className?: string;
}) {
  const classes = ["max-w-2xl", className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {/* Sunline — the site's signature motif (see .pi/DESIGN_THEME.md) */}
      <span aria-hidden="true" className="block h-[3px] w-12 rounded-full bg-sunrise" />
      {eyebrow ? (
        <Badge
          className={`mt-4 ${
            dark ? "border-paper/20 bg-paper/10 text-paper" : ""
          }`}
        >
          {eyebrow}
        </Badge>
      ) : null}
      <h2
        id={id}
        className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-3 text-lg ${dark ? "text-paper/70" : "text-ink-soft"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}
