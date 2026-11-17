const deliveryOptions = [
  {
    title: "Standard delivery",
    estimate: "2–5 business days",
    note: "Available nationwide",
    image: "/images/delivery/standard-delivery.png",
    imageAlt: "Delivery van following a route to its destination",
    tag: "Nationwide",
  },
  {
    title: "Dhaka same-day",
    estimate: "Selected areas",
    note: "Order and location dependent",
    image: "/images/delivery/same-day-delivery.png",
    imageAlt: "Cyclist delivering an order around the city",
    tag: "Fast delivery",
  },
  {
    title: "Express delivery",
    estimate: "Within 4 hours",
    note: "Subject to availability",
    image: "/images/delivery/express-delivery.png",
    imageAlt: "Express courier carrying a delivery package",
    tag: "Express",
  },
];

export default function DeliveryOptions() {
  return (
    <section
      aria-labelledby="delivery-options-title"
      className="overflow-hidden rounded-lg border border-border bg-background p-5  sm:p-7"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
            Delivered with care
          </p>
          <h2
            id="delivery-options-title"
            className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            Choose what works for you
          </h2>
        </div>
        <span className="rounded-full border border-border bg-background-secondary px-3 py-1.5 text-[11px] font-medium text-foreground-secondary">
          Flexible delivery
        </span>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {deliveryOptions.map(
          ({ title, estimate, note, image, imageAlt, tag }) => (
            <article
              key={title}
              className="group relative flex min-h-52 flex-col overflow-hidden rounded-2xl border border-border bg-background-secondary/70 p-4 transition duration-200 hover:-translate-y-1 hover:bg-background-secondary hover:shadow-custom sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="rounded-full border border-border bg-background px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary">
                  {tag}
                </span>
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  className="h-[88px] w-[104px] shrink-0 object-contain transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-28"
                />
              </div>
              <div className="mt-auto pt-3">
                <h3 className="text-sm font-semibold text-foreground">
                  {title}
                </h3>
                <p className="mt-1 text-base font-semibold text-foreground">
                  {estimate}
                </p>
                <p className="mt-1 text-xs leading-5 text-foreground-secondary">
                  {note}
                </p>
              </div>
            </article>
          ),
        )}
      </div>
      <p className="mt-5 border-t border-border pt-4 text-xs leading-5 text-foreground-secondary">
        Delivery estimates are indicative. Confirm service availability with
        customer care when placing your order.
      </p>
    </section>
  );
}
