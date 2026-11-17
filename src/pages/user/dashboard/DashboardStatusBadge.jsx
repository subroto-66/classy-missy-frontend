export default function DashboardStatusBadge({ status }) {
  return (
    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[9px] font-medium text-neutral-700">
      {status}
    </span>
  );
}
