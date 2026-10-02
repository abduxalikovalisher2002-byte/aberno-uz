/* ==========================================================
   Aberno Group — til almashtirish (oʻzbek, rus, ingliz)
   Sahifalar oʻzbek tilida yozilgan. Boshqa til tanlanganda matnlar
   I18N_DICT lugʻati va quyidagi qoidalar orqali almashtiriladi.
   ========================================================== */
window.I18N = (function () {
  "use strict";

  var LANGS = ["uz", "ru", "en"];
  var NAMES = { uz: "Oʻzbekcha", ru: "Русский", en: "English" };
  var DICT = window.I18N_DICT || {};

  var lang = "uz";
  try {
    var fromUrl = new URLSearchParams(location.search).get("lang");
    var saved = localStorage.getItem("lang");
    if (LANGS.indexOf(fromUrl) !== -1) { lang = fromUrl; localStorage.setItem("lang", lang); }
    else if (LANGS.indexOf(saved) !== -1) lang = saved;
  } catch (e) { /* saqlab boʻlmasa oʻzbekcha qoladi */ }
  var col = lang === "ru" ? 0 : 1;
  var ru = lang === "ru";

  function units(s) {
    return ru ? s.replace(/\bkg\b/g, "кг").replace(/(\d) g\b/g, "$1 г") : s;
  }
  // "BIG" kabi qisqartmalar kichik harfga oʻtkazilmaydi
  function lower(s) { return /^[A-ZА-Я]{2}/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1); }
  function upper(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function plies(n) {
    if (!ru) return n + "-ply";
    return n + (n === "1" ? " слой" : /^[234]$/.test(n) ? " слоя" : " слоёв");
  }

  // Raqam yoki nom qatnashgan matnlar uchun qoidalar: [andoza, ruscha, inglizcha]
  var RULES = [
    [/^(\d+) dona$/, function (m) { return m[1] + " шт."; }, function (m) { return m[1] + (m[1] === "1" ? " pc" : " pcs"); }],
    [/^(\d+) qatlam$/, function (m) { return plies(m[1]); }, function (m) { return plies(m[1]); }],
    [/^([\d×,.]+) sm$/, function (m) { return m[1] + " см"; }, function (m) { return m[1] + " cm"; }],
    [/^(\d+) ta natija$/, function (m) { return "Результатов: " + m[1]; }, function (m) { return m[1] + (m[1] === "1" ? " result" : " results"); }],
    [/^(\d+) ta mahsulot$/, function (m) { return "Товаров: " + m[1]; }, function (m) { return m[1] + (m[1] === "1" ? " product" : " products"); }],
    [/^Katalog № (\d+)$/, function (m) { return "Каталог № " + m[1]; }, function (m) { return "Catalogue No. " + m[1]; }],
    [/^katalog № (\d+)$/, function (m) { return "каталог № " + m[1]; }, function (m) { return "catalogue No. " + m[1]; }],
    [/^№ (\d+) \(2026\)$/, function (m) { return m[0]; }, function (m) { return "No. " + m[1] + " (2026)"; }],
    [/^Yogʻliligi (.+)$/, function (m) { return "Жирность " + m[1]; }, function (m) { return m[1] + " fat"; }],
    [/^«(.+)» boʻyicha hech narsa topilmadi$/, function (m) { return "По запросу «" + m[1] + "» ничего не найдено"; }, function (m) { return "Nothing found for “" + m[1] + "”"; }],
    [/^© (\d+) Aberno Group\. Barcha huquqlar himoyalangan\.$/, function (m) { return "© " + m[1] + " Aberno Group. Все права защищены."; }, function (m) { return "© " + m[1] + " Aberno Group. All rights reserved."; }],
    [/^(.+) × (\d+) dona = (.+)$/, function (m) { return units(m[1] + " × " + m[2] + " шт. = " + m[3]); }, function (m) { return m[1] + " × " + m[2] + " pcs = " + m[3]; }],
    [/^(.+) qadoqlar: (.+) sm \((.+) m³\)$/, function (m) { return units("Упаковки по " + m[1]) + ": " + m[2] + " см (" + m[3] + " м³)"; }, function (m) { return m[1] + " packs: " + m[2] + " cm (" + m[3] + " m³)"; }],
    [/^(\d+ kg) quti: (.+) sm \((.+) m³\)$/, function (m) { return units("Короб " + m[1]) + ": " + m[2] + " см (" + m[3] + " м³)"; }, function (m) { return m[1] + " box: " + m[2] + " cm (" + m[3] + " m³)"; }],
    [/^(\d+ kg) quti$/, function (m) { return units("Короб " + m[1]); }, function (m) { return m[1] + " box"; }],
    [/^Bir qadoqda (\d+) dona( rulon)?(?:, oʻlchami ([\d×,.]+) sm)?\. (.+)$/,
      function (m) { return "В упаковке " + m[1] + " шт." + (m[3] ? ", размер " + m[3] + " см" : "") + ". " + (find(m[4]) || m[4]); },
      function (m) { return m[1] + (m[2] ? " roll" : " pc") + (m[1] === "1" ? "" : "s") + " per pack" + (m[3] ? ", size " + m[3] + " cm" : "") + ". " + (find(m[4]) || m[4]); }],
    [/^(.+\.) Qadoq va yetkazib berish shartlari boʻyicha savdo boʻlimiga murojaat qiling\.$/,
      function (m) { return (find(m[1]) || m[1]) + " По вопросам упаковки и условий доставки обращайтесь в отдел продаж."; },
      function (m) { return (find(m[1]) || m[1]) + " For packaging and delivery terms, please contact our sales team."; }],
    [/^(Bulut|PanDoozy) (.+)$/, brandName, brandName]
  ];

  function brandName(m) {
    // Faqat lugʻatda aynan bor mahsulot nomlari uchun
    var hit = DICT[upper(m[2])];
    return hit && hit[col] ? m[1] + " " + lower(hit[col]) : null;
  }

  var SEPS = [" — ", " · ", ", "];

  // Tarjima topilmasa null qaytaradi
  function find(k, depth) {
    depth = depth || 0;
    var hit = DICT[k];
    if (hit && hit[col]) return hit[col];
    if (depth > 4) return null;

    for (var i = 0; i < RULES.length; i++) {
      var m = k.match(RULES[i][0]);
      if (m) {
        var out = RULES[i][1 + col](m);
        if (out) return out;
      }
    }
    for (var s = 0; s < SEPS.length; s++) {
      if (k.indexOf(SEPS[s]) === -1) continue;
      var changed = false;
      var parts = k.split(SEPS[s]).map(function (part) {
        var r = find(part, depth + 1);
        if (r) changed = true;
        return r || part;
      });
      if (changed) return parts.join(SEPS[s]);
    }
    var wrapped = k.match(/^(.+) \((.+)\)$/);
    if (wrapped) {
      var a = find(wrapped[1], depth + 1), b = find(wrapped[2], depth + 1);
      if (a || b) return (a || wrapped[1]) + " (" + (b || wrapped[2]) + ")";
    }
    if (/[.:]$/.test(k)) {
      var bare = find(k.slice(0, -1), depth + 1);
      if (bare) return bare + k.slice(-1);
    }
    var first = k.charAt(0);
    if (first !== first.toUpperCase()) {
      var cap = find(upper(k), depth + 1);
      if (cap) return lower(cap);
    }
    return null;
  }

  function t(s) {
    if (lang === "uz" || !s) return s;
    var k = String(s).replace(/\s+/g, " ").trim();
    if (!k) return s;
    var r = find(k);
    if (!r) return s;
    var str = String(s);
    return str.match(/^\s*/)[0] + r + str.match(/\s*$/)[0];
  }

  var ATTRS = ["aria-label", "alt", "placeholder", "title"];
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, NOSCRIPT: 1 };

  function attrs(el) {
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      if (!v) continue;
      var r = t(v);
      if (r !== v) el.setAttribute(ATTRS[i], r);
    }
  }

  function apply(node) {
    if (lang === "uz") return;
    if (node.nodeType === 3) {
      var parent = node.parentNode;
      if (parent && (SKIP[parent.nodeName] || (parent.closest && parent.closest("[data-no-i18n]")))) return;
      var r = t(node.nodeValue);
      if (r !== node.nodeValue) node.nodeValue = r;
      return;
    }
    if (node.nodeType !== 1 || SKIP[node.nodeName] || node.closest("[data-no-i18n]")) return;
    attrs(node);
    var walker = document.createTreeWalker(node, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (n.nodeType === 1 && (SKIP[n.nodeName] || n.hasAttribute("data-no-i18n"))) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      if (n.nodeType === 1) attrs(n);
      else {
        var out = t(n.nodeValue);
        if (out !== n.nodeValue) n.nodeValue = out;
      }
    }
  }

  function start() {
    document.documentElement.lang = lang;
    if (lang !== "uz") {
      document.title = t(document.title);
      var meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", t(meta.getAttribute("content")));
      apply(document.body);
      new MutationObserver(function (records) {
        records.forEach(function (rec) {
          if (rec.type === "attributes") attrs(rec.target);
          else Array.prototype.forEach.call(rec.addedNodes, apply);
        });
      }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ATTRS });
    }
    document.documentElement.classList.remove("i18n-pending");
  }

  function set(next) {
    if (LANGS.indexOf(next) === -1 || next === lang) return;
    var url = new URL(location.href);
    var hadParam = url.searchParams.has("lang");
    url.searchParams.delete("lang");
    try { localStorage.setItem("lang", next); }
    catch (e) { url.searchParams.set("lang", next); hadParam = true; }
    if (hadParam) location.replace(url.toString()); else location.reload();
  }

  return { lang: lang, langs: LANGS, names: NAMES, t: t, apply: apply, start: start, set: set };
})();
