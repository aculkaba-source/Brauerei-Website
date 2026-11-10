/* =====================================================================
   ZENTRALE PRODUKTDATEN – Brauerei Muster
   ---------------------------------------------------------------------
   Hier stehen ALLE Angaben zu den Produkten. Wenn du einen Wert ändern
   willst (z. B. Zutaten, Nährwerte, Beschreibung), änderst du ihn nur
   hier. Produktübersicht, Detailseiten, Vergleich und Startseite lesen
   automatisch aus dieser Datei.

   Hinweise:
   - Zahlen mit Punkt schreiben (3.2), die Website zeigt sie mit Komma an.
   - "farbe" ist die Akzentfarbe des Produkts (Etikett/Dose).
   - "gebinde": "flasche" oder "dose".
   - "id" muss zum Dateinamen in /produkt/ passen (z. B. helles -> produkt/helles.html).
   ===================================================================== */

window.BRAUEREI = {
  name: "Brauerei Muster",

  linien: {
    bier:   { name: "Bier",      farbe: "#C98A12", text: "#7A4E00", beschreibung: "Klassisch gebraut nach dem Reinheitsgebot – als Helles und Pils, jeweils auch alkoholfrei." },
    radler: { name: "Radler",    farbe: "#4E9A3F", text: "#2D6227", beschreibung: "Bier trifft Zitronenlimonade: spritzig, erfrischend und auch mit Protein." },
    limo:   { name: "Limonade",  farbe: "#E8731A", text: "#A3400B", beschreibung: "Zitrone, Orange und Blutorange – ohne Zucker als Zero oder mit Protein." }
  },

  produkte: [
    /* ------------------------------- BIER ------------------------------- */
    {
      id: "helles",
      name: "Helles",
      etikett: ["HELLES", "5,0 % vol."],
      linie: "bier",
      gebinde: "flasche", glas: "#5A3410", volumen: "0,5 l Mehrwegflasche",
      farbe: "#D99A1A",
      alkohol: 5.0, alkoholfrei: false, zero: false, protein: false,
      kurz: "Unser Klassiker: weich, malzig und herrlich süffig.",
      geschmack: "Goldgelb im Glas mit feinporiger, weißer Schaumkrone. In der Nase frisches Brot und ein Hauch Honig. Am Gaumen weich und vollmundig, mit zurückhaltender Hopfenbittere und einem runden, sauberen Abgang – ein Bier für jeden Tag.",
      zutaten: "Wasser, Gerstenmalz, Hopfen, Hefe",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Brezel mit Obatzda", "Hähnchen vom Grill", "Flammkuchen mit Speck und Zwiebeln", "Milder Bergkäse"],
      eckdaten: [["Stammwürze", "11,6 °P"], ["Bittere", "18 IBU"], ["Trinktemperatur", "7–9 °C"]],
      naehrwerte: { kj: 180, kcal: 43, fett: 0, gesFett: 0, kh: 3.2, zucker: 0.2, eiweiss: 0.4, salz: 0.01 }
    },
    {
      id: "helles-alkoholfrei",
      name: "Helles alkoholfrei",
      etikett: ["HELLES", "alkoholfrei"],
      linie: "bier",
      gebinde: "flasche", glas: "#5A3410", volumen: "0,5 l Mehrwegflasche",
      farbe: "#3D8BC0",
      alkohol: 0.4, alkoholfrei: true, zero: false, protein: false,
      kurz: "Voller Hell-Geschmack – ganz ohne Promille-Sorgen.",
      geschmack: "Hellgolden mit cremigem Schaum. Malzige Süße und Noten von Getreide und Brotkruste treffen auf eine milde Hopfenwürze. Der Alkohol wird nach der Gärung schonend entzogen, so bleibt der typische Charakter eines Hellen erhalten.",
      zutaten: "Wasser, Gerstenmalz, Hopfen, Hefe",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Kartoffelsalat mit Gurke", "Weißwurst mit süßem Senf", "Gemüse-Quiche", "Frischer Salat mit Feta"],
      eckdaten: [["Stammwürze", "7,2 °P"], ["Bittere", "16 IBU"], ["Trinktemperatur", "6–8 °C"]],
      naehrwerte: { kj: 100, kcal: 24, fett: 0, gesFett: 0, kh: 5.3, zucker: 3.0, eiweiss: 0.3, salz: 0.01 }
    },
    {
      id: "pils",
      name: "Pils",
      etikett: ["PILS", "5,0 % vol."],
      linie: "bier",
      gebinde: "flasche", glas: "#2E5530", volumen: "0,5 l Mehrwegflasche",
      farbe: "#2E8B57",
      alkohol: 5.0, alkoholfrei: false, zero: false, protein: false,
      kurz: "Herb, klar und spritzig – norddeutsch gebraut.",
      geschmack: "Strahlend hell mit stabiler Schaumkrone. Blumig-kräuterige Hopfenaromen mit einer Spur Zitrus. Schlank im Körper, kräftig in der Bittere und mit einem knackig-trockenen Abgang, der Lust auf den nächsten Schluck macht.",
      zutaten: "Wasser, Gerstenmalz, Hopfen, Hefe",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Fish and Chips", "Matjes mit Bratkartoffeln", "Pizza Margherita", "Würziger Gouda"],
      eckdaten: [["Stammwürze", "11,4 °P"], ["Bittere", "32 IBU"], ["Trinktemperatur", "6–8 °C"]],
      naehrwerte: { kj: 176, kcal: 42, fett: 0, gesFett: 0, kh: 3.0, zucker: 0.1, eiweiss: 0.4, salz: 0.01 }
    },
    {
      id: "pils-alkoholfrei",
      name: "Pils alkoholfrei",
      etikett: ["PILS", "alkoholfrei"],
      linie: "bier",
      gebinde: "flasche", glas: "#2E5530", volumen: "0,5 l Mehrwegflasche",
      farbe: "#2A8FA6",
      alkohol: 0.4, alkoholfrei: true, zero: false, protein: false,
      kurz: "Herbe Frische nach dem Sport oder in der Mittagspause.",
      geschmack: "Hell und klar, mit feinem Schaum. Frische Hopfennoten von Gras und Zitrusschale, dazu eine dezente Malzsüße. Isotonisch, angenehm herb und erfrischend trocken im Finish.",
      zutaten: "Wasser, Gerstenmalz, Hopfen, Hefe",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Gegrillter Lachs", "Sushi", "Ofengemüse mit Kräutern", "Ziegenfrischkäse"],
      eckdaten: [["Stammwürze", "6,8 °P"], ["Bittere", "28 IBU"], ["Trinktemperatur", "6–8 °C"]],
      naehrwerte: { kj: 92, kcal: 22, fett: 0, gesFett: 0, kh: 4.9, zucker: 2.6, eiweiss: 0.3, salz: 0.01 }
    },

    /* ------------------------------ RADLER ------------------------------ */
    {
      id: "radler",
      name: "Radler",
      etikett: ["RADLER", "2,5 % vol."],
      linie: "radler",
      gebinde: "flasche", glas: "#4D7A3A", volumen: "0,5 l Mehrwegflasche",
      farbe: "#8CC63F",
      alkohol: 2.5, alkoholfrei: false, zero: false, protein: false,
      kurz: "Halb Helles, halb Zitronenlimo – der Sommer in der Flasche.",
      geschmack: "Naturtrüb und sonnengelb. Spritzige Zitrone trifft auf die weiche Malzigkeit unseres Hellen. Süß-säuerlich ausbalanciert, leicht und unglaublich erfrischend.",
      zutaten: "Helles Bier (50 %) (Wasser, Gerstenmalz, Hopfen, Hefe), Zitronenlimonade (50 %) (Wasser, Zucker, Zitronensaft aus Zitronensaftkonzentrat (3 %), Kohlensäure, Säuerungsmittel Citronensäure, natürliches Zitronenaroma)",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Gegrillte Garnelen", "Sommerlicher Couscous-Salat", "Hähnchenspieße mit Zitrone", "Obstkuchen"],
      eckdaten: [["Mischverhältnis", "50 : 50"], ["Trinktemperatur", "5–7 °C"]],
      naehrwerte: { kj: 176, kcal: 42, fett: 0, gesFett: 0, kh: 6.0, zucker: 5.6, eiweiss: 0.2, salz: 0.01 }
    },
    {
      id: "radler-alkoholfrei",
      name: "Radler alkoholfrei",
      etikett: ["RADLER", "alkoholfrei"],
      linie: "radler",
      gebinde: "flasche", glas: "#4D7A3A", volumen: "0,5 l Mehrwegflasche",
      farbe: "#3FA796",
      alkohol: 0.4, alkoholfrei: true, zero: false, protein: false,
      kurz: "Zitronig-frisch, ganz ohne Promille.",
      geschmack: "Hellgelb und leicht trüb. Saftige Zitrone und eine sanfte Malznote verbinden sich zu einem fruchtigen, spritzigen Durstlöscher – ideal für lange Tage draußen.",
      zutaten: "Alkoholfreies Bier (50 %) (Wasser, Gerstenmalz, Hopfen, Hefe), Zitronenlimonade (50 %) (Wasser, Zucker, Zitronensaft aus Zitronensaftkonzentrat (3 %), Kohlensäure, Säuerungsmittel Citronensäure, natürliches Zitronenaroma)",
      allergene: "Enthält Gerste (glutenhaltig).",
      pairing: ["Caprese mit Basilikum", "Fischtacos", "Wassermelonen-Feta-Salat", "Zitronentarte"],
      eckdaten: [["Mischverhältnis", "50 : 50"], ["Trinktemperatur", "5–7 °C"]],
      naehrwerte: { kj: 113, kcal: 27, fett: 0, gesFett: 0, kh: 6.4, zucker: 5.8, eiweiss: 0.2, salz: 0.01 }
    },
    {
      id: "protein-radler",
      name: "Protein-Radler",
      etikett: ["RADLER", "PROTEIN"],
      linie: "radler",
      gebinde: "dose", dose: "dunkel", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#9BD14B",
      alkohol: 0.2, alkoholfrei: true, zero: false, protein: true,
      kurz: "Alkoholfreies Radler mit 3,5 g Protein pro 100 ml – für nach dem Training.",
      geschmack: "Frische Zitrone, eine feine Malznote und eine angenehm runde, leicht cremige Textur durch das zugesetzte Molkenprotein. Weniger süß als ein klassisches Radler und trotzdem spritzig.",
      zutaten: "Wasser, alkoholfreies Bier (35 %) (Wasser, Gerstenmalz, Hopfen, Hefe), Molkenproteinisolat (aus Milch) (3,8 %), Zitronensaft aus Zitronensaftkonzentrat (3 %), Zucker, Kohlensäure, Säuerungsmittel Citronensäure, natürliches Zitronenaroma, Süßungsmittel Sucralose",
      allergene: "Enthält Gerste (glutenhaltig) und Milch.",
      pairing: ["Bowl mit Quinoa und Hähnchen", "Rührei mit Vollkornbrot", "Avocado-Toast", "Haferriegel"],
      eckdaten: [["Protein je Dose", "11,6 g"], ["Trinktemperatur", "5–7 °C"]],
      naehrwerte: { kj: 134, kcal: 32, fett: 0, gesFett: 0, kh: 4.1, zucker: 3.6, eiweiss: 3.5, salz: 0.03 }
    },

    /* ----------------------------- LIMONADE ----------------------------- */
    {
      id: "limo-zitrone-zero",
      name: "Limo Zitrone Zero",
      etikett: ["ZITRONE", "ZERO"],
      linie: "limo", sorte: "Zitrone",
      gebinde: "dose", dose: "hell", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#F2C318",
      alkohol: 0, alkoholfrei: true, zero: true, protein: false,
      kurz: "Spritzige Zitrone ohne Zucker – nur 1 kcal pro 100 ml.",
      geschmack: "Klar und hellgelb. Die Zitrone schmeckt nach frisch abgeriebener Schale: knackig-sauer, sehr erfrischend und nur dezent süß. Feinperlige Kohlensäure für den perfekten Prickel.",
      zutaten: "Wasser, Kohlensäure, Zitronensaft aus Zitronensaftkonzentrat (5 %), Säuerungsmittel Citronensäure, natürliches Zitronenaroma, Süßungsmittel (Sucralose, Acesulfam-K)",
      allergene: "Keine kennzeichnungspflichtigen Allergene.",
      pairing: ["Thai-Curry", "Fischfilet mit Kräuterkruste", "Mediterrane Antipasti", "Käsekuchen"],
      eckdaten: [["Zucker", "0 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 4, kcal: 1, fett: 0, gesFett: 0, kh: 0.3, zucker: 0, eiweiss: 0, salz: 0.01 }
    },
    {
      id: "limo-orange-zero",
      name: "Limo Orange Zero",
      etikett: ["ORANGE", "ZERO"],
      linie: "limo", sorte: "Orange",
      gebinde: "dose", dose: "hell", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#F08A24",
      alkohol: 0, alkoholfrei: true, zero: true, protein: false,
      kurz: "Sonnig-fruchtige Orange ganz ohne Zucker.",
      geschmack: "Leuchtend orange und saftig. Reife Orange mit einem Hauch Mandarine, angenehm süß und mild in der Säure. Ein fruchtiger Klassiker – nur eben ohne Zucker.",
      zutaten: "Wasser, Kohlensäure, Orangensaft aus Orangensaftkonzentrat (6 %), Säuerungsmittel Citronensäure, natürliches Orangenaroma, färbendes Lebensmittel (Karottenkonzentrat), Süßungsmittel (Sucralose, Acesulfam-K)",
      allergene: "Keine kennzeichnungspflichtigen Allergene.",
      pairing: ["Pancakes", "Gebratener Tofu mit Sesam", "Chili con Carne", "Schokoladenkuchen"],
      eckdaten: [["Zucker", "0 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 6, kcal: 2, fett: 0, gesFett: 0, kh: 0.4, zucker: 0, eiweiss: 0, salz: 0.01 }
    },
    {
      id: "limo-blutorange-zero",
      name: "Limo Blutorange Zero",
      etikett: ["BLUTORANGE", "ZERO"],
      linie: "limo", sorte: "Blutorange",
      gebinde: "dose", dose: "hell", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#C42E4A",
      alkohol: 0, alkoholfrei: true, zero: true, protein: false,
      kurz: "Herb-fruchtige Blutorange – zuckerfrei und tiefrot.",
      geschmack: "Rubinrot im Glas. Aromen von Blutorange, roten Beeren und einer leicht herben Zitrusnote. Weniger süß als klassische Orangenlimo und dadurch besonders erfrischend.",
      zutaten: "Wasser, Kohlensäure, Blutorangensaft aus Blutorangensaftkonzentrat (6 %), Säuerungsmittel Citronensäure, natürliches Blutorangenaroma, färbendes Lebensmittel (Konzentrat aus Schwarzer Karotte), Süßungsmittel (Sucralose, Acesulfam-K)",
      allergene: "Keine kennzeichnungspflichtigen Allergene.",
      pairing: ["Burrata mit Rucola", "Ente mit Rotkohl", "Gegrillter Halloumi", "Panna cotta"],
      eckdaten: [["Zucker", "0 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 6, kcal: 2, fett: 0, gesFett: 0, kh: 0.4, zucker: 0, eiweiss: 0, salz: 0.01 }
    },
    {
      id: "limo-zitrone-protein",
      name: "Limo Zitrone Protein",
      etikett: ["ZITRONE", "PROTEIN"],
      linie: "limo", sorte: "Zitrone",
      gebinde: "dose", dose: "dunkel", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#F2C318",
      alkohol: 0, alkoholfrei: true, zero: false, protein: true,
      kurz: "Zitronenlimo mit 4 g Protein pro 100 ml – leicht und klar.",
      geschmack: "Hellgelb und fast klar dank Molkenproteinisolat. Frische, saftige Zitrone mit leichter Süße und einem weichen, runden Mundgefühl. Ohne milchigen Beigeschmack.",
      zutaten: "Wasser, Molkenproteinisolat (aus Milch) (4,4 %), Zitronensaft aus Zitronensaftkonzentrat (4 %), Kohlensäure, Säuerungsmittel Citronensäure, Stabilisator Pektin, natürliches Zitronenaroma, Süßungsmittel Sucralose",
      allergene: "Enthält Milch.",
      pairing: ["Hähnchen-Wrap", "Griechischer Joghurt mit Beeren", "Linsensalat", "Proteinriegel"],
      eckdaten: [["Protein je Dose", "13,2 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 84, kcal: 20, fett: 0, gesFett: 0, kh: 0.9, zucker: 0.8, eiweiss: 4.0, salz: 0.04 }
    },
    {
      id: "limo-orange-protein",
      name: "Limo Orange Protein",
      etikett: ["ORANGE", "PROTEIN"],
      linie: "limo", sorte: "Orange",
      gebinde: "dose", dose: "dunkel", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#F08A24",
      alkohol: 0, alkoholfrei: true, zero: false, protein: true,
      kurz: "Saftige Orange mit 4 g Protein pro 100 ml.",
      geschmack: "Fruchtig-süße Orange mit einem Hauch Vanille im Abgang. Das Protein sorgt für ein volles, weiches Mundgefühl, die feine Kohlensäure hält das Ganze leicht.",
      zutaten: "Wasser, Molkenproteinisolat (aus Milch) (4,4 %), Orangensaft aus Orangensaftkonzentrat (5 %), Kohlensäure, Säuerungsmittel Citronensäure, Stabilisator Pektin, natürliches Orangenaroma, färbendes Lebensmittel (Karottenkonzentrat), Süßungsmittel Sucralose",
      allergene: "Enthält Milch.",
      pairing: ["Overnight Oats", "Hähnchen-Teriyaki", "Süßkartoffel-Bowl", "Quarkspeise"],
      eckdaten: [["Protein je Dose", "13,2 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 88, kcal: 21, fett: 0, gesFett: 0, kh: 1.1, zucker: 1.0, eiweiss: 4.0, salz: 0.04 }
    },
    {
      id: "limo-blutorange-protein",
      name: "Limo Blutorange Protein",
      etikett: ["BLUTORANGE", "PROTEIN"],
      linie: "limo", sorte: "Blutorange",
      gebinde: "dose", dose: "dunkel", volumen: "0,33 l Dose (bepfandet)",
      farbe: "#C42E4A",
      alkohol: 0, alkoholfrei: true, zero: false, protein: true,
      kurz: "Herb-fruchtige Blutorange mit 4 g Protein pro 100 ml.",
      geschmack: "Tiefrot und intensiv: Blutorange, ein Hauch Grapefruit und rote Beeren. Angenehm herb, kaum süß und mit einem weichen, vollen Mundgefühl.",
      zutaten: "Wasser, Molkenproteinisolat (aus Milch) (4,4 %), Blutorangensaft aus Blutorangensaftkonzentrat (5 %), Kohlensäure, Säuerungsmittel Citronensäure, Stabilisator Pektin, natürliches Blutorangenaroma, färbendes Lebensmittel (Konzentrat aus Schwarzer Karotte), Süßungsmittel Sucralose",
      allergene: "Enthält Milch.",
      pairing: ["Lachs-Poke-Bowl", "Rote-Bete-Salat mit Walnüssen", "Gegrilltes Gemüse", "Skyr mit Granola"],
      eckdaten: [["Protein je Dose", "13,2 g"], ["Trinktemperatur", "4–6 °C"]],
      naehrwerte: { kj: 88, kcal: 21, fett: 0, gesFett: 0, kh: 1.0, zucker: 0.9, eiweiss: 4.0, salz: 0.04 }
    }
  ]
};
