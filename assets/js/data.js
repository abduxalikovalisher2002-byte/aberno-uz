/* ==========================================================
   Aberno Group — mahsulotlar katalogi
   Manba: «Katalog Bulut» (14.08.2026). Har bir yozuv katalogdagi
   jadvaldan olingan; `n` — katalogdagi tartib raqami.
   ========================================================== */
window.ABERNO = (function () {
  "use strict";

  var CELL = "100% sellyuloza";
  var MAK = "Makulatura";
  var WET = "Viskoza 20%, poliefir 80%";

  var brands = {
    bulut: { name: "Bulut", page: "bulut.html", tone: "sky" },
    pandoozy: { name: "PanDoozy", page: "pandoozy.html", tone: "leaf" }
  };

  var categories = [
    {
      id: "salfetka",
      name: "Qogʻoz salfetkalar",
      one: "Qogʻoz salfetka",
      lead: "Dasturxon uchun klassik, dekorativ va dispenserga moʻljallangan salfetkalar.",
      use: "Dasturxon, kafe va restoranlar hamda har kungi foydalanish uchun.",
      show: ["s09", "s03", "s08"]
    },
    {
      id: "sochiq",
      name: "Qogʻoz sochiqlar",
      one: "Qogʻoz sochiq",
      lead: "Uch qatlamli BIG rulonlari va ikki donali qadoq — oshxona uchun.",
      use: "Oshxona va maishiy ehtiyojlar uchun.",
      show: ["t02", "t01", "t06"]
    },
    {
      id: "nam",
      name: "Nam salfetkalar",
      one: "Nam salfetka",
      lead: "120 donali qadoqlar: premium, kundalik va bolalar uchun.",
      use: "Qoʻl va yuz gigiyenasi, safar va har kungi foydalanish uchun.",
      show: ["w01", "w03", "w02"]
    },
    {
      id: "quti",
      name: "Qutili salfetkalar",
      one: "Qutili salfetka",
      lead: "Premium, avtomobil va universal qutilar — oʻn yetti xil dizaynda.",
      use: "Uy, ofis va avtomobil uchun.",
      show: ["b06", "u02", "b02"]
    },
    {
      id: "dispenser",
      name: "Dispenserlar",
      one: "Dispenser",
      lead: "HORECA V, Z, L hamda MEGA Rolls uchun premium dispenser.",
      use: "Kafe, restoran va mehmonxonalar (HoReCa) uchun.",
      show: ["d01", "d04", "d02"]
    },
    {
      id: "tualet",
      name: "Tualet qogʻozi",
      one: "Tualet qogʻozi",
      lead: "Olti, sakkiz va oltmish donali qadoqlar, Aroma turlari va Mega Rolls.",
      use: "Uy va jamoat joylari uchun.",
      show: ["h04", "h03", "h05"]
    }
  ];

  // [id, n, kategoriya, brend, nom, variant, miqdor, oʻlcham, tarkib, qatlam, rulon]
  var rows = [
    ["s01", 1, "salfetka", "bulut", "Qogʻoz salfetkalar", "Yashil qadoq", 100, "23×23", CELL, 1],
    ["s02", 2, "salfetka", "bulut", "Qogʻoz salfetkalar", "Yashil qadoq", 50, "23×23", CELL, 1],
    ["s03", 3, "salfetka", "bulut", "Qogʻoz salfetkalar", "Pushti qadoq", 100, "27×27", CELL, 1],
    ["s04", 4, "salfetka", "bulut", "Qogʻoz salfetkalar", "Pushti qadoq", 50, "27×27", CELL, 1],
    ["s05", 5, "salfetka", "bulut", "Dispenser uchun salfetkalar Z", "Z-buklama", 200, "", CELL, 2],
    ["s06", 6, "salfetka", "bulut", "Dispenser uchun salfetkalar V", "V-buklama", 150, "19,5×10,5", CELL, 2],
    ["s07", 7, "salfetka", "bulut", "Dekorativ qogʻoz salfetkalar", "Naqshli", 50, "27×27", CELL, 1],
    ["s08", 8, "salfetka", "bulut", "Dekorativ qogʻoz salfetkalar", "Oq, qizil, yashil, sariq", 20, "32×33", CELL, 2],
    ["s09", 9, "salfetka", "bulut", "Qogʻoz salfetkalar Longer", "Toʻq sariq qadoq", 40, "32×33", CELL, 2],
    ["s10", 10, "salfetka", "bulut", "Dispenser uchun salfetkalar", "Qadoqsiz blok", 180, "", CELL, 2],
    ["s11", 11, "salfetka", "bulut", "Dispenser uchun salfetkalar", "Qadoqsiz blok", 75, "17×21", CELL, 1],
    ["s12", 12, "salfetka", "bulut", "Qogʻoz salfetkalar", "Qadoqsiz blok", 200, "23×21", CELL, 1],
    ["s13", 13, "salfetka", "bulut", "Dispenser uchun salfetkalar", "Bulut qadogʻi", 100, "21×21", CELL, 2],

    ["t01", 14, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Koʻk", 1, "", CELL, 3, 1],
    ["t02", 15, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Toʻq koʻk", 1, "", CELL, 3, 1],
    ["t03", 16, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Pushti", 1, "", CELL, 3, 1],
    ["t04", 17, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Yashil", 1, "", CELL, 3, 1],
    ["t05", 18, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Binafsha", 1, "", CELL, 3, 1],
    ["t06", 19, "sochiq", "bulut", "Qogʻoz sochiq BIG", "Toʻq sariq", 1, "", CELL, 3, 1],
    ["t07", 20, "sochiq", "bulut", "Qogʻoz sochiqlar", "Ikki donali qadoq", 2, "", CELL, 2, 1],

    ["w01", 21, "nam", "bulut", "Premium nam salfetkalar", "Qora-oltin qadoq", 120, "", WET, 1],
    ["w02", 22, "nam", "bulut", "Nam salfetkalar", "Koʻk qadoq", 120, "", WET, 1],
    ["w03", 23, "nam", "bulut", "Bolalar nam salfetkalari", "Sariq qadoq", 120, "", WET, 1],
    ["w04", 24, "nam", "bulut", "Zal uchun toʻplam", "Quruq salfetka, nam salfetka, tish kavlagich", 0, "", "", 0],

    ["b01", 25, "quti", "bulut", "Premium qutili salfetkalar", "Toʻq koʻk geometrik dizayn", 100, "", CELL, 2],
    ["b02", 26, "quti", "bulut", "Premium qutili salfetkalar", "Pushti abstrakt dizayn", 100, "", CELL, 2],
    ["b03", 27, "quti", "bulut", "Premium qutili salfetkalar", "Firuza abstrakt dizayn", 100, "", CELL, 2],
    ["b04", 28, "quti", "bulut", "Premium qutili salfetkalar", "Och krem dizayn", 100, "", CELL, 2],
    ["b05", 29, "quti", "bulut", "Premium qutili salfetkalar", "Sakura dizayni", 100, "", CELL, 2],
    ["b06", 30, "quti", "bulut", "Premium qutili salfetkalar", "Qushlar dizayni", 100, "", CELL, 2],
    ["a01", 31, "quti", "bulut", "Avto qutili salfetkalar", "Qora-koʻk dizayn", 60, "", CELL, 2],
    ["a02", 32, "quti", "bulut", "Avto qutili salfetkalar", "Qora-oltin dizayn", 60, "", CELL, 2],
    ["a03", 33, "quti", "bulut", "Avto qutili salfetkalar", "Qizil gulli dizayn", 60, "", CELL, 2],
    ["a04", 34, "quti", "bulut", "Avto qutili salfetkalar", "Orxideya dizayni", 60, "", CELL, 2],
    ["a05", 35, "quti", "bulut", "Avto qutili salfetkalar", "Jigarrang charm dizayni", 60, "", CELL, 2],
    ["a06", 36, "quti", "bulut", "Avto qutili salfetkalar", "Karbon dizayni", 60, "", CELL, 2],
    ["a07", 37, "quti", "bulut", "Avto qutili salfetkalar", "Koʻk dizayn", 60, "", CELL, 2],
    ["u01", 38, "quti", "bulut", "Universal qutili salfetkalar", "Och koʻk kub", 100, "", CELL, 2],
    ["u02", 39, "quti", "bulut", "Universal qutili salfetkalar", "Qora kub", 100, "", CELL, 2],
    ["u03", 40, "quti", "bulut", "Universal qutili salfetkalar", "Toʻq qizil kub", 100, "", CELL, 2],
    ["u04", 41, "quti", "bulut", "Universal qutili salfetkalar", "Toʻq yashil kub", 100, "", CELL, 2],

    ["d01", 42, "dispenser", "bulut", "Dispenser HORECA V", "HoReCa uchun", 0, "", "", 0],
    ["d02", 43, "dispenser", "bulut", "Dispenser HORECA Z", "HoReCa uchun", 0, "", "", 0],
    ["d03", 44, "dispenser", "bulut", "Dispenser HORECA L", "HoReCa uchun", 0, "", "", 0],
    ["d04", 45, "dispenser", "bulut", "Premium dispenser", "MEGA Rolls uchun", 0, "", "", 0],

    ["h01", 46, "tualet", "bulut", "Tualet qogʻozi vtulkali", "Toʻq sariq qadoq", 6, "", MAK, 2],
    ["h02", 47, "tualet", "bulut", "Tualet qogʻozi vtulkasiz", "Yashil qadoq", 6, "", MAK, 2],
    ["h03", 48, "tualet", "bulut", "Tualet qogʻozi", "Koʻk qadoq", 6, "", CELL, 2],
    ["h04", 49, "tualet", "bulut", "Tualet qogʻozi Aroma", "Sariq qadoq", 8, "", CELL, 2],
    ["h05", 50, "tualet", "bulut", "Tualet qogʻozi Aroma", "Pushti qadoq", 8, "", CELL, 2],
    ["h06", 51, "tualet", "bulut", "Tualet qogʻozi", "Firuza qadoq", 8, "", CELL, 2],
    ["h07", 52, "tualet", "bulut", "Tualet qogʻozi", "Qadoqsiz", 6, "", CELL, 2],
    ["h08", 53, "tualet", "bulut", "Tualet qogʻozi", "Ulgurji blok", 60, "", CELL, 2],
    ["h09", 54, "tualet", "bulut", "Mega Rolls tualet qogʻozi", "Dispenser uchun", 1, "", MAK, 2],

    ["p01", 55, "tualet", "pandoozy", "Tualet qogʻozi vtulkasiz", "PanDoozy", 10, "", CELL, 6],
    ["p02", 56, "tualet", "pandoozy", "Tualet qogʻozi vtulkali", "PanDoozy", 10, "", CELL, 6],
    ["p03", 57, "salfetka", "pandoozy", "Qulay qadoqdagi salfetkalar", "PanDoozy", 345, "", CELL, 4],
    ["p04", 58, "salfetka", "pandoozy", "Qulay qadoqdagi salfetkalar", "PanDoozy", 70, "", CELL, 6]
  ];

  var products = rows.map(function (r) {
    var p = {
      id: r[0], n: r[1], cat: r[2], brand: r[3], name: r[4], variant: r[5],
      qty: r[6], size: r[7], comp: r[8], ply: r[9], rolls: r[10] || 0
    };
    p.img = "assets/img/products/" + p.id + ".jpg";
    p.thumb = "assets/img/products/thumb/" + p.id + ".jpg";
    p.url = "product.html?id=" + p.id;
    p.title = (p.brand === "pandoozy" ? "PanDoozy " : "Bulut ") + p.name.charAt(0).toLowerCase() + p.name.slice(1);
    var bits = [];
    if (p.variant && p.variant !== "PanDoozy") bits.push(p.variant);
    if (p.qty) bits.push(p.qty + " dona");
    if (p.size) bits.push(p.size + " sm");
    if (p.ply) bits.push(p.ply + " qatlam");
    p.desc = bits.join(", ");
    return p;
  });

  var byId = {};
  products.forEach(function (p) { byId[p.id] = p; });
  var catById = {};
  categories.forEach(function (c) { catById[c.id] = c; });

  return {
    brands: brands,
    categories: categories,
    products: products,
    byId: byId,
    catById: catById,
    contacts: {
      phones: ["+998 95 342-70-70", "+998 71 230-09-00", "+998 95 324-70-70"],
      email: "info@aberno.uz",
      social: [
        { brand: "Aberno", tg: "aberno_uz", ig: "aberno.uz" },
        { brand: "Bulut", tg: "bulut_napkin", ig: "bulut.napkins" },
        { brand: "Margaritto", tg: "margaritto_uzb", ig: "margaritto.uz" },
        { brand: "Smaylo", tg: "smaylo_uzb", ig: "smaylo.uz" }
      ]
    }
  };
})();
