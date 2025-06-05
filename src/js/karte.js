/* -----------------------------------------------------------
   Leaflet + CSS  (bleibt unverändert)
----------------------------------------------------------- */
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/* -----------------------------------------------------------
   1 · Eigenes Marker-Icon laden
      (Datei liegt in  src/img/custom-marker.png)
----------------------------------------------------------- */
import myMarkerUrl from "../img/custom-marker.png";          // <— dein Bild
import shadowUrl   from "leaflet/dist/images/marker-shadow.png"; // Schatten kann bleiben

const myIcon = L.icon({
  iconUrl:       myMarkerUrl,
  shadowUrl:     shadowUrl,
  iconSize:      [32, 48],   // Breite, Höhe  → bei Bedarf anpassen
  iconAnchor:    [16, 48],   // Punkt, der auf der Koordinate sitzt
  popupAnchor:   [0, -46]    // Popup-Ballon relativ zur Icon-Spitze
});

/* -----------------------------------------------------------
   2 · Karte initialisieren
----------------------------------------------------------- */
const map = L.map("map").setView([51.96, 7.62], 6);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap-Mitwirkende"
}).addTo(map);

/* -----------------------------------------------------------
   3 · Beispielmarker – Dresden  (mit eigenem Icon)
----------------------------------------------------------- */
L.marker([51.0504, 13.7373], { icon: myIcon })
  .addTo(map)
  .bindPopup("Dresden");