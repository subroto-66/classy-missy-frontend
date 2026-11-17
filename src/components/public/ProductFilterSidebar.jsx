import { FiX } from "react-icons/fi";
import Button from "../ui/Button";
import FilterDropdown from "./FilterDropdown";
import PriceRangeSlider from "./PriceRangeSlider";

const categories = ["Skincare", "Makeup", "Hair care", "Body care", "Fragrance"];

export default function ProductFilterSidebar({
  products,
  searchParams,
  setSearchParams,
  onClose,
  campaigns,
}) {
  const toggleFilter = (key, value) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      const selectedValues = next.getAll(key);
      next.delete(key);
      selectedValues
        .filter((selected) => selected !== value)
        .forEach((selected) => next.append(key, selected));
      if (!selectedValues.includes(value)) next.append(key, value);
      next.delete("page");
      return next;
    });
  };

  const selected = (key) => searchParams.getAll(key);
  const countFor = (predicate) => products.filter(predicate).length;
  const brands = [...new Set(products.map((product) => product.brand))].sort();
  const problems = [
    ...new Set(products.flatMap((product) => product.problems || [])),
  ].sort();
  const priceMin = 0;
  const priceMax = Math.ceil(
    Math.max(...products.map((product) => product.price)) / 500,
  ) * 500;
  const minPrice = Math.min(
    Math.max(Number(searchParams.get("minPrice")) || priceMin, priceMin),
    priceMax - 50,
  );
  const maxPrice = Math.max(
    Math.min(Number(searchParams.get("maxPrice")) || priceMax, priceMax),
    minPrice + 50,
  );

  const updatePriceRange = (nextMin, nextMax) => {
    setSearchParams(
      (current) => {
        const next = new URLSearchParams(current);
        if (nextMin <= priceMin) next.delete("minPrice");
        else next.set("minPrice", String(nextMin));
        if (nextMax >= priceMax) next.delete("maxPrice");
        else next.set("maxPrice", String(nextMax));
        next.delete("page");
        return next;
      },
      { replace: true },
    );
  };

  return (
    <div className="rounded-xl border border-border bg-background p-4 sm:p-5">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-base font-semibold text-foreground">Filters</h2>
        <Button
          type="button"
          variant="ghost"
          onClick={onClose}
          aria-label="Close filters"
          className="h-9 w-9 p-0 text-foreground lg:hidden"
        >
          <FiX size={18} />
        </Button>
      </div>

      <FilterDropdown
        title="Brand"
        options={brands.map((brand) => ({
          value: brand,
          count: countFor((product) => product.brand === brand),
        }))}
        selectedValues={selected("brand")}
        onToggle={(value) => toggleFilter("brand", value)}
      />
      <FilterDropdown
        title="Category"
        options={categories.map((category) => ({
          value: category,
          count: countFor((product) => product.category === category),
        }))}
        selectedValues={selected("category")}
        onToggle={(value) => toggleFilter("category", value)}
      />
      <FilterDropdown
        title="Campaign"
        options={campaigns.map((campaign) => ({
          value: campaign.slug,
          label: campaign.title,
          count: countFor((product) => campaign.productIds.includes(product.id)),
        }))}
        selectedValues={selected("campaign")}
        onToggle={(value) => toggleFilter("campaign", value)}
      />

      <div className="border-b border-border py-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Price range
        </h3>
        <PriceRangeSlider
          min={priceMin}
          max={priceMax}
          minValue={minPrice}
          maxValue={maxPrice}
          onChange={updatePriceRange}
        />
      </div>

      <FilterDropdown
        title="By problem"
        options={problems.map((problem) => ({
          value: problem,
          count: countFor((product) => product.problems?.includes(problem)),
        }))}
        selectedValues={selected("problem")}
        onToggle={(value) => toggleFilter("problem", value)}
      />
    </div>
  );
}
