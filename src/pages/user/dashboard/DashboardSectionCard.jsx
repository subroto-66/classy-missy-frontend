export default function DashboardSectionCard({
  title,
  description,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 ${className}`}
    >
      <div className="mb-5">
        <h2 className="text-[15px] font-semibold text-black">{title}</h2>
        <p className="mt-1 text-[11px] text-neutral-500">{description}</p>
      </div>
      {children}
    </section>
  );
}
