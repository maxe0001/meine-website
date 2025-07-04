# Projekt: Meine Webseite

Das ist mein Web-Projekt, das verschiedene moderne Web-Technologien und Konzepte demonstriert. Es umfasst sowohl statische Inhaltsseiten als auch eine dynamische, datenbankgesteuerte Web-Anwendung zur Verwaltung von Rezepten. Ich bin design-technisch kein Maestro, aber an manchen Stellen waren ein paar gute Einfälle dabei.

## Inhaltsverzeichnis

- [Seitenübersicht](#seitenübersicht)
- [Besondere Merkmale & Highlights](#besondere-merkmale--highlights)
- [Features](#features)
- [Verwendete Technologien](#verwendete-technologien)
- [Setup und Installation](#setup-und-installation)
- [Projekt starten](#projekt-starten)
- [Verfügbare NPM-Skripte](#verfügbare-npm-skripte)
- [Technische Dokumentation](#technische-dokumentation)
  - [Seiten im Detail](#seiten-im-detail)
  - [Funktionsbeschreibungen](#funktionsbeschreibungen)

## Seitenübersicht

Das Projekt besteht aus fünf Hauptseiten, die über eine zentrale Navigation erreichbar sind:

* **Startseite:** Eine minimalistische Startseite, die als zentraler Einstiegspunkt dient.
* **Rezeptliste:** Eine statische Seite mit einer Sammlung von Getränkerezepten im ansprechenden Kachel-Design.
* **Bildergalerie:** Eine visuelle Galerie von "Teufelsfrüchten", ergänzt durch eine Sidebar mit Lexikon-Charakter.
* **Karte:** Eine interaktive Weltkarte zur Darstellung geografischer Daten, umgesetzt mit der Leaflet.js-Bibliothek. Zurzeit zeigt diese auf Dresden.
* **BBQ Point:** Das ist das Hauptprojekt (die Große Aufgabe). Eine dynamische Web-Anwendung zur Verwaltung von Grillrezepten mit Anbindung an eine lokale Datenbank.

## Besondere Merkmale & Highlights

Hier sind zwei Features des Projekts, die einer genaueren Betrachtung wert sind und auf die ich besonders stolz bin:

### Dynamischer Flammen-Header

Ein visuelles Highlight der "BBQ Point"-Seite ist der Header-Bereich. Dieser Effekt wird nicht durch komplexe Animationen, sondern durch eine clevere Schichtung von HTML-Elementen mittels CSS erzielt. Im Hintergrund läuft ein stummgeschaltetes `<video>` in Endlosschleife, das eine realistische Flammentextur zeigt. Darüber ist die `<h1>`-Überschrift mit einem höheren `z-index` positioniert, sodass sie scheinbar über dem Feuer schwebt. Das Ergebnis ist eine eindrucksvolle und thematisch passende Atmosphäre, die sofort ins Auge sticht.

### Interaktives Dashboard mit dynamischem Zähler

Die rechte Seitenspalte auf der "BBQ Point"-Seite wurde bewusst als Mini-Dashboard gestaltet, um der Seite den Charakter einer echten Anwendung zu verleihen. Das Kernstück ist der "Rezepte gesamt"-Zähler. Dieser wird nicht statisch im HTML eingetragen, sondern bei jedem Seitenaufruf live via JavaScript berechnet, indem die tatsächliche Anzahl der Einträge aus der `db.json`-Datenbank ermittelt wird. Dies stellt sicher, dass die Anzeige immer den aktuellen Datenstand widerspiegelt und verleiht der Seite einen professionellen, datengesteuerten Charakter.

## Features

* **Dynamischer Rezept-Manager (BBQ Point):** Volle CRUD-Funktionalität (Create, Read, Update, Delete) zum Erstellen, Anzeigen, Bearbeiten und Löschen von Rezepten.
* **Interaktive Karte:** Integration von Leaflet.js zur Darstellung einer dynamischen Karte.
* **Responsives Design:** Die Bildergalerie und andere Seiten sind so gestaltet, dass sie auch auf kleineren Bildschirmbreiten (z.B. 600px) gut erkennbar und bedienbar sind.
* **Moderne Tool-Chain:** Das Projekt nutzt Vite als schnellen Build-Tool, ESLint zur Sicherung der Code-Qualität und Prettier zur automatischen Code-Formatierung.
* **Lokale API:** Mittels `json-server` wird eine lokale REST-API simuliert, die als Datenbank für die BBQ-Rezepte dient.
* **Sonstiges:** Wenn man über die Entwicklertools die breite auf 600 pixel einstellt werden die Seiten immernoch bestmöglich dargestellt.

## Verwendete Technologien

* **Frontend:** HTML5, CSS3, JavaScript (ESM)
* **Bibliotheken:** Leaflet.js
* **Backend (Lokal):** `json-server`
* **Build-Tools & Entwicklungsumgebung:**
    * Node.js & NPM
    * Vite (Development Server & Build-Tool)
    * ESLint (Code-Linting)
    * Prettier (Code-Formatierung)

## Setup und Installation

### Voraussetzungen

* Node.js (Version 18 oder höher)
* NPM (wird mit Node.js installiert)

### Installationsschritte

1.  **Repository klonen (falls zutreffend):**
    ```bash
    git clone <URL-zum-Repository>
    cd meine-website
    ```

2.  **Abhängigkeiten installieren:**
    Führe im Hauptverzeichnis des Projekts den folgenden Befehl aus, um alle benötigten Pakete zu installieren.
    ```bash
    npm install
    ```

## Projekt starten

Um das Projekt lokal auszuführen, müssen zwei separate Prozesse gestartet werden. Dafür werden **zwei separate Terminal-Fenster** benötigt.

#### 1. Terminal: Starten der API-Datenbank
Gib den folgenden Befehl ein, um den `json-server` zu starten.
```bash
npm run api
```

#### 2. Terminal: Starten der Webseite
Gib in einem zweiten Terminal diesen Befehl ein, um den Vite-Entwicklungsserver zu starten.
```bash
npm run dev
```
Anschließend ist die Webseite im Browser unter der im Terminal angezeigten Adresse (z.B. `http://localhost:5173`) erreichbar.

## Verfügbare NPM-Skripte

* `npm run dev`: Startet den Vite-Entwicklungsserver.
* `npm run build`: Erstellt eine optimierte, produktionsfertige Version der Webseite im `dist`-Ordner.
* `npm run start`: Führt zuerst den `build`-Befehl aus und startet dann einen Server zur Vorschau der produktiven Version.
* `npm run lint`: Überprüft den JavaScript-Code mit ESLint auf Fehler und Stilprobleme.
* `npm run format`: Formatiert den gesamten Code im `src`-Verzeichnis automatisch mit Prettier.
* `npm run api`: Startet den `json-server` für die lokale Datenbank.

## Technische Dokumentation

### Seiten im Detail

* **Startseite (`index.html`):** Dient als zentraler Einstiegspunkt und Willkommensbildschirm. Das Design ist minimalistisch und zentriert, um den Fokus auf die Begrüßung und die Hauptnavigation zu lenken.
* **Rezeptliste (`rezepte.html`):** Präsentiert statische Getränkerezepte in einem Kachel-Layout. Der Holz-Hintergrund erzeugt einen rustikalen Charakter. Die `aside`-Box bietet dem Nutzer thematisch passende Tipps.
* **Bildergalerie (`bilder.html`):** Zeigt Bilder von "Teufelsfrüchten" in einem sauberen Raster. Die rechte `aside`-Spalte dient als Mini-Lexikon und gibt Kontext zu den gezeigten Bildern.
* **Karte (`karte.html`):** Eine interaktive Kartenseite, die mittels Leaflet.js geografische Daten darstellen kann.
* **BBQ Point (`bbq.html`):** Die dynamische Hauptanwendung des Projekts, die als Rezept-Manager fungiert.

### Funktionsbeschreibungen

Hier werden fünf zentrale JavaScript-Funktionen aus der `bbq-app.js` erläutert:

1.  **`load()`**
    * **Zweck:** Initialisiert die "BBQ Point"-Seite, lädt alle Rezepte und aktualisiert die UI.
    * **Ablauf:** Die Funktion ruft via `api.getAll()` alle Rezepte ab. Anschließend wird die Gesamtzahl der Rezepte ermittelt und in das Element mit der ID `recipe-count` geschrieben. Zuletzt wird die `render()`-Funktion aufgerufen, um die Rezeptkarten darzustellen.
    * **Code-Beispiel:**
        ```javascript
        async function load() {
          recipes = await api.getAll();

          // Zählt alle Rezepte und aktualisiert die Anzeige in der Sidebar
          const countElement = document.getElementById('recipe-count');
          if (countElement) {
            countElement.textContent = recipes.length;
          }

          render();
        }
        ```

2.  **`render()`**
    * **Zweck:** Stellt die Rezeptkarten dynamisch dar, basierend auf Nutzer-Interaktionen (Suche, Sortierung).
    * **Ablauf:** Liest die Werte aus Suche und Sortierung, filtert die globale Rezeptliste und sortiert sie. Anschließend wird für jedes Rezept die `card()`-Funktion aufgerufen, um HTML zu erzeugen, das dann auf der Seite angezeigt wird.
    * **Code-Beispiel:**
        ```javascript
        function render() {
          const q = search.value.toLowerCase();
          const key = sort.value;
          const list = recipes
            .filter(r => r.title.toLowerCase().includes(q)) // Filterung
            .sort((a, b) => /* ... Sortierlogik ... */);    // Sortierung

          app.innerHTML = list.map(card).join(''); // Rendern
        }
        ```

3.  **`showDetail(id)`**
    * **Zweck:** Zeigt die Detailansicht eines Rezepts in einem Pop-up-Fenster (Modal).
    * **Ablauf:** Holt die vollständigen Daten für ein spezifisches Rezept anhand seiner `id`, generiert dynamisch den HTML-Code für das Modal und registriert die Event-Listener für "Schließen", "Bearbeiten" und "Löschen".
    * **Code-Beispiel:**
        ```javascript
        function showDetail(id) {
          api.get(id).then(recipe => {
            modal.innerHTML = `
              <div class="modal-bg">
                <div class="modal-content">
                  <h2>${recipe.title}</h2>
                  <img src="${recipe.image}" class="modal-image">
                  </div>
              </div>
            `;
            modal.classList.remove('hidden');
            // Event-Listener für Buttons hier registrieren
          });
        }
        ```

4.  **`showForm(recipe = {})`**
    * **Zweck:** Zeigt ein Formular zum Erstellen oder Bearbeiten eines Rezepts.
    * **Ablauf:** Erkennt anhand einer übergebenen `id`, ob ein Rezept neu erstellt (`isEdit = false`) oder bearbeitet (`isEdit = true`) wird. Das Formular wird entsprechend angezeigt. Beim Absenden werden die Daten über die API gespeichert.
    * **Code-Beispiel:**
        ```javascript
        document.getElementById('recipeForm').onsubmit = async (e) => {
          e.preventDefault();
          const form = e.target;
          const recipeData = { /* ... Formulardaten sammeln ... */ };
          
          if (isEdit) {
            await api.update(recipe.id, recipeData);
          } else {
            await api.create(recipeData);
          }
          closeModal();
          load();
        };
        ```

5.  **`setupImageUpload(initialImageUrl)`**
    * **Zweck:** Steuert die Drag-and-Drop-Funktionalität für den Bildupload.
    * **Ablauf:** Nutzt die `FileReader` API, um eine lokale Bilddatei als Base64-Daten-URL einzulesen. Dieser String wird für eine sofortige Bildvorschau im Formular verwendet und für das spätere Speichern in einem `dataset`-Attribut zwischengespeichert.
    * **Code-Beispiel:**
        ```javascript
        const handleFile = (file) => {
          if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
              const imageDataUrl = e.target.result;
              imagePreview.src = imageDataUrl;
              dropZone.dataset.imageDataUrl = imageDataUrl; // Wichtig für die Speicherung
            };
            reader.readAsDataURL(file);
          }
        };
        ```