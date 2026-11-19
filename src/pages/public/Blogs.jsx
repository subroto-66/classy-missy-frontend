import { useEffect, useMemo, useState } from "react";
import { FiBookOpen, FiSearch, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router";
import BlogCard from "../../components/public/BlogCard";
import ProductPagination from "../../components/public/ProductPagination";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import Button from "../../components/ui/Button";
import blogsMock from "../../data/blogs";
import api from "../../lib/axios";

const PAGE_SIZE = 6;

function getPositiveInteger(value, fallback = 1) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export default function Blogs() {
  const [blogsList, setBlogsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesMap, setCategoriesMap] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const selectedTopic = searchParams.get("topic") || "all";

  // Fetch blogs dynamically from API
  useEffect(() => {
    let active = true;
    setLoading(true);

    api.get("/blogs")
      .then((res) => {
        if (!active) return;
        if (Array.isArray(res.data?.data) && res.data.data.length > 0) {
          setBlogsList(res.data.data);
          if (res.data?.meta?.categories) {
            setCategoriesMap(res.data.meta.categories);
          }
        } else {
          // Fallback to blogsMock if database is empty
          setBlogsList(blogsMock);
        }
      })
      .catch((err) => {
        console.error("Error loading blogs:", err);
        if (active) setBlogsList(blogsMock);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Compute available topics from blogs
  const topicOptions = useMemo(() => {
    const cats = Array.from(
      new Set(blogsList.map((blog) => blog.category).filter(Boolean)),
    );
    return ["all", ...cats];
  }, [blogsList]);

  // Filter blogs based on search query and category
  const filteredBlogs = useMemo(() => {
    return blogsList.filter((blog) => {
      const matchesTopic =
        selectedTopic === "all" || blog.category === selectedTopic;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title?.toLowerCase().includes(q) ||
        blog.excerpt?.toLowerCase().includes(q) ||
        blog.category?.toLowerCase().includes(q);

      return matchesTopic && matchesSearch;
    });
  }, [blogsList, selectedTopic, searchQuery]);

  const pageCount = Math.ceil(filteredBlogs.length / PAGE_SIZE);
  const currentPage = Math.min(
    getPositiveInteger(searchParams.get("page")),
    Math.max(pageCount, 1),
  );
  const firstBlog = (currentPage - 1) * PAGE_SIZE;
  const visibleBlogs = filteredBlogs.slice(
    firstBlog,
    firstBlog + PAGE_SIZE,
  );
  const rangeStart = filteredBlogs.length ? firstBlog + 1 : 0;
  const rangeEnd = Math.min(firstBlog + PAGE_SIZE, filteredBlogs.length);

  const handleTopicChange = (topic) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (topic === "all") next.delete("topic");
      else next.set("topic", topic);
      next.delete("page");
      return next;
    });
  };

  const handleSearchChange = (val) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (!val) next.delete("search");
      else next.set("search", val);
      next.delete("page");
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <section className="py-5 sm:py-8 lg:py-10">
      <Container className="space-y-7 sm:space-y-9">
        <PageBanner
          eyebrow="Classy Missy journal"
          title="Skincare notes & guides"
          description="Straightforward advice, ingredient spotlights, and routine ideas to help you feel confident in your skincare choices."
          image={blogsList[0]?.image || blogsMock[0].image}
          alt="Classy Missy beauty journal banner"
        />

        {/* Filter & Search Bar */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {topicOptions.map((topic) => {
              const isActive = selectedTopic === topic;
              const count =
                topic === "all"
                  ? blogsList.length
                  : categoriesMap[topic] ??
                    blogsList.filter((b) => b.category === topic).length;

              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => handleTopicChange(topic)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "border border-border bg-background text-foreground hover:border-primary/60 hover:text-primary hover:bg-background-secondary"
                  }`}
                >
                  <span className="capitalize">{topic === "all" ? "All topics" : topic}</span>
                  {count > 0 && (
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-primary-foreground/85" : "text-foreground-secondary"
                      }`}
                    >
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64 shrink-0">
            <FiSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-secondary"
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="h-9 w-full rounded-full border border-border bg-background-secondary pl-9 pr-8 text-xs text-foreground placeholder:text-foreground-secondary/70 focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground-secondary hover:text-foreground"
              >
                <FiX size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between text-xs text-foreground-secondary">
          <p>
            Showing {rangeStart}–{rangeEnd} of {filteredBlogs.length} articles
            {searchQuery && (
              <span className="ml-1 text-foreground">
                matching "<strong>{searchQuery}</strong>"
              </span>
            )}
          </p>

          {(selectedTopic !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={clearFilters}
              className="underline hover:text-foreground"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Blog Cards Grid / Skeletons / Empty State */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-border bg-background p-4 space-y-4"
              >
                <div className="aspect-[16/10] w-full rounded-xl bg-background-secondary" />
                <div className="h-4 w-24 rounded bg-background-secondary" />
                <div className="h-5 w-4/5 rounded bg-background-secondary" />
                <div className="space-y-2">
                  <div className="h-3 w-full rounded bg-background-secondary" />
                  <div className="h-3 w-3/4 rounded bg-background-secondary" />
                </div>
              </div>
            ))}
          </div>
        ) : visibleBlogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlogs.map((blog) => (
              <BlogCard key={blog.id || blog.slug || blog.title} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-background-secondary px-5 py-14 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-background text-foreground-secondary">
              <FiBookOpen size={24} aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-foreground">
              No articles found
            </h2>
            <p className="mt-2 text-sm text-foreground-secondary max-w-sm mx-auto">
              We couldn't find any articles matching your search or selected topic. Try clearing filters to see all articles.
            </p>
            <div className="mt-5">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="rounded-full"
              >
                View all articles
              </Button>
            </div>
          </div>
        )}

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="flex justify-center pt-4">
            <ProductPagination
              currentPage={currentPage}
              pageCount={pageCount}
              onPageChange={(nextPage) => {
                setSearchParams((current) => {
                  const next = new URLSearchParams(current);
                  next.set("page", String(nextPage));
                  return next;
                });
                window.scrollTo({ top: 300, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
