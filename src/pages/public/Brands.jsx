import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import BrandCard from "../../components/shared/BrandCard";
import brands from "../../data/brands";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Brands() {
  const [query, setQuery] = useState("");
  const filteredBrands = useMemo(
    () =>
      brands.filter((brand) =>
        brand.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [query],
  );
  const brandsByLetter = useMemo(
    () =>
      filteredBrands.reduce((groups, brand) => {
        const letter = brand.name[0].toUpperCase();
        groups[letter] = [...(groups[letter] || []), brand];
        return groups;
      }, {}),
    [filteredBrands],
  );
  const availableLetters = Object.keys(brandsByLetter);

  const jumpToLetter = (letter) => {
    document.getElementById(`brand-${letter}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <div className="relative isolate flex min-h-52 items-center overflow-hidden rounded-2xl bg-background-secondary px-5 py-8 sm:min-h-64 sm:px-10 lg:px-14">
          <div className="absolute inset-y-0 right-0 z-0 w-2/3 opacity-30 sm:w-1/2">
            <img
              src={brands[0].image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/70 to-transparent" />
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
              Discover the names behind your routine
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Shop by brand
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-foreground-secondary sm:text-base">
              Explore trusted skincare brands and find the products you love.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-2xl">
          <label className="relative block">
            <span className="sr-only">Search brands</span>
            <FiSearch
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-secondary"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search your favorite brand"
              className="h-12 w-full rounded-full border border-input-border bg-input-background pl-11 pr-4 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/30"
            />
          </label>
        </div>

        <nav
          aria-label="Browse brands alphabetically"
          className="flex flex-wrap justify-center gap-1.5 border-y border-border py-4"
        >
          {alphabet.map((letter) => {
            const isAvailable = availableLetters.includes(letter);
            return (
              <Button
                key={letter}
                type="button"
                variant="ghost"
                disabled={!isAvailable}
                aria-label={
                  isAvailable ? `Jump to brands starting with ${letter}` : `${letter}, no brands`
                }
                onClick={() => jumpToLetter(letter)}
                className={`h-9 w-9 border border-border rounded-full p-0 text-sm ${
                  isAvailable
                    ? "text-foreground hover:bg-foreground hover:text-background"
                    : "text-foreground-secondary/40"
                }`}
              >
                {letter}
              </Button>
            );
          })}
        </nav>

        {availableLetters.length ? (
          <div className="space-y-8">
            {availableLetters.map((letter) => (
              <section
                key={letter}
                id={`brand-${letter}`}
                aria-labelledby={`brand-heading-${letter}`}
                className="scroll-mt-32 space-y-4"
              >
                <h2
                  id={`brand-heading-${letter}`}
                  className="border-b border-border pb-3 text-xl font-semibold text-foreground"
                >
                  {letter}
                </h2>
                <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 sm:gap-4 lg:grid-cols-6">
                  {brandsByLetter[letter].map((brand) => (
                    <BrandCard key={brand.name} brand={brand} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-border bg-background-secondary px-5 py-12 text-center text-sm text-foreground-secondary">
            No brands match “{query}”. Try another search.
          </p>
        )}
      </Container>
    </section>
  );
}
