export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-line bg-white p-6 shadow-lift transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgb(12_31_51_/_0.28)] ${className}`}
    >
      {children}
    </div>
  );
}
