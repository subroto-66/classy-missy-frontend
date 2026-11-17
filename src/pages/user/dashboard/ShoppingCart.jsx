import {
  FiArrowRight,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiTrash2,
} from "react-icons/fi";
import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import { useCart } from "../../../context/CartContext";
import { formatProductPrice } from "../../../lib/productUtils";
import DashboardSectionCard from "./DashboardSectionCard";

export default function ShoppingCart() {
  const { items, setQuantity, removeFromCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <DashboardSectionCard
        title="Shopping cart"
        description={`${items.length} ${items.length === 1 ? "product" : "products"} waiting for you`}
      >
        {items.length ? (
          <div className="divide-y divide-neutral-100">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center gap-4 py-4 first:pt-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt=""
                  className="h-[68px] w-[68px] rounded-xl bg-neutral-100 object-cover"
                />
                <div className="min-w-[150px] flex-1">
                  <p className="text-[12px] font-medium leading-5 text-neutral-800">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-500">{item.brand}</p>
                  <p className="mt-1 text-[11px] font-semibold text-black">
                    {formatProductPrice(item.price)}
                  </p>
                </div>
                <div className="flex items-center rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => setQuantity(item.id, item.quantity - 1)}
                    className="cursor-pointer p-2 text-neutral-700 hover:text-black"
                  >
                    <FiMinus size={13} />
                  </button>
                  <span className="min-w-7 text-center text-[11px]">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => setQuantity(item.id, item.quantity + 1)}
                    className="cursor-pointer p-2 text-neutral-700 hover:text-black"
                  >
                    <FiPlus size={13} />
                  </button>
                </div>
                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeFromCart(item.id)}
                  className="cursor-pointer rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
                >
                  <FiTrash2 size={15} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <FiShoppingCart size={25} className="mx-auto text-neutral-500" />
            <p className="mt-3 text-[13px] font-medium text-neutral-800">
              Your cart is looking lovely and empty
            </p>
            <p className="mt-1 text-[11px] text-neutral-500">
              Add a few favourites and they’ll show up here.
            </p>
            <Link
              to="/products"
              className="mt-4 inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold text-black"
            >
              Explore products <FiArrowRight size={13} />
            </Link>
          </div>
        )}
      </DashboardSectionCard>

      <div className="rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-[14px] font-semibold text-black">Cart summary</h2>
        <div className="mt-5 flex justify-between border-t border-neutral-200 pt-4 text-[12px]">
          <span className="text-neutral-600">Subtotal</span>
          <span className="font-semibold text-neutral-900">
            {formatProductPrice(total)}
          </span>
        </div>
        <p className="mt-3 text-[10px] leading-5 text-neutral-500">
          Delivery charges are calculated at checkout.
        </p>
        <Button
          type="button"
          disabled
          className="mt-5 w-full rounded-lg bg-black text-[11px] text-white"
        >
          Continue to checkout <FiArrowRight size={14} />
        </Button>
      </div>
    </div>
  );
}
