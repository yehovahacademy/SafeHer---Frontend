import { ArrowUpRight, HeartHandshake, MapPinned, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-safeher-forest";

const MISSION_POINTS = [
  {
    id: "awareness",
    icon: MapPinned,
    title: "Better awareness",
    description:
      "Help women explore available route options and understand journey information before travelling.",
  },
  {
    id: "honesty",
    icon: ShieldCheck,
    title: "Honest information",
    description:
      "Be transparent about what is known, what remains unverified, and what route data cannot guarantee.",
  },
  {
    id: "people-first",
    icon: HeartHandshake,
    title: "People first",
    description:
      "Build technology that supports informed decisions without placing the responsibility for safety on women.",
  },
];

/* Animation setup lives outside the component so it isn't rebuilt on every render */
const VIEWPORT = { once: true, amount: 0.2 };

const createReveal = (distance, duration) => ({
  hidden: { opacity: 0, y: distance },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration, delay, ease: "easeOut" },
  }),
});

const sectionReveal = createReveal(24, 0.6);
const cardReveal = createReveal(18, 0.45);

function MissionStory({ ctaHref, ctaLabel }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-safeher-muted">
        Why SafeHer exists
      </p>

      <h2 className="mt-4 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-safeher-forest md:text-5xl lg:text-4xl">
        Every journey deserves{" "}
        <span className="text-safeher-muted">more awareness.</span>
      </h2>

      <p className="mt-6 max-w-xl text-base leading-8 text-safeher-muted md:text-lg lg:mt-4 lg:text-base lg:leading-7">
        We believe women should have access to useful, transparent travel
        information that helps them make informed decisions. SafeHer is being
        built to bring route awareness and journey insights into one thoughtful
        experience.
      </p>

      <p className="mt-4 max-w-xl text-base leading-8 text-safeher-muted lg:leading-7">
        Our mission is not to promise a risk-free journey. It is to make travel
        information easier to understand, while being honest about the
        limitations of the technology.
      </p>

      <a
        href={ctaHref}
        className={`mt-8 inline-flex items-center gap-2 rounded-full bg-safeher-forest px-6 py-3.5 text-sm font-medium text-white transition hover:bg-safeher-forest/90 lg:mt-6 ${focusRing}`}
      >
        {ctaLabel}
        <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </div>
  );
}

function MissionPrinciple() {
  return (
    <div className="relative rounded-3xl bg-safeher-forest p-7 text-safeher-ivory md:p-10 lg:p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-safeher-lime text-safeher-forest">
        <HeartHandshake size={28} aria-hidden="true" />
      </div>

      <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-safeher-lime lg:mt-6">
        Our guiding principle
      </p>

      <blockquote className="mt-4 text-2xl font-medium leading-relaxed tracking-tight md:text-3xl lg:text-2xl lg:leading-normal">
        “Technology should empower better-informed decisions, not make
        promises it cannot keep.”
      </blockquote>

      <div className="mt-8 h-px bg-white/15 lg:mt-6" />

      <p className="mt-5 text-sm leading-7 text-white/65 lg:leading-6">
        Safety is complex. Route data alone cannot account for every real-world
        condition, so transparency must remain at the heart of SafeHer.
      </p>
    </div>
  );
}

function MissionPointCard({ point, index, initial }) {
  const Icon = point.icon;

  return (
    <motion.article
      variants={cardReveal}
      initial={initial}
      whileInView="visible"
      viewport={VIEWPORT}
      custom={index * 0.12}
      className="rounded-2xl border border-safeher-forest/10 p-6 transition-colors hover:bg-safeher-ivory/70 md:p-7 lg:p-5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safeher-forest/5 text-safeher-forest">
        <Icon size={22} aria-hidden="true" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-safeher-forest lg:mt-4">
        {point.title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-safeher-muted lg:leading-6">
        {point.description}
      </p>
    </motion.article>
  );
}

function OurMission({
  points = MISSION_POINTS,
  ctaHref = "#explore",
  ctaLabel = "Explore route options",
}) {
  const prefersReducedMotion = useReducedMotion();

  // `false` = render in the final state immediately, with no animation
  const initial = prefersReducedMotion ? false : "hidden";

  return (
    <section className="overflow-hidden bg-white px-6 py-20 md:px-12 md:py-28 lg:flex lg:h-full lg:items-center lg:py-6">
      <div className="mx-auto w-full max-w-7xl">
        <motion.div
          variants={sectionReveal}
          initial={initial}
          whileInView="visible"
          viewport={VIEWPORT}
          className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20"
        >
          <MissionStory ctaHref={ctaHref} ctaLabel={ctaLabel} />
          <MissionPrinciple />
        </motion.div>

        <div className="mt-16 grid gap-5 border-t border-safeher-forest/10 pt-10 md:mt-24 md:grid-cols-3 lg:mt-6 lg:pt-5">
          {points.map((point, index) => (
            <MissionPointCard
              key={point.id}
              point={point}
              index={index}
              initial={initial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurMission;