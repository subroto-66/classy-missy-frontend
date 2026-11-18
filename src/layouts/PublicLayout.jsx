import { useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";

export default function PublicLayout() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-100px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
