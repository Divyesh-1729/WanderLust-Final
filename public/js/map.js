function initMap() {
  const fallbackCenter = { lat: 18.5204, lng: 73.8567 };
  const mapEl = document.getElementById("map");
  if (!mapEl) return;

  const lat = Number(mapEl.dataset.lat);
  const lng = Number(mapEl.dataset.lng);
  const title = mapEl.dataset.title || "Listing";
  const locationText = mapEl.dataset.locationText || "";

  const hasCoords = Number.isFinite(lat) && Number.isFinite(lng);
  const center = hasCoords ? { lat, lng } : fallbackCenter;

  const map = new google.maps.Map(mapEl, {
    center,
    zoom: hasCoords ? 12 : 5,
    mapTypeId: "roadmap",
  });

  if (hasCoords) {
    const marker = new google.maps.Marker({
      position: center,
      map,
      title,
    });

    const info = new google.maps.InfoWindow({
      content: `<div><strong>${title}</strong><br/>${locationText}</div>`,
    });
    marker.addListener("click", () => info.open({ anchor: marker, map }));
  }
}
