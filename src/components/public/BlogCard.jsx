import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { Link } from "react-router";
import { getBlogSlug } from "../../data/blogs";

function formatDate(value) {
  if (!value) return "";
  try {
    const dateStr = String(value).includes("T") ? value : `${value}T00:00:00`;
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return String(value);
  }
}

export default function BlogCard({ blog }) {
  if (!blog) return null;

  const slug = blog.slug || getBlogSlug(blog);
  const blogPath = `/blog/${slug}`;
  const publishedDate = blog.publishedAt || blog.published_at;
  const readTime = blog.readTime || blog.read_time || "5 min read";
  const image =
    blog.image ||
    "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1200&q=85";
  const imageAlt = blog.imageAlt || blog.image_alt || blog.title;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-custom">
      <Link
        to={blogPath}
        aria-label={`Read ${blog.title}`}
        className="block aspect-[16/10] overflow-hidden bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {blog.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-secondary">
            <FiClock size={12} className="text-primary" aria-hidden="true" />
            {readTime}
          </span>
        </div>
        {publishedDate && (
          <p className="mt-3 text-[11px] text-foreground-secondary">
            {formatDate(publishedDate)}
          </p>
        )}
        <h2 className="mt-1.5 line-clamp-2 text-base font-semibold leading-6 text-foreground sm:text-lg">
          <Link to={blogPath} className="transition-colors hover:text-primary">
            {blog.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-foreground-secondary">
          {blog.excerpt}
        </p>
        <Link
          to={blogPath}
          className="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground shadow-xs transition-all hover:opacity-90 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Read more
          <FiArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
