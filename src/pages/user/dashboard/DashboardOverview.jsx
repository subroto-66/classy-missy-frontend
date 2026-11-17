import {
  FiArrowRight,
  FiArrowUpRight,
  FiCreditCard,
  FiEdit2,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import { useCart } from "../../../context/CartContext";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardStatusBadge from "./DashboardStatusBadge";
import { orders } from "./dashboardData";

export default function DashboardOverview() {
  const { items } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const stats = [
    { label: "Total orders", value: "12", note: "2 this month", icon: FiShoppingBag },
    { label: "Total spent", value: "৳24,850", note: "Across all orders", icon: FiCreditCard },
    { label: "In your cart", value: String(cartCount).padStart(2, "0"), note: "Ready when you are", icon: FiShoppingCart },
    { label: "Reviews", value: "04", note: "Thank you for sharing", icon: FiStar },
  ];

  return (
    <div className="space-y-7">
      <section className="relative overflow-hidden rounded-2xl bg-neutral-200 px-6 py-7 sm:px-9 sm:py-9">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[34px] border-white/40" />
        <div className="absolute -bottom-28 right-36 h-56 w-56 rounded-full bg-neutral-300/50" />
        <div className="relative max-w-xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Your beauty space
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-[30px]">
            Welcome back, Sarah
          </h2>
          <p className="mt-2 max-w-md text-[13px] leading-6 text-neutral-700">
            Keep your skincare routine on track. Your orders, saved details, and
            reviews are all in one place.
          </p>
          <Link to="/dashboard/orders" className="mt-5 inline-flex">
            <Button
              type="button"
              className="rounded-lg bg-black text-xs text-white hover:bg-neutral-800"
            >
              View my orders <FiArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon }) => (
          <article
            key={label}
            className="rounded-2xl border border-neutral-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                <Icon size={18} />
              </span>
              <FiArrowUpRight size={16} className="text-neutral-400" />
            </div>
            <p className="mt-4 text-[12px] text-neutral-600">{label}</p>
            <p className="mt-1 text-[23px] font-semibold tracking-tight text-black">
              {value}
            </p>
            <p className="mt-1 text-[10px] text-neutral-500">{note}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(270px,0.8fr)]">
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-[15px] font-semibold text-black">Recent orders</h2>
              <p className="mt-1 text-[11px] text-neutral-500">
                A little look at your latest purchases
              </p>
            </div>
            <Link
              to="/dashboard/orders"
              className="cursor-pointer text-[11px] font-medium text-neutral-700 hover:text-black"
            >
              See all
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {orders.slice(0, 3).map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-3 first:border-0 first:pt-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700">
                    <FiPackage size={17} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-neutral-800">
                      {order.id}
                    </p>
                    <p className="max-w-[210px] truncate text-[10px] text-neutral-500">
                      {order.products}
                    </p>
                  </div>
                </div>
                <div className="ml-auto flex items-center gap-3">
                  <DashboardStatusBadge status={order.status} />
                  <p className="text-[11px] font-semibold text-neutral-800">
                    {formatProductPrice(order.total)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-black">Quick links</h2>
          <p className="mt-1 text-[11px] text-neutral-500">
            Manage your account with ease
          </p>
          <div className="mt-4 space-y-2">
            {[
              { label: "Update profile", path: "/dashboard/profile", icon: FiEdit2 },
              { label: "Check transactions", path: "/dashboard/transactions", icon: FiCreditCard },
              { label: "Write a review", path: "/dashboard/reviews", icon: FiStar },
            ].map(({ label, path, icon: Icon }) => (
              <Link
                to={path}
                key={path}
                className="flex w-full cursor-pointer items-center justify-between rounded-xl border border-neutral-200 px-3.5 py-3 text-left text-[11px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={15} />
                  {label}
                </span>
                <FiArrowRight size={14} className="text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
