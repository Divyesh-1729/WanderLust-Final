const axios = require("axios");

async function forwardGeocode(address) {
  const apiKey = process.env.MAP_API_KEY;
  if (!apiKey) return null;

  const trimmed = (address || "").trim();
  if (!trimmed) return null;

  const url = "https://maps.googleapis.com/maps/api/geocode/json";
  const { data } = await axios.get(url, {
    params: { address: trimmed, key: apiKey },
    timeout: 10000,
  });

  if (!data || data.status !== "OK" || !Array.isArray(data.results) || data.results.length === 0) {
    return null;
  }

  const first = data.results[0];
  const loc = first?.geometry?.location;
  if (!loc || typeof loc.lat !== "number" || typeof loc.lng !== "number") return null;

  return {
    lat: loc.lat,
    lng: loc.lng,
    formattedAddress: first.formatted_address,
  };
}

module.exports = { forwardGeocode };

