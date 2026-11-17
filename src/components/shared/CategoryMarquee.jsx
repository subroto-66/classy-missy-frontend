
import MarqueeModule from "react-fast-marquee";
import CategoryCard from "./CategoryCard";

const Marquee = MarqueeModule.default ?? MarqueeModule;

export default function CategoryMarquee({ categories = [] }) {
  return (
    <section aria-label="Shop by category" className="py-2">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
          A little something for everyone
        </p>

        <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          Shop by category
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <Marquee
          autoFill
          pauseOnHover
          speed={36}
          gradient={false}
          className="py-3"
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              category={category}
              className="mx-2.5 min-w-44"
            />
          ))}
        </Marquee>

        <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20" />

        <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20" />
      </div>
    </section>
  );
}
