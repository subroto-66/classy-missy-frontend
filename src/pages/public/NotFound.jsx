import { FiArrowLeft, FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import Logo from "../../components/shared/Logo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-5 py-16 text-foreground">
      <div className="absolute left-5 top-6 sm:left-10 sm:top-8">
        <Logo size="h-9 w-auto sm:h-10" />
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(80vw,560px)] w-[min(80vw,560px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(62vw,420px)] w-[min(62vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border"
      />

      <section className="relative z-10 mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-foreground-secondary">
          Error 404
        </p>
        <h1 className="mt-4 text-6xl font-semibold tracking-[-0.06em] text-foreground sm:text-8xl">
          404
        </h1>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          This page couldn’t be found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-foreground-secondary">
          The page may have moved, or the link might be incorrect. Let’s get you
          back to discovering your next skincare favourite.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Button
            type="button"
            onClick={() => navigate("/")}
            className="rounded-lg"
          >
            <FiArrowLeft size={16} />
            Back to home
          </Button>
          <Link
            to="/products"
            className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-background-secondary"
          >
            <FiSearch size={16} />
            Browse products
          </Link>
        </div>
      </section>
    </main>
  );
}
