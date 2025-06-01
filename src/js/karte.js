import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconUrl       from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl     from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconUrl, iconRetinaUrl, shadowUrl });

const map = L.map("map").setView([51.96, 7.62], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap-Mitwirkende"
}).addTo(map);

// Marker zeigt auf Dresden (51.0504° N, 13.7373° E)
L.marker([51.0504, 13.7373])
  .addTo(map)
  .bindPopup("Dresden");