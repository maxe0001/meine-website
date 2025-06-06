import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* ①   Marker-Bild als Asset-URL holen
   ?url → sagt Vite, dass es die Datei kopieren
          und eine gültige URL zurückgeben soll     */
import markerUrl from "../img/custom-marker.png?url";
import shadowUrl from "leaflet/dist/images/marker-shadow.png"; // Schatten (optional)

const customIcon = L.icon({
  iconUrl:      markerUrl,
  shadowUrl:    shadowUrl,
  iconSize:     [32, 48],   // Breite, Höhe
  iconAnchor:   [16, 48],   // Punkt, der exakt auf der Koordinate sitzt
  popupAnchor:  [0, -46]    // Position des Popups relativ zur Spitze
});

/* ②   Karte initialisieren */
const map = L.map("map").setView([51.96, 7.62], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap-Mitwirkende"
}).addTo(map);

/* ③   Beispielmarker mit eigenem Icon */
L.marker([51.0504, 13.7373], { icon: customIcon })
  .addTo(map)
  .bindPopup("Dresden");