/* =====================================================================
   GRAFIKEN – Flaschen und Dosen werden hier als SVG gezeichnet.
   Farben und Beschriftung kommen aus js/produkte.js.
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

  /* Kleine Zitrusscheibe für Dosen */
  function scheibe(cx, cy, r, farbe) {
    let s = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + farbe + '"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 2.5) + '" fill="#fff" fill-opacity=".55"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r - 3.5) + '" fill="' + farbe + '" fill-opacity=".85"/>';
    for (let i = 0; i < 8; i++) {
      const w = (i * Math.PI) / 4;
      const x = cx + Math.cos(w) * (r - 3.5);
      const y = cy + Math.sin(w) * (r - 3.5);
      s += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x.toFixed(1) + '" y2="' + y.toFixed(1) + '" stroke="#fff" stroke-opacity=".7" stroke-width="1"/>';
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="1.6" fill="#fff"/>';
    return s;
  }

  function flasche(p) {
    const id = "fl" + ++zaehler;
    const glas = p.glas || "#5A3410";
    let s = "<defs>" +
      '<linearGradient id="' + id + '" x1="0" x2="1">' +
      '<stop offset="0" stop-color="' + glas + '" stop-opacity=".85"/>' +
      '<stop offset=".35" stop-color="' + glas + '"/>' +
      '<stop offset="1" stop-color="#000" stop-opacity=".55"/>' +
      "</linearGradient></defs>";
    // Schatten
    s += '<ellipse cx="50" cy="294" rx="34" ry="4" fill="#000" fill-opacity=".08"/>';
    // Flaschenkörper
    s += '<path d="M40 18 L60 18 L60 70 C60 92 82 100 82 126 L82 282 Q82 291 73 291 L27 291 Q18 291 18 282 L18 126 C18 100 40 92 40 70 Z" fill="url(#' + id + ')"/>';
    s += '<path d="M60 18 L60 70 C60 92 82 100 82 126 L82 282 Q82 291 73 291" fill="none" stroke="' + glas + '" stroke-width="1"/>';
    s += '<rect x="25" y="128" width="5" height="150" rx="2.5" fill="#fff" fill-opacity=".22"/>';
    s += '<rect x="43" y="26" width="3" height="42" rx="1.5" fill="#fff" fill-opacity=".22"/>';
    // Kronkorken & Halsetikett
    s += '<rect x="37" y="6" width="26" height="14" rx="3" fill="' + p.farbe + '"/>';
    s += '<rect x="37" y="16" width="26" height="4" fill="#000" fill-opacity=".18"/>';
    s += '<path d="M40 30 L60 30 L60 54 L40 54 Z" fill="' + p.farbe + '"/>';
    s += '<path d="M40 30 L60 30 L60 34 L40 34 Z" fill="#fff" fill-opacity=".35"/>';
    // Hauptetikett
    s += '<rect x="18" y="158" width="64" height="94" fill="#FBF7EE"/>';
    s += '<rect x="18" y="158" width="64" height="16" fill="' + p.farbe + '"/>';
    s += '<text x="50" y="169.5" text-anchor="middle" font-size="7" font-weight="700" letter-spacing="1.2" fill="#fff">MUSTER</text>';
    // kleine Gerstenähre
    s += '<g fill="none" stroke="' + p.farbe + '" stroke-width="1.4" stroke-linecap="round">' +
      '<path d="M50 230 L50 208"/><path d="M50 214 q-5 -3 -6 -8 M50 214 q5 -3 6 -8 M50 222 q-5 -3 -6 -8 M50 222 q5 -3 6 -8"/></g>';
    const name = p.etikett[0];
    const groesse = name.length > 8 ? 7.5 : 10;
    s += '<text x="50" y="194" text-anchor="middle" font-size="' + groesse + '" font-weight="800" fill="#1C1C1E">' + esc(name) + "</text>";
    s += '<text x="50" y="244" text-anchor="middle" font-size="6.5" font-weight="600" fill="#444">' + esc(p.etikett[1]) + "</text>";
    s += '<rect x="18" y="249" width="64" height="3" fill="' + p.farbe + '"/>';
    return s;
  }

  function dose(p) {
    const id = "do" + ++zaehler;
    const dunkel = p.dose === "dunkel";
    const koerper = dunkel ? "#1F2833" : "#FFFFFF";
    const schrift = dunkel ? "#FFFFFF" : "#1C1C1E";
    let s = "<defs>" +
      '<linearGradient id="' + id + '" x1="0" x2="1">' +
      '<stop offset="0" stop-color="#000" stop-opacity=".10"/>' +
      '<stop offset=".3" stop-color="#fff" stop-opacity=".25"/>' +
      '<stop offset=".55" stop-color="#000" stop-opacity="0"/>' +
      '<stop offset="1" stop-color="#000" stop-opacity=".22"/>' +
      "</linearGradient></defs>";
    s += '<ellipse cx="50" cy="294" rx="34" ry="4" fill="#000" fill-opacity=".08"/>';
    // Deckel
    s += '<path d="M27 92 L73 92 L76 100 L24 100 Z" fill="#B9BEC5"/>';
    s += '<rect x="26" y="88" width="48" height="6" rx="3" fill="#D5D9DE"/>';
    // Körper
    s += '<path d="M24 100 L76 100 Q80 100 80 106 L80 278 Q80 290 70 290 L30 290 Q20 290 20 278 L20 106 Q20 100 24 100 Z" fill="' + koerper + '" stroke="#D5D9DE" stroke-width="' + (dunkel ? 0 : 1) + '"/>';
    // Farbband
    s += '<rect x="20" y="150" width="60" height="78" fill="' + p.farbe + '"/>';
    s += '<path d="M20 150 Q50 140 80 150 L80 156 Q50 146 20 156 Z" fill="' + p.farbe + '"/>';
    if (p.linie === "radler") {
      // Hopfendolde + Zitrone für Radler
      s += scheibe(60, 190, 13, "#F2C318");
      s += '<g fill="' + (dunkel ? "#2D6227" : "#fff") + '" fill-opacity=".9"><ellipse cx="38" cy="186" rx="7" ry="9"/><ellipse cx="38" cy="198" rx="5.5" ry="7"/></g>';
      s += '<path d="M38 176 q2 -6 6 -7" stroke="#2D6227" stroke-width="1.5" fill="none"/>';
    } else {
      s += scheibe(50, 189, 18, p.farbe === "#F2C318" ? "#E0A800" : p.farbe);
    }
    // Schrift
    s += '<text x="50" y="122" text-anchor="middle" font-size="7" font-weight="700" letter-spacing="1.4" fill="' + schrift + '" fill-opacity=".85">MUSTER</text>';
    const name = p.etikett[0];
    const groesse = name.length > 8 ? 7.5 : 10;
    s += '<text x="50" y="140" text-anchor="middle" font-size="' + groesse + '" font-weight="800" fill="' + schrift + '">' + esc(name) + "</text>";
    s += '<rect x="30" y="242" width="40" height="13" rx="6.5" fill="' + schrift + '"/>';
    s += '<text x="50" y="251.3" text-anchor="middle" font-size="6.5" font-weight="800" letter-spacing=".6" fill="' + koerper + '">' + esc(p.etikett[1]) + "</text>";
    // Glanz
    s += '<path d="M24 100 L76 100 Q80 100 80 106 L80 278 Q80 290 70 290 L30 290 Q20 290 20 278 L20 106 Q20 100 24 100 Z" fill="url(#' + id + ')"/>';
    return s;
  }

  /* Öffentliche Funktion: produktSVG(produkt, beschreibung?) */
  window.produktSVG = function (p, beschreibung) {
    const inhalt = p.gebinde === "dose" ? dose(p) : flasche(p);
    return rahmen(inhalt, beschreibung);
  };
})();
