import { FiHeart, FiShield, FiStar } from "react-icons/fi";
import authVisual from "../../assets/home/need.jpg";

const highlights = [
  { icon: FiShield, text: "Authentic beauty essentials" },
  { icon: FiHeart, text: "A little care, chosen for you" },
  { icon: FiStar, text: "Loved by our beauty community" },
];

export default function AuthAside({ eyebrow, title, description, note }) {
  return (
    <aside className="fixed inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden bg-background-secondary lg:flex">
      <img
        src={authVisual}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background-secondary/90 via-background-secondary/85 to-rose-100/70" />
      <div
        aria-hidden="true"
        className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full bg-rose-200/35 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -left-20 h-[30rem] w-[30rem] rounded-full bg-amber-100/50 blur-3xl"
      />

      <div className="relative flex w-full flex-col justify-between px-10 py-10 xl:px-16 xl:py-12">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground-secondary">
          <span className="h-px w-8 bg-foreground-secondary/50" />
          Classy Missy
        </div>

        <div className="mx-auto w-full max-w-xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-2 text-xs font-medium text-foreground-secondary shadow-sm backdrop-blur">
            <FiStar className="text-rose-500" size={14} aria-hidden="true" />
            {eyebrow}
          </div>

          <h2 className="max-w-lg text-4xl font-semibold leading-[1.15] tracking-tight text-foreground xl:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-foreground-secondary xl:text-base">
            {description}
          </p>

          <div className="mt-10 rounded-2xl border border-white/70 bg-background/75 p-5 shadow-custom backdrop-blur-sm xl:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground-secondary">
              The Classy Missy promise
            </p>
            <ul className="mt-5 space-y-4">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-background-secondary text-foreground">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-xs leading-6 text-foreground-secondary">
            {note}
          </p>
        </div>

        <p className="text-xs text-foreground-secondary/75">
          Your everyday beauty, thoughtfully curated.
        </p>
      </div>
    </aside>
  );
}
