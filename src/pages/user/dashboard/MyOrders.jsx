import { useEffect, useState } from "react";
import { FiArrowUpRight, FiPackage, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardSectionCard from "./DashboardSectionCard";
import DashboardStatusBadge from "./DashboardStatusBadge";
import Button from "../../../components/ui/Button";
import api from "../../../lib/axios";

export default function MyOrders() {
  const [ordersList, setOrdersList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/orders")
      .then((res) => {
        if (active && Array.isArray(res.data?.data)) {
          setOrdersList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load user orders:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <DashboardSectionCard
      title="My orders"
      description="Track your purchases and revisit past orders."
    >
      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex animate-pulse items-center justify-between py-3 border-b border-neutral-100">
              <div className="h-4 w-24 rounded bg-neutral-100" />
              <div className="h-4 w-20 rounded bg-neutral-100" />
              <div className="h-4 w-40 rounded bg-neutral-100" />
              <div className="h-4 w-16 rounded bg-neutral-100" />
              <div className="h-6 w-20 rounded-full bg-neutral-100" />
            </div>
          ))}
        </div>
      ) : ordersList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[690px] text-left">
            <thead>
              <tr className="border-b border-neutral-200 text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                <th className="px-3 py-3 font-medium">Order</th>
                <th className="px-3 py-3 font-medium">Date</th>
                <th className="px-3 py-3 font-medium">Products</th>
                <th className="px-3 py-3 font-medium">Total</th>
                <th className="px-3 py-3 font-medium">Status</th>
                <th className="px-3 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/60 transition-colors"
                >
                  <td className="px-3 py-4 text-[11px] font-semibold text-neutral-800">
                    {order.id || order.order_number}
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
                    <Link
                      to="/products"
                      aria-label={`Buy again from ${order.id}`}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg p-2 text-xs text-neutral-600 hover:bg-neutral-100 hover:text-black"
                    >
                      <span className="hidden sm:inline">Shop more</span>
                      <FiArrowUpRight size={14} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
            <FiShoppingBag size={24} />
          </span>
          <h3 className="mt-4 text-sm font-semibold text-neutral-900">
            No orders placed yet
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
            When you purchase skincare items, you'll be able to track delivery progress and view purchase details right here.
          </p>
          <Link to="/products" className="mt-5 inline-flex">
            <Button className="rounded-lg bg-black text-xs text-white hover:bg-neutral-800">
              Explore products
            </Button>
          </Link>
        </div>
      )}
    </DashboardSectionCard>
  );
}
