import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import CategoryCard from "../../components/shared/CategoryCard";
import PageBanner from "../../components/shared/PageBanner";
import categoriesMock from "../../data/categories";
import api from "../../lib/axios";

export default function Categories() {
  const [categoriesList, setCategoriesList] = useState(categoriesMock);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/categories")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setCategoriesList(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return categoriesList.filter(
      ({ name, description }) =>
        name.toLowerCase().includes(normalizedQuery) ||
        (description && description.toLowerCase().includes(normalizedQuery)),
    );
  }, [categoriesList, query]);

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="Find your everyday favorites"
          title="Shop by category"
          description="Explore thoughtful picks for every step of your beauty routine."
          image={categoriesList[0]?.image || categoriesMock[0].image}
          alt=""
        />

        <label className="relative mx-auto block max-w-2xl">
          <span className="sr-only">Search categories</span>
          <FiSearch
            size={18}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories"
            className="h-12 w-full rounded-full border border-input-border bg-input-background pl-11 pr-4 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/30"
          />
        </label>

        {filteredCategories.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-5">
            {filteredCategories.map((category) => (
              <CategoryCard
                key={category.slug || category.name}
                category={category}
                className="w-full min-w-0"
              />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-background-secondary px-5 py-12 text-center text-sm text-foreground-secondary">
            No categories match “{query}”. Try another search.
          </p>
        )}
      </Container>
    </section>
  );
}
