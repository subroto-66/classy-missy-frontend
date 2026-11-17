import { FiArrowUpRight, FiChevronDown } from "react-icons/fi";
import { Link, NavLink } from "react-router";
import blogs, { getBlogSlug } from "../../data/blogs";
import brands from "../../data/brands";
import products from "../../data/products";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";
import categories from "../../data/categories";
import CategoryCard from "./CategoryCard";
import BrandCard from "./BrandCard";

const productCollections = [
  {
    title: "Featured",
    description: "Shop our customer favorites",
    products: [...products].sort((a, b) => b.rating - a.rating).slice(0, 3),
    href: "/products?sort=rating",
  },
  {
    title: "On sale",
    description: "A little something special",
    products: products.filter((product) => product.oldPrice).slice(0, 3),
    href: "/products?sale=true",
  },
  {
    title: "New arrivals",
    description: "Fresh picks for your routine",
    products: [...products].slice(-3).reverse(),
    href: "/products",
  },
];

const latestBlogs = [...blogs]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 3);

function ProductMenuCard({ product }) {
  return (
    <Link
      to={`/product/${getProductSlug(product)}`}
      className="flex min-w-0 items-center gap-3 rounded-xl border border-border bg-background p-2.5 transition hover:bg-background-secondary"
    >
      <img
        src={product.image}
        alt=""
        loading="lazy"
        className="h-14 w-14 shrink-0 rounded-lg bg-background-secondary object-cover"
      />

      <div className="min-w-0 flex-1">
        <span className="block truncate text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary">
          {product.brand}
        </span>

        <p className="mt-1 line-clamp-1 text-xs font-medium leading-4 text-foreground">
          {product.name}
        </p>

        <span className="mt-1 block text-[11px] font-semibold text-foreground">
          {formatProductPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}

function ProductMegaMenu({ onNavigate }) {
  return (
    <div className="grid gap-5 p-5 md:grid-cols-3">
      {productCollections.map((collection) => (
        <section key={collection.title} className="min-w-0">
          <div className="mb-3 flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {collection.title}
              </h3>
              <p className="mt-1 text-[11px] text-foreground-secondary">
                {collection.description}
              </p>
            </div>
            <Link
              to={collection.href}
              onClick={onNavigate}
              className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-[10px] font-semibold text-foreground-secondary hover:text-foreground"
            >
              See all <FiArrowUpRight size={12} aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-2">
            {collection.products.map((product) => (
              <ProductMenuCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CategoryMegaMenu({ onNavigate }) {
  return (
    <div className="p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Shop by category
        </h3>
        <p className="mt-1 text-xs text-foreground-secondary">
          Browse products by their routine category
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.name}
            category={category}
            onNavigate={onNavigate}
            className="w-full min-w-0 bg-background"
          />
        ))}
      </div>
    </div>
  );
}

function BrandMegaMenu({ onNavigate }) {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Discover our brands
          </h3>
          <p className="mt-1 text-xs text-foreground-secondary">
            Shop by your favorites
          </p>
        </div>
        <Link
          to="/brands"
          onClick={onNavigate}
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-foreground-secondary hover:text-foreground"
        >
          All brands <FiArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <div className="custom-scrollbar max-h-60 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {brands.map((brand) => (
            <BrandCard
              key={brand.name}
              brand={brand}
              onNavigate={onNavigate}
              className="bg-background"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function BlogMegaMenu({ onNavigate }) {
  return (
    <div className="p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            From the journal
          </h3>
          <p className="mt-1 text-xs text-foreground-secondary">
            Notes and know-how for your routine
          </p>
        </div>
        <Link
          to="/blogs"
          onClick={onNavigate}
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-foreground-secondary hover:text-foreground"
        >
          All articles <FiArrowUpRight size={13} aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {latestBlogs.map((blog) => (
          <Link
            key={blog.title}
            to={`/blog/${getBlogSlug(blog)}`}
            onClick={onNavigate}
            className="group overflow-hidden rounded-xl border border-border bg-background transition hover:bg-background-secondary"
          >
            <img
              src={blog.image}
              alt=""
              loading="lazy"
              className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span className="block p-3">
              <span className="block text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary">
                {blog.category}
              </span>
              <span className="mt-1.5 line-clamp-2 block text-xs font-semibold leading-5 text-foreground">
                {blog.title}
              </span>
              <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-foreground-secondary">
                Read article <FiArrowUpRight size={11} aria-hidden="true" />
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

const megaMenuItems = [
  { label: "Product", to: "/products", Menu: ProductMegaMenu, width: "max-w-5xl" },
  { label: "Category", to: "/categories", Menu: CategoryMegaMenu, width: "max-w-4xl" },
  { label: "Brand", to: "/brands", Menu: BrandMegaMenu, width: "max-w-2xl" },
  { label: "Blog", to: "/blogs", Menu: BlogMegaMenu, width: "max-w-3xl" },
];

const simpleNavigation = [
  { label: "Home", to: "/" },
  { label: "Campaigns", to: "/campaigns" },
  // { label: "Coupons", to: "/coupons" },
  { label: "My Cart", to: "/my-cart" },
  { label: "About Us", to: "/about-us" },
];

function DesktopMegaMenuItem({ item, onNavigate }) {
  const { label, to, Menu, width } = item;

  return (
    <div className="group relative">
      <div className="relative inline-flex min-h-11 items-center">
        <NavLink
          to={to}
          className={({ isActive }) =>
            `relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 group-hover:after:scale-x-100 group-focus-within:after:scale-x-100 ${
              isActive ? "text-foreground after:scale-x-100" : "text-foreground-secondary"
            }`
          }
        >
          {label}
        </NavLink>
        <FiChevronDown
          size={14}
          aria-hidden="true"
          className="mr-3 text-foreground-secondary transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </div>

      <div
        className={`invisible absolute left-0 top-full z-[70] w-[min(90vw,1024px)] ${width} translate-y-2 overflow-hidden rounded-2xl border border-border bg-background opacity-0 shadow-custom transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100`}
      >
        <div className="max-h-[min(70vh,560px)] overflow-y-auto">
          <Menu onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

export function Navigation({ onNavigate, mobile = false }) {
  if (mobile) {
    return (
      <nav aria-label="Main navigation" className="flex flex-col gap-1">
        {[
          ...megaMenuItems.map(({ label, to }) => ({ label, to })),
          ...simpleNavigation,
        ].map(({ label, to }) => (
          <NavLink
            key={label}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-background"
                  : "text-foreground-secondary hover:bg-background-custom hover:text-foreground"
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    );
  }

  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 py-1 lg:flex"
    >
      {simpleNavigation.slice(0, 1).map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `group relative inline-flex min-h-11 items-center px-4 text-sm font-medium transition-colors after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
              isActive ? "text-foreground after:scale-x-100" : "text-foreground-secondary"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
      {megaMenuItems.map((item) => (
        <DesktopMegaMenuItem
          key={item.label}
          item={item}
          onNavigate={onNavigate}
        />
      ))}
      {simpleNavigation.slice(1).map(({ label, to }) => (
        <NavLink
          key={label}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `group relative inline-flex min-h-11 items-center px-4 text-sm font-medium transition-colors after:absolute after:inset-x-4 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
              isActive ? "text-foreground after:scale-x-100" : "text-foreground-secondary"
            }`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
