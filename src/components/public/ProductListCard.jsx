import { useRef, useState, useEffect } from "react";
import { FiCheck, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";
import Button from "../ui/Button";

export default function ProductListCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeout = useRef(null);
  const navigate = useNavigate();
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;
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
    navigate("/checkout");
  };

  useEffect(
    () => () => window.clearTimeout(addedTimeout.current),
    [],
  );

  return (
    <article className="group relative grid overflow-hidden rounded-xl border border-border bg-background-secondary transition hover:shadow-custom sm:grid-cols-[minmax(160px,0.8fr)_1.6fr]">
      <Link
        to={`/product/${getProductSlug(product)}`}
        aria-label={`View ${product.name} details`}
        className="absolute inset-0 z-0 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
      >
        <span className="sr-only">View product details</span>
      </Link>
      <div className="relative aspect-video md:aspect-square overflow-hidden bg-background-custom ">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold text-foreground">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground shadow-xs">
            -{discount}%
          </span>
        )}
      </div>
      <div className="relative z-10 flex min-w-0 flex-col items-start p-4 sm:p-5">
        <div className="flex w-full items-start justify-between gap-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-secondary">
            {product.brand}
          </p>
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
            className="pointer-events-auto shrink-0 rounded-full border border-border"
          >
            <FiHeart
              size={16}
              className={isFavorite ? "fill-primary text-primary" : undefined}
            />
          </Button>
        </div>
        <h3 className="mt-1 line-clamp-2 text-base font-semibold text-foreground sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs text-foreground-secondary">
          <FaStar className="text-foreground" />
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span>· {product.reviews} reviews</span>
        </p>
        <p className="mt-3 text-sm text-foreground-secondary">
          {product.problems?.slice(0, 3).join(" · ")}
        </p>
        <div className="mt-auto flex w-full flex-wrap items-center justify-between gap-3 pt-5">
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
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleAddToCart}
              aria-label={justAdded ? "Added to cart" : "Add to cart"}
              title={justAdded ? "Added to cart" : "Add to cart"}
              className={`pointer-events-auto h-11 w-12 sm:w-14 shrink-0 rounded-lg p-0 transition-all duration-300 ${
                justAdded
                  ? "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-600"
                  : "border-border bg-background text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
              }`}
            >
              {justAdded ? (
                <FiCheck
                  size={28}
                  aria-hidden="true"
                  className="animate-[cart-check_300ms_ease-out]"
                />
              ) : (
                <PiShoppingCartBold size={30} aria-hidden="true" />
              )}
            </Button>
            <Button
              type="button"
              onClick={handleBuyNow}
              className="pointer-events-auto min-h-11 rounded-lg px-5 text-xs font-semibold uppercase tracking-[0.08em]"
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
