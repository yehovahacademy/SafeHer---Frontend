
import { ArrowUpRight, Navigation } from "lucide-react";

const CTA = {
  label: "Explore Routes",
  href: "#explore",
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123D32]";

function Navbar({ brandName = "SafeHer", cta = CTA }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-[#F6F4EC]/85 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand icon and name */}
        <a
  href="#home"
  aria-label={`${brandName} home`}
  className={`flex items-center gap-3 rounded-lg ${focusRing}`}
>
  <img
    src="/src/assets/image.png"
    alt=""
    className="h-12 w-12 rounded-full object-cover ring-2 ring-[#C9F27A] shadow-md"
  />

  <span className="text-lg font-semibold tracking-tight text-[#123D32]">
    {brandName}
  </span>
</a>

        {/* Explore Routes CTA */}
        <a
          href={cta.href}
          className={`inline-flex items-center gap-1.5 rounded-full bg-[#123D32] px-5 py-2.5 text-sm font-semibold text-[#F6F4EC] transition-colors hover:bg-[#0C2A22] ${focusRing}`}
        >
          {cta.label}
          <ArrowUpRight
            size={16}
            className="text-[#C9F27A]"
            aria-hidden="true"
          />
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
