import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiHeart,
  FiStar,
} from "react-icons/fi";
import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import QuantityControl from "../../components/ui/QuantityControl";
import DeliveryOptions from "../../components/public/DeliveryOptions";
import ProductHighlights from "../../components/public/ProductHighlights";
import ProductQuestions from "../../components/public/ProductQuestions";
import ProductReviews from "../../components/public/ProductReviews";
import SingleProductLanding from "../../components/public/SingleProductLanding";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import productsMock from "../../data/products";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";
import ProductSlider from "../../components/shared/ProductSlider";
import api from "../../lib/axios";

export default function ProductDetails({ defaultView = "landing", isStandalone = false }) {
  const { productSlug } = useParams();
  const [searchParams] = useSearchParams();
  const requestedView = searchParams.get("view");
  const initialMode = requestedView === "classic" ? "classic" : defaultView;
  const [viewMode, setViewMode] = useState(initialMode);

  const [product, setProduct] = useState(() => {
    return productsMock.find(
      (item) => getProductSlug(item) === productSlug || String(item.id) === String(productSlug) || item.slug === productSlug,
    );
  });
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    let active = true;

    api.get(`/products/${productSlug}`)
      .then((res) => {
        if (!active) return;
        if (res.data?.data) {
          setProduct(res.data.data);
          if (res.data.related) {
            setRelated(res.data.related);
          }
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [productSlug]);

  if (loading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-foreground-secondary">Loading product details...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm text-foreground-secondary">Product not found</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          We could not find that product.
        </h1>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
        >
          <FiArrowLeft size={15} /> Back to products
        </Link>
      </Container>
    );
  }

  if (viewMode === "landing") {
    return (
      <SingleProductLanding
        key={product.id || product.slug}
        product={product}
        isStandalone={isStandalone}
        onSwitchToClassic={() => setViewMode("classic")}
      />
    );
  }

  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 py-2.5 px-4 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <span className="font-semibold text-amber-900">
            🛍️ সাধারণ ক্যাটালগ ভিউ দেখছেন
          </span>
          <button
            type="button"
            onClick={() => setViewMode("landing")}
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1 rounded-md transition shadow-2xs"
          >
            🚀 ফাস্ট-অর্ডার ল্যান্ডিং পেজে যান
          </button>
        </div>
      </div>
      <ProductDetailsContent
        key={product.id || product.slug}
        product={product}
        relatedProducts={related}
      />
    </>
  );
}

function ProductDetailsContent({ product, relatedProducts = [] }) {
  const [activeTab, setActiveTab] = useState("description");
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const productImages = product.images?.length
    ? product.images
    : [product.image];
  const activeImage = productImages[selectedImage] || product.image;
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;
  const isFavorite = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  const updateQuantity = (nextQuantity) => {
    setQuantity(Math.max(1, nextQuantity));
  };

  const showPreviousImage = () => {
    setSelectedImage((current) =>
      current === 0 ? productImages.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setSelectedImage((current) => (current + 1) % productImages.length);
  };

  return (
    <div className="py-5 sm:py-8 lg:py-10">
      <Container className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
        <aside className="space-y-5 lg:sticky lg:top-28">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-medium text-foreground-secondary transition-colors hover:text-foreground"
          >
            <FiArrowLeft size={15} /> Back to products
          </Link>

          <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-background-secondary">
            <img
              key={activeImage}
              src={activeImage}
              alt={`${product.brand} ${product.name} image ${selectedImage + 1}`}
              className="absolute inset-0 h-full w-full object-contain p-6 sm:p-10"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-full border border-border bg-background/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-foreground shadow-sm">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="absolute bottom-4 left-4 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs">
                Save {discount}%
              </span>
            )}

            <Button
              type="button"
              variant="outline"
              aria-label={
                isFavorite ? "Remove from wishlist" : "Add to wishlist"
              }
              aria-pressed={isFavorite}
              onClick={() => toggleWishlist(product)}
              className="h-12 w-12 right-5 top-5 absolute rounded-lg border-border p-0 text-foreground hover:border-primary/50"
            >
              <FiHeart
                size={19}
                className={isFavorite ? "fill-primary text-primary" : ""}
              />
            </Button>

            {productImages.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Show previous product image"
                  onClick={showPreviousImage}
                  className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition hover:bg-background lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
                >
                  <FiChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  aria-label="Show next product image"
                  onClick={showNextImage}
                  className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-sm transition hover:bg-background lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
                >
                  <FiChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          {productImages.length > 1 && (
            <div
              className="flex gap-2 overflow-x-auto pb-1"
              aria-label="Product images"
            >
              {productImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  onClick={() => setSelectedImage(index)}
                  className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-background-secondary p-1 transition sm:h-[72px] sm:w-[72px] ${
                    selectedImage === index
                      ? "border-foreground"
                      : "border-border hover:border-foreground-secondary"
                  }`}
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}

          <ProductHighlights highlights={product.highlights} />
        </aside>

        <div className="min-w-0">
          <nav
            aria-label="Breadcrumb"
            className="mb-5 text-xs text-foreground-secondary"
          >
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">›</li>
              <li>{product.brand}</li>
              <li aria-hidden="true">›</li>
              <li className="line-clamp-1 max-w-[220px] font-semibold text-foreground">
                {product.name}
              </li>
            </ol>
          </nav>

          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground-secondary">
            {product.brand}
          </p>
          <h1 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
            {product.name}
          </h1>

          <a
            href="#customer-reviews"
            className="mt-4 inline-flex items-center gap-2 text-sm text-foreground-secondary hover:text-foreground"
          >
            <span className="flex items-center gap-0.5 text-foreground">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={14}
                  className={
                    star <= Math.round(product.rating) ? "fill-current" : ""
                  }
                  aria-hidden="true"
                />
              ))}
            </span>
            <span className="font-semibold text-foreground">
              {product.rating.toFixed(1)}
            </span>
            <span>({product.reviews} ratings)</span>
          </a>

          <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background-secondary p-4">
            <span className="text-2xl font-semibold text-foreground">
              {formatProductPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-sm text-foreground-secondary line-through">
                  {formatProductPrice(product.oldPrice)}
                </span>
                <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-xs">
                  Save {discount}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 text-sm leading-7 text-foreground-secondary">
            {product.name} by {product.brand} is thoughtfully selected for your
            everyday routine. Explore this product and add it to your cart
            whenever you are ready.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <QuantityControl
              quantity={quantity}
              onChange={updateQuantity}
              className="h-12"
            />
            <Button
              type="button"
              onClick={handleAddToCart}
              variant="outline"
              className={`min-h-12 flex-1 rounded-lg text-sm font-semibold uppercase tracking-wide ${
                added ? "bg-emerald-700 hover:bg-emerald-700" : ""
              }`}
            >
              {added ? "✓ Added to cart" : "Add to cart"}
            </Button>
          </div>

          <div className="mt-3 flex gap-3">
            <Button
              type="button"
              
              onClick={handleBuyNow}
              className="min-h-12 flex-1 rounded-lg text-sm font-semibold uppercase tracking-wide"
            >
              Buy now
            </Button>
          </div>

          <div className="mt-8 border-b border-border">
            <div
              className="flex gap-6"
              role="tablist"
              aria-label="Product ingredients"
            >
              {/* {["description", "ingredients"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                  className={`cursor-pointer border-b-2 pb-3 text-sm font-medium capitalize transition-colors ${
                    activeTab === tab
                      ? "border-foreground text-foreground"
                      : "border-transparent text-foreground-secondary hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))} */}
              <p className="text-foreground-secondary pb-3 text-base font-medium capitalize">
                Ingredients
              </p>
            </div>
          </div>
          <div className="py-5">
            <p className="text-sm font-semibold text-foreground">
              Ingredient information
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground-secondary">
              {`See product packaging for the complete ingredient list and directions for ${product.name}. Check the ingredients before use, especially if you have known sensitivities.`}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-background-secondary p-4">
            <p className="text-sm font-semibold text-foreground">
              Need a hand?
            </p>
            <p className="mt-1 text-xs leading-5 text-foreground-secondary">
              Ask us about this product, your order, or finding the right fit
              for your routine.
            </p>
          </div>
        </div>
      </Container>

      <Container>
        <div className="mt-8 border-b border-border">
          <div
            className="flex gap-6"
            role="tablist"
            aria-label="Product ingredients"
          >
            <p className="text-foreground-secondary pb-3 text-base font-medium capitalize">
              Description
            </p>
          </div>
        </div>

        <div className="py-5">
          <p className="text-sm font-semibold text-foreground">
            {product.name}
          </p>
          <p className="mt-3 text-sm leading-7 text-foreground-secondary">
            {`${product.name} by ${product.brand} is thoughtfully selected for your everyday routine.`}
          </p>
        </div>
      </Container>

      <Container className="mt-10 space-y-6 md:space-y-8 lg:space-y-12 sm:mt-14">
        <div id="product-questions" className="scroll-mt-28">
          <ProductQuestions productId={product.id} />
        </div>
        <DeliveryOptions />

        <div id="customer-reviews" className="scroll-mt-28">
          <ProductReviews product={product} />
        </div>
        <ProductSlider
          subtitle="Related Products"
          title="Curated for you"
          productData={relatedProducts.length ? relatedProducts : productsMock.filter(
            (item) => String(item.id) !== String(product.id) && (item.oldPrice || item.old_price),
          )}
        />
      </Container>
    </div>
  );
}
