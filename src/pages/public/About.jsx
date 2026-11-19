import { useEffect, useState } from "react";
import {
  FiAward,
  FiCheckCircle,
  FiHeart,
  FiShield,
  FiSmile,
  FiStar,
  FiSun,
} from "react-icons/fi";
import Container from "../../components/layouts/Container";
import products from "../../data/products";
import PageBanner from "../../components/shared/PageBanner";
import api from "../../lib/axios";
import aboutImage from "../../assets/home/y1.jpg";
import routineImage from "../../assets/home/need.jpg";
import discoveryImage from "../../assets/home/y2.jpg";

const iconMap = {
  heart: FiHeart,
  shield: FiShield,
  star: FiStar,
  sparkles: FiSun,
  check: FiCheckCircle,
  smile: FiSmile,
  award: FiAward,
};

const defaultValues = [
  {
    icon: "heart",
    title: "Care comes first",
    description:
      "We make it easier to explore products selected with everyday skincare routines in mind.",
  },
  {
    icon: "shield",
    title: "A thoughtful collection",
    description:
      "Browse products by brand, category, price, or the skin concern you want to focus on.",
  },
  {
    icon: "star",
    title: "Your routine, your way",
    description:
      "Save favorites, compare options, and build a routine at a pace that feels right for you.",
  },
];

const resolveImageUrl = (img, fallback) => {
  if (!img) return fallback;
  if (
    img.startsWith("http://") ||
    img.startsWith("https://") ||
    img.startsWith("blob:") ||
    img.startsWith("data:")
  ) {
    return img;
  }
  const backendBase = (
    import.meta.env.VITE_API_URL || "http://localhost:8000/api"
  ).replace(/\/api\/?$/, "");
  return `${backendBase}${img.startsWith("/") ? "" : "/"}${img}`;
};

export default function About() {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/about")
      .then((res) => {
        if (isMounted && res.data?.data) {
          setAboutData(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  const banner = aboutData?.banner || {
    eyebrow: "A little more care, every day",
    title: "About Classy Missy",
    description:
      "We make discovering skincare feel simple and personal. Explore a considered collection, find products for your routine, and keep the ones you love close at hand.",
    image: aboutImage,
    alt: "A beauty and skincare editorial",
  };

  const approach = aboutData?.approach || {
    eyebrow: "Our approach",
    title: "Beauty shopping, made more thoughtful.",
    paragraphs: [
      "Finding skincare that fits your needs can take time. Classy Missy brings product discovery into one place, with ways to browse by brand, category, and skin concern.",
      "Save items to your wishlist while you decide, or add products to your cart when you are ready. Our goal is to make the journey from discovery to your daily routine clear and comfortable.",
    ],
  };

  const routine = aboutData?.routine || {
    tag: "Make room for self-care",
    title: "Discover products that feel right for your routine.",
    image: routineImage,
    alt: "Skincare products chosen for a personal care routine",
  };

  const discovery = aboutData?.discovery || {
    image1: discoveryImage,
    caption1: "Thoughtful discovery",
    image2: products[0]?.image || discoveryImage,
    caption2: "Everyday essentials",
  };

  const valuesSection = aboutData?.values_section || {
    eyebrow: "What matters to us",
    title: "Care in every detail",
    values: defaultValues,
  };

  const valuesList =
    valuesSection.values && valuesSection.values.length > 0
      ? valuesSection.values
      : defaultValues;

  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container className="space-y-12 sm:space-y-16">
        <PageBanner
          eyebrow={banner.eyebrow || "A little more care, every day"}
          title={banner.title || "About Classy Missy"}
          description={
            banner.description ||
            "We make discovering skincare feel simple and personal. Explore a considered collection, find products for your routine, and keep the ones you love close at hand."
          }
          image={resolveImageUrl(banner.image, aboutImage)}
          alt={banner.alt || banner.title || "A beauty and skincare editorial"}
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              {approach.eyebrow || "Our approach"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {approach.title || "Beauty shopping, made more thoughtful."}
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-foreground-secondary sm:text-base">
            {approach.paragraphs && approach.paragraphs.length > 0 ? (
              approach.paragraphs.map((para, idx) => <p key={idx}>{para}</p>)
            ) : approach.description ? (
              approach.description
                .split("\n\n")
                .map((para, idx) => <p key={idx}>{para}</p>)
            ) : (
              <>
                <p>
                  Finding skincare that fits your needs can take time. Classy Missy
                  brings product discovery into one place, with ways to browse by
                  brand, category, and skin concern.
                </p>
                <p>
                  Save items to your wishlist while you decide, or add products to
                  your cart when you are ready. Our goal is to make the journey from
                  discovery to your daily routine clear and comfortable.
                </p>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <figure className="relative min-h-72 overflow-hidden rounded-2xl bg-background-secondary sm:min-h-96">
            <img
              src={resolveImageUrl(routine.image, routineImage)}
              alt={routine.alt || "Skincare routine"}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                {routine.tag || "Make room for self-care"}
              </p>
              <p className="mt-2 max-w-md text-xl font-semibold sm:text-2xl">
                {routine.title || "Discover products that feel right for your routine."}
              </p>
            </figcaption>
          </figure>

          <div className="grid grid-rows-2 gap-4">
            <figure className="relative min-h-40 overflow-hidden rounded-2xl bg-background-secondary sm:min-h-44">
              <img
                src={resolveImageUrl(discovery.image1, discoveryImage)}
                alt={discovery.caption1 || "Thoughtful discovery"}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
                {discovery.caption1 || "Thoughtful discovery"}
              </figcaption>
            </figure>

            <figure className="relative min-h-40 overflow-hidden rounded-2xl bg-background-secondary sm:min-h-44">
              <img
                src={resolveImageUrl(discovery.image2, products[0]?.image || discoveryImage)}
                alt={discovery.caption2 || "Everyday essentials"}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
                {discovery.caption2 || "Everyday essentials"}
              </figcaption>
            </figure>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              {valuesSection.eyebrow || "What matters to us"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              {valuesSection.title || "Care in every detail"}
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {valuesList.map((val, idx) => {
              const Icon = iconMap[val.icon] || FiHeart;
              return (
                <article
                  key={val.title || idx}
                  className="rounded-xl border border-border bg-background-secondary p-5 sm:p-6"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background-custom text-foreground">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-foreground">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                    {val.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
