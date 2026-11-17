import { FiArrowUpRight, FiClock } from "react-icons/fi";
import { Link } from "react-router";
import { getBlogSlug } from "../../data/blogs";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

export default function BlogCard({ blog }) {
  const blogPath = `/blog/${getBlogSlug(blog)}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-custom">
      <Link
        to={blogPath}
        aria-label={`Read ${blog.title}`}
        className="block aspect-[16/10] overflow-hidden bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground"
      >
        <img
          src={blog.image}
          alt={blog.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-background-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-foreground-secondary">
            {blog.category}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-foreground-secondary">
            <FiClock size={12} aria-hidden="true" />
            {blog.readTime}
          </span>
        </div>
        <p className="mt-3 text-[11px] text-foreground-secondary">
          {formatDate(blog.publishedAt)}
        </p>
        <h2 className="mt-1.5 line-clamp-2 text-base font-semibold leading-6 text-foreground sm:text-lg">
          <Link to={blogPath} className="transition-colors hover:text-foreground-secondary">
            {blog.title}
          </Link>
        </h2>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-foreground-secondary">
          {blog.excerpt}
        </p>
        <Link
          to={blogPath}
          className="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-full bg-foreground px-4 text-xs font-semibold text-background transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
        >
          Read more
          <FiArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
