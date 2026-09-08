export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-6 shadow-lift ${className}`}
    >
      {children}
    </div>
  );
}
