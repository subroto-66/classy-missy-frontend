import { FiArrowUpRight } from "react-icons/fi";
import { Link } from "react-router";

export default function CategoryCard({ category, onNavigate, className = "" }) {
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category.name)}`}
      onClick={onNavigate}
      className={`group inline-flex items-center gap-3 rounded-xl border border-border bg-background-custom px-4 py-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-foreground/25 hover:shadow-custom focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${className}`}
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-foreground">
        <img
          alt=""
          src={category.image}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </span>
      <span className="flex-1 text-sm font-medium text-foreground">
        {category.name}
      </span>
      <FiArrowUpRight
        size={15}
        aria-hidden="true"
        className="text-foreground-secondary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </Link>
  );
}
