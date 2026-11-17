import {
  FiArrowUpRight,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiRefreshCw,
  FiTruck,
  FiYoutube,
} from "react-icons/fi";
import Container from "../layouts/Container";
import Logo from "./Logo";
import { Link } from "react-router";

const linkGroups = [
  {
    title: "Important links",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Campaigns", href: "/campaigns" },
      // { label: "Coupons", href: "/coupons" },
      { label: "Our brands", href: "/brands" },
      { label: "Blog", href: "/blogs" },
      { label: "My cart", href: "/cart" },
      { label: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "About us", href: "/about-us" },
      { label: "FAQs", href: "/faq" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms & conditions", href: "/terms-and-conditions" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#101010] text-white">
      <div className="h-px bg-gradient-to-r from-transparent via-rose-300/70 to-transparent" />
      <Container>
        <div className="grid gap-11 py-14 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1.15fr_1.1fr] lg:gap-8 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo
              size="h-12 w-auto"
              className="[&_img]:brightness-0 [&_img]:invert"
            />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/60">
              Thoughtful skincare discovery for every day. Find products for
              your routine, save the ones you love, and shop with confidence.
            </p>
            <h2 className="mt-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              Connect with us
            </h2>
            <div className="mt-3 flex items-center gap-2.5">
              {[
                { label: "Instagram", href: "https://www.instagram.com/", Icon: FiInstagram },
                { label: "Facebook", href: "https://www.facebook.com/", Icon: FiFacebook },
                { label: "YouTube", href: "https://www.youtube.com/", Icon: FiYoutube },
              ].map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-rose-200 hover:bg-rose-200 hover:text-[#101010]"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {linkGroups.map(({ title, links }) => (
            <nav key={title} aria-label={title}>
              <h2 className="text-sm font-semibold tracking-wide text-white">
                {title}
              </h2>
              <ul className="mt-5 space-y-3.5">
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="group inline-flex items-center gap-1 text-sm text-white/60 transition-colors hover:text-rose-200"
                    >
                      {label}
                      <FiArrowUpRight
                        aria-hidden="true"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        size={13}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Contact info
            </h2>
            <p className="mt-5 text-sm leading-6 text-white/60">
              Have a question? We are happy to help.
            </p>
            <a
              href="mailto:hello@classymissy.com"
              className="mt-4 inline-flex items-center gap-2.5 text-sm text-white/75 transition-colors hover:text-rose-200"
            >
              <FiMail className="shrink-0 text-rose-200" size={16} />
              hello@classymissy.com
            </a>
            <p className="mt-3 flex items-center gap-2.5 text-sm text-white/60">
              <FiMapPin className="shrink-0 text-rose-200" size={16} />
              Online, here for you
            </p>
            <p className="mt-3 pl-[26px] text-xs text-white/40">
              Customer care: Sat–Thu, 10am–6pm
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">
              Delivery & returns
            </h2>
            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-rose-200">
                  <FiTruck size={17} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/85">Delivery</p>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Convenient delivery, right to your door.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-rose-200">
                  <FiRefreshCw size={16} />
                </span>
                <div>
                  <p className="text-sm font-medium text-white/85">
                    Easy returns
                  </p>
                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Need a different fit? Get in touch with us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-5 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} Classy Missy. All rights reserved.
          </p>
          <p className="text-xs text-white/45">
            Made with care, for your everyday style.
          </p>
        </div>
      </Container>
    </footer>
  );
}
