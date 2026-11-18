import { useRef, useState, useEffect } from "react";
import { FiCheck, FiHeart } from "react-icons/fi";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";
import Button from "../ui/Button";

export default function ProductCompactCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeout = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isFavorite = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    window.clearTimeout(addedTimeout.current);
    addedTimeout.current = window.setTimeout(() => setJustAdded(false), 1400);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    navigate("/cart");
  };

  useEffect(
    () => () => window.clearTimeout(addedTimeout.current),
    [],
  );

  return (
    <article className="group relative flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background-secondary p-2.5 transition hover:shadow-custom sm:gap-4 sm:p-3">
      <Link
        to={`/product/${getProductSlug(product)}`}
        aria-label={`View ${product.name} details`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
      >
        <span className="sr-only">View product details</span>
      </Link>
      <img
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        loading="lazy"
        className="h-20 w-20 shrink-0 rounded-lg bg-background-custom object-cover sm:h-24 sm:w-24"
      />
      <div className="relative z-10 min-w-0 flex-1">
        <p className="truncate text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
          {product.brand}
        </p>
        <h3 className="mt-1 line-clamp-2 text-xs font-medium leading-5 text-foreground sm:text-sm">
          {product.name}
        </h3>
        <div className="mt-3 flex min-h-6 flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-sm font-semibold text-foreground sm:text-base">
            {formatProductPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-xs text-foreground-secondary line-through">
              {formatProductPrice(product.oldPrice)}
            </span>
          )}
        </div>
      </div>
      <div className="relative z-10 flex shrink-0 flex-col items-center gap-1.5">
        <Button
          type="button"
          variant="ghost"
          aria-label={
            isFavorite
              ? `Remove ${product.name} from favorites`
              : `Add ${product.name} to favorites`
          }
          aria-pressed={isFavorite}
          onClick={() => toggleWishlist(product)}
          className="pointer-events-auto rounded-full"
        >
          <FiHeart
            size={16}
            className={isFavorite ? "fill-foreground" : undefined}
          />
        </Button>
        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="outline"
            aria-label={justAdded ? "Added to cart" : "Add to cart"}
            title={justAdded ? "Added to cart" : "Add to cart"}
            onClick={handleAddToCart}
            className={`pointer-events-auto h-9 w-10 shrink-0 rounded-md border-border bg-background p-0 text-foreground hover:bg-foreground hover:text-background transition-colors ${
              justAdded ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-600" : ""
            }`}
          >
            {justAdded ? (
              <FiCheck size={22} className="animate-[cart-check_300ms_ease-out]" />
            ) : (
              <PiShoppingCartBold size={24} />
            )}
          </Button>
          <Button
            type="button"
            onClick={handleBuyNow}
            className="pointer-events-auto rounded-md px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider"
          >
            Buy now
          </Button>
        </div>
      </div>
    </article>
  );
}
