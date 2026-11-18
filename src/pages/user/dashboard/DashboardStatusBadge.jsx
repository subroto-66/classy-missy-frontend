export default function DashboardStatusBadge({ status = "Pending" }) {
  const normalized = String(status).toLowerCase().trim();

  let colorClasses = "bg-neutral-100 text-neutral-700 border-neutral-200";

  if (normalized.includes("deliver")) {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
  } else if (normalized.includes("transit") || normalized.includes("shipp")) {
    colorClasses = "bg-sky-50 text-sky-700 border-sky-200";
  } else if (normalized.includes("process")) {
    colorClasses = "bg-amber-50 text-amber-700 border-amber-200";
  } else if (normalized.includes("cancel") || normalized.includes("fail")) {
    colorClasses = "bg-rose-50 text-rose-700 border-rose-200";
  } else if (normalized.includes("paid")) {
    colorClasses = "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium capitalize tracking-wide ${colorClasses}`}
    >
      {status}
    </span>
  );
}
