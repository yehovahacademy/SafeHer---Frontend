import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import FeaturePanel from "./FeaturePanel";
import { featurePanels } from "../../data/featurePanels";

const pad = (number) => String(number).padStart(2, "0");

function SectionHeading() {
  return (
    <div className="shrink-0 px-6 pb-5 pt-8 md:px-12 md:pt-10">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-safeher-muted md:text-sm">
        Designed for informed journeys
      </p>

      <div className="mt-2 flex items-end justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight text-safeher-forest md:text-4xl">
          A new perspective on travel.
        </h2>

        <span className="hidden text-sm text-safeher-muted sm:block">
          Scroll to explore →
        </span>
      </div>
    </div>
  );
}

function ScrollProgress({ progress, total }) {
  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center gap-3 px-6 py-4 md:px-12"
    >
      <div className="h-1 flex-1 overflow-hidden rounded-full bg-safeher-forest/10">
        <motion.div
          className="h-full origin-left rounded-full bg-safeher-forest"
          style={{ scaleX: progress }}
        />
      </div>

      <span className="text-xs font-medium text-safeher-muted">
        01 / {pad(total)}
      </span>
    </div>
  );
}

function Features() {
  const sectionRef = useRef(null);
  const panelCount = featurePanels.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((panelCount - 1) / panelCount) * 100}%`]
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative bg-safeher-ivory"
      style={{ height: `${panelCount * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <SectionHeading />

        <div className="min-h-0 flex-1 overflow-hidden">
          <motion.div className="flex h-full w-max" style={{ x }}>
            {featurePanels.map((panel, index) => (
              <FeaturePanel key={panel.id} panel={panel} index={index} />
            ))}
          </motion.div>
        </div>

        <ScrollProgress progress={scrollYProgress} total={panelCount} />
      </div>
    </section>
  );
}

export default Features;