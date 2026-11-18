
"use client";

import { useEffect, useState } from "react";
import { FiStar, FiUser, FiEdit3 } from "react-icons/fi";
import Button from "../ui/Button";
import api from "../../lib/axios";
import { useAuth } from "../../context/AuthContext";

function getStorageKey(productId) {
  return `classy-missy-product-reviews-${productId}`;
}

function readReviews(productId) {
  try {
    const stored = localStorage.getItem(getStorageKey(productId));
    if (!stored) return [];

    const parsed = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (review) =>
        review &&
        typeof review.id === "string" &&
        typeof review.name === "string" &&
        typeof review.text === "string" &&
        Number.isInteger(review.rating) &&
        review.rating >= 1 &&
        review.rating <= 5
    );
  } catch (error) {
    console.error("Could not load product reviews.", error);
    return [];
  }
}

function formatReviewDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Recently";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function ProductReviews({ product }) {
  return (
    <ProductReviewsContent key={product.id} product={product} />
  );
}

function ProductReviewsContent({ product }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState(user?.name || "");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;
    const local = readReviews(product.id);

    api.get(`/products/${product.slug || product.id}/reviews`)
      .then((res) => {
        if (!active) return;
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setReviews(res.data.data);
        } else {
          setReviews(local);
        }
      })
      .catch(() => {
        if (active) setReviews(local);
      });

    return () => {
      active = false;
    };
  }, [product.id, product.slug]);

  const saveReviews = async (newReview) => {
    try {
      setSubmitting(true);
      const res = await api.post(`/products/${product.slug || product.id}/reviews`, {
        name: newReview.name,
        text: newReview.text,
        rating: newReview.rating,
      });

      const saved = res.data?.data || newReview;
      const nextReviews = [saved, ...reviews];
      setReviews(nextReviews);
      try {
        localStorage.setItem(getStorageKey(product.id), JSON.stringify(nextReviews));
      } catch {}

      setNotice("Your review was posted successfully!");
    } catch {
      // Fallback local save
      const nextReviews = [newReview, ...reviews];
      try {
        localStorage.setItem(getStorageKey(product.id), JSON.stringify(nextReviews));
      } catch {}
      setReviews(nextReviews);
      setNotice("Your review was saved.");
    } finally {
      setSubmitting(false);
    }
  };

  const submitReview = (event) => {
    event.preventDefault();

    const reviewerName = name.trim() || user?.name || "Customer";
    const reviewText = text.trim();

    if (!reviewerName || !reviewText) return;

    saveReviews({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: reviewerName,
      text: reviewText,
      review: reviewText,
      rating,
      createdAt: new Date().toISOString(),
    });

    if (!user) setName("");
    setText("");
    setRating(5);
  };

  const averageRating =
    product.reviews + reviews.length > 0
      ? (
          product.rating * product.reviews +
          reviews.reduce((sum, review) => sum + review.rating, 0)
        ) /
        (product.reviews + reviews.length)
      : 0;

  const totalReviewCount = product.reviews + reviews.length;

  const ratingBreakdown = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter(
      (review) => review.rating === stars
    ).length;

    return {
      stars,
      count,
      percentage: reviews.length
        ? (count / reviews.length) * 100
        : 0,
    };
  });

  const recentReviews = [...reviews].sort(
    (first, second) =>
      (Date.parse(second.createdAt) || 0) -
      (Date.parse(first.createdAt) || 0)
  );

  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="space-y-6"
    >
      {/* Section Heading */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-foreground-secondary">
          Customer feedback
        </p>

        <h2
          id="customer-reviews-title"
          className="mt-1 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
        >
          Reviews & Ratings
        </h2>

        <p className="mt-1 text-sm text-foreground-secondary">
          See what customers are saying about this product.
        </p>
      </div>

      {/* Rating Summary + Recent Reviews */}
      <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">

        {/* Overall Rating */}
        <aside className="h-fit rounded-2xl border border-border bg-background p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-foreground">
            Overall rating
          </h3>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-5xl font-bold tracking-tight text-foreground">
              {averageRating.toFixed(1)}
            </span>

            <div>
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    size={15}
                    className={
                      star <= Math.round(averageRating)
                        ? "fill-foreground text-foreground"
                        : "text-foreground-secondary"
                    }
                  />
                ))}
              </div>

              <p className="mt-1 text-xs text-foreground-secondary">
                Out of 5
              </p>
            </div>
          </div>

          <p className="mt-2 text-xs text-foreground-secondary">
            Based on {totalReviewCount.toLocaleString()} ratings
          </p>

          <div className="my-5 border-t border-border" />

          <h4 className="mb-4 text-sm font-semibold text-foreground">
            Rating breakdown
          </h4>

          <div className="space-y-3">
            {ratingBreakdown.map(({ stars, count, percentage }) => (
              <div
                key={stars}
                className="grid grid-cols-[30px_minmax(0,1fr)_24px] items-center gap-2"
              >
                <span className="flex items-center gap-1 text-xs text-foreground-secondary">
                  {stars}
                  <FiStar
                    size={11}
                    className="fill-foreground text-foreground"
                  />
                </span>

                <div className="h-2 overflow-hidden rounded-full bg-background-secondary">
                  <div
                    className="h-full rounded-full bg-foreground transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="text-right text-xs tabular-nums text-foreground-secondary">
                  {count}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-4 text-[11px] leading-5 text-foreground-secondary">
            Rating breakdown of written reviews.
          </p>
        </aside>

        {/* Recent Reviews */}
        <div className="min-w-0 rounded-2xl border border-border bg-background p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-foreground">
                Recent reviews
              </h3>

              <p className="mt-1 text-xs text-foreground-secondary">
                Customer experiences and feedback
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-background-secondary px-3 py-1.5 text-xs font-medium text-foreground-secondary">
              {reviews.length} reviews
            </span>
          </div>

          {recentReviews.length > 0 ? (
            <div className="space-y-3 max-h-[300px] overflow-auto">
              {recentReviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-xl border border-border p-4 transition-colors hover:bg-background-secondary/30 sm:p-5"
                >
                  {/* Reviewer Information */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background-secondary text-foreground">
                        <FiUser size={19} />
                      </div>

                      <div className="min-w-0">
                        <h4 className="truncate text-sm font-semibold text-foreground">
                          {review.name}
                        </h4>

                        <time
                          dateTime={review.createdAt}
                          className="mt-1 block text-xs text-foreground-secondary"
                        >
                          {formatReviewDate(review.createdAt)}
                        </time>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex shrink-0 items-center gap-1.5 rounded-lg bg-background-secondary px-2.5 py-1.5">
                      <FiStar
                        size={14}
                        className="fill-foreground text-foreground"
                      />

                      <span className="text-xs font-semibold text-foreground">
                        {review.rating}.0
                      </span>
                    </div>
                  </div>

                  {/* Review Content */}
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-foreground-secondary">
                    {review.text}
                  </p>

                  {/* Verified Label */}
                  <div className="mt-4 flex items-center gap-1.5 border-t border-border pt-3">
                    <FiUser size={12} className="text-foreground-secondary" />
                    <span className="text-[11px] text-foreground-secondary">
                      Customer review
                    </span>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="flex min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border px-5 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background-secondary text-foreground-secondary">
                <FiStar size={22} />
              </div>

              <h4 className="mt-4 text-sm font-semibold text-foreground">
                No written reviews yet
              </h4>

              <p className="mt-1 max-w-xs text-sm leading-6 text-foreground-secondary">
                Be the first to share your experience with this product.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Full Width Write Review Section */}
      <div className="rounded-2xl border border-border bg-background p-5 sm:p-7">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background-secondary text-foreground">
            <FiEdit3 size={19} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-foreground">
              Write a review
            </h3>

            <p className="mt-1 text-sm text-foreground-secondary">
              Share your experience and help other shoppers make better decisions.
            </p>
          </div>
        </div>

        <form onSubmit={submitReview} className="mt-6 space-y-5">
          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">
              Your rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} star${value === 1 ? "" : "s"}`}
                  aria-pressed={rating === value}
                  onClick={() => setRating(value)}
                  className="rounded-md p-1.5 transition hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
                >
                  <FiStar
                    size={23}
                    className={
                      value <= rating
                        ? "fill-foreground text-foreground"
                        : "text-foreground-secondary"
                    }
                  />
                </button>
              ))}

              <span className="ml-2 text-xs text-foreground-secondary">
                {rating} out of 5
              </span>
            </div>
          </div>

          {/* Name + Review */}
          <div className="grid gap-4 ">
            <div>
              <label
                htmlFor="reviewer-name"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Your name
              </label>

              <input
                id="reviewer-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={80}
                required
                placeholder="Enter your name"
                className="h-12 w-full rounded-xl border border-input-border bg-input-background px-4 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/20"
              />
            </div>

            <div>
              <label
                htmlFor="review-text"
                className="mb-2 block text-sm font-medium text-foreground"
              >
                Your review
              </label>

              <textarea
                id="review-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                maxLength={1000}
                required
                rows={3}
                placeholder="Share your experience with this product..."
                className="min-h-[112px] w-full resize-y rounded-xl border border-input-border bg-input-background px-4 py-3 text-sm text-input-text outline-none transition placeholder:text-input-placeholder focus:border-input-active-border focus:ring-2 focus:ring-input-active-ring/20 sm:col-span-2"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-xs text-foreground-secondary"
              aria-live="polite"
            >
              {notice || "Your feedback helps other customers."}
            </p>

            <Button
              type="submit"
              disabled={!name.trim() || !text.trim()}
              className="h-11 w-full rounded-xl px-7 sm:w-auto"
            >
              Submit review
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
