import { FiFileText } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import termsImage from "../../assets/home/promo1.jpg";

const sections = [
  {
    title: "Using this website",
    paragraphs: [
      "By browsing or placing an order through Classy Missy, you agree to use this website lawfully and provide accurate information when requested.",
      "Please do not misuse the website, interfere with its operation, or attempt to access areas or information that are not intended for you.",
    ],
  },
  {
    title: "Products and availability",
    paragraphs: [
      "We aim to keep product descriptions, images, prices, and availability current. Product packaging and details may change, and the delivered item can differ slightly from its image.",
      "All orders are subject to product availability and confirmation. If an item becomes unavailable after you place an order, we will contact you about the next steps.",
    ],
  },
  {
    title: "Pricing and orders",
    paragraphs: [
      "Prices are shown in the currency displayed on the product and cart pages. Applicable delivery charges are shown or communicated before an order is finalized.",
      "Adding an item to your cart does not reserve stock or confirm an order. We may contact you to verify order details before processing.",
    ],
  },
  {
    title: "Delivery, returns, and product use",
    paragraphs: [
      "Delivery estimates are guides and may be affected by location, courier schedules, or circumstances outside our control. Please contact customer care if you need help with an order.",
      "Follow the directions and cautions supplied with each product. Product information on this site is for general shopping guidance and is not medical advice.",
    ],
  },
  {
    title: "Contact and updates",
    paragraphs: [
      "We may update these terms as our services change. The latest version will be available on this page.",
      "For questions about an order or these terms, contact hello@classymissy.com.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <section className="py-6 sm:py-10">
      <Container className="space-y-8">
        <PageBanner
          eyebrow="The details that matter"
          title="Terms & conditions"
          description="A clear guide to browsing, ordering, and shopping with Classy Missy."
          image={termsImage}
          alt="A curated beauty and skincare collection"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
          <div className="space-y-4">
            {sections.map(({ title, paragraphs }, index) => (
              <section
                key={title}
                className="rounded-xl border border-border bg-background p-5 sm:p-6"
              >
                <h2 className="flex items-center gap-3 text-base font-semibold text-foreground">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background-secondary text-xs font-semibold text-foreground-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </h2>
                <div className="mt-4 space-y-3 pl-11 text-sm leading-7 text-foreground-secondary">
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="rounded-xl border border-border bg-background-secondary p-5 lg:sticky lg:top-32">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
              <FiFileText size={18} />
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">
              Need a hand?
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Our customer care team can help with orders, delivery, and
              product questions.
            </p>
            <a
              href="mailto:hello@classymissy.com"
              className="mt-4 inline-block text-sm font-medium text-foreground underline underline-offset-4"
            >
              hello@classymissy.com
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
