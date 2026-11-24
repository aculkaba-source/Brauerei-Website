/* =====================================================================
   GRAFIKEN – Glasflaschen werden hier als SVG gezeichnet.
   Farben und Beschriftung kommen aus js/produkte.js.
   Jedes Produkt gibt es als 0,5-l-Flasche (groß) und als
   0,33-l-Flasche (kleiner, bauchige Form).
   ===================================================================== */

(function () {
  let zaehler = 0;

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (z) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[z];
    });
  }

  /* Rahmen: role="img" mit Beschreibung – oder rein dekorativ (aria-hidden) */
  function rahmen(inhalt, beschreibung) {
    const a11y = beschreibung
      ? 'role="img" aria-label="' + esc(beschreibung) + '"'
      : 'aria-hidden="true" focusable="false"';
    return '<svg class="produkt-svg" viewBox="0 0 100 300" ' + a11y + ">" + inhalt + "</svg>";
  }

  /* Kleine Zitrusscheibe für Radler und Limonaden */
  function zitrus(cx, cy, r, farbe) {
    let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + farbe + '"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 2.2) + '" fill="#fff" fill-opacity=".55"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 3.2) + '" fill="' + farbe + '" fill-opacity=".85"/>';
    for (let i = 0; i < 8; i++) {
      const w = (i * Math.PI) / 4;
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + Math.cos(w) * (r - 3.2)).toFixed(1) + '" y2="' + (cy + Math.sin(w) * (r - 3.2)).toFixed(1) + '" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>';
    }
    return s;
  }

  /* Hauptetikett – y = Oberkante, x/breite = Position und Breite */
  function etikett(p, y, x, breite) {
    const mitte = x + breite / 2;
    const hoehe = 94;
    let s = '<rect x="' + x + '" y="' + y + '" width="' + breite + '" height="' + hoehe + '" fill="#FBF7EE"/>';
    s += '<rect x="' + x + '" y="' + y + '" width="' + breite + '" height="16" fill="' + p.farbe + '"/>';
    s += '<text x="' + mitte + '" y="' + (y + 11.5) + '" text-anchor="middle" font-size="6.4" font-weight="800" letter-spacing=".8" fill="#fff">MASCHBRAU</text>';
    const name = p.etikett[0];
    const groesse = name.length > 8 ? 7.5 : 10;
    s += '<text x="' + mitte + '" y="' + (y + 36) + '" text-anchor="middle" font-size="' + groesse + '" font-weight="800" fill="#1C1C1E">' + esc(name) + "</text>";
    if (p.linie === "limo" || p.linie === "radler") {
      s += zitrus(mitte, y + 59, 11, p.linie === "radler" ? "#F2C318" : p.farbe);
    } else {
      // kleine Gerstenähre
      s += '<g fill="none" stroke="' + p.farbe + '" stroke-width="1.4" stroke-linecap="round">' +
        '<path d="M' + mitte + " " + (y + 72) + " L" + mitte + " " + (y + 50) + '"/>' +
        '<path d="M' + mitte + " " + (y + 56) + " q-5 -3 -6 -8 M" + mitte + " " + (y + 56) + " q5 -3 6 -8 M" + mitte + " " + (y + 64) + " q-5 -3 -6 -8 M" + mitte + " " + (y + 64) + ' q5 -3 6 -8"/></g>';
    }
    s += '<text x="' + mitte + '" y="' + (y + 86) + '" text-anchor="middle" font-size="6.5" font-weight="700" fill="#444">' + esc(p.etikett[1]) + "</text>";
    s += '<rect x="' + x + '" y="' + (y + hoehe - 3) + '" width="' + breite + '" height="3" fill="' + p.farbe + '"/>';
    return s;
  }

  function verlauf(id, glas) {
    return "<defs>" +
      '<linearGradient id="' + id + '" x1="0" x2="1">' +
      '<stop offset="0" stop-color="' + glas + '" stop-opacity=".85"/>' +
      '<stop offset=".35" stop-color="' + glas + '"/>' +
      '<stop offset="1" stop-color="#000" stop-opacity=".55"/>' +
      "</linearGradient></defs>";
  }

  /* Große 0,5-l-Flasche (Longneck) */
  function flasche05(p, id) {
    const glas = p.glas || "#5A3410";
    let s = verlauf(id, glas);
    s += '<ellipse cx="50" cy="294" rx="34" ry="4" fill="#000" fill-opacity=".08"/>';
    s += '<path d="M40 18 L60 18 L60 70 C60 92 82 100 82 126 L82 282 Q82 291 73 291 L27 291 Q18 291 18 282 L18 126 C18 100 40 92 40 70 Z" fill="url(#' + id + ')"/>';
    s += '<rect x="25" y="128" width="5" height="150" rx="2.5" fill="#fff" fill-opacity=".22"/>';
    s += '<rect x="43" y="26" width="3" height="42" rx="1.5" fill="#fff" fill-opacity=".22"/>';
    s += '<rect x="37" y="6" width="26" height="14" rx="3" fill="' + p.farbe + '"/>';
    s += '<rect x="37" y="16" width="26" height="4" fill="#000" fill-opacity=".18"/>';
    s += '<path d="M40 30 L60 30 L60 54 L40 54 Z" fill="' + p.farbe + '"/>';
    s += etikett(p, 158, 18, 64);
    return s;
  }

  /* Kleinere 0,33-l-Flasche (Steinie-Form) */
  function flasche033(p, id) {
    const glas = p.glas || "#5A3410";
    let s = verlauf(id, glas);
    s += '<ellipse cx="50" cy="294" rx="36" ry="4" fill="#000" fill-opacity=".08"/>';
    s += '<path d="M41 96 L59 96 L59 120 C59 136 84 140 84 162 L84 282 Q84 291 75 291 L25 291 Q16 291 16 282 L16 162 C16 140 41 136 41 120 Z" fill="url(#' + id + ')"/>';
    s += '<rect x="23" y="166" width="5" height="112" rx="2.5" fill="#fff" fill-opacity=".22"/>';
    s += '<rect x="38" y="84" width="24" height="14" rx="3" fill="' + p.farbe + '"/>';
    s += '<rect x="38" y="94" width="24" height="4" fill="#000" fill-opacity=".18"/>';
    s += '<path d="M41 104 L59 104 L59 120 L41 120 Z" fill="' + p.farbe + '"/>';
    s += etikett(p, 174, 16, 68);
    return s;
  }

  /* Öffentliche Funktion: produktSVG(produkt, beschreibung?, groesse?)
     groesse: "05" (Standard) oder "033" */
  window.produktSVG = function (p, beschreibung, groesse) {
    const id = "fl" + ++zaehler;
    const inhalt = groesse === "033" ? flasche033(p, id) : flasche05(p, id);
    return rahmen(inhalt, beschreibung);
  };
})();
