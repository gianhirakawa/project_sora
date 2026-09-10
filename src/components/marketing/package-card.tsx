import { Button } from "../ui/button";
import type { PackageOption } from "./package-options";

/**
 * Shared package card — used by the homepage section and /packages.
 *
 * All three cards are uniform in size, spacing, typography, and CTA. The
 * `highlight` option ("Most popular") differs only by the badge inside the
 * card (top-right) and a slightly deeper hover shadow/ring; the sun border
 * appears only on hover, like the other cards.
 */
export function PackageCard({
  option,
  className = "",
}: {
  option: PackageOption;
  className?: string;
}) {
  const emphasized = option.highlight;

  return (
    <article
      className={[
        "group relative flex flex-col gap-4 rounded-2xl border-2 bg-white p-6 transition-all duration-300 hover:-translate-y-1",
        emphasized
          ? "border-line shadow-float hover:border-sun hover:ring-4 hover:ring-sun/15" // deeper hover shadow, same box
          : "border-line shadow-lift hover:border-sun",
        className,
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-xl font-bold">{option.name}</h3>
        {emphasized && (
          <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-sun px-3 py-1 font-display text-xs font-bold uppercase tracking-wide text-ink shadow-[0_2px_0_0_rgb(12_31_51)]">
            Most popular
          </span>
        )}
      </div>
      <p className="text-sm font-semibold text-ink-soft">{option.size}</p>
      <p className="font-display text-3xl font-extrabold tabular-nums">
        {option.price}
      </p>
      <p className="text-sm text-ink-soft">{option.fits}</p>
      <ul className="flex-1 space-y-2">
        {option.includes.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
            <span
              aria-hidden="true"
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss"
            />
            {item}
          </li>
        ))}
      </ul>
      <Button
        href="/book-site-survey"
        variant="sun"
        size="md"
        className="w-full"
      >
        Get My Actual Quote
      </Button>
    </article>
  );
}
