import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductHighlights({ highlights = [] }) {



  return (
    <section
      aria-labelledby="product-highlights-title"
      className="overflow-hidden rounded-lg border border-border bg-background p-4  sm:p-6"
    >
      <div className="mb-5 flex items-end justify-between gap-3 border-b border-border pb-2">
          <h2
            id="product-highlights-title"
            className="text-lg font-semibold text-foreground"
          >
            Product Highlights
          </h2>
      </div>
      <ul className="grid grid-cols-4 gap-1 sm:gap-3  lg:grid-cols-4">
        {highlights.map(({ title, image }, index) => (
          <li
            key={`${title}-${image}-${index}`}
            className="group flex min-h-24 items-center flex-col justify-center gap-1 sm:gap-2  sm:text-center"
          >
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105">
              <img
                src={image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="sm:h-10 h-8 w-8 sm:w-10 object-contain"
              />
            </span>
            <span className="sm:text-xs text-[9px] text-center leading-5 text-foreground sm:max-w-32">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
