import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import Button from "../../components/ui/Button";
import BrandCard from "../../components/shared/BrandCard";
import brandsMock from "../../data/brands";
import api from "../../lib/axios";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Brands() {
  const [brandsList, setBrandsList] = useState(brandsMock);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/brands")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setBrandsList(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const filteredBrands = useMemo(
    () =>
      brandsList.filter((brand) =>
        brand.name.toLowerCase().includes(query.trim().toLowerCase()),
      ),
    [brandsList, query],
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
              src={brandsList[0]?.image || brandsList[0]?.logo || brandsMock[0].image}
              alt=""
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background-secondary via-background-secondary/70 to-transparent" />
          </div>
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
              Trusted names
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Shop by brand
            </h1>
            <p className="mt-3 max-w-md text-sm leading-6 text-foreground-secondary sm:text-base">
              Explore your favorites or find a new name to love. Every brand is
              chosen with care.
            </p>
          </div>
        </div>

        <label className="relative mx-auto block max-w-2xl">
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
            placeholder="Search brands"
            className="h-12 w-full rounded-full border border-input-border bg-input-background pl-11 pr-4 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/30"
          />
        </label>

        <nav
          aria-label="Alphabet quick jump"
          className="flex flex-wrap items-center justify-center gap-1 rounded-xl border border-border bg-background-secondary p-2 sm:gap-2 sm:p-3"
        >
          {alphabet.map((letter) => {
            const hasBrands = availableLetters.includes(letter);
            return (
              <Button
                key={letter}
                type="button"
                variant="ghost"
                disabled={!hasBrands}
                onClick={() => jumpToLetter(letter)}
                className={`h-7 w-7 rounded-md p-0 text-xs font-semibold sm:h-8 sm:w-8 ${
                  hasBrands
                    ? "text-foreground hover:bg-background"
                    : "text-foreground-secondary/40 cursor-not-allowed"
                }`}
              >
                {letter}
              </Button>
            );
          })}
        </nav>

        {availableLetters.length ? (
          <div className="space-y-10 sm:space-y-12">
            {availableLetters.sort().map((letter) => (
              <section
                key={letter}
                id={`brand-${letter}`}
                className="scroll-mt-24 space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-border pb-2">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    {letter}
                  </h2>
                  <span className="text-xs text-foreground-secondary">
                    {brandsByLetter[letter].length}{" "}
                    {brandsByLetter[letter].length === 1 ? "brand" : "brands"}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                  {brandsByLetter[letter].map((brand) => (
                    <BrandCard
                      key={brand.slug || brand.name}
                      brand={brand}
                      className="w-full min-w-0"
                    />
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
