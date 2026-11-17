import { FiHeart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import { useWishlist } from "../../context/WishlistContext";
import ProductCard from "../../components/public/ProductCard";
import products from "../../data/products";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();

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
              Saved for later
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              My wishlist
            </h1>
            <p className="mt-2 text-sm text-foreground-secondary">
              {items.length} {items.length === 1 ? "product" : "products"} saved
            </p>
          </div>
        </div>

        {items.length ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
            {items.map((product) => (
              <article
                key={product.id}
                className="flex flex-col"
              >
                <ProductCard product={product} />
                
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background-secondary px-5 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background-custom text-foreground-secondary">
              <FiHeart size={24} />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              Your wishlist is empty
            </h2>
            <p className="mt-2 text-sm text-foreground-secondary">
              Save products you love and find them here anytime.
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
