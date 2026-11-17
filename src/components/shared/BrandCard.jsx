import { Link } from "react-router";

export default function BrandCard({ brand, onNavigate, className = "" }) {
  return (
    <Link
      to={`/products?brand=${encodeURIComponent(brand.name)}`}
      onClick={onNavigate}
      className={`group relative block overflow-hidden rounded-lg border border-border bg-background-custom ${className}`}
    >
      <div className="relative flex h-28 items-center justify-center py-2">
        <img
          src={brand.image}
          alt={brand.name}
          loading="lazy"
          className="h-24 w-30 rounded-lg object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <span className="absolute inset-x-0 bottom-0 translate-y-4 px-2 py-3 text-center text-sm font-semibold text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          {brand.name}
        </span>
      </div>
    </Link>
  );
}
