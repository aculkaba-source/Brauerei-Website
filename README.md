# Brauerei Muster – Website (fiktives Studienprojekt)

Mehrseitige Firmen-Website einer **fiktiven** Brauerei aus Salzgitter.
Reines HTML, CSS und JavaScript: kein Framework, kein Build-Schritt, keine Cookies, keine externen Dienste.

**Live-Adresse (GitHub Pages):** https://aculkaba-source.github.io/Brauerei-Website/

## Ordnerstruktur

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Startseite (Hero, 100-Mio.-Liter-Zähler, Produktlinien, Über-uns-Teaser) |
| `produkte.html` | Produktübersicht mit Filter und Vergleich |
| `produkt/*.html` | eine Detailseite je Produkt (13 Stück) |
| `ueber-uns.html`, `standort.html`, `brauprozess.html`, `kontakt.html`, `impressum.html` | weitere Seiten |
| `404.html` | Fehlerseite |
| `js/produkte.js` | **alle Produktdaten an einer Stelle** |
| `js/grafik.js` | zeichnet Flaschen und Dosen als SVG |
| `js/main.js` | Menü, Animationen, Zähler, Filter, Vergleich, Detailseiten, Formular |
| `css/style.css` | gesamtes Design (Farben ganz oben als Variablen) |
| `sitemap.xml`, `robots.txt`, `favicon.svg` | SEO und Symbol im Browser-Tab |

## Produktdaten ändern

Öffne `js/produkte.js`. Jedes Produkt ist ein Block wie `{ id: "helles", name: "Helles", ... }`.
Ändere dort Texte, Zutaten oder Nährwerte. Zahlen schreibst du mit **Punkt** (`3.2`), die Website zeigt sie automatisch mit Komma an.
Übersicht, Detailseite, Vergleich und Startseite übernehmen die Änderung automatisch.

Wenn du ein **neues Produkt** hinzufügst:
1. Lege in `js/produkte.js` einen neuen Block an (mit neuer `id`).
2. Kopiere eine Datei in `produkt/` (z. B. `pils.html`) und benenne die Kopie wie die neue `id`.
3. Ersetze in der neuen Datei die alte `id` und den Namen (Titel, Beschreibung, `data-produkt="..."`).
4. Trage die neue Adresse in `sitemap.xml` ein.

## Den Namen „Brauerei Muster“ ersetzen

Der Name steht in fast allen Dateien. Am einfachsten geht das so (funktioniert auch auf dem iPad in Safari):

1. Öffne das Repository auf github.com und drücke die Taste **`.`** (Punkt). Alternativ ersetzt du in der Adresse `github.com` durch `github.dev`.
   Es öffnet sich ein Editor im Browser.
2. Links auf das **Lupen-Symbol** (Suche) tippen.
3. Ins Suchfeld `Brauerei Muster` eintippen, auf den kleinen Pfeil links tippen und ins Ersetzen-Feld den neuen Namen schreiben.
4. Auf **„Alle ersetzen“** tippen.
5. Wiederhole das für `brauerei-muster` (steht in den E-Mail-Adressen) und `MUSTER` (steht auf den Etiketten in `js/grafik.js`).
6. Links auf das Symbol **Quellcodeverwaltung** (Verzweigung) tippen, eine kurze Nachricht eingeben und **Commit & Push** wählen.

Oder du bittest Claude Code einfach: *„Ersetze überall ‚Brauerei Muster‘ durch ‚…‘“*.

---
*Fiktives Studienprojekt – keine echte Brauerei, keine echten Produkte.*
