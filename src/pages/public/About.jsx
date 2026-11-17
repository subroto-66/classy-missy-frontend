import { FiHeart, FiShield, FiStar } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import products from "../../data/products";
import PageBanner from "../../components/shared/PageBanner";
import aboutImage from "../../assets/home/y1.jpg";
import routineImage from "../../assets/home/need.jpg";
import discoveryImage from "../../assets/home/y2.jpg";

const values = [
  {
    icon: FiHeart,
    title: "Care comes first",
    description:
      "We make it easier to explore products selected with everyday skincare routines in mind.",
  },
  {
    icon: FiShield,
    title: "A thoughtful collection",
    description:
      "Browse products by brand, category, price, or the skin concern you want to focus on.",
  },
  {
    icon: FiStar,
    title: "Your routine, your way",
    description:
      "Save favorites, compare options, and build a routine at a pace that feels right for you.",
  },
];

export default function About() {
  return (
    <section className="py-8 sm:py-12 lg:py-16">
      <Container className="space-y-12 sm:space-y-16">
        <PageBanner
          eyebrow="A little more care, every day"
          title="About Classy Missy"
          description="We make discovering skincare feel simple and personal. Explore a considered collection, find products for your routine, and keep the ones you love close at hand."
          image={aboutImage}
          alt="A beauty and skincare editorial"
        />

        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              Our approach
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Beauty shopping, made more thoughtful.
            </h2>
          </div>
          <div className="space-y-4 text-sm leading-7 text-foreground-secondary sm:text-base">
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
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <figure className="relative min-h-72 overflow-hidden rounded-2xl bg-background-secondary sm:min-h-96">
            <img
              src={routineImage}
              alt="Skincare products chosen for a personal care routine"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Make room for self-care
              </p>
              <p className="mt-2 max-w-md text-xl font-semibold sm:text-2xl">
                Discover products that feel right for your routine.
              </p>
            </figcaption>
          </figure>
          <div className="grid grid-rows-2 gap-4">
            {[discoveryImage, products[0].image].map((image, index) => (
              <figure
                key={image}
                className="relative min-h-40 overflow-hidden rounded-2xl bg-background-secondary sm:min-h-44"
              >
                <img
                  src={image}
                  alt={
                    index === 0
                      ? "Beauty products in a curated collection"
                      : "Skincare product selected for everyday care"
                  }
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-4 pb-4 pt-10 text-sm font-medium text-white">
                  {index === 0 ? "Thoughtful discovery" : "Everyday essentials"}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
              What matters to us
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
              Care in every detail
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-xl border border-border bg-background-secondary p-5 sm:p-6"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background-custom text-foreground">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground-secondary">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
