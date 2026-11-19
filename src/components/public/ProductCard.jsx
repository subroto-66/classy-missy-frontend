import { useEffect, useRef, useState } from "react";
import { FiCheck, FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import Button from "../ui/Button";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";

export default function ProductCard({ product }) {
  const [justAdded, setJustAdded] = useState(false);
  const addedTimeout = useRef(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isFavorite = isWishlisted(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

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
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-custom">
      <Link
        to={`/product/${getProductSlug(product)}`}
        aria-label={`View ${product.name} details`}
        className="absolute inset-0 z-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
      >
        <span className="sr-only">View product details</span>
      </Link>
      <div className="relative z-10 aspect-[4/4.2] overflow-hidden bg-background-secondary pointer-events-none">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute left-3 top-3 max-w-[calc(100%-4.5rem)] truncate rounded-full border border-border/70 bg-background/90 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-foreground shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="absolute bottom-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-semibold tracking-wide text-primary-foreground shadow-xs">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorite}
          onClick={() => toggleWishlist(product)}
          className="pointer-events-auto absolute right-3 top-3 cursor-pointer inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm backdrop-blur transition hover:scale-105 hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <FiHeart
            size={17}
            className={isFavorite ? "fill-primary text-primary" : undefined}
          />
        </button>
      </div>

      <div className="relative z-10 pointer-events-none flex flex-1 flex-col bg-background-secondary p-3.5 sm:p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-foreground-secondary">
          {product.brand}
        </p>
        <h3 className="mt-1.5 line-clamp-2 min-h-10 text-[13px] font-medium leading-5 text-foreground sm:text-sm">
          {product.name}
        </h3>

        <div
          className="mt-2.5 flex items-center gap-1.5 text-[11px] text-foreground-secondary"
          aria-label={`${product.rating} out of 5 stars, ${product.reviews} reviews`}
        >
          <FaStar size={11} className="text-foreground" aria-hidden="true" />
          <span className="font-semibold text-foreground">{product.rating}</span>
          <span>·</span>
          <span>{product.reviews} reviews</span>
        </div>

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

        <div className="mt-4 flex items-center gap-2">
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
            className="pointer-events-auto min-h-11 flex-1 rounded-lg text-xs font-semibold uppercase tracking-[0.08em]"
          >
            Buy now
          </Button>
        </div>
      </div>
    </article>
  );
}
