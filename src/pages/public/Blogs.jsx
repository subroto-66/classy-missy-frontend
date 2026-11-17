import { useMemo } from "react";
import { FiBookOpen } from "react-icons/fi";
import { useSearchParams } from "react-router";
import BlogCard from "../../components/public/BlogCard";
import ProductPagination from "../../components/public/ProductPagination";
import SortDropdown from "../../components/public/SortDropdown";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import blogs from "../../data/blogs";

const PAGE_SIZE = 6;

const topicOptions = [
  { value: "all", label: "All topics" },
  ...Array.from(new Set(blogs.map((blog) => blog.category))).map((category) => ({
    value: category,
    label: category,
  })),
];

function getPositiveInteger(value, fallback = 1) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export default function Blogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTopic = topicOptions.some(
    ({ value }) => value === searchParams.get("topic"),
  )
    ? searchParams.get("topic")
    : "all";

  const filteredBlogs = useMemo(
    () =>
      selectedTopic === "all"
        ? blogs
        : blogs.filter((blog) => blog.category === selectedTopic),
    [selectedTopic],
  );

  const pageCount = Math.ceil(filteredBlogs.length / PAGE_SIZE);
  const currentPage = Math.min(
    getPositiveInteger(searchParams.get("page")),
    Math.max(pageCount, 1),
  );
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const visibleBlogs = filteredBlogs.slice(startIndex, startIndex + PAGE_SIZE);
  const rangeStart = filteredBlogs.length ? startIndex + 1 : 0;
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filteredBlogs.length);

  const updateTopic = (topic) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (topic === "all") next.delete("topic");
      else next.set("topic", topic);
      next.delete("page");
      return next;
    });
  };

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="The Classy Missy journal"
          title="A little more skincare know-how"
          description="Straightforward guides, ingredient notes, and gentle reminders for building a routine that feels right for you."
          image="https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=1400&q=85"
          alt="Skincare products arranged on a bright vanity"
        />

        <div>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl bg-background-secondary text-foreground">
                <FiBookOpen size={18} aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Latest articles
                </h2>
                <p className="mt-1 text-sm text-foreground-secondary">
                  Showing {rangeStart}–{rangeEnd} of {filteredBlogs.length}{" "}
                  {filteredBlogs.length === 1 ? "blog" : "blogs"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-foreground-secondary">Filter</span>
              <SortDropdown
                value={selectedTopic}
                onChange={updateTopic}
                options={topicOptions}
                ariaLabel="Filter blogs by topic"
                optionsId="blog-topic-options"
              />
            </div>
          </div>

          {visibleBlogs.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {visibleBlogs.map((blog) => (
                <BlogCard key={blog.title} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-border py-12 text-center text-sm text-foreground-secondary">
              No articles found for this topic.
            </p>
          )}

          <ProductPagination
            currentPage={currentPage}
            totalPages={pageCount}
            ariaLabel="Blog pages"
          />
        </div>
      </Container>
    </section>
  );
}
