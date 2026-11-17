import { FiArrowRight, FiShoppingBag } from "react-icons/fi";
import { Link } from "react-router";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import CartItem from "../../components/shared/CartItem";
import { useCart } from "../../context/CartContext";
import { formatProductPrice } from "../../lib/productUtils";
import products from "../../data/products";

export default function Cart() {
  const { items, setQuantity, removeFromCart } = useCart();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = items.reduce(
    (total, item) =>
      total +
      Math.max((item.oldPrice || item.price) - item.price, 0) * item.quantity,
    0,
  );

  return (
    <section className="py-8 sm:py-12">
      <Container className="space-y-7">
        <div className="relative isolate flex min-h-48 items-center overflow-hidden rounded-2xl bg-background-secondary px-5 py-8 sm:min-h-56 sm:px-10 lg:px-14">
          <div className="absolute inset-y-0 right-0 z-0 w-2/3 opacity-25 sm:w-1/2">
            <img
              src={products[0].image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/70 to-transparent" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              Your picks
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              My cart
            </h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              {itemCount} {itemCount === 1 ? "item" : "items"} in your cart
            </p>
          </div>
        </div>

        {items.length ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8">
            <ul className="space-y-3">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setQuantity={setQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </ul>

            <aside className="rounded-xl border border-border bg-background p-5 lg:sticky lg:top-32">
              <h2 className="text-base font-semibold text-foreground">
                Order summary
              </h2>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-foreground-secondary">
                  <span>Subtotal</span>
                  <span>{formatProductPrice(subtotal + discount)}</span>
                </div>
                <div className="flex justify-between text-foreground-secondary">
                  <span>Discount</span>
                  <span>-{formatProductPrice(discount)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-4 text-base font-semibold text-foreground">
                  <span>Total</span>
                  <span>{formatProductPrice(subtotal)}</span>
                </div>
              </div>
              <Button type="button" disabled className="mt-5 w-full rounded-lg">
                Checkout coming soon
                <FiArrowRight size={16} />
              </Button>
              <p className="mt-3 text-center text-xs leading-5 text-foreground-secondary">
                Delivery charges are calculated at checkout.
              </p>
              <Link
                to="/products"
                className="mt-4 block text-center text-sm font-medium text-foreground underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background-secondary px-5 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background-custom text-foreground-secondary">
              <FiShoppingBag size={24} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-foreground-secondary">
              Find something lovely to add to your routine.
            </p>
            <Link to="/products" className="mt-5 inline-flex">
              <Button type="button" className="rounded-lg">
                Explore products
              </Button>
            </Link>
          </div>
        )}
      </Container>
    </section>
  );
}
