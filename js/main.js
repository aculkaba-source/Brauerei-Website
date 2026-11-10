/* =====================================================================
   MAIN.JS – Menü, Animationen, Zähler, Produktübersicht, Filter,
   Vergleich, Produkt-Detailseiten und Kontaktformular.
   ===================================================================== */

(function () {
  "use strict";

  const daten = window.BRAUEREI;
  const root = document.body.getAttribute("data-root") || "";
  const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Hilfsfunktionen ---------- */
  const $ = (sel, el) => (el || document).querySelector(sel);
  const $$ = (sel, el) => Array.from((el || document).querySelectorAll(sel));

  function esc(t) {
    return String(t).replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[z]));
  }
  function zahl(n, stellen) {
    return Number(n).toLocaleString("de-DE", {
      minimumFractionDigits: stellen === undefined ? 0 : stellen,
      maximumFractionDigits: stellen === undefined ? 2 : stellen
    });
  }
  function alkoholText(p) {
    if (!p.alkoholfrei) return zahl(p.alkohol, 1) + " % vol.";
    if (p.alkohol > 0) return "< 0,5 % vol. (alkoholfrei)";
    return "0,0 % vol. (alkoholfrei)";
  }
  function link(p) {
    return root + "produkt/" + p.id + ".html";
  }
  function linie(p) {
    return daten.linien[p.linie];
  }
  function tags(p) {
    const t = [];
    if (p.alkoholfrei) t.push(["alkoholfrei", "Alkoholfrei"]);
    if (p.zero) t.push(["zero", "Zero"]);
    if (p.protein) t.push(["protein", "Protein"]);
    return t.map((x) => '<span class="tag tag--' + x[0] + '">' + x[1] + "</span>").join("");
  }
  function finde(id) {
    return daten.produkte.find((p) => p.id === id);
  }

  document.documentElement.classList.add("js");

  /* ---------- Jahr im Footer ---------- */
  $$("[data-jahr]").forEach((el) => (el.textContent = new Date().getFullYear()));

  /* ---------- Mobiles Menü ---------- */
  const menuKnopf = $(".menu-knopf");
  const navListe = $("#hauptnavigation");
  if (menuKnopf && navListe) {
    menuKnopf.addEventListener("click", () => {
      const offen = menuKnopf.getAttribute("aria-expanded") === "true";
      menuKnopf.setAttribute("aria-expanded", String(!offen));
      document.body.classList.toggle("menu-offen", !offen);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menuKnopf.getAttribute("aria-expanded") === "true") {
        menuKnopf.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-offen");
        menuKnopf.focus();
      }
    });
  }

  /* ---------- Einblenden beim Scrollen ---------- */
  function beobachteEinblenden() {
    const elemente = $$(".einblenden:not(.sichtbar)");
    if (ruhig || !("IntersectionObserver" in window)) {
      elemente.forEach((el) => el.classList.add("sichtbar"));
      return;
    }
    const io = new IntersectionObserver(
      (eintraege) => {
        eintraege.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("sichtbar");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    elemente.forEach((el) => io.observe(el));
  }

  /* ---------- Hochzählender Zähler ---------- */
  $$("[data-zaehler]").forEach((el) => {
    const ziel = Number(el.getAttribute("data-zaehler"));
    if (ruhig || !("IntersectionObserver" in window)) {
      el.textContent = zahl(ziel);
      return;
    }
    el.textContent = "0";
    const io = new IntersectionObserver((eintraege) => {
      if (!eintraege[0].isIntersecting) return;
      io.disconnect();
      const dauer = 2200;
      const start = performance.now();
      function schritt(jetzt) {
        const t = Math.min((jetzt - start) / dauer, 1);
        const sanft = 1 - Math.pow(1 - t, 4);
        el.textContent = zahl(Math.round(ziel * sanft));
        if (t < 1) requestAnimationFrame(schritt);
      }
      requestAnimationFrame(schritt);
    }, { threshold: 0.4 });
    io.observe(el);
  });

  /* ---------- Produktkarte ---------- */
  function karte(p, mitVergleich) {
    const l = linie(p);
    let h = '<article class="produkt-karte einblenden" style="--akzent:' + p.farbe + '" data-id="' + p.id + '">';
    h += '<a class="produkt-karte__bild" href="' + link(p) + '" tabindex="-1" aria-hidden="true">' + window.produktSVG(p) + "</a>";
    h += '<div class="produkt-karte__text">';
    h += '<p class="produkt-karte__linie" style="color:' + l.text + '">' + esc(l.name) + "</p>";
    h += '<h3 class="produkt-karte__name"><a href="' + link(p) + '">' + esc(p.name) + "</a></h3>";
    h += '<p class="produkt-karte__kurz">' + esc(p.kurz) + "</p>";
    h += '<div class="tags">' + tags(p) + "</div>";
    h += "</div>";
    if (mitVergleich) {
      h += '<label class="vergleich-check"><input type="checkbox" value="' + p.id + '"> <span>Vergleichen</span></label>';
    }
    h += "</article>";
    return h;
  }

  /* ---------- Startseite: Teaser der Produktlinien ---------- */
  const teaser = $("#linien-teaser");
  if (teaser) {
    const beispiele = { bier: "helles", radler: "radler", limo: "limo-blutorange-zero" };
    let h = "";
    Object.keys(daten.linien).forEach((key) => {
      const l = daten.linien[key];
      const anzahl = daten.produkte.filter((p) => p.linie === key).length;
      const p = finde(beispiele[key]) || daten.produkte.find((x) => x.linie === key);
      h += '<article class="linie-karte einblenden" style="--akzent:' + l.farbe + '">';
      h += '<div class="linie-karte__bild">' + window.produktSVG(p) + "</div>";
      h += '<div class="linie-karte__text"><h3>' + esc(l.name) + "</h3>";
      h += "<p>" + esc(l.beschreibung) + "</p>";
      h += '<a class="pfeil-link" href="produkte.html?linie=' + key + '">' + anzahl + " Sorten entdecken<span class=\"sr-only\"> (" + esc(l.name) + ")</span></a></div>";
      h += "</article>";
    });
    teaser.innerHTML = h;
  }

  /* ---------- Produktübersicht mit Filter & Vergleich ---------- */
  const liste = $("#produkt-liste");
  if (liste) {
    const params = new URLSearchParams(location.search);
    const zustand = {
      linie: daten.linien[params.get("linie")] ? params.get("linie") : "alle",
      merkmale: new Set(),
      auswahl: []
    };
    ["alkoholfrei", "zero", "protein"].forEach((m) => {
      if (params.get(m) === "1") zustand.merkmale.add(m);
    });

    liste.innerHTML = daten.produkte.map((p) => karte(p, true)).join("");
    const anzeige = $("#filter-ergebnis");
    const leer = $("#keine-treffer");

    function filtern() {
      let n = 0;
      daten.produkte.forEach((p) => {
        let ok = zustand.linie === "alle" || p.linie === zustand.linie;
        zustand.merkmale.forEach((m) => {
          if (!p[m]) ok = false;
        });
        const el = liste.querySelector('[data-id="' + p.id + '"]');
        el.hidden = !ok;
        if (ok) n++;
      });
      anzeige.textContent = n === 1 ? "1 Produkt" : n + " Produkte";
      leer.hidden = n !== 0;
      $$("[data-filter-linie]").forEach((b) =>
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter-linie") === zustand.linie))
      );
      $$("[data-filter-merkmal]").forEach((b) =>
        b.setAttribute("aria-pressed", String(zustand.merkmale.has(b.getAttribute("data-filter-merkmal"))))
      );
      // Adresse aktualisieren, damit man gefilterte Ansicht teilen kann
      const q = new URLSearchParams();
      if (zustand.linie !== "alle") q.set("linie", zustand.linie);
      zustand.merkmale.forEach((m) => q.set(m, "1"));
      const s = q.toString();
      history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
    }

    $$("[data-filter-linie]").forEach((b) =>
      b.addEventListener("click", () => {
        zustand.linie = b.getAttribute("data-filter-linie");
        filtern();
      })
    );
    $$("[data-filter-merkmal]").forEach((b) =>
      b.addEventListener("click", () => {
        const m = b.getAttribute("data-filter-merkmal");
        if (zustand.merkmale.has(m)) zustand.merkmale.delete(m);
        else zustand.merkmale.add(m);
        filtern();
      })
    );
    $$("[data-filter-reset]").forEach((b) =>
      b.addEventListener("click", () => {
        zustand.linie = "alle";
        zustand.merkmale.clear();
        filtern();
      })
    );
    filtern();

    /* Vergleich */
    const MAX = 3;
    const leiste = $("#vergleich-leiste");
    const leisteText = $("#vergleich-status");
    const knopfVergleich = $("#vergleich-starten");
    const knopfLeeren = $("#vergleich-leeren");
    const bereich = $("#vergleich");
    const tabelle = $("#vergleich-inhalt");

    function auswahlAktualisieren() {
      const n = zustand.auswahl.length;
      $$(".vergleich-check input", liste).forEach((cb) => {
        cb.checked = zustand.auswahl.includes(cb.value);
        cb.disabled = !cb.checked && n >= MAX;
        cb.closest(".produkt-karte").classList.toggle("ausgewaehlt", cb.checked);
      });
      leiste.hidden = n === 0;
      document.body.classList.toggle("hat-vergleichsleiste", n > 0);
      leisteText.textContent =
        n + " von " + MAX + " ausgewählt" + (n < 2 ? " – wähle mindestens 2 Produkte" : "") + (n >= MAX ? " (Maximum erreicht)" : "");
      knopfVergleich.disabled = n < 2;
    }

    liste.addEventListener("change", (e) => {
      const cb = e.target.closest(".vergleich-check input");
      if (!cb) return;
      if (cb.checked && zustand.auswahl.length < MAX) zustand.auswahl.push(cb.value);
      if (!cb.checked) zustand.auswahl = zustand.auswahl.filter((id) => id !== cb.value);
      auswahlAktualisieren();
    });

    knopfLeeren.addEventListener("click", () => {
      zustand.auswahl = [];
      auswahlAktualisieren();
      bereich.hidden = true;
    });

    knopfVergleich.addEventListener("click", () => {
      const ps = zustand.auswahl.map(finde);
      const zeilen = [
        ["Produktlinie", (p) => esc(linie(p).name)],
        ["Alkohol", (p) => esc(alkoholText(p))],
        ["Gebinde", (p) => esc(p.volumen)],
        ["Energie", (p) => p.naehrwerte.kj + " kJ / " + zahl(p.naehrwerte.kcal) + " kcal"],
        ["Kohlenhydrate", (p) => zahl(p.naehrwerte.kh, 1) + " g"],
        ["davon Zucker", (p) => zahl(p.naehrwerte.zucker, 1) + " g"],
        ["Eiweiß / Protein", (p) => zahl(p.naehrwerte.eiweiss, 1) + " g"],
        ["Merkmale", (p) => tags(p) || "–"],
        ["Geschmack", (p) => esc(p.kurz)],
        ["Allergene", (p) => esc(p.allergene)]
      ];
      let h = '<table class="vergleich-tabelle"><caption class="sr-only">Vergleich der ausgewählten Produkte, Nährwerte pro 100 ml</caption><thead><tr><td></td>';
      ps.forEach((p) => {
        h += '<th scope="col" style="--akzent:' + p.farbe + '"><div class="vergleich-bild">' + window.produktSVG(p) + '</div><a href="' + link(p) + '">' + esc(p.name) + "</a></th>";
      });
      h += "</tr></thead><tbody>";
      zeilen.forEach((z) => {
        h += '<tr><th scope="row">' + z[0] + "</th>";
        ps.forEach((p) => (h += "<td>" + z[1](p) + "</td>"));
        h += "</tr>";
      });
      h += "</tbody></table>";
      tabelle.innerHTML = h;
      bereich.hidden = false;
      bereich.scrollIntoView({ behavior: ruhig ? "auto" : "smooth", block: "start" });
      $("h2", bereich).focus({ preventScroll: true });
    });

    auswahlAktualisieren();
  }

  /* ---------- Produkt-Detailseite ---------- */
  const detail = $("#produkt-detail");
  if (detail) {
    const p = finde(document.body.getAttribute("data-produkt"));
    if (!p) {
      detail.innerHTML = '<p>Dieses Produkt wurde nicht gefunden. <a href="' + root + 'produkte.html">Zur Produktübersicht</a></p>';
    } else {
      const l = linie(p);
      const n = p.naehrwerte;
      document.documentElement.style.setProperty("--akzent", p.farbe);
      document.documentElement.style.setProperty("--akzent-text", l.text);
      $$("[data-produkt-name]").forEach((el) => (el.textContent = p.name));

      let h = '<div class="detail-kopf">';
      h += '<div class="detail-bild einblenden">' + window.produktSVG(p, (p.gebinde === "dose" ? "Dose " : "Flasche ") + p.name) + "</div>";
      h += '<div class="detail-intro">';
      h += '<p class="eyebrow" style="color:' + l.text + '">' + esc(l.name) + "</p>";
      h += "<h1>" + esc(p.name) + "</h1>";
      h += '<p class="lead">' + esc(p.kurz) + "</p>";
      h += '<div class="tags">' + tags(p) + "</div>";
      h += '<dl class="eckdaten">';
      h += "<div><dt>Alkohol</dt><dd>" + esc(alkoholText(p)) + "</dd></div>";
      h += "<div><dt>Gebinde</dt><dd>" + esc(p.volumen) + "</dd></div>";
      (p.eckdaten || []).forEach((e) => (h += "<div><dt>" + esc(e[0]) + "</dt><dd>" + esc(e[1]) + "</dd></div>"));
      h += "</dl>";
      h += '<a class="knopf" href="' + root + 'kontakt.html#haendler">Wo kaufen?</a>';
      h += "</div></div>";

      h += '<div class="detail-raster">';
      h += '<section class="detail-block einblenden" aria-labelledby="h-geschmack"><h2 id="h-geschmack">Geschmack</h2><p>' + esc(p.geschmack) + "</p></section>";
      h += '<section class="detail-block einblenden" aria-labelledby="h-zutaten"><h2 id="h-zutaten">Zutaten</h2><p>' + esc(p.zutaten) + '</p><p class="hinweis"><strong>Allergene:</strong> ' + esc(p.allergene) + "</p></section>";
      h += '<section class="detail-block einblenden" aria-labelledby="h-pairing"><h2 id="h-pairing">Passt gut zu</h2><ul class="pairing">';
      p.pairing.forEach((x) => (h += "<li>" + esc(x) + "</li>"));
      h += "</ul></section>";

      h += '<section class="detail-block einblenden" aria-labelledby="h-naehrwerte"><h2 id="h-naehrwerte">Nährwerte</h2>';
      h += '<table class="naehrwerte"><caption>Durchschnittliche Nährwerte pro 100 ml</caption><tbody>';
      h += '<tr><th scope="row">Energie</th><td>' + n.kj + " kJ / " + zahl(n.kcal) + " kcal</td></tr>";
      h += '<tr><th scope="row">Fett</th><td>' + zahl(n.fett, 1) + " g</td></tr>";
      h += '<tr class="eingerueckt"><th scope="row">davon gesättigte Fettsäuren</th><td>' + zahl(n.gesFett, 1) + " g</td></tr>";
      h += '<tr><th scope="row">Kohlenhydrate</th><td>' + zahl(n.kh, 1) + " g</td></tr>";
      h += '<tr class="eingerueckt"><th scope="row">davon Zucker</th><td>' + zahl(n.zucker, 1) + " g</td></tr>";
      h += "<tr" + (p.protein ? ' class="hervor"' : "") + '><th scope="row">' + (p.protein ? "Eiweiß (Protein)" : "Eiweiß") + "</th><td>" + zahl(n.eiweiss, 1) + " g</td></tr>";
      h += '<tr><th scope="row">Salz</th><td>' + zahl(n.salz, 2) + " g</td></tr>";
      h += "</tbody></table></section>";
      h += "</div>";

      // Weitere Produkte derselben Linie
      const weitere = daten.produkte.filter((x) => x.linie === p.linie && x.id !== p.id);
      h += '<section class="weitere einblenden" aria-labelledby="h-weitere"><h2 id="h-weitere">Mehr aus der Linie ' + esc(l.name) + '</h2><div class="karten-raster">';
      h += weitere.map((x) => karte(x, false)).join("");
      h += "</div></section>";

      detail.innerHTML = h;
    }
  }

  /* ---------- Kontaktformular (Attrappe) ---------- */
  const formular = $("#kontakt-formular");
  if (formular) {
    formular.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!formular.checkValidity()) {
        formular.reportValidity();
        return;
      }
      const name = ($("#k-name").value || "").trim();
      const danke = $("#danke");
      $("#danke-name").textContent = name ? ", " + name : "";
      formular.reset();
      formular.hidden = true;
      danke.hidden = false;
      danke.focus();
    });
    $("#neue-nachricht").addEventListener("click", () => {
      $("#danke").hidden = true;
      formular.hidden = false;
      $("#k-name").focus();
    });
  }

  beobachteEinblenden();
})();
