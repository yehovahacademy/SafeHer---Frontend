import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowUpRight, Menu, Navigation, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#features" },
  { label: "Our Mission", href: "#about" },
  { label: "Transparency", href: "#transparency" },
];

const CTA = { label: "Explore Routes", href: "#explore" };

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123D32]";

function Navbar({ brandName = "SafeHer", links = NAV_LINKS, cta = CTA }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close on Escape and return focus to the menu button
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <header className="sticky top-0 z-50 border-b border-[#123D32]/10 bg-[#F6F4EC]/85 backdrop-blur-md">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
          >
            <span className="grid size-9 place-items-center rounded-xl bg-[#123D32] text-[#C9F27A]">
              <Navigation className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-[#123D32]">
              {brandName}
            </span>
          </a>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium text-[#123D32]/75 transition-colors hover:bg-[#123D32]/5 hover:text-[#123D32] ${focusRing}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-3">
              <a
                href={cta.href}
                className={`inline-flex items-center gap-1.5 rounded-full bg-[#123D32] px-5 py-2.5 text-sm font-semibold text-[#F6F4EC] transition-colors hover:bg-[#0C2A22] ${focusRing}`}
              >
                {cta.label}
                <ArrowUpRight className="size-4 text-[#C9F27A]" aria-hidden="true" />
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className={`grid size-10 place-items-center rounded-full border border-[#123D32]/15 text-[#123D32] transition-colors hover:bg-[#123D32]/5 md:hidden ${focusRing}`}
          >
            {isOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile menu panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="border-t border-[#123D32]/10 bg-[#F6F4EC] px-4 pb-6 pt-2 md:hidden"
            >
              <ul className="flex flex-col">
                {links.map((link) => (
                  <li key={link.href} className="border-b border-[#123D32]/10">
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className={`block rounded-lg py-3.5 text-base font-medium text-[#123D32] ${focusRing}`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
                <li className="pt-5">
                  <a
                    href={cta.href}
                    onClick={closeMenu}
                    className={`flex items-center justify-center gap-1.5 rounded-full bg-[#123D32] px-5 py-3 text-base font-semibold text-[#F6F4EC] ${focusRing}`}
                  >
                    {cta.label}
                    <ArrowUpRight className="size-4 text-[#C9F27A]" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </MotionConfig>
  );
}

export default Navbar;