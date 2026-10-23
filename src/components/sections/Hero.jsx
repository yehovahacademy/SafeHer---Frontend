import { ArrowDownRight, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-safeher-lime";

/* Animation variants live outside the component so they aren't rebuilt on every render */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.15 },
  },
};

/* Route illustration data */
const STREET_GRID_PATH =
  "M20 45 L85 45 L85 85 L135 85 L135 30 L215 30 L215 100 L290 100 M25 160 L85 160 L85 125 L170 125 L170 190 L250 190 L250 150 L295 150";
const ROUTE_PATH =
  "M45 190 C65 190 65 140 100 140 S145 70 180 90 S220 160 275 55";
const ROUTE_ENDPOINTS = [
  { cx: 45, cy: 190 },
  { cx: 275, cy: 55 },
];

function HeroCopy({
  eyebrow,
  title,
  highlight,
  description,
  primaryCta,
  secondaryCta,
  initial,
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial={initial}
      animate="visible"
      className="max-w-2xl"
    >
      <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2">
        <ShieldCheck size={16} className="text-safeher-lime" aria-hidden="true" />
        <span className="text-xs font-medium tracking-[0.16em] text-white/80">
          {eyebrow}
        </span>
      </div>

      <h1 className="text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-safeher-lime">{highlight}</span>
          </>
        )}
      </h1>

      <p className="mt-7 max-w-xl text-base leading-8 text-white/70 md:text-lg">
        {description}
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-4">
        <a
          href={primaryCta.href}
          className={`group inline-flex items-center gap-3 rounded-full bg-safeher-lime px-6 py-3.5 font-semibold text-safeher-forest transition-transform hover:-translate-y-0.5 ${focusRing}`}
        >
          {primaryCta.label}
          <ArrowRight
            size={18}
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        <a
          href={secondaryCta.href}
          className={`inline-flex items-center gap-2 rounded-full px-4 py-3.5 text-white/80 transition-colors hover:text-safeher-lime ${focusRing}`}
        >
          {secondaryCta.label}
          <ArrowDownRight size={18} aria-hidden="true" />
        </a>
      </div>

      <p className="mt-8 max-w-md text-xs leading-6 text-white/50">
        Route information can support travel decisions, but it does not
        guarantee personal safety.
      </p>
    </motion.div>
  );
}

function RouteIllustration() {
  return (
    <div className="relative mt-7 flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-[#1a493d] p-5">
      <svg
        viewBox="0 0 320 240"
        role="img"
        aria-label="Illustration of a route connecting two points"
        className="w-full max-w-sm text-safeher-lime"
        fill="none"
      >
        <path
          d={STREET_GRID_PATH}
          stroke="white"
          strokeOpacity=".12"
          strokeWidth="2"
        />
        <path
          d={ROUTE_PATH}
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="7 9"
        />
        {ROUTE_ENDPOINTS.map(({ cx, cy }) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r="9" fill="currentColor" />
            <circle
              cx={cx}
              cy={cy}
              r="15"
              stroke="currentColor"
              strokeOpacity=".25"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>

      <span className="absolute bottom-4 left-4 rounded-full bg-black/20 px-3 py-1.5 text-xs text-white/70">
        Illustrative route · not live navigation
      </span>
    </div>
  );
}

function HeroVisual({ initial }) {
  return (
    <motion.div
      variants={fadeScale}
      initial={initial}
      animate="visible"
      className="relative mx-auto w-full max-w-lg"
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-sm sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/50">Your journey</p>
            <p className="mt-1 text-xl font-medium">Plan with awareness</p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-safeher-lime text-safeher-forest">
            <ShieldCheck size={22} aria-hidden="true" />
          </div>
        </div>

        <RouteIllustration />

        <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 p-4">
          <ShieldCheck
            size={20}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-safeher-lime"
          />
          <div>
            <p className="text-sm font-medium">Information, not guarantees</p>
            <p className="mt-1 text-xs leading-5 text-white/50">
              Compare route details while staying aware of your surroundings.
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-full bg-safeher-lime/20 blur-3xl"
      />
    </motion.div>
  );
}

function Hero({
  eyebrow = "A MORE INFORMED WAY TO TRAVEL",
  title = "Move through the city",
  highlight = "with more confidence.",
  description = "Explore route options, compare journey details, and make informed travel decisions. Because knowing your options is a better place to start.",
  primaryCta = { label: "Explore routes", href: "#explore" },
  secondaryCta = { label: "Discover SafeHer", href: "#features" },
}) {
  const shouldReduceMotion = useReducedMotion();

  // `false` = render in the final state immediately, with no animation
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-safeher-forest text-safeher-ivory"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-safeher-lime/10 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[85vh] max-w-7xl items-center gap-14 px-6 py-20 md:grid-cols-2 md:px-12 lg:px-16 lg:py-24">
        <HeroCopy
          eyebrow={eyebrow}
          title={title}
          highlight={highlight}
          description={description}
          primaryCta={primaryCta}
          secondaryCta={secondaryCta}
          initial={initial}
        />
        <HeroVisual initial={initial} />
      </div>
    </section>
  );
}

export default Hero;