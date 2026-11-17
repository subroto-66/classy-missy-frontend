import { useRef } from "react";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

export default function FindByProblem({ image, problems }) {
  const swiperRef = useRef(null);

  return (
    <section aria-labelledby="find-by-problem-title">
      <div className="mb-5 flex items-end justify-between gap-4 sm:mb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
            Your skin, understood
          </p>
          <h2
            id="find-by-problem-title"
            className="mt-1.5 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Explore by problem
          </h2>
          <p className="mt-1.5 text-sm text-foreground-secondary">
            Find the right care for what matters to you.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Previous problems"
            onClick={() => swiperRef.current?.slidePrev()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <FiChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next problems"
            onClick={() => swiperRef.current?.slideNext()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
          >
            <FiChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(190px,0.8fr)_2.7fr] lg:gap-5">
        <div className="relative hidden min-h-[272px] overflow-hidden rounded-xl lg:block">
          <img
            src={image}
            alt="Discover skincare picked for your needs"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-white">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/75">
              Care that feels personal
            </p>
            <p className="mt-2 text-xl font-semibold leading-tight">
              Your routine,
              <br />
              your way.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Autoplay, Grid, Pagination]}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            rewind
            speed={650}
            slidesPerView={1}
            slidesPerGroup={2}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={12}
            pagination={{ clickable: true }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                slidesPerGroup: 4,
              },
              1024: {
                slidesPerView: 3,
                slidesPerGroup: 6,
              },
            }}
            className="find-by-problem-swiper h-[272px] pb-7"
          >
            {problems.map(({ label, title, solutions, image: cardImage }, index) => (
              <SwiperSlide key={title}>
                <Link
                  to={`/products?problem=${encodeURIComponent(label)}`}
                  className="group relative flex h-full min-h-[104px] items-center gap-3 overflow-hidden rounded-xl border border-border bg-background p-3 transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-custom sm:gap-4 sm:p-3.5"
                >
                  <span className="absolute right-3 top-2 text-[10px] font-medium tabular-nums text-foreground-secondary/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-t-full rounded-b-lg bg-background-secondary">
                    <img
                      src={cardImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </span>
                  <span className="min-w-0 pr-3">
                    <span className="inline-block max-w-full truncate rounded-sm bg-background-secondary px-1.5 py-0.5 text-[10px] font-medium text-foreground-secondary">
                      {label}
                    </span>
                    <span className="mt-1.5 block text-sm font-semibold leading-snug text-foreground">
                      {title}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] text-foreground-secondary transition-colors group-hover:text-foreground">
                      {solutions}
                      <span className="font-medium text-foreground">Explore</span>
                      <FiArrowRight
                        size={13}
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                  </span>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
