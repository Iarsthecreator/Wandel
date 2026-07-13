# Wandel Website

Vollständige statische Website für GitHub Pages, Cloudflare Pages oder Netlify.

## Sofort auf GitHub hochladen

1. Öffne dein Repository `Wandel`.
2. Klicke auf **uploading an existing file** oder **Add file → Upload files**.
3. Lade **den Inhalt dieses Ordners** hoch, sodass `index.html` direkt im Repository liegt.
4. Committe die Dateien.
5. Öffne **Settings → Pages**.
6. Wähle **Deploy from a branch**, Branch **main**, Ordner **/(root)** und speichere.

Die Website ist danach unter ungefähr `https://DEIN-NAME.github.io/Wandel/` erreichbar.

## Roblox- und Discord-Link einsetzen

Öffne `assets/js/site-config.js` und ersetze:

```js
robloxUrl: "#",
discordUrl: "#",
```

mit deinen echten Links.

## Impressum vor Veröffentlichung

`impressum.html`, `datenschutz.html` und `assets/js/site-config.js` enthalten deutlich markierte Platzhalter. Trage dort deine rechtlich notwendigen Daten ein.

## Neue Wiki-Seite hinzufügen

1. Kopiere eine bestehende Datei aus dem Ordner `wiki/`, zum Beispiel `lantern.html`.
2. Ändere Titel, Beschreibung und Inhalt.
3. Ergänze den Artikel in `wiki.html`.
4. Ergänze außerdem einen Eintrag in `assets/js/search-index.js`, damit er in der Suche erscheint.

## Struktur

- `index.html` – Startseite
- `wiki.html` – Wiki-Zentrale
- `handbook.html` – Handbuch
- `world.html` – Weltübersicht
- `updates.html` – Entwicklungsupdates
- `roadmap.html` – Roadmap
- `team.html` – Team & Credits
- `impressum.html` / `datenschutz.html` – rechtliche Vorlagen
- `wiki/` – einzelne Wiki-Artikel
- `assets/` – CSS, JavaScript und Bilder

## Lokale Vorschau

Einfach `index.html` öffnen. Noch zuverlässiger ist ein kleiner lokaler Server:

```bash
python -m http.server 8000
```

Dann `http://localhost:8000` im Browser öffnen.
