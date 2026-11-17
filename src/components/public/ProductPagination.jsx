import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSearchParams } from "react-router";
import Button from "../ui/Button";

export default function ProductPagination({
  currentPage,
  totalPages,
  ariaLabel = "Product pages",
}) {
  const [, setSearchParams] = useSearchParams();
  if (totalPages < 2) return null;

  const goToPage = (page) => {
    setSearchParams((current) => {
      const next = new URLSearchParams(current);
      if (page === 1) next.delete("page");
      else next.set("page", String(page));
      return next;
    });
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav
      aria-label={ariaLabel}
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="ghost"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className=" rounded-lg border border-border text-foreground hover:bg-background-custom"
      >
        <FiChevronLeft size={18} />
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "primary" : "ghost"}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          onClick={() => goToPage(page)}
          className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-medium transition ${
            page === currentPage
              ? "border-primary"
              : "border-border text-foreground hover:bg-background-custom"
          }`}
        >
          {page}
        </Button>
      ))}
      <Button
        type="button"
        variant="ghost"
        aria-label="Next page"
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="rounded-lg border border-border  text-foreground hover:bg-background-custom"
      >
        <FiChevronRight size={18} />
      </Button>
    </nav>
  );
}
