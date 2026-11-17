import { FiLock, FiShield } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import privacyImage from "../../assets/home/promo2.jpg";

const sections = [
  {
    title: "Information you provide",
    body:
      "When you contact us or make an enquiry, you may choose to share details such as your name, email address, phone number, delivery information, or the contents of your message. Please provide only information needed to help with your request.",
  },
  {
    title: "How we use information",
    body:
      "We use information you provide to respond to questions, help manage order enquiries, and improve the shopping experience. We do not sell personal information.",
  },
  {
    title: "Wishlist and browser storage",
    body:
      "Your wishlist and cart are saved in local storage in your browser so they remain available when you return. This information stays in that browser unless you clear its site data. Avoid using a shared device if you do not want others to see your saved items.",
  },
  {
    title: "Sharing and service providers",
    body:
      "We share information only when needed to provide a requested service, respond to you, or comply with applicable legal requirements. If an order is arranged, relevant delivery details may be shared with the delivery provider.",
  },
  {
    title: "Your choices and questions",
    body:
      "You can clear locally saved cart and wishlist data through your browser settings. To ask about information you have sent to us or this policy, email hello@classymissy.com.",
  },
];

export default function PrivacyPolicy() {
  return (
    <section className="py-6 sm:py-10">
      <Container className="space-y-8">
        <PageBanner
          eyebrow="Your information, treated thoughtfully"
          title="Privacy policy"
          description="Learn what information may be used when you browse or contact Classy Missy, and the choices available to you."
          image={privacyImage}
          alt="A calm, clean skincare display"
        />

        <div className="mx-auto max-w-4xl">
          <div className="mb-5 flex items-start gap-4 rounded-xl border border-border bg-background-secondary p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
              <FiLock size={18} />
            </span>
            <div>
              <h2 className="text-sm font-semibold text-foreground">
                Privacy at a glance
              </h2>
              <p className="mt-1 text-sm leading-6 text-foreground-secondary">
                We use information to support your shopping experience and
                respond to requests. Cart and wishlist items are stored in your
                browser.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border bg-background">
            {sections.map(({ title, body }, index) => (
              <section
                key={title}
                className="grid gap-2 border-b border-border p-5 last:border-0 sm:grid-cols-[48px_1fr] sm:gap-4 sm:p-6"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background-secondary text-xs font-semibold text-foreground-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-foreground">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-foreground-secondary">
                    {body}
                  </p>
                </div>
              </section>
            ))}
          </div>

          <p className="mt-4 flex items-center gap-2 text-xs text-foreground-secondary">
            <FiShield size={14} aria-hidden="true" />
            We may update this policy as our services and practices change.
          </p>
        </div>
      </Container>
    </section>
  );
}
