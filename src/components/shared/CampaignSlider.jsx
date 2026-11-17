import { useRef } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { LuArrowRight } from "react-icons/lu";
import Button from "../ui/Button";
import { Link } from "react-router";
import CampaignCard from "./CampaignCard";

export default function CampaignSlider({ camp, title, subtitle }) {
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
          {/* <button
            type="button"
            aria-label="Previous products"
            onClick={() => productSwiperRef.current?.slidePrev()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <LuChevronLeft size={18} aria-hidden="true" />
          </button> */}
          {/* <button
            type="button"
            aria-label="Next products"
            onClick={() => productSwiperRef.current?.slideNext()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border cursor-pointer bg-background-custom text-foreground transition hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <LuChevronRight size={18} aria-hidden="true" />
          </button> */}
          <Link
            to="/campaigns"
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
          480: { slidesPerView: 2, spaceBetween: 14 },
          640: { slidesPerView: 2.4, spaceBetween: 16 },
          768: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 18 },
          1280: { slidesPerView: 3, spaceBetween: 20 },
        }}
        className="w-full"
      >
        {camp.map((campaign) => (
          <SwiperSlide key={campaign.slug} className="!h-auto">
            <CampaignCard campaign={campaign} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
