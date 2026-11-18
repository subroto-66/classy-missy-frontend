import { useEffect, useMemo, useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import { useSearchParams } from "react-router";
import BlogCard from "../../components/public/BlogCard";
import ProductPagination from "../../components/public/ProductPagination";
import SortDropdown from "../../components/public/SortDropdown";
import Container from "../../components/layouts/Container";
import PageBanner from "../../components/shared/PageBanner";
import blogsMock from "../../data/blogs";
import api from "../../lib/axios";

const PAGE_SIZE = 6;

function getPositiveInteger(value, fallback = 1) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? number : fallback;
}

export default function Blogs() {
  const [blogsList, setBlogsList] = useState(blogsMock);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let active = true;
    api.get("/blogs")
      .then((res) => {
        if (active && res.data?.data && res.data.data.length > 0) {
          setBlogsList(res.data.data);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  const topicOptions = useMemo(() => {
    const cats = Array.from(new Set(blogsList.map((blog) => blog.category)));
    return [
      { value: "all", label: "All topics" },
      ...cats.map((category) => ({ value: category, label: category })),
    ];
  }, [blogsList]);

  const selectedTopic = topicOptions.some(
    ({ value }) => value === searchParams.get("topic"),
  )
    ? searchParams.get("topic")
    : "all";

  const filteredBlogs = useMemo(
    () =>
      selectedTopic === "all"
        ? blogsList
        : blogsList.filter((blog) => blog.category === selectedTopic),
    [blogsList, selectedTopic],
  );

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

  const setTopic = (topic) => {
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
          eyebrow="Classy Missy journal"
          title="Skincare notes & guides"
          description="Straightforward advice, ingredient spotlights, and routine ideas to help you feel confident in your skincare choices."
          image={blogsList[0]?.image || blogsMock[0].image}
          alt=""
        />

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <p className="text-sm text-foreground-secondary">
            Showing {rangeStart}–{rangeEnd} of {filteredBlogs.length} articles
          </p>

          <SortDropdown
            label="Topic"
            value={selectedTopic}
            onChange={setTopic}
            options={topicOptions}
          />
        </div>

        {visibleBlogs.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleBlogs.map((blog) => (
              <BlogCard key={blog.slug || blog.title} blog={blog} />
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
            <p className="mt-2 text-sm text-foreground-secondary">
              Try picking another topic above to explore more articles.
            </p>
          </div>
        )}

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
              }}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
