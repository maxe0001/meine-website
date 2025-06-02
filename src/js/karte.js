/* -----------------------------------------------------------
   ES-Modul-Variante – benötigt ein Bundling-/Dev-Server-Setup
   ----------------------------------------------------------- */

import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* Marker-Grafiken als Imports (funktionieren nur mit Bundler) */
import iconUrl       from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl     from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

/* ---------- Karte initialisieren -------------------------- */
const map = L.map("map").setView([51.96, 7.62], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap-Mitwirkende"
}).addTo(map);

/* Beispiel-Marker – Dresden */
L.marker([51.0504, 13.7373])
  .addTo(map)
  .bindPopup("Dresden");