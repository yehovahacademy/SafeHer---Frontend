import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpDown,
  Car,
  CircleDot,
  Clock,
  Footprints,
  Info,
  Loader2,
  MapPin,
  Route as RouteIcon,
  Ruler,
  Search,
} from "lucide-react";

import { findRoutes } from "../../api/routes";

const MODES = [
  { value: "driving", label: "Driving", icon: Car },
  { value: "walking", label: "Walking", icon: Footprints },
];

const inputClasses =
  "h-14 w-full rounded-2xl border border-safeher-forest/15 bg-white pl-12 pr-4 text-base text-safeher-forest placeholder:text-safeher-muted/70 transition focus:border-safeher-forest focus:outline-none focus:ring-4 focus:ring-safeher-lime/40 md:text-lg";

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay, ease: "easeOut" },
  }),
};

const formatStatus = (value) => {
  if (!value) return "Not available";
  const text = String(value).replace(/[_-]+/g, " ").trim();
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/* ---------- Form ---------- */

function TextField({ id, label, icon: Icon, ...inputProps }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-base font-medium text-safeher-forest">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={20}
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-safeher-muted"
        />
        <input id={id} className={inputClasses} {...inputProps} />
      </div>
    </div>
  );
}

function ModeSelector({ value, onChange }) {
  return (
    <fieldset>
      <legend className="mb-2 text-base font-medium text-safeher-forest">
        Transport mode
      </legend>

      <div className="grid grid-cols-2 gap-2 rounded-2xl bg-safeher-ivory p-2">
        {MODES.map(({ value: mode, label, icon: Icon }) => (
          <label key={mode} className="cursor-pointer">
            <input
              type="radio"
              name="transportMode"
              value={mode}
              checked={value === mode}
              onChange={(event) => onChange(event.target.value)}
              className="peer sr-only"
            />
            <span className="flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 text-base font-medium text-safeher-muted transition-colors hover:text-safeher-forest peer-checked:bg-safeher-forest peer-checked:text-white peer-checked:hover:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-safeher-forest">
              <Icon size={18} aria-hidden="true" />
              {label}
            </span>
          </label>
        ))}
      </div>

      {value === "walking" && (
        <p className="mt-3 flex items-start gap-2 text-sm leading-6 text-safeher-muted">
          <Info size={16} aria-hidden="true" className="mt-1 shrink-0" />
          Walking routes are not verified yet. Results currently come from
          driving route data.
        </p>
      )}
    </fieldset>
  );
}

function RouteForm({
  origin,
  destination,
  transportMode,
  loading,
  error,
  onOriginChange,
  onDestinationChange,
  onTransportModeChange,
  onSwap,
  onSubmit,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-safeher-forest/10 bg-white p-7 shadow-sm shadow-safeher-forest/5 md:p-10"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-safeher-forest md:text-2xl">Your journey</h3>
        <button
          type="button"
          onClick={onSwap}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-safeher-muted transition-colors hover:bg-safeher-forest/5 hover:text-safeher-forest focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-safeher-forest"
        >
          <ArrowUpDown size={16} aria-hidden="true" />
          Swap
        </button>
      </div>

      <div className="mt-7 space-y-5">
        <TextField
          id="origin"
          label="Starting point"
          icon={CircleDot}
          value={origin}
          onChange={(event) => onOriginChange(event.target.value)}
          placeholder="e.g. Churchgate"
          autoComplete="off"
          required
        />
        <TextField
          id="destination"
          label="Destination"
          icon={MapPin}
          value={destination}
          onChange={(event) => onDestinationChange(event.target.value)}
          placeholder="e.g. CSMT"
          autoComplete="off"
          required
        />
        <ModeSelector value={transportMode} onChange={onTransportModeChange} />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-safeher-forest px-6 text-lg font-semibold text-white transition-colors hover:bg-safeher-forest/90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-safeher-forest disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={20} aria-hidden="true" className="animate-spin" />
            Finding routes…
          </>
        ) : (
          <>
            <Search size={20} aria-hidden="true" className="text-safeher-lime" />
            Find routes
          </>
        )}
      </button>

      {error && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2.5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-base leading-6 text-rose-800"
        >
          <AlertCircle size={18} aria-hidden="true" className="mt-1 shrink-0" />
          {error}
        </p>
      )}
    </form>
  );
}

/* ---------- Results ---------- */

function EmptyState() {
  return (
    <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-3xl border border-dashed border-safeher-forest/20 px-8 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-safeher-forest text-safeher-lime">
        <RouteIcon size={30} strokeWidth={1.7} aria-hidden="true" />
      </span>
      <p className="mt-6 text-xl font-semibold text-safeher-forest md:text-2xl">
        Your route options will appear here
      </p>
      <p className="mt-3 max-w-sm text-base leading-7 text-safeher-muted">
        Enter a starting point and destination to see available routes with
        distance and estimated travel time.
      </p>
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-5">
      <p role="status" className="sr-only">
        Finding routes…
      </p>
      {[0, 1].map((item) => (
        <div
          key={item}
          aria-hidden="true"
          className="animate-pulse rounded-3xl border border-safeher-forest/10 bg-white p-8"
        >
          <div className="h-5 w-32 rounded-full bg-safeher-forest/10" />
          <div className="mt-7 grid grid-cols-2 gap-4">
            <div className="h-24 rounded-2xl bg-safeher-forest/5" />
            <div className="h-24 rounded-2xl bg-safeher-forest/5" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl bg-safeher-ivory p-5">
      <p className="flex items-center gap-2 text-sm font-medium text-safeher-muted">
        <Icon size={16} aria-hidden="true" />
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-safeher-forest md:text-4xl">
        {value}
      </p>
    </div>
  );
}

function RouteCard({ route, index, badges, initial }) {
  return (
    <motion.article
      variants={reveal}
      initial={initial}
      animate="visible"
      custom={index * 0.1}
      className="rounded-3xl border border-safeher-forest/10 bg-white p-6 transition-colors hover:border-safeher-forest/25 md:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h4 className="text-xl font-semibold text-safeher-forest">
            Route {route.route_id}
          </h4>
          {badges.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-safeher-lime/40 px-3 py-1.5 text-sm font-medium text-safeher-forest"
            >
              {badge}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-2 rounded-full bg-safeher-ivory px-3.5 py-1.5 text-sm font-medium text-safeher-muted">
          <Info size={14} aria-hidden="true" />
          Verification: {formatStatus(route.safety_status)}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <Stat icon={Ruler} label="Distance" value={`${route.distance_km} km`} />
        <Stat icon={Clock} label="Est. duration" value={`${route.duration_minutes} min`} />
      </div>
    </motion.article>
  );
}

function RouteResults({ result, loading, initial }) {
  if (loading) return <ResultsSkeleton />;
  if (!result) return <EmptyState />;

  const routes = result.routes ?? [];
  const showBadges = routes.length > 1;
  const fastest = Math.min(...routes.map((r) => Number(r.duration_minutes)));
  const shortest = Math.min(...routes.map((r) => Number(r.distance_km)));

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h3 className="flex flex-wrap items-center gap-3 text-2xl font-semibold tracking-tight text-safeher-forest md:text-3xl">
          {result.origin}
          <ArrowRight size={24} aria-hidden="true" className="text-safeher-muted" />
          {result.destination}
        </h3>
        <p className="text-base text-safeher-muted">
          {routes.length} route {routes.length === 1 ? "option" : "options"}
        </p>
      </div>

      {routes.length ? (
        routes.map((route, index) => {
          const badges = [];
          if (showBadges && Number(route.duration_minutes) === fastest) badges.push("Shortest time");
          if (showBadges && Number(route.distance_km) === shortest) badges.push("Shortest distance");

          return (
            <RouteCard
              key={route.route_id}
              route={route}
              index={index}
              badges={badges}
              initial={initial}
            />
          );
        })
      ) : (
        <p className="rounded-3xl border border-safeher-forest/10 bg-white p-8 text-base text-safeher-muted">
          No routes were returned for this journey.
        </p>
      )}

      {result.notice && (
        <p className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-5 text-base leading-7 text-amber-900">
          <Info size={18} aria-hidden="true" className="mt-1 shrink-0" />
          {result.notice}
        </p>
      )}
    </div>
  );
}

/* ---------- Section ---------- */

function RouteExplorer() {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? false : "hidden";

  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [transportMode, setTransportMode] = useState("driving");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSwap() {
    setOrigin(destination);
    setDestination(origin);
  }

  async function handleFindRoutes(event) {
    event.preventDefault();

    if (!origin.trim() || !destination.trim()) {
      setError("Enter both your starting point and destination.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const data = await findRoutes(origin.trim(), destination.trim(), transportMode);
      setResult(data);
    } catch (err) {
      setError(err.message || "Unable to fetch routes. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="explore"
      className="scroll-mt-16 bg-safeher-ivory px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-[88rem]">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-safeher-muted">
            Explore routes
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight text-safeher-forest md:text-6xl">
            Compare your route options.
          </h2>
          <p className="mt-6 text-lg leading-8 text-safeher-muted md:text-xl md:leading-9">
            Enter where you’re starting and where you’re headed to see
            available routes, with distance and estimated travel time.
          </p>
          <p className="mt-6 inline-flex items-start gap-2.5 text-base leading-7 text-safeher-muted">
            <Info size={18} aria-hidden="true" className="mt-1 shrink-0" />
            Route information supports travel decisions. It does not guarantee
            personal safety.
          </p>
        </div>

        <div className="mt-14 grid items-start gap-10 md:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <RouteForm
              origin={origin}
              destination={destination}
              transportMode={transportMode}
              loading={loading}
              error={error}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
              onTransportModeChange={setTransportMode}
              onSwap={handleSwap}
              onSubmit={handleFindRoutes}
            />
          </div>

          <div aria-live="polite" aria-busy={loading} className="min-h-[28rem]">
            <RouteResults result={result} loading={loading} initial={initial} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RouteExplorer;