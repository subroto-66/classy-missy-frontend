import { useEffect, useState } from "react";
import { FiStar } from "react-icons/fi";
import { Link } from "react-router";
import Button from "../../../components/ui/Button";
import api from "../../../lib/axios";

export default function MyReviews() {
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.get("/dashboard/reviews")
      .then((res) => {
        if (active && Array.isArray(res.data?.data)) {
          setReviewsList(res.data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load user reviews:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-[18px] font-semibold text-black">My reviews</h2>
        <p className="mt-1 text-[11px] text-neutral-500">
          Your thoughts help others find their next favourite.
        </p>
      </div>

      {loading ? (
        <div className="space-y-3 py-6">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 space-y-3">
              <div className="h-4 w-48 rounded bg-neutral-100" />
              <div className="h-3 w-28 rounded bg-neutral-100" />
              <div className="h-3 w-full rounded bg-neutral-100" />
            </div>
          ))}
        </div>
      ) : reviewsList.length > 0 ? (
        reviewsList.map((review, idx) => (
          <article
            key={review.id || review.product || idx}
            className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm"
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
              {review.product_slug && (
                <Link
                  to={`/product/${review.product_slug}`}
                  className="cursor-pointer rounded-lg px-2.5 py-1 text-xs text-neutral-600 hover:bg-neutral-100 hover:text-black transition-colors"
                >
                  View Product →
                </Link>
              )}
            </div>
            <div className="mt-3 flex gap-1 text-amber-400">
              {Array.from({ length: 5 }, (_, index) => (
                <FiStar
                  key={index}
                  size={14}
                  fill={index < review.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <p className="mt-3 max-w-3xl text-[12px] leading-6 text-neutral-700">
              {review.review || review.text}
            </p>
          </article>
        ))
      ) : (
        <div className="rounded-2xl border border-neutral-200 bg-white p-12 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400">
            <FiStar size={24} />
          </span>
          <h3 className="mt-4 text-sm font-semibold text-neutral-900">
            No reviews yet
          </h3>
          <p className="mt-1.5 text-xs text-neutral-500 max-w-sm mx-auto">
            You haven't left any product reviews yet. Share your feedback on products you've tried to help the community!
          </p>
          <Link to="/products" className="mt-5 inline-flex">
            <Button className="rounded-lg bg-black text-xs text-white hover:bg-neutral-800">
              Browse products
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
