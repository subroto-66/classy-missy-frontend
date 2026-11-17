
import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  LuArrowRight,
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
import Button from "../ui/Button";
import { Link } from "react-router";
import BrandCard from "./BrandCard";

export default function BrandSlider({ title, subtitle, brand }) {
  const productSwiperRef = useRef(null);

  return (
    <section aria-labelledby="premium-products-title" className="space-y-5">
      <div className="flex items-end flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2
            id="premium-products-title"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {subtitle}
          </h2>
          <p className="text-sm text-foreground-secondary">{title}</p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => productSwiperRef.current?.slidePrev()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary"
          >
            <LuChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Next products"
            onClick={() => productSwiperRef.current?.slideNext()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary"
          >
            <LuChevronRight size={18} />
          </button>

          <Link to="/brands">
            <Button className="rounded-full" size="sm">
              See all
              <LuArrowRight size={15} />
            </Button>
          </Link>
        </div>
      </div>

      <Swiper
        modules={[Autoplay]}
        slidesPerView={2.5}
        slidesPerGroup={1}
        spaceBetween={10}
        loop={brand?.length > 7}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true,
        }}
        onSwiper={(swiper) => {
          productSwiperRef.current = swiper;
        }}
        breakpoints={{
          640: {
            slidesPerView: 5,
            spaceBetween: 14,
          },
          1024: {
            slidesPerView: 7,
            spaceBetween: 18,
          },
        }}
        className="w-full"
      >
        {brand?.map((item) => (
          <SwiperSlide key={item.name} className="!h-auto">
            <BrandCard brand={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
