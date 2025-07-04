# Projekt: Meine Webseite

Das ist mein Web-Projekt, das verschiedene moderne Web-Technologien und Konzepte demonstriert. Es umfasst sowohl statische Inhaltsseiten als auch eine dynamische, datenbankgesteuerte Web-Anwendung zur Verwaltung von Rezepten. Ich bin design-technisch kein Maestro, aber an manchen Stellen waren ein paar gute Einfälle dabei.

## Inhaltsverzeichnis

- [Seitenübersicht](#seitenübersicht)
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

* **Startseite:** Eine minimalistische Startseite, die als zentraler Einstiegspunkt dient. Mit aufdringlicher Werbung damit es so detailgetreu wie möglich ist.
* **Rezeptliste:** Eine statische Seite mit einer Sammlung von Getränkerezepten im ansprechenden Kachel-Design.
* **Bildergalerie:** Eine visuelle Galerie von "Teufelsfrüchten", ergänzt durch Sidebar mit Lexikon. Hintergrund habe ich Schwarz gelassen weil ich winde das die Farben so besser wirken.
* **Karte:** Eine interaktive Weltkarte zur Darstellung geografischer Daten, umgesetzt mit der Leaflet.js-Bibliothek. Zurzeit zeigt diese auf Dresden.
* **BBQ Point:** Das ist das Hauptprojekt (die Große Aufgabe). Eine dynamische Web-Anwendung zur Verwaltung von Grillrezepten mit Anbindung an eine lokale Datenbank.

## Features

* **Dynamischer Rezept-Manager (BBQ Point):** Volle CRUD-Funktionalität (Create, Read, Update, Delete) zum Erstellen, Anzeigen, Bearbeiten und Löschen von Rezepten.
* **Interaktive Karte:** Integration von Leaflet.js zur Darstellung einer dynamischen Karte.
* **Responsives Design:** Die Bildergalerie und andere Seiten sind so gestaltet, dass sie auch auf kleineren Bildschirmbreiten (z.B. 600px) gut erkennbar und bedienbar sind.
* **Moderne Tool-Chain:** Das Projekt nutzt Vite als schnellen Build-Tool, ESLint zur Sicherung der Code-Qualität und Prettier zur automatischen Code-Formatierung.
* **Lokale API:** Mittels `json-server` wird eine lokale REST-API simuliert, die als Datenbank für die BBQ-Rezepte dient.

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

Um das Projekt lokal auszuführen, müssen zwei separate Prozesse gestartet werden, da die Webseite (Frontend) und die Rezept-Datenbank (Backend-API) unabhängig voneinander laufen. Dafür werden **zwei separate Terminal-Fenster** benötigt.

### 1. Terminal: Starten der API-Datenbank

Gib den folgenden Befehl ein, um den `json-server` zu starten. Dieser dient als lokale Datenbank für den BBQ-Point.

```bash
npm run api

#### 2. Terminal: Starten der Webseite

Gib in einem zweiten Terminal diesen Befehl ein, um den Vite-Entwicklungsserver zu starten. Dieser zeigt die Webseite im Browser an und sorgt für ein automatisches Neuladen bei Code-Änderungen.
```bash
npm run dev
```
Anschließend ist die Webseite im Browser unter der im Terminal angezeigten Adresse (z.B. `http://localhost:5173`) erreichbar. Beide Terminals müssen während der Entwicklung geöffnet bleiben.

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
    * **Design des "Flammen-Headers":** Das zentrale Design-Element ist der 'Hero'-Bereich. Der Effekt eines Schriftzugs über bewegten Flammen wird durch eine Schichtung von HTML-Elementen erreicht: Im Hintergrund läuft ein stummgeschaltetes `<video>` in Endlosschleife. Darüber ist die `<h1>`-Überschrift mit einem höheren `z-index` positioniert, was eine lebendige und eindrucksvolle Atmosphäre erzeugt.
    * **Dashboard & Rezeptzähler:** Die rechte `aside`-Spalte wurde als Mini-Dashboard konzipiert. Ein Detail ist der dynamische "Rezepte gesamt"-Zähler. Dieser wird beim Laden der Seite via JavaScript befüllt, indem die Gesamtzahl der Einträge aus der Datenbank ermittelt und direkt ins HTML geschrieben wird.

### Funktionsbeschreibungen

Hier werden fünf zentrale JavaScript-Funktionen aus der `bbq-app.js` erläutert:

1.  **`load()`**
    * **Zweck:** Initialisiert die "BBQ Point"-Seite.
    * **Ablauf:** Ruft alle Rezepte aus der Datenbank ab. Anschließend wird die Gesamtzahl der Rezepte ermittelt (`recipes.length`) und in das Element mit der ID `recipe-count` in der `aside`-Box geschrieben. Zuletzt wird die `render()`-Funktion aufgerufen, um die Rezeptkarten darzustellen.

2.  **`render()`**
    * **Zweck:** Stellt die Rezeptkarten dynamisch dar, basierend auf Nutzer-Interaktionen (Suche, Sortierung).
    * **Ablauf:** Liest die Werte aus Suche und Sortierung, filtert und sortiert die Rezeptdaten entsprechend und generiert daraus die HTML-Kacheln, die auf der Seite angezeigt werden.

3.  **`showDetail(id)`**
    * **Zweck:** Zeigt die Detailansicht eines Rezepts in einem Pop-up-Fenster (Modal).
    * **Ablauf:** Holt die vollständigen Daten für ein spezifisches Rezept anhand seiner `id`, generiert dynamisch den HTML-Code für das Modal und registriert die Event-Listener für "Schließen", "Bearbeiten" und "Löschen".

4.  **`showForm(recipe = {})`**
    * **Zweck:** Zeigt ein Formular zum Erstellen oder Bearbeiten eines Rezepts.
    * **Ablauf:** Erkennt anhand einer übergebenen `id`, ob ein Rezept neu erstellt oder bearbeitet wird. Das Formular wird entsprechend angezeigt und bei einer Bearbeitung mit den vorhandenen Daten vorausgefüllt. Beim Absenden werden die Daten über die API gespeichert.

5.  **`setupImageUpload(initialImageUrl)`**
    * **Zweck:** Steuert die Drag-and-Drop-Funktionalität für den Bildupload.
    * **Ablauf:** Nutzt die `FileReader` API, um eine lokale Bilddatei als Base64-String einzulesen. Dieser String wird für eine sofortige Bildvorschau im Formular verwendet und für das spätere Speichern zwischengespeichert.