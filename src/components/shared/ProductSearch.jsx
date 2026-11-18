import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Search from "../ui/Search";
import productsMock from "../../data/products";
import { formatProductPrice, getProductSlug } from "../../lib/productUtils";
import api from "../../lib/axios";

const DEBOUNCE_MS = 250;

export default function ProductSearch({
  wrapperClassName,
  inputClassName,
  className,
  placeholder,
  ...searchProps
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = window.setTimeout(
      () => setDebouncedQuery(query.trim()),
      DEBOUNCE_MS,
    );
    return () => window.clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!wrapperRef.current?.contains(event.target)) setIsFocused(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setMatches([]);
      return;
    }

    let active = true;
    setLoading(true);

    api
      .get("/products", { params: { search: debouncedQuery, limit: 6 } })
      .then((res) => {
        if (!active) return;
        const results = res.data?.data;
        if (Array.isArray(results) && results.length > 0) {
          setMatches(results);
        } else {
          // Fallback to local filter if API returned empty
          const normalized = debouncedQuery.toLowerCase();
          const fallback = productsMock
            .filter((p) =>
              [p.name, p.brand, p.badge]
                .filter(Boolean)
                .some((val) => val.toLowerCase().includes(normalized)),
            )
            .slice(0, 6);
          setMatches(fallback);
        }
      })
      .catch(() => {
        if (!active) return;
        const normalized = debouncedQuery.toLowerCase();
        const fallback = productsMock
          .filter((p) =>
            [p.name, p.brand, p.badge]
              .filter(Boolean)
              .some((val) => val.toLowerCase().includes(normalized)),
          )
          .slice(0, 6);
        setMatches(fallback);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  const showResults = isFocused && Boolean(debouncedQuery);

  const openProduct = (product) => {
    setQuery("");
    setDebouncedQuery("");
    setIsFocused(false);
    navigate(`/product/${getProductSlug(product)}`);
  };

  return (
    <div ref={wrapperRef} className={`relative ${wrapperClassName || ""}`}>
      <Search
        className={className}
        inputClassName={inputClassName}
        placeholder={placeholder}
        value={query}
        onChange={setQuery}
        onFocus={() => setIsFocused(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setIsFocused(false);
          if (event.key === "Enter" && matches[0]) {
            event.preventDefault();
            openProduct(matches[0]);
          }
        }}
        {...searchProps}
      />

      {showResults && (
        <div
          role="listbox"
          aria-label="Matching products"
          className="absolute inset-x-0 top-full z-[80] mt-2 max-h-[min(70vh,28rem)] overflow-y-auto rounded-xl border border-border bg-background p-2 shadow-custom"
        >
          {loading ? (
            <p className="px-3 py-4 text-center text-xs text-foreground-secondary">
              Searching...
            </p>
          ) : matches.length ? (
            <ul className="space-y-1">
              {matches.map((product) => (
                <li key={product.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected="false"
                    onClick={() => openProduct(product)}
                    className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-background-secondary focus-visible:bg-background-secondary focus-visible:outline-none"
                  >
                    <img
                      src={product.image}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-md bg-background-secondary object-cover"
                      loading="lazy"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary">
                        {product.brand}
                      </span>
                      <span className="mt-0.5 block line-clamp-1 text-sm font-medium text-foreground">
                        {product.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-foreground-secondary">
                        {product.rating} ★ · {product.reviews || product.reviews_count || 0} reviews
                      </span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-foreground">
                      {formatProductPrice(product.price)}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-3 py-5 text-center text-sm text-foreground-secondary">
              No matching products found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
