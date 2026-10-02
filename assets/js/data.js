/* ==========================================================
   Aberno Group — mahsulotlar katalogi
   Manba: «Katalog Bulut» (14.08.2026) va «Aberno catalog» (Margaritto,
   Smaylo). Har bir yozuv katalogdan olingan; `n` — tartib raqami.
   ========================================================== */
window.ABERNO = (function () {
  "use strict";

  var CELL = "100% sellyuloza";
  var MAK = "Makulatura";
  var WET = "Viskoza 20%, poliefir 80%";

  var brands = {
    bulut: { name: "Bulut", page: "bulut.html", tone: "sky" },
    pandoozy: { name: "PanDoozy", page: "pandoozy.html", tone: "leaf" },
    margaritto: { name: "Margaritto", page: "margaritto.html" },
    smaylo: { name: "Smaylo", page: "smaylo.html" }
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
    },
    {
      id: "margarin",
      name: "Margarin",
      one: "Margarin",
      lead: "Uy oshxonasi uchun briketlar, korxonalar uchun 10 va 20 kg qutilar.",
      use: "Qandolat, non va qatlamli xamir mahsulotlari tayyorlash uchun.",
      photo: "m01"
    },
    {
      id: "spred",
      name: "Spred",
      one: "Spred",
      lead: "Nonushta, pishiriq va issiq taomlar uchun oʻsimlik yogʻli spredlar.",
      use: "Buterbrod, pishiriq, garnir va issiq taomlar uchun.",
      photo: "y01"
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

  /* Margaritto va Smaylo: «Aberno catalog» dagi tavsif, qadoq va quti oʻlchamlari */
  var BOX_10_20 = ["10 kg quti: 14,5×22×36,5 sm (0,0116435 m³)", "20 kg quti: 22×25×39 sm (0,02145 m³)"];
  var PLOMBIR = "Katta hajmdagi buyurtmalarda mijoz xohishiga koʻra qaymoqli taʼm va hid plombir taʼmi va hidiga almashtirilishi mumkin (eng kam buyurtma — 1 000 kg).";
  var SPRED_TEXT = "Oʻsimlik yogʻli spred aʼlo taʼm sifatlariga ega. Buterbrod tayyorlash uchun juda mos, shuningdek sut mahsulotlari va garnirlarga qoʻshish, sabzavot va goʻsht qovurish, unli qandolat (shirin pechenye, pryanik, suli pechenyesi, keks) hamda non mahsulotlari (non, baton, bulochka) pishirishda ishlatiladi.";
  var SPRED_USES = ["Nonushta uchun", "Desertlar", "Somsa va qatlamli pishiriqlar", "Issiq taomlar va garnirlar"];

  var food = [
    {
      id: "m01", cat: "margarin", brand: "margaritto", name: "Margaritto Universal 80%", fat: "80%", type: "Margarin",
      packs: "Briket: 200 g va 500 g",
      boxQty: ["200 g × 30 dona = 6 kg", "500 g × 12 dona = 6 kg"],
      boxSize: ["200 g qadoqlar: 8×20×35 sm (0,007 m³)", "500 g qadoqlar: 13×21×25 sm (0,006825 m³)"],
      text: ["Turli qandolat mahsulotlari tayyorlash uchun moʻljallangan, qaymoqli taʼmga ega margarin.", "Unli mahsulotlar, qumoq xamir, non va xamirturushli xamir mahsulotlari uchun mos. Asosan uy bekalari turli pishiriqlar tayyorlashda ishlatadi."],
      uses: ["Non va bulochkalar", "Qumoq xamir va tortlar", "Napoleon va medovik", "Pechenye va somsa"]
    },
    {
      id: "m02", cat: "margarin", brand: "margaritto", name: "Margaritto qatlamli xamir uchun 80%", fat: "80%", type: "Margarin",
      packs: "Briket: 200 g va 500 g",
      boxQty: ["200 g × 30 dona = 6 kg", "500 g × 12 dona = 6 kg"],
      boxSize: ["200 g qadoqlar: 8×20×35 sm (0,007 m³)", "500 g qadoqlar: 13×21×25 sm (0,006825 m³)"],
      text: ["Qatlamli xamir mahsulotlari uchun maxsus ishlab chiqilgan. Asosan uy bekalari foydalanadi. Boshqa qandolat mahsulotlari uchun tavsiya etilmaydi.", "Bu margarin bilan tayyorlangan mahsulotlarda qatlamlar aniq va yaxshi ajraladi, hajm yaxshi chiqadi."],
      uses: ["Somsa", "Qatlamli xamir", "Kruassan", "Kremli naychalar va Napoleon torti"]
    },
    {
      id: "m03", cat: "margarin", brand: "margaritto", name: "Margaritto 82% qaymoqli taʼm", fat: "82%", type: "Margarin",
      packs: "Quti: 10 kg va 20 kg", boxQty: ["10 kg quti", "20 kg quti"], boxSize: BOX_10_20,
      text: ["Qandolat mahsulotlari va xamirturushli non mahsulotlari uchun maxsus ishlab chiqilgan universal margarin.", "Bu margarin bilan tayyorlangan mahsulotlar hajmdorroq boʻladi va pishirishda yaxshi koʻtariladi. Shuningdek, tayyor mahsulotning saqlash muddatini uzaytirishga yordam beradi: u uzoqroq yangi turadi va sifatini saqlaydi."],
      uses: ["Non va bulochkalar", "Qumoq xamir va tortlar", "Napoleon torti", "Asalli tort"]
    },
    {
      id: "m04", cat: "margarin", brand: "margaritto", name: "Margaritto 72% qaymoqli taʼm", fat: "72%", type: "Margarin",
      packs: "Quti: 10 kg va 20 kg", boxQty: ["10 kg quti", "20 kg quti"], boxSize: BOX_10_20,
      text: ["Turli qandolat mahsulotlari tayyorlash uchun moʻljallangan, toʻyingan qaymoqli taʼmga ega margarin.", "Unli mahsulotlar, non va xamirturushli xamir pishiriqlari uchun mos."],
      uses: ["Non", "Bulochkalar", "Qumoq xamir", "Tortlar"]
    },
    {
      id: "m05", cat: "margarin", brand: "margaritto", name: "Margaritto 72% kremlar uchun", fat: "72%", type: "Margarin",
      packs: "Quti: 10 kg va 20 kg", boxQty: ["10 kg quti", "20 kg quti"], boxSize: BOX_10_20,
      text: ["Krem tayyorlash uchun maxsus ishlab chiqilgan. Boshqa margarinlarga nisbatan rangi oqroq, taʼmi va hidi nozik qaymoqli. Bu margarin bilan tayyorlangan kremlar shaklini uzoqroq saqlaydi.", PLOMBIR],
      uses: ["Kremlar", "Sufle", "Qaynatma kremlar", "Profitrol uchun krem"]
    },
    {
      id: "m06", cat: "margarin", brand: "margaritto", name: "Margaritto 80% kremlar uchun", fat: "80%", type: "Margarin",
      packs: "Quti: 10 kg va 20 kg", boxQty: ["10 kg quti", "20 kg quti"], boxSize: BOX_10_20,
      text: ["Premium qandolat kremlari uchun maxsus ishlab chiqilgan. Boshqa margarinlarga nisbatan rangi oqroq, taʼmi nozik qaymoqli, hidi yoqimli. Kremlar shaklini uzoqroq saqlaydi; krem uchun moʻljallangan 72% margaringa nisbatan koʻproq hajm va uzoqroq barqarorlik beradi.", PLOMBIR],
      uses: ["Kremlar", "Sufle", "Qaynatma kremlar", "Profitrol uchun krem"]
    },
    {
      id: "m07", cat: "margarin", brand: "margaritto", name: "Margaritto qatlamli xamir uchun 80%, 10 kg", fat: "80%", type: "Margarin",
      packs: "Quti: 10 kg", boxQty: ["2 kg × 5 dona = 10 kg"], boxSize: ["2 kg qadoqlar: 12,5×31×38 sm (0,006 m³)"],
      text: ["Qatlamli xamir mahsulotlari uchun maxsus ishlab chiqilgan. Asosan somsa ishlab chiqaruvchilar eritib yoki eritmasdan ishlatadi.", "Boshqa qandolat mahsulotlari uchun tavsiya etilmaydi."],
      uses: ["Somsa", "Qatlamli pishiriqlar", "Kruassanlar", "Kremli naychalar va Napoleon torti"]
    },
    {
      id: "m08", cat: "margarin", brand: "margaritto", name: "Margaritto eritilgan oʻsimlik yogʻi 99%", fat: "99%", type: "Eritilgan oʻsimlik yogʻi",
      packs: "10 kg quti va 10 kg chelak", boxQty: ["10 kg quti"], boxSize: ["10 kg quti: 14,5×22×36,5 sm (0,0116435 m³)"],
      text: ["Xamirturushli xamir, qumoq xamir va turli qandolat mahsulotlari uchun ishlatiladi.", "Margaringa nisbatan bu yogʻ bilan tayyorlangan mahsulotlar sifatliroq va hajmdorroq chiqadi. Shuningdek, fritürda qovurish, taom pishirish va tovuq taomlari tayyorlash uchun mos."],
      uses: ["Non va patir", "Xamirturushli xamir mahsulotlari va tortlar", "Pechenye, qumoq xamir va pishiriqlar", "Issiq taomlar va tabaka tovuq"]
    },
    {
      id: "y01", cat: "spred", brand: "smaylo", name: "Smaylo spredi 82,5%", fat: "82,5%", type: "Oʻsimlik-sariyogʻli spred",
      packs: "Briket: 200 g va 500 g",
      boxQty: ["200 g × 30 dona = 6 kg", "500 g × 10 dona = 5 kg"],
      boxSize: ["200 g qadoqlar: 13×21×25 sm (0,006825 m³)", "500 g qadoqlar: 9,5×19×32 sm (0,005776 m³)"],
      text: ["Oʻsimlik-sariyogʻli spred aʼlo taʼm sifatlariga ega va sariyogʻga yaxshi muqobil.", "Buterbrod tayyorlash, sut mahsulotlari va garnirlarga qoʻshish, unli qandolat (shirin pechenye, pryanik, suli pechenyesi, keks) hamda non mahsulotlari (bulochka, non, baton, yopgan non) pishirish uchun juda mos."],
      uses: ["Nonushta uchun", "Keks va maffinlar", "Krem va glazurlar", "Makaron, boʻtqa va garnirlarga qoʻshiladi"]
    },
    {
      id: "y02", cat: "spred", brand: "smaylo", name: "Smaylo «For your table» 72%", fat: "72%", type: "Oʻsimlik yogʻli spred",
      packs: "Pergament briket: 500 g", boxQty: ["500 g × 20 dona = 10 kg"], boxSize: ["500 g qadoqlar: 13,5×25,5×35,5 sm (0,01222088 m³)"],
      text: [SPRED_TEXT], uses: SPRED_USES
    },
    {
      id: "y03", cat: "spred", brand: "smaylo", name: "Smaylo spredi 72%, 2,5 kg", fat: "72%", type: "Oʻsimlik yogʻli spred",
      packs: "Pergament briket: 2,5 kg", boxQty: ["2,5 kg × 2 dona = 5 kg"], boxSize: ["2,5 kg qadoqlar: 10×20×31 sm (0,0062 m³)"],
      text: [SPRED_TEXT], uses: SPRED_USES
    },
    {
      id: "y04", cat: "spred", brand: "smaylo", label: "Aberno", name: "«Slivochniy zavtrak» spredi 72%", fat: "72%", type: "Oʻsimlik yogʻli spred",
      packs: "Briket: 2,5 kg", boxQty: ["2,5 kg × 2 dona = 5 kg"], boxSize: ["2,5 kg qadoqlar: 10×20×31 sm (0,0062 m³)"],
      text: [SPRED_TEXT], uses: ["Nonushta uchun", "Non mahsulotlari", "Qumoq xamir va pishiriqlar", "Qovurish va pishirish"]
    }
  ];

  food.forEach(function (p, i) {
    p.n = rows.length + i + 1;
    p.photo = true;
    p.variant = ""; p.qty = 0; p.size = ""; p.comp = ""; p.ply = 0; p.rolls = 0;
    p.img = "assets/img/products/" + p.id + ".jpg";
    p.thumb = "assets/img/products/thumb/" + p.id + ".jpg";
    p.url = "product.html?id=" + p.id;
    p.title = p.name;
    p.desc = p.type + ", " + p.packs.charAt(0).toLowerCase() + p.packs.slice(1);
    p.useImgs = [1, 2, 3, 4].map(function (k) { return "assets/img/uses/" + p.id + "-" + k + ".jpg"; });
    products.push(p);
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
      address: "Toshkent sh., Yashnobod tumani, Uysozlash koʻchasi, 72",
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
