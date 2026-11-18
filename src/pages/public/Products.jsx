import { useEffect, useMemo, useState } from "react";
import { FiGrid, FiList, FiSliders } from "react-icons/fi";
import { useSearchParams } from "react-router";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import ProductCard from "../../components/public/ProductCard";
import ProductCompactCard from "../../components/public/ProductCompactCard";
import ProductFilterSidebar from "../../components/public/ProductFilterSidebar";
import ProductListCard from "../../components/public/ProductListCard";
import ProductPagination from "../../components/public/ProductPagination";
import SortDropdown from "../../components/public/SortDropdown";
import productsMock from "../../data/products";
import campaignsMock from "../../data/campaigns";
import api from "../../lib/axios";

const PAGE_SIZE = 6;

const layouts = [
  { value: "grid", label: "Grid view", Icon: FiGrid },
  { value: "list", label: "List view", Icon: FiList },
  { value: "compact", label: "Compact view", Icon: FiSliders },
];

function getPositiveInteger(value, fallback = 1) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeLayout = layouts.some(
    ({ value }) => value === searchParams.get("view"),
  )
    ? searchParams.get("view")
    : "grid";

  const [productsList, setProductsList] = useState(productsMock);
  const [campaignsList, setCampaignsList] = useState(campaignsMock);

  useEffect(() => {
    let active = true;

    api.get("/products?all=1")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setProductsList(res.data.data);
        }
      })
      .catch(() => {});

    api.get("/campaigns")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setCampaignsList(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const brands = searchParams.getAll("brand");
    const categories = searchParams.getAll("category");
    const selectedCampaigns = searchParams.getAll("campaign");
    const problems = searchParams.getAll("problem");
    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));
    const saleOnly = searchParams.get("sale") === "true";
    const hasMinPrice = searchParams.has("minPrice") && Number.isFinite(minPrice);
    const hasMaxPrice = searchParams.has("maxPrice") && Number.isFinite(maxPrice);
    const sort = searchParams.get("sort");

    const result = productsList.filter((product) => {
      const matchesBrand = !brands.length || brands.includes(product.brand);
      const matchesCategory =
        !categories.length || categories.includes(product.category);
      const matchesCampaign =
        !selectedCampaigns.length ||
        selectedCampaigns.some((slug) => {
          const camp = campaignsList.find((campaign) => campaign.slug === slug);
          return camp?.productIds?.some(
            (id) => String(id) === String(product.id) || String(id) === String(product.slug)
          );
        });
      const matchesProblem =
        !problems.length ||
        problems.some((problem) => product.problems?.includes(problem));
      const matchesMinPrice = !hasMinPrice || product.price >= minPrice;
      const matchesMaxPrice = !hasMaxPrice || product.price <= maxPrice;
      const matchesSale = !saleOnly || Boolean(product.oldPrice || product.old_price);
      return (
        matchesBrand &&
        matchesCategory &&
        matchesCampaign &&
        matchesProblem &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSale
      );
    });

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [searchParams]);

  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const currentPage = Math.min(
    getPositiveInteger(searchParams.get("page")),
    Math.max(pageCount, 1),
  );
  const firstProduct = (currentPage - 1) * PAGE_SIZE;
  const visibleProducts = filteredProducts.slice(
    firstProduct,
    firstProduct + PAGE_SIZE,
  );
  const rangeStart = filteredProducts.length ? firstProduct + 1 : 0;
  const rangeEnd = Math.min(firstProduct + PAGE_SIZE, filteredProducts.length);

  const updateQuery = (key, value) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (value) next.set(key, value);
      else next.delete(key);
      next.delete("page");
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      [
        "brand",
        "category",
        "campaign",
        "problem",
        "minPrice",
        "maxPrice",
        "sale",
        "page",
      ].forEach(
        (key) => next.delete(key),
      );
      return next;
    });
  };

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <div className="relative isolate flex min-h-52 items-center overflow-hidden rounded-2xl bg-background-secondary px-5 py-8 sm:min-h-64 sm:px-10 lg:px-14">
          <div className="absolute inset-y-0 right-0 z-0 w-2/3 sm:w-1/2">
            <img
              src={productsList[0]?.image || productsMock[0].image}
              alt=""
              className="h-full w-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/70 to-transparent" />
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
              Your routine starts here
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Find your next favorite
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-foreground-secondary sm:text-base">
              Thoughtfully selected skincare for every routine, concern, and
              budget.
            </p>
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <aside
            className={`${filtersOpen ? "block" : "hidden"} lg:sticky lg:top-28 lg:block`}
          >
            <ProductFilterSidebar
              products={productsList}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              onClose={() => setFiltersOpen(false)}
              campaigns={campaignsList}
            />
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              
                
                <p className="mt-1 text-sm text-foreground-secondary">
                  Showing {rangeStart}–{rangeEnd} of {filteredProducts.length}{" "}
                  products
                </p>
              
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFiltersOpen((open) => !open)}
                  aria-expanded={filtersOpen}
                  className="h-10 rounded-lg border-border px-3 text-sm font-medium text-foreground lg:hidden"
                >
                  <FiSliders size={16} />
                  Filters
                </Button>
                <div
                  className="flex items-center rounded-lg border border-border p-1"
                  role="group"
                  aria-label="Product card layout"
                >
                  {layouts.map(({ value, label, Icon }) => (
                    <Button
                      key={value}
                      type="button"
                      variant={activeLayout === value ? "primary" : "ghost"}
                      aria-label={label}
                      aria-pressed={activeLayout === value}
                      onClick={() => updateQuery("view", value)}
                      className={` rounded-md transition ${
                        activeLayout === value
                          ? ""
                          : "text-foreground-secondary hover:bg-background-custom"
                      }`}
                    >
                      <Icon size={16} />
                    </Button>
                  ))}
                </div>
                <SortDropdown
                  value={searchParams.get("sort") || "featured"}
                  onChange={(value) => updateQuery("sort", value)}
                />
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  activeLayout === "list"
                    ? "grid grid-cols-1 gap-4"
                    : activeLayout === "compact"
                      ? "grid grid-cols-1 gap-3 md:grid-cols-2"
                      : "grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3"
                }
              >
                {visibleProducts.map((product) => {
                  if (activeLayout === "list") {
                    return <ProductListCard key={product.id} product={product} />;
                  }
                  if (activeLayout === "compact") {
                    return (
                      <ProductCompactCard key={product.id} product={product} />
                    );
                  }
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            ) : (
              <div className="rounded-xl border border-dashed border-border bg-background-secondary px-5 py-14 text-center">
                <h3 className="text-base font-semibold text-foreground">
                  No products found
                </h3>
                <p className="mt-2 text-sm text-foreground-secondary">
                  Try changing your filters to see more products.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="mt-4 rounded-lg px-4 py-2.5 text-sm font-medium"
                >
                  Clear filters
                </Button>
              </div>
            )}

            <ProductPagination
              currentPage={currentPage}
              totalPages={pageCount}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
