import { useLayoutEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import Hero from "./Hero";
import Features from "./Features";
import OurMission from "./OurMission";
import useMediaQuery from "../../Hooks/useMediaQuery";

const DEBUG = false; // set to true to show the progress badge

const SLIDES = [
  { id: "home", Component: Hero, bg: "bg-safeher-forest" },
  { id: "features", Component: Features, bg: "bg-safeher-ivory" },
  { id: "about", Component: OurMission, bg: "bg-white" },
];

const STORY_QUERY = "(min-width: 1024px)";
const SLIDE_HEIGHT = "(100svh - 4rem)"; // viewport minus the 4rem Navbar
const STORY_LENGTH = 5; // total scroll length in slide-heights; higher = longer pauses
const MIN_SCALE = 0.6;

/* Shrinks content only as far as needed to fit the slide's height.
   The content is laid out at a wider width and scaled back down, so it
   always fills the slide's full width. */
function FitSlide({ children }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useLayoutEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;

    const fit = () => {
      const width = outer.clientWidth;
      const height = outer.clientHeight;
      let scale = 1;

      while (scale > MIN_SCALE) {
        inner.style.width = `${width / scale}px`;
        if (inner.offsetHeight * scale <= height) break;
        scale = Math.round((scale - 0.02) * 100) / 100;
      }

      inner.style.width = `${width / scale}px`;
      inner.style.transform = `scale(${scale})`;
    };

    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(outer);
    document.fonts?.ready.then(fit);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={outerRef}
      className="flex h-full items-center justify-center overflow-hidden"
    >
      <div ref={innerRef} className="w-full shrink-0 origin-center">
        {children}
      </div>
    </div>
  );
}

function HorizontalStory() {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isWide = useMediaQuery(STORY_QUERY);
  const isStory = isWide && !prefersReducedMotion;
  const count = SLIDES.length;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 64px", "end end"],
  });

  /* hold slide 1 → move → hold slide 2 → move → hold slide 3 */
  const stops = Array.from({ length: count * 2 }, (_, k) => k / (count * 2 - 1));
  const positions = stops.map(
    (_, k) => `${-Math.floor(k / 2) * (100 / count)}%`
  );
  const x = useTransform(scrollYProgress, stops, positions);

  const debugLabel = useTransform(
    scrollYProgress,
    (v) => `progress ${v.toFixed(2)}`
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-safeher-ivory"
      style={isStory ? { height: `calc(${STORY_LENGTH} * ${SLIDE_HEIGHT})` } : undefined}
    >
      {/* Anchor targets: land in the middle of each slide's hold */}
      {isStory &&
        SLIDES.map(({ id }, index) => (
          <span
            key={id}
            id={id}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 size-px scroll-mt-16"
            style={{
              top: `calc(${(index * 2 + 0.5) / (count * 2 - 1)} * ${
                STORY_LENGTH - 1
              } * ${SLIDE_HEIGHT})`,
            }}
          />
        ))}

      <div
        className={
          isStory ? "sticky top-16 h-[calc(100svh-4rem)] overflow-hidden" : undefined
        }
      >
        <motion.div
          className={isStory ? "flex h-full" : undefined}
          style={isStory ? { x, width: `${count * 100}%` } : undefined}
        >
          {SLIDES.map(({ id, Component, bg }) =>
            isStory ? (
              <div
                key={id}
                className={`h-full shrink-0 overflow-hidden ${bg}`}
                style={{ width: `${100 / count}%` }}
              >
                <FitSlide>
                  <Component />
                </FitSlide>
              </div>
            ) : (
              <div key={id} id={id} className="scroll-mt-16">
                <Component />
              </div>
            )
          )}
        </motion.div>
      </div>

      {DEBUG && (
        <div className="fixed bottom-4 left-4 z-[100] rounded-md bg-black/80 px-3 py-2 font-mono text-xs text-white">
          story: {String(isStory)} · <motion.span>{debugLabel}</motion.span>
        </div>
      )}
    </section>
  );
}

export default HorizontalStory;