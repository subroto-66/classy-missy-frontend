import { FiArrowUpRight } from "react-icons/fi";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardSectionCard from "./DashboardSectionCard";
import DashboardStatusBadge from "./DashboardStatusBadge";
import { orders } from "./dashboardData";

export default function MyOrders() {
  return (
    <DashboardSectionCard
      title="My orders"
      description="Track your purchases and revisit past orders."
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[690px] text-left">
          <thead>
            <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-[0.1em] text-neutral-500">
              <th className="px-3 py-3 font-medium">Order</th>
              <th className="px-3 py-3 font-medium">Date</th>
              <th className="px-3 py-3 font-medium">Products</th>
              <th className="px-3 py-3 font-medium">Total</th>
              <th className="px-3 py-3 font-medium">Status</th>
              <th className="px-3 py-3 font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-neutral-100 last:border-0"
              >
                <td className="px-3 py-4 text-[11px] font-semibold text-neutral-800">
                  {order.id}
                </td>
                <td className="px-3 py-4 text-[11px] text-neutral-600">
                  {order.date}
                </td>
                <td className="max-w-[210px] truncate px-3 py-4 text-[11px] text-neutral-600">
                  {order.products}
                </td>
                <td className="px-3 py-4 text-[11px] font-medium text-neutral-800">
                  {formatProductPrice(order.total)}
                </td>
                <td className="px-3 py-4">
                  <DashboardStatusBadge status={order.status} />
                </td>
                <td className="px-3 py-4">
                  <button
                    type="button"
                    aria-label={`View ${order.id}`}
                    className="cursor-pointer rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
                  >
                    <FiArrowUpRight size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardSectionCard>
  );
}
