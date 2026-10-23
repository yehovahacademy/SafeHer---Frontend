
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function findRoutes(
  origin,
  destination,
  transportMode = "driving"
  
) {
  if (!API_BASE_URL) {
    throw new Error("Backend URL is not configured.");
  }

  const params = new URLSearchParams({
    origin,
    destination,
    transport_mode: transportMode,
  });

  const baseUrl = API_BASE_URL.replace(/\/$/, "");

  const response = await fetch(
    `${baseUrl}/route?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}).`);
  }

  return response.json();
}


