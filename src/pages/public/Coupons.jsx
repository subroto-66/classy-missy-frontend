import { FiTag } from "react-icons/fi";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import campaigns from "../../data/campaigns";

const coupons = [
  {
    code: "GLOW10",
    offer: "10% off",
    title: "A little treat for your routine",
    details: "Save 10% on your next beauty purchase.",
    minimum: "Minimum purchase ৳1,500",
    expiry: "Valid while stocks last",
  },
  {
    code: "SKINCARE15",
    offer: "15% off",
    title: "Your skincare refresh",
    details: "Get 15% off selected skincare favorites.",
    minimum: "Minimum purchase ৳2,500",
    expiry: "One use per customer",
  },
  {
    code: "FREESHIP",
    offer: "Free delivery",
    title: "Good things, delivered",
    details: "Enjoy complimentary delivery on your order.",
    minimum: "Minimum purchase ৳2,000",
    expiry: "Valid on eligible orders",
  },
];

export default function Coupons() {
  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="Something special for you"
          title="Coupons & offers"
          description="A little extra love for your next order. Check the details on each offer before checkout."
          image={campaigns[1].image}
          alt=""
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coupons.map((coupon) => (
            <article
              key={coupon.code}
              className="relative flex min-h-64 overflow-hidden rounded-2xl border border-border bg-background shadow-sm"
            >
              <div className="flex w-[34%] shrink-0 flex-col items-center justify-center bg-foreground px-3 text-center text-background">
                <FiTag size={20} aria-hidden="true" />
                <p className="mt-3 text-xl font-semibold leading-tight">
                  {coupon.offer}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-background/65">
                  Offer
                </p>
              </div>
              <div className="relative flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border border-border bg-background"
                />
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground-secondary">
                  Classy Missy exclusive
                </p>
                <h2 className="mt-2 text-base font-semibold leading-snug text-foreground">
                  {coupon.title}
                </h2>
                <p className="mt-2 text-xs leading-5 text-foreground-secondary">
                  {coupon.details}
                </p>
                <div className="mt-4 border-t border-dashed border-border pt-3">
                  <p className="rounded-md border border-dashed border-border bg-background-secondary px-3 py-2 text-center font-mono text-sm font-semibold tracking-[0.16em] text-foreground">
                    {coupon.code}
                  </p>
                  <p className="mt-2 text-[10px] leading-4 text-foreground-secondary">
                    {coupon.minimum} · {coupon.expiry}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
