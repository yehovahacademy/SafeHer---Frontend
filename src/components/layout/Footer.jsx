import { ArrowUpRight, Heart, ShieldCheck } from "lucide-react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-safeher-lime";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#features" },
  { label: "Our Mission", href: "#about" },
  { label: "Explore Routes", href: "#explore" },
];

function FooterHeading({ children }) {
  return (
    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-safeher-lime">
      {children}
    </h2>
  );
}

function FooterBrand({ brandName }) {
  return (
    <div className="max-w-md">
      <a
        href="#home"
        aria-label={`${brandName} home`}
        className={`inline-flex items-center gap-3 rounded-lg ${focusRing}`}
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-safeher-lime text-safeher-forest">
          <ShieldCheck size={24} aria-hidden="true" />
        </span>

        <span className="text-2xl font-semibold tracking-tight">
          {brandName}
          <span className="text-safeher-lime">.</span>
        </span>
      </a>

      <p className="mt-6 text-sm leading-7 text-white/65">
        Helping women make more informed travel decisions through route
        information, awareness, and transparency.
      </p>

      <div className="mt-6 inline-flex items-center gap-2 text-sm text-white/60">
        <Heart size={15} className="text-safeher-lime" aria-hidden="true" />
        <span>Designed with awareness in mind.</span>
      </div>
    </div>
  );
}

function FooterNav({ links }) {
  return (
    <div>
      <FooterHeading>Explore</FooterHeading>

      <nav aria-label="Footer navigation" className="mt-5">
        <ul className="space-y-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-safeher-lime ${focusRing}`}
              >
                {link.label}
                <ArrowUpRight
                  size={14}
                  aria-hidden="true"
                  className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

function FooterCommitment() {
  return (
    <div>
      <FooterHeading>Our commitment</FooterHeading>

      <p className="mt-5 text-sm leading-7 text-white/65">
        Clear information matters. Route options and estimated travel times
        are not guarantees of personal safety.
      </p>

      <a
        href="#transparency"
        className={`mt-5 inline-flex items-center gap-2 text-sm font-medium text-safeher-lime transition-colors hover:text-white ${focusRing}`}
      >
        Our transparency promise
        <ArrowUpRight size={16} aria-hidden="true" />
      </a>
    </div>
  );
}

function FooterBottomBar({ brandName }) {
  return (
    <div className="flex flex-col gap-4 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </p>
      <p>Built to support informed journeys, not guarantee safety.</p>
    </div>
  );
}

function Footer({ brandName = "SafeHer", links = FOOTER_LINKS }) {
  return (
    <footer className="bg-safeher-forest text-safeher-ivory">
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:px-12 md:pt-20 lg:px-16">
        <div className="grid gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:gap-16">
          <FooterBrand brandName={brandName} />
          <FooterNav links={links} />
          <FooterCommitment />
        </div>

        <FooterBottomBar brandName={brandName} />
      </div>
    </footer>
  );
}

export default Footer;