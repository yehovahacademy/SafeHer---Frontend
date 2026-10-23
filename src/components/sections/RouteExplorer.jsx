
import { useState } from "react";
import { findRoutes } from "../../api/routes";

function RouteExplorer() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [transportMode, setTransportMode] = useState("driving");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      const data = await findRoutes(
        origin.trim(),
        destination.trim(),
        transportMode
      );

      setResult(data);
    } catch (err) {
      setError(
        err.message || "Unable to fetch routes. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="explore" className="px-6 py-16">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold">Explore Routes</h2>
        <p className="mt-2 text-gray-600">
          Enter your journey details to explore available routes.
        </p>

        <form onSubmit={handleFindRoutes} className="mt-6 space-y-4">
          <div>
            <label htmlFor="origin" className="mb-1 block font-medium">
              Starting point
            </label>
            <input
              id="origin"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Churchgate"
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label
              htmlFor="destination"
              className="mb-1 block font-medium"
            >
              Destination
            </label>
            <input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. CSMT"
              className="w-full rounded-xl border p-3"
              required
            />
          </div>

          <div>
            <label
              htmlFor="transportMode"
              className="mb-1 block font-medium"
            >
              Transport mode
            </label>
            <select
              id="transportMode"
              value={transportMode}
              onChange={(e) => setTransportMode(e.target.value)}
              className="w-full rounded-xl border p-3"
            >
              <option value="driving">Driving</option>
              <option value="walking">Walking</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-black px-5 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Finding routes..." : "Find Routes"}
          </button>
        </form>

        {error && (
          <p role="alert" className="mt-4 text-red-600">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold">
              {result.origin} → {result.destination}
            </h3>

            {result.routes?.length ? (
              result.routes.map((route) => (
                <article
                  key={route.route_id}
                  className="rounded-xl border p-5"
                >
                  <h4 className="font-semibold">
                    Route {route.route_id}
                  </h4>

                  <p className="mt-2">
                    Distance: {route.distance_km} km
                  </p>
                  <p>
                    Estimated duration: {route.duration_minutes} minutes
                  </p>
                  <p>
                    Safety status: {route.safety_status}
                  </p>
                </article>
              ))
            ) : (
              <p>No routes were returned for this journey.</p>
            )}

            {result.notice && (
              <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                {result.notice}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default RouteExplorer;
