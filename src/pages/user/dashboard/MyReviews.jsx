import { FiEdit2, FiStar } from "react-icons/fi";
import { reviews } from "./dashboardData";

export default function MyReviews() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-[18px] font-semibold text-black">My reviews</h2>
        <p className="mt-1 text-[11px] text-neutral-500">
          Your thoughts help others find their next favourite.
        </p>
      </div>
      {reviews.map((review) => (
        <article
          key={review.product}
          className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-[13px] font-semibold text-neutral-900">
                {review.product}
              </h3>
              <p className="mt-1 text-[10px] text-neutral-500">
                Reviewed {review.date}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Edit review for ${review.product}`}
              className="cursor-pointer rounded-lg p-2 text-neutral-600 hover:bg-neutral-100"
            >
              <FiEdit2 size={15} />
            </button>
          </div>
          <div className="mt-4 flex gap-1 text-black">
            {Array.from({ length: 5 }, (_, index) => (
              <FiStar
                key={index}
                size={14}
                fill={index < review.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
          <p className="mt-3 max-w-3xl text-[12px] leading-6 text-neutral-700">
            {review.review}
          </p>
        </article>
      ))}
    </section>
  );
}
