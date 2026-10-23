import { useReducedMotion } from "motion/react";

import FeaturePanel from "./FeaturePanel";
import { featurePanels } from "../Data/featurePanels";

function Features() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? false : "hidden";

  return (
    <section className="bg-safeher-ivory px-6 py-16 md:px-12 md:py-20 lg:flex lg:h-full lg:items-center lg:py-6">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-safeher-muted">
              Designed for informed journeys
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-safeher-forest md:text-4xl xl:text-5xl">
              A new perspective on travel.
            </h2>
          </div>

          <p className="max-w-xs text-base leading-7 text-safeher-muted">
            Three ways to travel informed.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:mt-8 lg:grid-cols-3 lg:gap-6">
          {featurePanels.map((panel, index) => (
            <FeaturePanel
              key={panel.id}
              panel={panel}
              index={index}
              initial={initial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;