import { motion } from "motion/react";

const VIEWPORT = { once: true, amount: 0.2 };

const reveal = {
  hidden: { opacity: 0, y: 18 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" },
  }),
};

function FeaturePanel({ panel, index, initial }) {
  const Icon = panel.icon;
  const titleId = `feature-title-${panel.id}`;

  return (
    <motion.article
      variants={reveal}
      initial={initial}
      whileInView="visible"
      viewport={VIEWPORT}
      custom={index * 0.12}
      aria-labelledby={titleId}
      className="flex h-full flex-col rounded-3xl border border-safeher-forest/10 bg-white p-6 transition-colors hover:border-safeher-forest/25"
    >
      <div className="flex size-11 items-center justify-center rounded-2xl bg-safeher-forest text-safeher-lime">
        <Icon size={22} strokeWidth={1.7} aria-hidden="true" />
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-safeher-muted">
        {panel.eyebrow}
      </p>

      <h3
        id={titleId}
        className="mt-2 text-xl font-semibold leading-snug tracking-tight text-safeher-forest xl:text-2xl"
      >
        {panel.title}
      </h3>

      <p className="mt-3 flex-1 text-sm leading-6 text-safeher-muted xl:text-base xl:leading-7">
        {panel.description}
      </p>

      <div className="mt-5 rounded-2xl bg-safeher-forest p-4 text-safeher-ivory">
        <span aria-hidden="true" className="block h-1 w-8 rounded-full bg-safeher-lime" />
        <p className="mt-3 text-base font-medium leading-snug text-white">
          {panel.visualTitle}
        </p>
        <p className="mt-1.5 text-sm leading-5 text-white/70">
          {panel.visualDescription}
        </p>
      </div>
    </motion.article>
  );
}

export default FeaturePanel;