import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  FiArrowRight,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import Button from "../ui/Button";
import CartItem from "./CartItem";
import { formatProductPrice } from "../../lib/productUtils";

const formatPrice = formatProductPrice;

export default function CartDrawer({ open, onClose }) {
  const { items, setQuantity, removeFromCart } = useCart();

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = items.reduce(
    (sum, item) =>
      sum + Math.max((item.oldPrice || item.price) - item.price, 0) * item.quantity,
    0,
  );
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return createPortal(
    <div className="fixed inset-0 z-[120]">
      <button
        type="button"
        aria-label="Close cart"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/55 backdrop-blur-[2px]"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="cart-drawer-enter absolute inset-y-0 right-0 flex w-full max-w-[min(28rem,100vw)] flex-col border-l border-border bg-background shadow-custom sm:max-w-md"
      >
        <header className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <h2 id="cart-title" className="text-lg font-semibold text-foreground">
              My cart
            </h2>
            <p className="mt-0.5 text-xs text-foreground-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>
          <Button
          variant="ghost"
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            // className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background-secondary"
          >
            <FiX size={20} />
          </Button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-background-secondary text-foreground-secondary">
              <FiShoppingBag size={26} />
            </span>
            <h3 className="mt-5 text-base font-semibold text-foreground">
              Your cart is looking lovely and empty
            </h3>
            <p className="mt-2 max-w-xs text-sm leading-6 text-foreground-secondary">
              Add something you love and it will show up here.
            </p>
            <Button
              type="button"
              onClick={onClose}
              // className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              Continue shopping <FiArrowRight size={15} />
            </Button>
          </div>
        ) : (
          <>
            <ul className="custom-scrollbar flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setQuantity={setQuantity}
                  removeFromCart={removeFromCart}
                  compact
                />
              ))}
            </ul>

            <div className="border-t border-border bg-background px-5 py-5 sm:px-6">
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between text-foreground-secondary">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal + discount)}</span>
                </div>
                <div className="flex justify-between text-foreground-secondary">
                  <span>Discount</span>
                  <span className="font-medium text-foreground">
                    −{formatPrice(discount)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>
              <Link to="/checkout" onClick={onClose} className="block w-full">
                <Button
                  type="button"
                  className="w-full"
                >
                  Proceed to checkout <FiArrowRight size={16} />
                </Button>
              </Link>
              <p className="mt-3 text-center text-[11px] text-foreground-secondary">
                Delivery charges are calculated at checkout.
              </p>
            </div>
          </>
        )}
      </aside>
    </div>,
    document.body,
  );
}
