import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router";
import { FiHeart, FiMenu, FiX } from "react-icons/fi";
import { PiShoppingCartBold } from "react-icons/pi";
import Container from "../layouts/Container";
import Logo from "./Logo";
import Button from "../ui/Button";
import { Navigation } from "./Navigation";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import ProductSearch from "./ProductSearch";
import CartDrawer from "./CartDrawer";


export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCart();
  const { items: wishlistItems } = useWishlist();
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);
  const closeCart = useCallback(() => setCartOpen(false), []);

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") setSidebarOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-background backdrop-blur">
        <Container>
          <div className="flex min-h-[72px] items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
              <Logo size="h-9 w-auto sm:h-10" />
              <ProductSearch
                className="h-10 rounded-full bg-background-secondary"
                inputClassName="text-sm"
                wrapperClassName="hidden min-w-0 max-w-md flex-1 md:block"
                placeholder="Search products"
                outline={false}
                aria-label="Search products"
              />
            </div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Link
                to="/wishlist"
                aria-label={`Wishlist, ${wishlistItems.length} ${
                  wishlistItems.length === 1 ? "item" : "items"
                }`}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background-custom"
              >
                <FiHeart size={20} />
                {wishlistItems.length > 0 && (
                  <span className="absolute right-0 top-0 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-semibold leading-none text-background">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>
              <Button
                type="button"
                variant="outline"
                aria-label={`Shopping cart, ${cartCount} ${
                  cartCount === 1 ? "item" : "items"
                }`}
                aria-haspopup="dialog"
                aria-expanded={cartOpen}
                onClick={() => setCartOpen(true)}
                className="h-10 rounded-full border-border px-3 text-foreground hover:bg-foreground hover:text-background sm:px-4"
              >
                <span className="relative">
                  <PiShoppingCartBold size={19} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2 -top-2 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-foreground px-1 text-[9px] font-semibold leading-none text-background">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span className="hidden sm:inline">Cart</span>
              </Button>
              <Link
                to="/login"
                className="hidden px-2 text-sm font-medium text-foreground transition-colors hover:text-foreground-secondary sm:inline-flex"
              >
                Sign in
              </Link>
              <button
                type="button"
                aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                aria-expanded={sidebarOpen}
                aria-controls="mobile-sidebar"
                onClick={() => setSidebarOpen((open) => !open)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background-custom lg:hidden"
              >
                {sidebarOpen ? <FiX size={21} /> : <FiMenu size={21} />}
              </button>
            </div>
          </div>

          <div className="pb-3 md:hidden">
            <ProductSearch
              className="h-10 rounded-full bg-background-secondary"
              inputClassName="text-sm"
              wrapperClassName="w-full"
              placeholder="Search products"
              outline={false}
              border={false}
              aria-label="Search products"
            />
          </div>

        </Container>
        <div className="hidden border-t border-border bg-background lg:block">
          <Container>
            <Navigation />
          </Container>
        </div>
      </header>

      {sidebarOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] lg:hidden">
            <button
              type="button"
              aria-label="Close navigation menu"
              onClick={() => setSidebarOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-black/60"
            />
            <aside
              id="mobile-sidebar"
              aria-label="Mobile navigation"
              className="absolute right-0 top-0 flex h-full w-[min(21rem,88vw)] flex-col border-l border-border bg-background p-5 shadow-custom"
            >
              <div className="mb-8 flex items-center justify-between">
                <Logo size="h-9 w-auto" />
                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setSidebarOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background-custom"
                >
                  <FiX size={21} />
                </button>
              </div>
              <Navigation mobile onNavigate={() => setSidebarOpen(false)} />
              <div className="mt-auto border-t border-border pt-5">
                <Link
                  to="/login"
                  onClick={() => setSidebarOpen(false)}
                  className="mt-4 flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-foreground transition-colors hover:bg-background-custom"
                >
                  Sign in
                </Link>
              </div>
            </aside>
          </div>,
          document.body
        )}
      <CartDrawer open={cartOpen} onClose={closeCart} />
    </>
  );
}
