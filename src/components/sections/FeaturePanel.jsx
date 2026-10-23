import { ArrowUpRight } from "lucide-react";

function FeatureContent({ panel, index, titleId, ctaHref, ctaLabel }) {
  const Icon = panel.icon;
  const number = String(index + 1).padStart(2, "0");

  return (
    <div className="max-w-xl">
      <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-safeher-muted">
        {number} / SafeHer
      </p>

      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-safeher-forest text-safeher-lime">
        <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
      </div>

      <p className="mb-3 text-sm font-medium text-safeher-muted">
        {panel.eyebrow}
      </p>

      <h2
        id={titleId}
        className="text-4xl font-semibold leading-tight tracking-tight text-safeher-forest md:text-5xl lg:text-6xl"
      >
        {panel.title}
      </h2>

      <p className="mt-6 max-w-lg text-base leading-8 text-safeher-muted md:text-lg">
        {panel.description}
      </p>

      <a
        href={ctaHref}
        className="mt-8 inline-flex items-center gap-2 font-semibold text-safeher-forest transition-colors hover:text-safeher-muted"
      >
        {ctaLabel}
        <ArrowUpRight size={18} aria-hidden="true" />
      </a>
    </div>
  );
}

function FeatureVisual({ panel }) {
  const Icon = panel.icon;

  return (
    <div className="relative flex min-h-64 items-center justify-center rounded-3xl bg-safeher-forest p-8 md:min-h-[420px]">
      <div
        aria-hidden="true"
        className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-safeher-lime/10 blur-2xl"
      />

      <div className="relative max-w-sm text-center">
        <Icon
          size={64}
          strokeWidth={1.2}
          aria-hidden="true"
          className="mx-auto mb-6 text-safeher-lime"
        />

        <p className="text-xl font-medium text-white md:text-2xl">
          {panel.visualTitle}
        </p>

        <p className="mt-3 text-sm leading-6 text-white/70">
          {panel.visualDescription}
        </p>
      </div>
    </div>
  );
}

function FeaturePanel({
  panel,
  index,
  ctaHref = "#explore",
  ctaLabel = "Explore routes",
}) {
  const titleId = `feature-title-${index}`;

  return (
    <article
      aria-labelledby={titleId}
      className="relative flex h-full w-screen shrink-0 items-center overflow-hidden bg-safeher-ivory px-6 py-16 md:px-16 lg:px-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <FeatureContent
          panel={panel}
          index={index}
          titleId={titleId}
          ctaHref={ctaHref}
          ctaLabel={ctaLabel}
        />
        <FeatureVisual panel={panel} />
      </div>
    </article>
  );
}

export default FeaturePanel;