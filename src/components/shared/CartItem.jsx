import { FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import Button from "../ui/Button";
import QuantityControl from "../ui/QuantityControl";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";

export default function CartItem({
  item,
  setQuantity,
  removeFromCart,
  compact = false,
}) {
  const originalPrice = item.oldPrice || item.price;
  const discountPerItem = Math.max(originalPrice - item.price, 0);
  const discountPercent = originalPrice
    ? Math.round((discountPerItem / originalPrice) * 100)
    : 0;

  return (
    <li
      className={`grid gap-3 border-b border-border pb-4  ${
        compact
          ? "grid-cols-[72px_minmax(0,1fr)]"
          : "grid-cols-[88px_minmax(0,1fr)] rounded-xl border border-border bg-background p-3 sm:grid-cols-[112px_minmax(0,1fr)_auto] sm:items-center sm:gap-5 sm:p-4"
      }`}
    >
      <Link
        to={`/product/${getProductSlug(item)}`}
        className={`overflow-hidden rounded-lg aspect-square bg-background-secondary `}
      >
        <img
          src={item.image}
          alt={`${item.brand} ${item.name}`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </Link>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
          {item.brand}
        </p>
        <Link
          to={`/product/${getProductSlug(item)}`}
          className="mt-1 block line-clamp-2 text-sm font-semibold text-foreground hover:underline"
        >
          {item.name}
        </Link>
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-foreground">
            {formatProductPrice(item.price)}
          </span>
          {discountPerItem > 0 && (
            <>
              <span className="text-xs text-foreground-secondary line-through">
                {formatProductPrice(originalPrice)}
              </span>
              <span className="rounded-full bg-background-custom px-2 py-0.5 text-[10px] font-semibold text-foreground">
                {discountPercent}% off
              </span>
            </>
          )}
        </div>
        <p className="mt-1 text-xs text-foreground-secondary">
          Item total:{" "}
          <span className="font-medium text-foreground">
            {formatProductPrice(item.price * item.quantity)}
          </span>
        </p>
        {discountPerItem > 0 && (
          <p className="mt-0.5 text-xs text-foreground-secondary">
            You save {formatProductPrice(discountPerItem * item.quantity)}
          </p>
        )}
        <div
          className={`${compact ? "mt-2" : "mt-3 sm:hidden"} flex items-center gap-3`}
        >
          <QuantityControl
            quantity={item.quantity}
            onChange={(quantity) => setQuantity(item.id, quantity)}
          />
          {compact && (
             <Button
                        type="button"
                        variant="danger"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.id)}
                        // className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
                      >
                        <FiTrash2 size={16} />
                      </Button>
          )}
        </div>
      </div>

      {!compact && (
        <div className="hidden items-center gap-4 sm:flex">
          <QuantityControl
            quantity={item.quantity}
            onChange={(quantity) => setQuantity(item.id, quantity)}
          />
           <Button
                        type="button"
                        variant="danger"
                        aria-label={`Remove ${item.name} from cart`}
                        onClick={() => removeFromCart(item.id)}
                        // className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
                      >
                        <FiTrash2 size={16} />
                      </Button>
        </div>
      )}
    </li>
  );
}
