import { useEffect, useState } from "react";
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
import { useAuth } from "../../../context/AuthContext";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardStatusBadge from "./DashboardStatusBadge";
import api from "../../../lib/axios";

export default function DashboardOverview() {
  const { items } = useCart();
  const { user } = useAuth();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/dashboard/overview")
      .then((res) => {
        if (active && res.data?.data) {
          setDashboardData(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Dashboard overview error:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const totalOrders = dashboardData?.stats?.total_orders ?? 0;
  const totalSpent = dashboardData?.stats?.total_spent ?? 0;
  const reviewsCount = dashboardData?.stats?.reviews_count ?? 0;
  const recentOrders = dashboardData?.recent_orders ?? [];

  const stats = [
    {
      label: "Total orders",
      value: loading ? "..." : String(totalOrders).padStart(2, "0"),
      note: "Across your account",
      icon: FiShoppingBag,
      link: "/dashboard/orders",
    },
    {
      label: "Total spent",
      value: loading ? "..." : `৳${Number(totalSpent).toLocaleString("en-BD")}`,
      note: "All-time total",
      icon: FiCreditCard,
      link: "/dashboard/transactions",
    },
    {
      label: "In your cart",
      value: String(cartCount).padStart(2, "0"),
      note: cartCount === 1 ? "1 item waiting" : "Ready when you are",
      icon: FiShoppingCart,
      link: "/dashboard/cart",
    },
    {
      label: "Reviews",
      value: loading ? "..." : String(reviewsCount).padStart(2, "0"),
      note: "Thank you for sharing",
      icon: FiStar,
      link: "/dashboard/reviews",
    },
  ];

  const firstName = user?.name ? user.name.trim().split(" ")[0] : "Customer";

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-2xl bg-neutral-200 px-6 py-7 sm:px-9 sm:py-9">
        <div className="absolute -right-10 -top-20 h-64 w-64 rounded-full border-[34px] border-white/40" />
        <div className="absolute -bottom-28 right-36 h-56 w-56 rounded-full bg-neutral-300/50" />
        <div className="relative max-w-xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
            Your beauty space
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-[30px]">
            Welcome back, {firstName}
          </h2>
          <p className="mt-2 max-w-md text-[13px] leading-6 text-neutral-700">
            Keep your skincare routine on track. Your orders, saved details, and
            reviews are all in one place.
          </p>
          <Link to="/dashboard/orders" className="mt-5 inline-flex">
            <Button
              type="button"
              className="rounded-lg bg-primary text-xs text-primary-foreground hover:bg-primary/90 shadow-xs"
            >
              View my orders <FiArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </section>

      {/* 4 Stat Cards */}
      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, link }) => (
          <Link
            key={label}
            to={link}
            className="group rounded-2xl border border-neutral-200 bg-white p-5 transition-shadow hover:shadow-sm hover:border-primary/40"
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100 text-neutral-700 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon size={18} />
              </span>
              <FiArrowUpRight
                size={16}
                className="text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </div>
            <p className="mt-4 text-[12px] text-neutral-600">{label}</p>
            <p className="mt-1 text-[23px] font-semibold tracking-tight text-black">
              {value}
            </p>
            <p className="mt-1 text-[10px] text-neutral-500">{note}</p>
          </Link>
        ))}
      </section>

      {/* Recent Orders & Quick Links */}
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(270px,0.8fr)]">
        {/* Recent orders */}
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
            {loading ? (
              <div className="space-y-3 py-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex animate-pulse items-center justify-between gap-3 border-t border-neutral-100 pt-3 first:border-0 first:pt-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-neutral-100" />
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-24 rounded bg-neutral-100" />
                        <div className="h-2.5 w-36 rounded bg-neutral-100" />
                      </div>
                    </div>
                    <div className="h-5 w-20 rounded-full bg-neutral-100" />
                  </div>
                ))}
              </div>
            ) : recentOrders.length > 0 ? (
              recentOrders.map((order) => (
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
              ))
            ) : (
              <div className="py-10 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
                  <FiPackage size={22} />
                </span>
                <p className="mt-3 text-xs font-semibold text-neutral-800">
                  No orders yet
                </p>
                <p className="mt-1 text-[11px] text-neutral-500">
                  Your purchases will appear here once you place an order.
                </p>
                <Link to="/products" className="mt-4 inline-flex">
                  <Button size="sm" className="rounded-lg bg-primary text-xs text-primary-foreground hover:bg-primary/90 shadow-xs">
                    Start shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
          <h2 className="text-[15px] font-semibold text-black">Quick links</h2>
          <p className="mt-1 text-[11px] text-neutral-500">
            Manage your account with ease
          </p>
          <div className="mt-4 space-y-2">
            {[
              { label: "Update profile", path: "/dashboard/profile", icon: FiEdit2 },
              { label: "Check transactions", path: "/dashboard/transactions", icon: FiCreditCard },
              { label: "View my cart", path: "/dashboard/cart", icon: FiShoppingCart },
              { label: "Browse shop", path: "/products", icon: FiPackage },
            ].map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className="flex cursor-pointer items-center justify-between rounded-xl border border-neutral-100 p-3 text-[12px] font-medium text-neutral-800 transition hover:bg-neutral-50"
              >
                <span className="flex items-center gap-2.5">
                  <Icon size={15} className="text-neutral-500" />
                  {label}
                </span>
                <FiArrowRight size={13} className="text-neutral-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
