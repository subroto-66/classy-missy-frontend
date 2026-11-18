import { useState } from "react";
import {
  FiCreditCard,
  FiHome,
  FiLock,
  FiLogOut,
  FiMenu,
  FiPackage,
  FiShoppingCart,
  FiStar,
  FiUser,
  FiX,
} from "react-icons/fi";
import { LuLoaderCircle } from "react-icons/lu";
import { Link, Navigate, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import Logo from "../components/shared/Logo";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const navigation = [
  { path: "/dashboard", label: "Dashboard", icon: FiHome, end: true },
  { path: "/dashboard/orders", label: "My orders", icon: FiPackage },
  { path: "/dashboard/cart", label: "Shopping cart", icon: FiShoppingCart },
  { path: "/dashboard/transactions", label: "Transaction history", icon: FiCreditCard },
  { path: "/dashboard/profile", label: "Profile settings", icon: FiUser },
  { path: "/dashboard/password", label: "Change password", icon: FiLock },
  { path: "/dashboard/reviews", label: "My reviews", icon: FiStar },
];

const defaultAvatar =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=85";

export default function DashboardLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();
  const { pathname } = location;
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, logout } = useAuth();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const sectionTitle =
    navigation.find((item) => item.path === pathname)?.label ?? "Dashboard";

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileNavOpen((open) => !open);
    } else {
      setSidebarCollapsed((collapsed) => !collapsed);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch {
      navigate("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-50">
        <div className="flex flex-col items-center gap-3">
          <LuLoaderCircle className="h-8 w-8 animate-spin text-neutral-800" />
          <p className="text-xs text-neutral-500">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 md:flex">
      {mobileNavOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setMobileNavOpen(false)}
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-neutral-200 bg-white transition-all duration-200 md:sticky md:top-0 md:z-20 md:h-screen md:translate-x-0 ${
          sidebarCollapsed ? "md:w-[84px]" : ""
        } ${mobileNavOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div
          className={`flex h-[76px] items-center border-b border-neutral-200 ${
            sidebarCollapsed
              ? "md:justify-center md:px-2"
              : "justify-between px-6"
          }`}
        >
          <div className={sidebarCollapsed ? "md:hidden" : ""}>
            <Logo size="h-9 w-auto" />
          </div>
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileNavOpen(false)}
            className="cursor-pointer rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 md:hidden"
          >
            <FiX size={19} />
          </button>
          {sidebarCollapsed && (
            <span className="hidden text-lg font-semibold tracking-tight text-black md:inline">
              cm
            </span>
          )}
        </div>

        <div className={`px-4 pt-7 ${sidebarCollapsed ? "md:px-3" : ""}`}>
          <p
            className={`mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.17em] text-neutral-400 ${
              sidebarCollapsed ? "md:hidden" : ""
            }`}
          >
            Main menu
          </p>
          <nav aria-label="Dashboard navigation" className="space-y-1">
            {navigation.map(({ path, label, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                title={sidebarCollapsed ? label : undefined}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-left text-[13px] transition-colors ${
                    isActive
                      ? "bg-black font-semibold text-white"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-black"
                  } ${sidebarCollapsed ? "md:justify-center md:px-0" : ""}`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span className={sidebarCollapsed ? "md:hidden" : ""}>
                  {label}
                </span>
                {path === "/dashboard/cart" && cartCount > 0 && (
                  <span
                    className={`ml-auto rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-semibold text-black ${
                      sidebarCollapsed ? "md:hidden" : ""
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div
          className={`mt-auto border-t border-neutral-200 p-4 ${
            sidebarCollapsed ? "md:px-3" : ""
          }`}
        >
          <button
            type="button"
            onClick={handleLogout}
            title={sidebarCollapsed ? "Log out" : undefined}
            className={`flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-neutral-700 transition-colors hover:bg-neutral-100 ${
              sidebarCollapsed ? "md:justify-center md:px-0" : ""
            }`}
          >
            <FiLogOut size={18} className="shrink-0" />
            <span className={sidebarCollapsed ? "md:hidden" : ""}>Log out</span>
          </button>
          <p
            className={`mt-4 px-3 text-[10px] text-neutral-400 ${
              sidebarCollapsed ? "md:hidden" : ""
            }`}
          >
            Classy Missy · Your beauty space
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur sm:px-7 lg:px-10">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl text-neutral-700 transition-colors hover:bg-neutral-100"
            >
              <FiMenu size={20} />
            </button>
            <div className="min-w-0">
              <p className="hidden text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 sm:block">
                Account
              </p>
              <h1 className="truncate text-[15px] font-semibold text-black">
                {sectionTitle}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || defaultAvatar}
              alt={user?.name || "Customer"}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-neutral-200"
            />
            <div className="hidden sm:block text-left">
              <p className="text-[13px] font-semibold leading-5 text-black">
                {user?.name || "Customer"}
              </p>
              <p className="text-[11px] leading-4 text-neutral-500">
                {user?.email || "Signed in"}
              </p>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-7 sm:py-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
