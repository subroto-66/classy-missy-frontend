import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";

export default function PublicLayout() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <CartProvider>
      <WishlistProvider>
        <Header />
        <main className="min-h-[calc(100vh-100px)]">
          <Outlet />
        </main>
        <Footer />
      </WishlistProvider>
    </CartProvider>
  );
}
