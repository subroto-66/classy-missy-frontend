import React, { useRef } from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuArrowRight, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Button from "../ui/Button";
import ProductCard from "../public/ProductCard";
import { Link } from "react-router";

export default function ProductSlider({productData,title,subtitle}) {
    const productSwiperRef = useRef(null);
  return (
    <section aria-labelledby="premium-products-title" className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
            {title}
          </p>
          <h2
            id="premium-products-title"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {subtitle}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => productSwiperRef.current?.slidePrev()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <LuChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => productSwiperRef.current?.slideNext()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <LuChevronRight size={18} aria-hidden="true" />
          </button>
          <Link
            to="/products"
            // className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full bg-foreground px-3.5 text-xs font-semibold text-background transition hover:opacity-85 sm:px-4 sm:text-sm"
          >
            <Button className="rounded-full" size="sm">
              See all
              <LuArrowRight size={15} aria-hidden="true" />
            </Button>
          </Link>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={1.35}
        slidesPerGroup={1}
        spaceBetween={12}
        loop
        // autoplay={{
        //   delay: 3500,
        //   disableOnInteraction: false,
        //   pauseOnMouseEnter: false,
        //   waitForTransition: true,
        // }}
        onSwiper={(swiper) => {
          productSwiperRef.current = swiper;
        }}
        breakpoints={{
          480: { slidesPerView: 2, spaceBetween: 14 },
          640: { slidesPerView: 2.4, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 18 },
          1280: { slidesPerView: 5, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {productData.map((product) => (
          <SwiperSlide key={product.id} className="!h-auto">
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
