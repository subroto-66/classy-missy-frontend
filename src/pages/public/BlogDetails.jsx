import { useEffect, useState } from "react";
import {
  FiArrowLeft,
  FiBookOpen,
  FiCheck,
  FiClock,
  FiTag,
} from "react-icons/fi";
import { Link, useParams } from "react-router";
import BlogCard from "../../components/public/BlogCard";
import Container from "../../components/layouts/Container";
import blogsMock, { getBlogDetails, getBlogSlug } from "../../data/blogs";
import api from "../../lib/axios";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${value}T00:00:00`));
  } catch {
    return value;
  }
}

function getSectionId(heading) {
  return heading
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BlogDetails() {
  const { blogSlug } = useParams();
  const [blog, setBlog] = useState(() => {
    return blogsMock.find((item) => getBlogSlug(item) === blogSlug || item.slug === blogSlug);
  });
  const [loading, setLoading] = useState(!blog);

  useEffect(() => {
    let active = true;
    api.get(`/blogs/${blogSlug}`)
      .then((res) => {
        if (!active) return;
        if (res.data?.data) {
          setBlog(res.data.data);
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [blogSlug]);

  if (loading) {
    return (
      <Container className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-foreground-secondary">Loading article...</p>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-sm text-foreground-secondary">Article not found</p>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          We could not find that blog.
        </h1>
        <Link
          to="/blogs"
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
        >
          <FiArrowLeft size={15} aria-hidden="true" />
          Back to blogs
        </Link>
      </Container>
    );
  }

  const details = blog.sections?.length
    ? { intro: blog.intro || blog.excerpt, sections: blog.sections, keyTakeaways: blog.keyTakeaways || blog.key_takeaways || [] }
    : getBlogDetails(blog);

  const relatedBlogs = blogsMock
    .filter((item) => item.category === blog.category && (item.slug || getBlogSlug(item)) !== (blog.slug || getBlogSlug(blog)))
    .slice(0, 3);

  return (
    <article className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-foreground-secondary">
            <li>
              <Link to="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                to="/blogs"
                className="transition-colors hover:text-foreground"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="max-w-56 truncate font-medium text-foreground">
              {blog.title}
            </li>
          </ol>
        </nav>

        <header className="grid overflow-hidden rounded-3xl border border-border bg-background-secondary lg:min-h-[380px] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <Link
              to="/blogs"
              className="mb-8 inline-flex w-fit items-center gap-2 text-xs font-medium text-foreground-secondary transition-colors hover:text-foreground"
            >
              <FiArrowLeft size={14} aria-hidden="true" />
              All articles
            </Link>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground-secondary">
              <FiTag size={12} aria-hidden="true" />
              {blog.category}
            </span>
            <h1 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl xl:text-[2.75rem]">
              {blog.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-foreground-secondary sm:text-base sm:leading-7">
              {blog.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-5 text-xs text-foreground-secondary">
              <time dateTime={blog.publishedAt}>
                {formatDate(blog.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5">
                <FiClock size={13} aria-hidden="true" />
                {blog.readTime}
              </span>
              <span aria-hidden="true">·</span>
              <span>Classy Missy Editorial</span>
            </div>
          </div>
        </header>

        <div className=" grid max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_270px] lg:gap-12">
          <div className="min-w-0">
            <div className="mb-7 rounded-2xl border-l-4 border-foreground bg-background-secondary/70 px-5 py-5 sm:px-7">
              <p className="text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                {details.intro}
              </p>
            </div>

            <figure className="mx-auto mb-8 aspect-video max-w-xl overflow-hidden rounded-2xl border border-border bg-background-secondary">
              <img
                src={blog.image}
                alt={blog.imageAlt}
                className=" w-full h-full object-cover"
                loading="lazy"
              />
            </figure>

            <div className="space-y-9 sm:space-y-11">
              {details.sections.map((section, index) => {
                const sectionId = getSectionId(section.heading);
                return (
                  <section
                    key={section.heading}
                    id={sectionId}
                    aria-labelledby={`${sectionId}-title`}
                    className="scroll-mt-28"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h2
                        id={`${sectionId}-title`}
                        className="pt-0.5 text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <div className="space-y-4 pl-11">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p
                          key={`${sectionId}-${paragraphIndex}`}
                          className="text-sm leading-7 text-foreground-secondary sm:text-base sm:leading-8"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets?.length > 0 && (
                        <ul className="space-y-3 rounded-2xl border border-border bg-background p-4 sm:p-5">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="flex items-start gap-2.5 text-sm leading-6 text-foreground-secondary"
                            >
                              <FiCheck
                                size={16}
                                className="mt-1 shrink-0 text-foreground"
                                aria-hidden="true"
                              />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                );
              })}
            </div>

            <div className="mt-9 rounded-2xl border border-border p-5 sm:mt-12 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground-secondary">
                In a nutshell
              </p>
              <h2 className="mt-1 text-lg font-semibold text-foreground">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {details.keyTakeaways.map((takeaway) => (
                  <li
                    key={takeaway}
                    className="flex items-start gap-2.5 text-sm leading-6 text-foreground-secondary"
                  >
                    <FiCheck
                      size={16}
                      className="mt-1 shrink-0 text-foreground"
                      aria-hidden="true"
                    />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-7 border-t border-border pt-5 text-xs leading-5 text-foreground-secondary">
              This article is for general informational purposes and is not a
              substitute for professional medical advice. For personal concerns,
              consult a qualified healthcare professional.
            </p>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <nav
              aria-label="In this article"
              className="rounded-2xl border border-border bg-background p-5"
            >
              <div className="flex items-center gap-2">
                <FiBookOpen size={16} aria-hidden="true" />
                <h2 className="text-sm font-semibold text-foreground">
                  In this article
                </h2>
              </div>
              <ol className="mt-4 space-y-1">
                {details.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a
                      href={`#${getSectionId(section.heading)}`}
                      className="flex gap-2 rounded-lg px-2.5 py-2 text-xs leading-5 text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground"
                    >
                      <span className="shrink-0 tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{section.heading}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="rounded-2xl bg-foreground p-5 text-background">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-background/65">
                A gentle reminder
              </p>
              <p className="mt-2 text-sm leading-6">
                Every routine is personal. Follow product directions and choose
                what feels right for your skin.
              </p>
            </div>
          </aside>
        </div>

        {relatedBlogs.length > 0 && (
          <section aria-labelledby="related-blogs-title" className="space-y-5">
            <div className="border-t border-border pt-7 sm:pt-9">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground-secondary">
                Keep exploring
              </p>
              <h2
                id="related-blogs-title"
                className="mt-1 text-xl font-semibold text-foreground sm:text-2xl"
              >
                More from {blog.category}
              </h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBlogs.map((item) => (
                <BlogCard key={item.title} blog={item} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </article>
  );
}
