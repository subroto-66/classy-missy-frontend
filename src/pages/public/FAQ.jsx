import { FiMessageCircle } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import faqImage from "../../assets/home/need.jpg";

const questions = [
  {
    question: "How do I place an order?",
    answer:
      "Browse products, add the items you want to your cart, and review your cart before checkout. The current storefront does not yet complete online checkout, so contact our team to arrange an order.",
  },
  {
    question: "Can I save products for later?",
    answer:
      "Yes. Use the heart icon on a product card or product details page to save it to your wishlist. Your saved items remain available in this browser.",
  },
  {
    question: "How can I check product availability?",
    answer:
      "Product availability can change. If you have a question about a particular item, email hello@classymissy.com with the product name and our team will help.",
  },
  {
    question: "When will my order arrive?",
    answer:
      "Delivery timing depends on your location and courier availability. Our team can provide an estimate when your order is confirmed.",
  },
  {
    question: "What should I do if I need help with my order?",
    answer:
      "Contact hello@classymissy.com and include your order details so we can assist you as quickly as possible.",
  },
  {
    question: "Can skincare products replace advice from a professional?",
    answer:
      "No. Product descriptions are general shopping information, not medical advice. If you have a skin condition, allergies, or concerns about ingredients, consult a qualified healthcare professional before use.",
  },
];

export default function FAQ() {
  return (
    <section className="py-6 sm:py-10">
      <Container className="space-y-8">
        <PageBanner
          eyebrow="Here to make things easy"
          title="Frequently asked questions"
          description="Quick answers about shopping, wishlists, products, and getting support."
          image={faqImage}
          alt="Skincare products arranged for a daily routine"
        />

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="space-y-3">
            {questions.map(({ question, answer }, index) => (
              <details
                key={question}
                className="group rounded-xl border border-border bg-background p-4 open:bg-background-secondary sm:p-5"
              >
                <summary className="flex cursor-pointer list-none items-start gap-4 text-sm font-semibold text-foreground marker:hidden">
                  <span className="mt-0.5 text-xs font-medium text-foreground-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">{question}</span>
                  <span
                    aria-hidden="true"
                    className="text-lg leading-none text-foreground-secondary transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="ml-8 mt-3 border-l border-border pl-4 text-sm leading-7 text-foreground-secondary">
                  {answer}
                </p>
              </details>
            ))}
          </div>

          <aside className="h-fit rounded-xl border border-border bg-background-secondary p-5 lg:sticky lg:top-32">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground">
              <FiMessageCircle size={18} />
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">
              Still have a question?
            </h2>
            <p className="mt-2 text-sm leading-6 text-foreground-secondary">
              Send us a message and our customer care team will be glad to help.
            </p>
            <a
              href="mailto:hello@classymissy.com"
              className="mt-4 inline-flex text-sm font-medium text-foreground underline underline-offset-4"
            >
              Contact customer care
            </a>
          </aside>
        </div>
      </Container>
    </section>
  );
}
