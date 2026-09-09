export function Badge({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-sand px-3 py-1 text-xs font-semibold tracking-wide text-ink-soft uppercase ${className}`}
    >
      {children}
    </span>
  );
}
