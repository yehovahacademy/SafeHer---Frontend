
import { useState } from "react";
import {
  ArrowRight,
  Clock3,
  MapPin,
  Navigation,
  Route as RouteIcon,
  ShieldCheck,
} from "lucide-react";

const API_URL = "https://safeher-backend-5467.onrender.com/";

const landmarks = [
  "Churchgate",
  "CSMT",
  "Dadar",
  "Bandra Station",
  "Andheri Station",
  "Powai",
  "BKC",
  "Gateway of India",
];

function RouteExplorer() {
  const [origin, setOrigin] = useState("Churchgate");
  const [destination, setDestination] = useState("Bandra Station");
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function findRoutes(event) {
    event.preventDefault();

    if (origin === destination) {
      setError("Please choose two different locations.");
      setRouteData(null);
      return;
    }

    setLoading(true);
    setError("");
    setRouteData(null);

    try {
      const params = new URLSearchParams({
        origin,
        destination,
      });

      const response = await fetch(
        `${API_URL}/route?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          `Unable to fetch routes (HTTP ${response.status}).`
        );
      }

      const data = await response.json();
      setRouteData(data);
    } catch (err) {
      setError(
        err.message ||
          "Could not connect to SafeHer's backend. Check that FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="explore"
      className="bg-safeher-ivory px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-safeher-muted">
            Your journey starts here
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-safeher-forest md:text-5xl">
            Explore your route options.
          </h2>

          <p className="mt-4 text-base leading-7 text-safeher-muted">
            Choose your starting point and destination to view
            available driving routes and estimated travel times.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-safeher-forest/10 bg-white p-6 shadow-sm md:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-safeher-forest/5 text-safeher-forest">
                <Navigation size={21} />
              </div>

              <div>
                <h3 className="font-semibold text-safeher-forest">
                  Plan your journey
                </h3>
                <p className="mt-1 text-sm text-safeher-muted">
                  Mumbai locations
                </p>
              </div>
            </div>

            <form onSubmit={findRoutes} className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="origin"
                  className="mb-2 block text-sm font-medium text-safeher-forest"
                >
                  Starting point
                </label>

                <select
                  id="origin"
                  value={origin}
                  onChange={(event) => setOrigin(event.target.value)}
                  className="w-full rounded-xl border border-safeher-forest/15 bg-white px-4 py-3 text-sm text-safeher-forest outline-none focus:border-safeher-forest focus:ring-2 focus:ring-safeher-forest/10"
                >
                  {landmarks.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="destination"
                  className="mb-2 block text-sm font-medium text-safeher-forest"
                >
                  Destination
                </label>

                <select
                  id="destination"
                  value={destination}
                  onChange={(event) =>
                    setDestination(event.target.value)
                  }
                  className="w-full rounded-xl border border-safeher-forest/15 bg-white px-4 py-3 text-sm text-safeher-forest outline-none focus:border-safeher-forest focus:ring-2 focus:ring-safeher-forest/10"
                >
                  {landmarks.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-safeher-forest px-5 py-3.5 font-medium text-white transition hover:bg-safeher-forest/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Finding routes..." : "Find available routes"}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>

            <div className="mt-6 flex gap-3 rounded-xl bg-safeher-ivory p-4">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-safeher-forest"
              />
              <p className="text-xs leading-5 text-safeher-muted">
                Route availability does not establish personal safety.
                SafeHer has not yet verified these routes for safety.
              </p>
            </div>
          </div>

          <div className="min-h-80 rounded-3xl border border-safeher-forest/10 bg-white p-6 md:p-8">
            {!routeData && !loading && !error && (
              <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-safeher-forest/5 text-safeher-forest">
                  <RouteIcon size={30} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-safeher-forest">
                  Your route options will appear here
                </h3>

                <p className="mt-2 max-w-sm text-sm leading-6 text-safeher-muted">
                  Select two locations and search to retrieve available
                  routes from the SafeHer backend.
                </p>
              </div>
            )}

            {loading && (
              <div
                className="flex min-h-64 flex-col items-center justify-center text-safeher-muted"
                role="status"
              >
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-safeher-forest/20 border-t-safeher-forest" />
                <p className="mt-4 text-sm">Retrieving route information...</p>
              </div>
            )}

            {routeData && !loading && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-safeher-muted">
                  Route results
                </p>

                <h3 className="mt-3 text-xl font-semibold text-safeher-forest">
                  {routeData.origin}{" "}
                  <ArrowRight
                    size={18}
                    className="mx-1 inline"
                  />{" "}
                  {routeData.destination}
                </h3>

                <p className="mt-2 text-sm text-safeher-muted">
                  Transport mode: {routeData.transport_mode}
                </p>

                <div className="mt-6 space-y-4">
                  {routeData.routes?.length > 0 ? (
                    routeData.routes.map((route, index) => (
                      <article
                        key={route.route_id ?? index}
                        className="rounded-2xl border border-safeher-forest/10 p-5"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-semibold text-safeher-forest">
                            Route {index + 1}
                          </h4>

                          <span className="rounded-full bg-safeher-ivory px-3 py-1 text-xs text-safeher-muted">
                            {route.safety_status || "Not assessed"}
                          </span>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-4">
                          <div className="flex items-start gap-2">
                            <MapPin
                              size={18}
                              className="mt-0.5 text-safeher-muted"
                            />
                            <div>
                              <p className="text-xs text-safeher-muted">
                                Distance
                              </p>
                              <p className="mt-1 font-semibold text-safeher-forest">
                                {Number(route.distance_km).toFixed(1)} km
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-2">
                            <Clock3
                              size={18}
                              className="mt-0.5 text-safeher-muted"
                            />
                            <div>
                              <p className="text-xs text-safeher-muted">
                                Estimated time
                              </p>
                              <p className="mt-1 font-semibold text-safeher-forest">
                                {Math.round(route.duration_minutes)} min
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="rounded-xl bg-safeher-ivory p-4 text-sm text-safeher-muted">
                      No route alternatives were returned for this journey.
                    </p>
                  )}
                </div>

                <p className="mt-5 text-xs leading-5 text-safeher-muted">
                  {routeData.notice ||
                    "These are driving-route estimates. Safety has not been independently assessed."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RouteExplorer;
