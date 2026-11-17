import { useRef } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import Container from "../../components/layouts/Container";
import b1 from "../../assets/home/b1.jfif";
import b2 from "../../assets/home/b2.jfif";
import b3 from "../../assets/home/b3.jfif";

import p1 from "../../assets/home/products.mp4";
import p2 from "../../assets/home/promo1.jpg";
import p3 from "../../assets/home/promo2.jpg";
import p4 from "../../assets/home/promo3.jpg";

import need from "../../assets/home/need.jpg"

import t1 from "../../assets/home/b1.jpg";
import t2 from "../../assets/home/b2.jpg";

import flash from "../../assets/home/banner-1.gif";
import products from "../../data/products";
import campaigns from "../../data/campaigns";
import categories from "../../data/categories";
import ProductSlider from "../../components/shared/ProductSlider";
import CampaignSlider from "../../components/shared/CampaignSlider";
import BrandSlider from "../../components/shared/BrandSlider";
import FindByProblem from "../../components/shared/FindByProblem";
import CategoryMarquee from "../../components/shared/CategoryMarquee";
import BlogCard from "../../components/public/BlogCard";

import brands from "../../data/brands";
import blogs from "../../data/blogs";

import y1 from "../../assets/home/y1.jpg"
import y2 from "../../assets/home/y2.jpg"
import y3 from "../../assets/home/y3.jpg"
import y4 from "../../assets/home/y4.jpg"

const beauty = [y1,y2,y3,y4]

const skinProblems = [
  { label: "Blemishes", title: "Acne & breakouts", solutions: "04 solutions", image: products[1].image },
  { label: "Sensitive skin", title: "Redness & sensitivity", solutions: "06 solutions", image: products[0].image },
  { label: "Uneven tone", title: "Dark spots", solutions: "05 solutions", image: products[2].image },
  { label: "Mature skin", title: "Fine lines & wrinkles", solutions: "08 solutions", image: products[3].image },
  { label: "Dehydration", title: "Dry, thirsty skin", solutions: "07 solutions", image: products[6].image },
  { label: "Oil control", title: "Oily skin & pores", solutions: "05 solutions", image: products[5].image },
  { label: "Radiance", title: "Dullness & fatigue", solutions: "06 solutions", image: products[4].image },
  { label: "Skin barrier", title: "Dryness & irritation", solutions: "04 solutions", image: products[0].image },
  { label: "Hair health", title: "Hair fall & thinning", solutions: "04 solutions", image: products[5].image },
  { label: "Daily protection", title: "Sun care & SPF", solutions: "06 solutions", image: products[2].image },
  { label: "Scalp care", title: "Dry, itchy scalp", solutions: "05 solutions", image: products[6].image },
  { label: "Breakout care", title: "Post-acne marks", solutions: "05 solutions", image: products[1].image },
];

const slides = [
  {
    image: b1,
    alt: "Curated neutral-toned women's fashion collection",
    href: "/brands",
  },
  {
    image: b2,
    alt: "Contemporary women's fashion look",
    href: "/campaigns",
  },
  {
    image: b3,
    alt: "Discover the latest fashion collection",
    href: "/preorder",
  },
];

const promo = [
  {
    type: "video",
    image: p1, // MP4 video path
    alt: "Promo video",
    href: "/brands",
  },
  {
    type: "image",
    image: p2,
    alt: "promo2",
    href: "/campaigns",
  },
  {
    type: "image",
    image: p3,
    alt: "promo3",
    href: "/preorder",
  },
  {
    type: "image",
    image: p4,
    alt: "promo4",
    href: "/preorder",
  },
];

export default function Home() {
  const swiperRef = useRef(null);


  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className={"space-y-6 md:space-y-8 lg:space-y-10"}>
        <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            loop
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            pagination={{
              clickable: true,
              renderBullet: (_, className) =>
                `<span class="${className} !bg-foreground"></span>`,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
          >
            {slides.map(({ image, alt, href }) => (
              <SwiperSlide key={image}>
                <Link
                  to={href}
                  aria-label={`Explore: ${alt}`}
                  className="block aspect-[7/5] overflow-hidden sm:aspect-[16/7] lg:aspect-[3/1]"
                >
                  <img
                    src={image}
                    alt={alt}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-3 cursor-pointer top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-custom backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100"
          >
            <LuChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-3 cursor-pointer top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-custom backdrop-blur transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100"
          >
            <LuChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {promo.map((item, indx) => (
            <Link
              key={indx}
              to={item.href}
              className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                {item.type === "video" ? (
                  <video
                    src={item.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    aria-label={item.alt}
                  />
                ) : (
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        <CategoryMarquee categories={categories} />

        <FindByProblem image={need} problems={skinProblems} />

        <div id="shop" className="scroll-mt-24">
          <ProductSlider
            subtitle={"Premium Products"}
            title={"Curated for you"}
            productData={products}
          />
        </div>

        <div>
          <img
            className="rounded-xl h-20 sm:h-30 lg:h-40"
            src={flash}
            alt="flash-banner"
          />
        </div>

        <ProductSlider
          subtitle={"On Sale Products"}
          title={"Curated for you"}
          productData={products}
        />
        <CampaignSlider subtitle={"Campaigns"}
          title={"Curated for you"} camp = {campaigns}/>
        <ProductSlider
          subtitle={"New Arrivals"}
          title={"Curated for you"}
          productData={products}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={t1} alt={""} className="h-full rounded-xl w-full object-cover" />
          <img src={t2} alt={""} className="h-full rounded-xl w-full object-cover" />
        </div>

        <ProductSlider
          subtitle={"Best Selling Products"}
          title={"Curated for you"}
          productData={products}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {
              beauty.map((b,indx) => {
                return(<img className="rounded-xl" key={indx} src={b}/>)
              })
             }
        </div>
        <BrandSlider subtitle={"New brands"}
          title={"Fall in love with the latest novelties and best-sellers from your favorite brands!"} brand = {brands}/>
          
        <ProductSlider
          subtitle={"Featured Products"}
          title={"Curated for you"}
          productData={products}
        />

        <section aria-labelledby="home-blogs-title" className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
                The Classy Missy journal
              </p>
              <h2
                id="home-blogs-title"
                className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
              >
                Skincare notes & know-how
              </h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex min-h-10 items-center rounded-full border border-border px-4 text-xs font-semibold text-foreground transition hover:bg-background-secondary"
            >
              Explore all blogs
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {blogs.slice(0, 3).map((blog) => (
              <BlogCard key={blog.title} blog={blog} />
            ))}
          </div>
        </section>
      </Container>
    </section>
  );
}
