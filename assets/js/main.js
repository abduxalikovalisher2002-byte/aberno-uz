/* ==========================================================
   Aberno Group — umumiy skriptlar
   ========================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var DATA = window.ABERNO;
  var I18N = window.I18N;
  var T = I18N.t;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };
  var params = new URLSearchParams(location.search);

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value);
    } catch (e) { /* saqlab boʻlmasa ham sayt ishlayveradi */ }
    return null;
  }

  /* ---------- Belgilar ---------- */
  var ICON = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.5 3a7.5 7.5 0 0 1 5.96 12.05l4.25 4.24-1.42 1.42-4.24-4.25A7.5 7.5 0 1 1 10.5 3Zm0 2.4a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7.2 7.2 0 0 1 7.2 7.2c0 5.1-7.2 12.8-7.2 12.8S4.8 14.3 4.8 9.2A7.2 7.2 0 0 1 12 2Zm0 4.6a2.6 2.6 0 1 0 0 5.2 2.6 2.6 0 0 0 0-5.2Z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.2 3.9 13a5.6 5.6 0 0 1 7.9-7.9l.2.2.2-.2a5.6 5.6 0 0 1 7.9 7.9L12 21.2Z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2Z"/></svg>',
    tg: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21.94 4.32 18.76 19.3c-.24 1.06-.86 1.32-1.75.82l-4.84-3.57-2.33 2.25c-.26.26-.48.48-.97.48l.35-4.93 8.97-8.1c.39-.35-.08-.54-.6-.2L6.5 13.03l-4.77-1.5c-1.04-.32-1.06-1.04.22-1.54L20.6 2.8c.86-.32 1.62.2 1.34 1.52Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.25-3.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.800 3 2.800 15 0 18M12 3c-2.800 3-2.800 15 0 18"/></svg>',
    moon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.6 8.6 0 0 1 9.8 3.5a8.6 8.6 0 1 0 10.7 10.7Z"/></svg>',
    motion: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5h10v2H3v-2Zm4 4.5h14v2H7v-2Zm-4 4.5h10v2H3v-2Z"/></svg>'
  };

  function logo(color) {
    return '<svg viewBox="18 8 199 254" aria-hidden="true"><path fill="' + (color || "#cd9a5b") + '" d="M21 75 62 61l69 92V38l83-28v47l-41 13v23l41-13v46l-41 13v24l41-14v46l-83 27-34-45v-24l-14 5-21-27v34l-13 5 13 17v59l-41 13Z"/></svg>';
  }

  /* ==========================================================
     Mavzu va harakat sozlamalari
     ========================================================== */
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    $$("[data-toggle='theme']").forEach(function (b) { b.setAttribute("aria-pressed", String(theme === "dark")); });
  }
  function toggleTheme() {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    store("theme", next);
  }
  function applyMotion(reduce) {
    if (reduce) root.setAttribute("data-motion", "reduce"); else root.removeAttribute("data-motion");
    $$("[data-toggle='motion']").forEach(function (b) { b.setAttribute("aria-pressed", String(reduce)); });
  }
  function reducedMotion() {
    return root.getAttribute("data-motion") === "reduce" ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  // Foydalanuvchi oʻzi tanlamagan boʻlsa, tizim sozlamasi oʻzgarishini kuzatamiz
  if (darkQuery && darkQuery.addEventListener) {
    darkQuery.addEventListener("change", function (e) {
      if (!store("theme")) applyTheme(e.matches ? "dark" : "light");
    });
  }

  /* ==========================================================
     Tanlanganlar
     ========================================================== */
  var favs = (function () {
    var list = [];
    try { list = JSON.parse(store("aberno:fav") || "[]"); } catch (e) { list = []; }
    if (!Array.isArray(list)) list = [];
    list = list.filter(function (id) { return DATA.byId[id]; });

    function sync() {
      $$("[data-fav]").forEach(function (b) {
        var on = list.indexOf(b.getAttribute("data-fav")) !== -1;
        b.setAttribute("aria-pressed", String(on));
        var label = on ? "Tanlanganlardan olib tashlash" : "Tanlanganlarga qoʻshish";
        var text = $("[data-fav-label]", b);
        if (text) text.textContent = label; else b.setAttribute("aria-label", label);
      });
      $$("[data-fav-count]").forEach(function (el) {
        el.textContent = list.length;
        el.hidden = !list.length;
      });
    }
    return {
      has: function (id) { return list.indexOf(id) !== -1; },
      all: function () { return list.slice(); },
      toggle: function (id) {
        var i = list.indexOf(id);
        if (i === -1) list.push(id); else list.splice(i, 1);
        store("aberno:fav", JSON.stringify(list));
        sync();
        document.dispatchEvent(new CustomEvent("favchange"));
      },
      sync: sync
    };
  })();

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-fav]");
    if (btn) { e.preventDefault(); favs.toggle(btn.getAttribute("data-fav")); }
  });

  /* ==========================================================
     Umumiy qismlar: header, menyu, qidiruv, footer
     ========================================================== */
  var cats = DATA.categories;
  var contacts = DATA.contacts;
  var tel = function (p) { return "tel:" + p.replace(/[^\d+]/g, ""); };

  function catCount(id) {
    return DATA.products.filter(function (p) { return p.cat === id; }).length;
  }

  function renderHeader() {
    var header = $("[data-header]");
    if (!header) return;
    header.innerHTML =
      '<div class="topbar">' +
        '<nav class="topbar__brands" aria-label="Brendlar">' +
          '<a href="bulut.html">Bulut</a><a href="margaritto.html">Margaritto</a><a href="smaylo.html">Smaylo</a></nav>' +
        '<div class="topbar__tools">' +
          '<button class="toggle" type="button" data-toggle="motion" aria-pressed="false" aria-label="Harakatni kamaytirish">' +
            '<span class="toggle__track" aria-hidden="true"></span>' + ICON.motion + '<span class="toggle__label">Harakatni kamaytirish</span></button>' +
          '<button class="toggle" type="button" data-toggle="theme" aria-pressed="false" aria-label="Qorongʻu rejim">' +
            '<span class="toggle__track" aria-hidden="true"></span>' + ICON.moon + '<span class="toggle__label">Qorongʻu rejim</span></button>' +
          '<div class="lang" role="group" aria-label="Til" data-no-i18n>' +
            I18N.langs.map(function (l) {
              return '<button class="lang__btn" type="button" data-lang="' + l + '" lang="' + l + '" aria-pressed="' + (l === I18N.lang) + '" title="' + I18N.names[l] + '">' + l.toUpperCase() + "</button>";
            }).join("") +
          "</div>" +
        "</div>" +
      "</div>" +
      '<div class="hdr">' +
        '<button class="hdr__btn" type="button" data-open="menu" aria-haspopup="dialog" aria-expanded="false">' +
          '<span class="hdr__bars" aria-hidden="true"><i></i><i></i></span><span>Menyu</span></button>' +
        '<a class="hdr__logo" href="index.html" aria-label="Aberno Group — bosh sahifa">' + logo() + '</a>' +
        '<div class="hdr__tools">' +
          '<button class="hdr__btn" type="button" data-open="search" aria-haspopup="dialog" aria-label="Qidiruv">' + ICON.search + '<span>Qidiruv</span></button>' +
          '<a class="hdr__btn" href="contact.html" aria-label="Bogʻlanish">' + ICON.pin + '<span>Bogʻlanish</span></a>' +
          '<a class="hdr__btn" href="products.html?view=fav" aria-label="Tanlanganlar">' + ICON.heart + '<span>Tanlanganlar</span><span class="hdr__count" data-fav-count hidden>0</span></a>' +
        '</div>' +
      '</div>';
  }

  var MENU = [
    {
      label: "Mahsulotlar", sub: "mahsulotlar", title: "Mahsulotlar",
      links: [["products.html", "Barcha mahsulotlar", true]]
        .concat(cats.map(function (c) { return ["products.html?cat=" + c.id, c.name]; }))
        .concat([["products.html?view=fav", "Tanlanganlar", true]])
    },
    { label: "Kolleksiya", href: "catalog.html" },
    {
      label: "Brendlar", sub: "brendlar", title: "Brendlar",
      links: [["brands.html", "Barcha brendlar", true], ["bulut.html", "Bulut"], ["pandoozy.html", "PanDoozy"], ["margaritto.html", "Margaritto"], ["smaylo.html", "Smaylo"]]
    },
    {
      label: "Kompaniya", sub: "kompaniya", title: "Aberno Group",
      links: [["about.html", "Biz haqimizda"], ["production.html", "Ishlab chiqarish"], ["partners.html", "Hamkorlik"]]
    },
    { label: "Aloqa", href: "contact.html" }
  ];

  function renderMenu() {
    var el = document.createElement("div");
    el.className = "menu";
    el.id = "menu";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Menyu");
    el.innerHTML =
      '<div class="menu__backdrop" data-close></div>' +
      '<nav class="menu__panel" aria-label="Asosiy menyu">' +
        '<div class="menu__top"><button class="hdr__btn" type="button" data-close><span class="menu__close" aria-hidden="true"></span><span>Yopish</span></button></div>' +
        '<ul class="menu__list">' +
          MENU.map(function (m) {
            return "<li>" + (m.href
              ? '<a class="menu__item" href="' + m.href + '">' + m.label + "</a>"
              : '<button class="menu__item" type="button" data-sub="' + m.sub + '" aria-expanded="false">' + m.label + "</button>") + "</li>";
          }).join("") +
        "</ul>" +
        '<div class="menu__foot">' +
          '<a href="' + tel(contacts.phones[0]) + '">' + ICON.phone + contacts.phones[0] + "</a>" +
          '<a href="https://t.me/' + contacts.social[0].tg + '" target="_blank" rel="noopener">' + ICON.tg + "Telegram: @" + contacts.social[0].tg + "</a>" +
          '<a href="https://instagram.com/' + contacts.social[0].ig + '" target="_blank" rel="noopener">' + ICON.ig + "Instagram: @" + contacts.social[0].ig + "</a>" +
        "</div>" +
      "</nav>" +
      MENU.filter(function (m) { return m.sub; }).map(function (m) {
        return '<div class="menu__sub" data-sub-panel="' + m.sub + '">' +
          '<button class="menu__back" type="button" data-sub-back>Orqaga</button>' +
          "<h2>" + m.title + "</h2><ul>" +
          m.links.map(function (l) { return '<li><a href="' + l[0] + '"' + (l[2] ? ' class="is-strong"' : "") + ">" + l[1] + "</a></li>"; }).join("") +
          "</ul></div>";
      }).join("");
    document.body.appendChild(el);

    function openSub(id) {
      $$(".menu__sub", el).forEach(function (s) { s.classList.toggle("is-open", s.getAttribute("data-sub-panel") === id); });
      $$("[data-sub]", el).forEach(function (b) { b.setAttribute("aria-expanded", String(b.getAttribute("data-sub") === id)); });
    }
    $$("[data-sub]", el).forEach(function (btn) {
      var id = btn.getAttribute("data-sub");
      btn.addEventListener("click", function () {
        openSub(btn.getAttribute("aria-expanded") === "true" ? null : id);
        var first = $('[data-sub-panel="' + id + '"] a', el);
        // Panel koʻrinadigan boʻlgach fokus oʻtkaziladi
        if (first && btn.getAttribute("aria-expanded") === "true") setTimeout(function () { first.focus({ preventScroll: true }); }, 80);
      });
      btn.addEventListener("mouseenter", function () {
        if (window.matchMedia("(min-width: 900px) and (hover: hover)").matches) openSub(id);
      });
    });
    $$("[data-sub-back]", el).forEach(function (b) { b.addEventListener("click", function () { openSub(null); }); });
    el.addEventListener("overlayclose", function () { openSub(null); });
    return el;
  }

  function card(p) {
    if (p.photo) {
      return '<li class="pcard pcard--photo">' +
        '<a class="pcard__link" href="' + p.url + '" aria-label="' + esc(p.title + " — " + p.desc) + '"></a>' +
        '<button class="fav" type="button" data-fav="' + p.id + '" aria-pressed="false" aria-label="Tanlanganlarga qoʻshish">' + ICON.heart + "</button>" +
        '<figure class="pcard__fig"><img src="' + p.thumb + '" alt="" loading="lazy" width="840" height="350"></figure>' +
        '<div class="pcard__text"><p class="pcard__brand">' + (p.label || DATA.brands[p.brand].name) + '</p><h3 class="pcard__name">' + esc(p.name) + '</h3><p class="pcard__desc">' + esc(p.desc) + "</p></div>" +
        "</li>";
    }
    var leaf = p.brand === "pandoozy";
    return '<li class="pcard">' +
      '<a class="pcard__link" href="' + p.url + '" aria-label="' + esc(p.title + (p.desc ? " — " + p.desc : "")) + '"></a>' +
      '<button class="fav" type="button" data-fav="' + p.id + '" aria-pressed="false" aria-label="Tanlanganlarga qoʻshish">' + ICON.heart + "</button>" +
      '<div class="pcard__text"><p class="pcard__brand">' + (p.label || DATA.brands[p.brand].name) + '</p><h3 class="pcard__name">' + esc(p.name) + '</h3><p class="pcard__desc">' + esc(p.desc) + "</p></div>" +
      '<figure class="pcard__fig sky' + (leaf ? " sky--leaf" : "") + '"><img class="feather" src="' + p.thumb + '" alt="" loading="lazy" width="440" height="440"></figure>' +
      "</li>";
  }

  function renderSearch() {
    var el = document.createElement("div");
    el.className = "search";
    el.id = "search";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-modal", "true");
    el.setAttribute("aria-label", "Qidiruv");
    el.innerHTML =
      '<div class="search__backdrop" data-close></div>' +
      '<div class="search__panel">' +
        '<div class="search__top"><button class="hdr__btn" type="button" data-close><span class="menu__close" aria-hidden="true"></span><span>Yopish</span></button></div>' +
        '<label class="search__field">' + ICON.search +
          '<span class="visually-hidden">Mahsulot qidirish</span>' +
          '<input type="search" placeholder="Mahsulot qidirish" autocomplete="off" spellcheck="false"></label>' +
        '<div class="search__hint"><h2>Tezkor havolalar</h2><ul>' +
          cats.map(function (c) { return '<li><a href="products.html?cat=' + c.id + '">' + c.name + "</a></li>"; }).join("") +
          '<li><a href="products.html?brand=pandoozy">PanDoozy</a></li>' +
        "</ul></div>" +
        '<p class="search__count" aria-live="polite" hidden></p>' +
        '<ul class="grid grid--bare search__results"></ul>' +
      "</div>";
    document.body.appendChild(el);

    var input = $("input", el);
    var results = $(".search__results", el);
    var count = $(".search__count", el);
    var hint = $(".search__hint", el);
    // "o'", "oʻ", "o`" kabi turli yozilishlar bir xil topilishi uchun
    var norm = function (s) { return s.toLowerCase().replace(/[ʻʼ'`’‘]/g, "").replace(/\s+/g, " ").trim(); };
    var index = DATA.products.map(function (p) {
      // Tanlangan tildagi nomlar ham qidiruvga kiradi
      var words = [p.title, p.variant, p.desc, DATA.catById[p.cat].name, DATA.brands[p.brand].name];
      return { p: p, text: norm(words.concat(words.map(T)).join(" ")) };
    });

    input.addEventListener("input", function () {
      var q = norm(input.value);
      if (q.length < 2) {
        results.innerHTML = ""; count.hidden = true; hint.hidden = false;
        return;
      }
      var words = q.split(" ");
      var found = index.filter(function (it) { return words.every(function (w) { return it.text.indexOf(w) !== -1; }); });
      hint.hidden = !!found.length;
      count.hidden = false;
      count.textContent = found.length ? found.length + " ta natija" : "«" + input.value.trim() + "» boʻyicha hech narsa topilmadi";
      results.innerHTML = found.slice(0, 12).map(function (it) { return card(it.p); }).join("");
      favs.sync();
    });
    el.addEventListener("overlayopen", function () { setTimeout(function () { input.focus(); }, 80); });
    return el;
  }

  function renderFooter() {
    var footer = $("[data-footer]");
    if (!footer) return;
    var main = contacts.social[0];
    footer.innerHTML =
      '<div class="ft__logo">' + logo() + '<div class="ft__word">ABERNO<small>GROUP</small></div></div>' +
      '<nav class="ft__brands" aria-label="Brendlar">' +
        '<a href="bulut.html">Bulut</a><a href="margaritto.html">Margaritto</a><a href="smaylo.html">Smaylo</a><a href="pandoozy.html">PanDoozy</a></nav>' +
      '<div class="ft__share"><span>Bizni kuzating</span><ul>' +
        '<li><a href="https://t.me/' + main.tg + '" target="_blank" rel="noopener" aria-label="Aberno Telegram kanali">' + ICON.tg + "</a></li>" +
        '<li><a href="https://instagram.com/' + main.ig + '" target="_blank" rel="noopener" aria-label="Aberno Instagram sahifasi">' + ICON.ig + "</a></li>" +
        '<li><a href="' + tel(contacts.phones[0]) + '" aria-label="Qoʻngʻiroq qilish">' + ICON.phone + "</a></li>" +
      "</ul></div>" +
      '<div class="ft__main">' +
        '<nav class="ft__cols" aria-label="Quyi menyu">' +
          '<div class="ft__col"><div class="ft__group"><h2><a href="products.html">Aberno mahsulotlari</a></h2><ul>' +
            cats.map(function (c) { return '<li><a href="products.html?cat=' + c.id + '">' + c.name + "</a></li>"; }).join("") +
            '<li class="is-gap"><a href="products.html">Barcha mahsulotlar</a></li>' +
            '<li><a href="catalog.html">Kolleksiya</a></li>' +
            '<li><a href="products.html?view=fav">Tanlanganlar</a></li>' +
          "</ul></div></div>" +
          '<div class="ft__col">' +
            '<div class="ft__group"><h2><a href="brands.html">Brendlar</a></h2><ul>' +
              '<li><a href="bulut.html">Bulut</a></li><li><a href="pandoozy.html">PanDoozy</a></li>' +
              '<li><a href="margaritto.html">Margaritto</a></li><li><a href="smaylo.html">Smaylo</a></li></ul></div>' +
            '<div class="ft__group"><h2><a href="about.html">Aberno Group</a></h2><ul>' +
              '<li><a href="about.html">Biz haqimizda</a></li><li><a href="production.html">Ishlab chiqarish</a></li>' +
              '<li><a href="partners.html">Hamkorlik</a></li></ul></div>' +
          "</div>" +
          '<div class="ft__col">' +
            '<div class="ft__group"><h3>Yordam va aloqa</h3><ul>' +
              '<li><a href="contact.html">Xabar yuborish</a></li>' +
              contacts.phones.map(function (p) { return '<li><a href="' + tel(p) + '">' + p + "</a></li>"; }).join("") +
              '<li><a href="mailto:' + contacts.email + '">' + contacts.email + "</a></li></ul></div>" +
            '<div class="ft__group"><h3>Rasmiy kanallar</h3><ul>' +
              contacts.social.map(function (s) {
                return '<li><a href="https://t.me/' + s.tg + '" target="_blank" rel="noopener">' + s.brand + " — Telegram</a></li>" +
                  '<li><a href="https://instagram.com/' + s.ig + '" target="_blank" rel="noopener">' + s.brand + " — Instagram</a></li>";
              }).join("") +
            "</ul></div>" +
          "</div>" +
        "</nav>" +
        '<div class="ft__prefs">' +
          '<span class="ft__region">' + ICON.globe + "<span>Oʻzbekiston</span></span>" +
          '<div class="lang lang--names" role="group" aria-label="Til" data-no-i18n>' +
            I18N.langs.map(function (l) {
              return '<button class="lang__btn" type="button" data-lang="' + l + '" lang="' + l + '" aria-pressed="' + (l === I18N.lang) + '">' + I18N.names[l] + "</button>";
            }).join("") +
          "</div>" +
        "</div>" +
        '<div class="ft__legal"><span>© ' + new Date().getFullYear() + " Aberno Group. Barcha huquqlar himoyalangan.</span>" +
          '<a href="contact.html">Aloqa</a><a href="partners.html">Hamkorlik</a></div>' +
      "</div>" +
      '<aside class="ft__push"><img src="assets/img/cover.jpg" alt="" loading="lazy">' +
        "<p>Katalog 2026</p>" +
        '<a class="btn btn--glass" href="products.html">Batafsil</a></aside>';
  }

  /* ---------- Ochiluvchi oynalar (menyu, qidiruv) ---------- */
  function setupOverlays() {
    var overlays = { menu: renderMenu(), search: renderSearch() };
    var opener = null;

    function close() {
      Object.keys(overlays).forEach(function (k) {
        if (overlays[k].classList.contains("is-open")) {
          overlays[k].classList.remove("is-open");
          overlays[k].dispatchEvent(new CustomEvent("overlayclose"));
        }
      });
      root.classList.remove("is-locked");
      $$("[data-open]").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      if (opener) { opener.focus({ preventScroll: true }); opener = null; }
    }
    function open(name, btn) {
      close();
      opener = btn;
      overlays[name].classList.add("is-open");
      root.classList.add("is-locked");
      if (btn) btn.setAttribute("aria-expanded", "true");
      var first = $("[data-close]:not(.menu__backdrop):not(.search__backdrop)", overlays[name]);
      if (first) first.focus({ preventScroll: true });
      overlays[name].dispatchEvent(new CustomEvent("overlayopen"));
    }

    document.addEventListener("click", function (e) {
      var o = e.target.closest("[data-open]");
      if (o) { open(o.getAttribute("data-open"), o); return; }
      if (e.target.closest("[data-close]")) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if (e.key !== "Tab") return;
      // Fokus ochiq oynadan tashqariga chiqib ketmasin
      var active = Object.keys(overlays).map(function (k) { return overlays[k]; }).filter(function (o) { return o.classList.contains("is-open"); })[0];
      if (!active) return;
      var items = $$("a[href], button, input", active).filter(function (n) { return n.offsetParent !== null && getComputedStyle(n).visibility !== "hidden"; });
      if (!items.length) return;
      var first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- Header: pastga aylantirganda yashirinadi ---------- */
  function setupHeaderScroll() {
    var header = $("[data-header]");
    if (!header) return;
    var last = window.scrollY;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      header.classList.toggle("is-hidden", y > last && y > 160);
      last = y;
    }, { passive: true });
  }

  function setupReveal(ctx) {
    var items = $$(".reveal:not(.is-visible)", ctx);
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ==========================================================
     Bosh sahifa
     ========================================================== */
  function initHome() {
    var hero = $(".hero");
    if (!hero) return;
    var stage = $(".hero__stage", hero);
    var shade = $(".hero__shade", hero);
    var text = $(".hero__text", hero);
    var slides = $$(".hero__slide", hero);
    var copies = $$(".hero__copy", hero);
    var dots = $$(".hero__dot", hero);

    var ticking = false;
    function update() {
      ticking = false;
      var p = Math.min(Math.max(window.scrollY / stage.offsetHeight, 0), 1);
      shade.style.opacity = (p * 0.8).toFixed(3);
      text.style.opacity = Math.max(1 - p * 2.2, 0).toFixed(3);
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();

    // Uch brend navbat bilan koʻrsatiladi; nuqtalar orqali qoʻlda ham almashtiriladi
    var current = 0;
    var paused = false;
    function show(i) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) { s.classList.toggle("is-on", k === current); });
      copies.forEach(function (c, k) { c.classList.toggle("is-on", k === current); c.setAttribute("aria-hidden", String(k !== current)); });
      dots.forEach(function (d, k) { d.setAttribute("aria-pressed", String(k === current)); });
    }
    dots.forEach(function (d, k) { d.addEventListener("click", function () { paused = true; show(k); }); });
    show(0);
    setInterval(function () {
      if (paused || reducedMotion() || document.hidden || window.scrollY > stage.offsetHeight * 0.5) return;
      show(current + 1);
    }, 6000);
  }

  /* ==========================================================
     Kolleksiya sahifasi: kategoriya bannerlari
     ========================================================== */
  function initBanners() {
    var host = $("[data-banners]");
    if (!host) return;
    var items = cats.map(function (c) {
      return { cls: "", href: "products.html?cat=" + c.id, title: c.name, lead: c.lead, count: catCount(c.id), show: c.show, photo: c.photo };
    });
    items.push({
      cls: " sky--leaf", href: "products.html?brand=pandoozy", title: "PanDoozy",
      lead: "Toʻrt va olti qatlamli salfetkalar hamda tualet qogʻozi.",
      count: DATA.products.filter(function (p) { return p.brand === "pandoozy"; }).length,
      show: ["p04", "p03", "p02"]
    });
    host.innerHTML = items.map(function (it) {
      return '<li class="banner ' + (it.photo ? "banner--photo" : "sky" + it.cls) + ' reveal">' +
        (it.photo
          ? '<img class="banner__bg" src="' + DATA.byId[it.photo].img + '" alt="" loading="lazy">'
          : '<div class="banner__row" aria-hidden="true">' +
              it.show.map(function (id) { return '<img class="feather" src="' + DATA.byId[id].img + '" alt="" loading="lazy" width="900" height="900">'; }).join("") +
            "</div>") +
        '<div class="banner__text"><p class="eyebrow">' + it.count + " ta mahsulot</p>" +
          '<h2 class="h50">' + it.title + "</h2><p>" + it.lead + "</p>" +
          '<span class="link">Batafsil</span></div>' +
        '<a class="banner__link" href="' + it.href + '" aria-label="' + esc(it.title) + ' — batafsil"></a>' +
      "</li>";
    }).join("");
  }

  /* ==========================================================
     Mahsulotlar roʻyxati
     ========================================================== */
  function initList() {
    var host = $("[data-list]");
    if (!host) return;

    var PAGE = 24;
    var favView = params.get("view") === "fav";
    var state = {
      cat: DATA.catById[params.get("cat")] ? params.get("cat") : "",
      brand: DATA.brands[params.get("brand")] ? params.get("brand") : "",
      ply: /^[12346]$/.test(params.get("ply") || "") ? params.get("ply") : "",
      sort: "",
      mode: params.get("mode") === "gallery" ? "gallery" : "list",
      shown: PAGE
    };

    var SORTS = {
      "": { label: "Katalog tartibi", fn: function (a, b) { return a.n - b.n; } },
      name: { label: "Nomi: A–Z", fn: function (a, b) { return a.name.localeCompare(b.name, "uz") || a.n - b.n; } },
      qtyUp: { label: "Miqdori: kamdan koʻpga", fn: function (a, b) { return a.qty - b.qty || a.n - b.n; } },
      qtyDown: { label: "Miqdori: koʻpdan kamga", fn: function (a, b) { return b.qty - a.qty || a.n - b.n; } }
    };

    var STORIES = [
      { at: 2, cls: "", img: "d01", title: "HoReCa uchun yechimlar", sub: "Dispenserlar va sarf materiallari", href: "products.html?cat=dispenser" },
      { at: 7, cls: " sky--leaf", img: "p03", title: "PanDoozy", sub: "Toʻrt va olti qatlam", href: "products.html?brand=pandoozy" }
    ];

    var head = $("[data-list-head]");
    function renderHead() {
      var title = favView ? "Tanlanganlar"
        : state.cat ? DATA.catById[state.cat].name
        : state.brand ? DATA.brands[state.brand].name
        : "Barcha mahsulotlar";
      head.innerHTML = '<p class="eyebrow eyebrow--lg">' + (favView ? "Sizning tanlovingiz" : "Aberno mahsulotlari") + '</p><h1 class="h100">' + title + "</h1>";
      document.title = T(title + " — Aberno Group");
    }

    var grid = $("[data-grid]", host);
    var chipsEl = $("[data-chips]", host);
    var countEl = $("[data-count]", host);
    var moreEl = $("[data-more]", host);
    var emptyEl = $("[data-empty]", host);
    var filtersEl = $("[data-filters]", host);

    function base() {
      return favView ? DATA.products.filter(function (p) { return favs.has(p.id); }) : DATA.products;
    }
    function matches(p, skip) {
      return (skip === "cat" || !state.cat || p.cat === state.cat) &&
        (skip === "brand" || !state.brand || p.brand === state.brand) &&
        (skip === "ply" || !state.ply || String(p.ply) === state.ply);
    }

    function filterMenu(key, label, options) {
      var current = state[key];
      return '<div class="filter' + (current ? " is-set" : "") + '">' +
        '<button class="filter__btn" type="button" aria-haspopup="true" aria-expanded="false">' + label + "</button>" +
        '<div class="filter__menu" role="menu" hidden>' +
          options.map(function (o) {
            return '<button class="filter__opt" type="button" role="menuitemradio" aria-checked="' + (o.value === current) + '" data-set="' + key + '" data-value="' + o.value + '">' +
              o.label + (o.count !== undefined ? " <span>" + o.count + "</span>" : "") + "</button>";
          }).join("") +
        "</div></div>";
    }

    function renderFilters() {
      var pool = base();
      var count = function (key, value) {
        return pool.filter(function (p) {
          return matches(p, key) && (key === "cat" ? p.cat === value : key === "brand" ? p.brand === value : String(p.ply) === value);
        }).length;
      };
      var all = function (key) { return pool.filter(function (p) { return matches(p, key); }).length; };

      var catOpts = [{ value: "", label: "Barcha kategoriyalar", count: all("cat") }].concat(cats.map(function (c) {
        return { value: c.id, label: c.name, count: count("cat", c.id) };
      }));
      var brandOpts = [{ value: "", label: "Barcha brendlar", count: all("brand") }].concat(Object.keys(DATA.brands).map(function (b) {
        return { value: b, label: DATA.brands[b].name, count: count("brand", b) };
      }));
      var plyOpts = [{ value: "", label: "Farqi yoʻq", count: all("ply") }].concat(["1", "2", "3", "4", "6"].map(function (n) {
        return { value: n, label: n + " qatlam", count: count("ply", n) };
      }));
      var sortOpts = Object.keys(SORTS).map(function (k) { return { value: k, label: SORTS[k].label }; });
      var any = state.cat || state.brand || state.ply;

      if (chipsEl) {
        chipsEl.innerHTML = brandOpts.map(function (o) {
          return '<button class="chip" type="button" data-set="brand" data-value="' + o.value + '" aria-pressed="' + (o.value === state.brand) + '">' +
            (o.value ? o.label : "Barchasi") + "</button>";
        }).join("");
      }

      filtersEl.innerHTML =
        filterMenu("cat", "Kategoriya", catOpts) +
        filterMenu("brand", "Brend", brandOpts) +
        filterMenu("ply", "Qatlam", plyOpts) +
        (any ? '<button class="filters__clear" type="button" data-clear>Tozalash</button>' : "") +
        '<div class="filters__sort">' + filterMenu("sort", "Saralash", sortOpts) + "</div>";
    }

    function syncUrl() {
      var q = new URLSearchParams();
      if (favView) q.set("view", "fav");
      if (state.cat) q.set("cat", state.cat);
      if (state.brand) q.set("brand", state.brand);
      if (state.ply) q.set("ply", state.ply);
      if (state.mode === "gallery") q.set("mode", "gallery");
      var s = q.toString();
      history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
    }

    function render() {
      var list = base().filter(function (p) { return matches(p); }).sort(SORTS[state.sort].fn);
      var total = list.length;
      var visible = list.slice(0, state.shown);
      var html = visible.map(card);

      var plain = !favView && !state.cat && !state.brand && !state.ply && !state.sort && state.mode === "list";
      if (plain) {
        STORIES.forEach(function (s) {
          if (s.at > html.length) return;
          html.splice(s.at, 0,
            '<li class="pcard pcard--story sky' + s.cls + '">' +
              '<img class="pcard__bg feather" src="' + DATA.byId[s.img].img + '" alt="" loading="lazy" width="900" height="900">' +
              '<div class="pcard__text"><h3 class="pcard__name">' + s.title + '</h3><p class="pcard__desc">' + s.sub + '</p><span class="link">Batafsil</span></div>' +
              '<a class="pcard__link" href="' + s.href + '" aria-label="' + esc(s.title) + ' — batafsil"></a>' +
            "</li>");
        });
      }

      grid.className = "grid" + (state.mode === "gallery" ? " grid--gallery" : "");
      grid.innerHTML = html.join("");
      countEl.textContent = total + " ta natija";
      countEl.hidden = !total;
      emptyEl.hidden = !!total;
      if (!total) {
        emptyEl.innerHTML = favView && !state.cat && !state.brand && !state.ply
          ? '<h2 class="h30">Hozircha tanlanganlar yoʻq</h2><p class="lead">Yoqqan mahsulotdagi yurakcha belgisini bosing — u shu yerda saqlanadi.</p><a class="btn" href="products.html">Mahsulotlarni koʻrish</a>'
          : '<h2 class="h30">Hech narsa topilmadi</h2><p class="lead">Filtrlarni oʻzgartirib koʻring.</p><button class="btn" type="button" data-clear>Filtrlarni tozalash</button>';
      }
      moreEl.hidden = total <= state.shown;
      if (!moreEl.hidden) {
        $("[data-more-text]", moreEl).textContent = visible.length + " / " + total;
        $(".more__bar i", moreEl).style.width = (visible.length / total * 100) + "%";
      }
      $$("[data-mode]", host).forEach(function (t) { t.setAttribute("aria-selected", String(t.getAttribute("data-mode") === state.mode)); });
      renderHead();
      renderFilters();
      favs.sync();
      syncUrl();
    }

    function closeMenus(except) {
      $$(".filter__btn", filtersEl).forEach(function (b) {
        if (b === except) return;
        b.setAttribute("aria-expanded", "false");
        b.nextElementSibling.hidden = true;
      });
    }

    host.addEventListener("click", function (e) {
      var t = e.target;
      var btn = t.closest(".filter__btn");
      if (btn) {
        var open = btn.getAttribute("aria-expanded") !== "true";
        closeMenus(btn);
        btn.setAttribute("aria-expanded", String(open));
        btn.nextElementSibling.hidden = !open;
        return;
      }
      var opt = t.closest("[data-set]");
      if (opt) { state[opt.getAttribute("data-set")] = opt.getAttribute("data-value"); state.shown = PAGE; render(); return; }
      if (t.closest("[data-clear]")) { state.cat = state.brand = state.ply = ""; state.shown = PAGE; render(); return; }
      var mode = t.closest("[data-mode]");
      if (mode) { state.mode = mode.getAttribute("data-mode"); render(); return; }
      if (t.closest("[data-more-btn]")) { state.shown += PAGE; render(); }
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".filter")) closeMenus(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenus(); });
    document.addEventListener("favchange", function () { if (favView) render(); });

    render();
  }

  /* ==========================================================
     Mahsulot sahifasi
     ========================================================== */
  var PLY_WORD = { 1: "Bir qatlam", 2: "Ikki qatlam", 3: "Uch qatlam", 4: "Toʻrt qatlam", 6: "Olti qatlam" };

  function initProduct() {
    var host = $("[data-product]");
    if (!host) return;
    var p = DATA.byId[params.get("id")];
    if (!p) {
      host.innerHTML = '<section class="empty"><p class="eyebrow">Xatolik</p><h1 class="h70">Mahsulot topilmadi</h1>' +
        '<p class="lead">Havola eskirgan boʻlishi mumkin. Katalogdan qidirib koʻring.</p><a class="btn" href="products.html">Barcha mahsulotlar</a></section>';
      return;
    }
    var cat = DATA.catById[p.cat];
    var brand = DATA.brands[p.brand];
    var tone = p.brand === "pandoozy" ? " sky--leaf" : "";
    var ask = "contact.html?mavzu=mahsulot&mahsulot=" + p.id;

    document.title = T(p.title) + (p.desc ? ", " + T(p.desc) : "") + " — Aberno Group";
    var meta = $('meta[name="description"]');
    if (meta) meta.setAttribute("content", [p.title, p.desc, p.photo ? p.text[0] : p.comp].filter(Boolean).map(T).join(". ").replace(/\.$/, "") + ".");

    var same = DATA.products.filter(function (o) { return o.id !== p.id && o.name === p.name && o.brand === p.brand; });
    var others = DATA.products.filter(function (o) { return o.id !== p.id && o.cat === p.cat && same.indexOf(o) === -1; });
    var related = same.concat(others).slice(0, 3);

    /* Xususiyat bloklari faqat katalogda bor maʼlumotdan tuziladi */
    var features = [];
    if (p.comp) {
      features.push({
        eyebrow: "Tarkibi", title: p.comp,
        text: p.comp === "Makulatura"
          ? "Mahsulot makulaturadan — qayta ishlangan qogʻoz xomashyosidan tayyorlanadi."
          : p.cat === "nam"
            ? "Salfetka matosi 20% viskoza va 80% poliefirdan iborat."
            : "Mahsulot 100% sellyulozadan tayyorlanadi. Xomashyodan qadoqlashgacha boʻlgan har bir bosqich nazoratdan oʻtadi."
      });
    }
    if (p.ply) {
      var pack = [];
      if (p.qty) pack.push("Bir qadoqda " + p.qty + " dona" + (p.rolls ? " rulon" : ""));
      if (p.size) pack.push("oʻlchami " + p.size + " sm");
      features.push({
        eyebrow: "Qatlam va qadoq", title: PLY_WORD[p.ply] || p.ply + " qatlam",
        text: (pack.length ? pack.join(", ") + ". " : "") + cat.use
      });
    }
    if (p.photo) {
      features.push({ eyebrow: "Tavsif", title: "Yogʻliligi " + p.fat, text: p.text.join("</p><p>") });
    }
    if (!features.length) {
      features.push({ eyebrow: "Qoʻllanilishi", title: p.variant, text: cat.use + " Qadoq va yetkazib berish shartlari boʻyicha savdo boʻlimiga murojaat qiling." });
    }

    var facts = [];
    if (p.photo) facts.push(["Turi", p.type], ["Yogʻliligi", p.fat], ["Qadoq", p.packs]);
    if (p.qty) facts.push(["Miqdori", p.qty + " dona"]);
    if (p.rolls) facts.push(["Rulon", String(p.rolls)]);
    if (p.size) facts.push(["Oʻlchami", p.size + " sm"]);
    if (p.ply) facts.push(["Qatlam", String(p.ply)]);
    if (p.variant && p.variant !== "PanDoozy") facts.push([p.cat === "quti" ? "Dizayn" : "Turi", p.variant]);

    var dl = function (rows) {
      return "<dl>" + rows.map(function (r) { return "<div><dt>" + r[0] + "</dt><dd>" + esc(r[1]) + "</dd></div>"; }).join("") + "</dl>";
    };
    var list = function (items) {
      return items.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
    };
    var acc = p.photo ? [
      ["Asosiy xususiyatlar", dl(facts)],
      ["Qutidagi miqdor", list(p.boxQty)],
      ["Quti oʻlchami", list(p.boxSize)],
      ["Qoʻllanilishi", "<p>" + cat.use + "</p>"],
      ["Katalog", dl([["Brend", brand.name], ["Kategoriya", cat.name]]) +
        '<a class="link" href="' + ask + '">Toʻliq katalogni soʻrash</a>']
    ] : [
      ["Asosiy xususiyatlar", facts.length ? dl(facts) : "<p>Oʻlcham va toʻplam tarkibi boʻyicha savdo boʻlimidan maʼlumot oling.</p>"],
      ["Tarkibi", p.comp ? dl([["Tarkibi", p.comp]]) : "<p>Katalogda koʻrsatilmagan. Savdo boʻlimidan aniqlashtiring.</p>"],
      ["Qoʻllanilishi", "<p>" + cat.use + "</p>"],
      ["Katalog", dl([["Brend", brand.name], ["Kategoriya", cat.name], ["Katalog raqami", "№ " + p.n + " (2026)"]]) +
        '<a class="link" href="' + ask + '">Toʻliq katalogni soʻrash</a>']
    ];

    var hero = p.photo
      ? '<section class="phero phero--photo">' +
          '<img class="phero__bg" src="' + p.img + '" alt="' + esc(p.title) + '" fetchpriority="high">' +
          '<div class="phero__info">' +
            '<button class="phero__fav" type="button" data-fav="' + p.id + '" aria-pressed="false">' + ICON.heart + '<span data-fav-label>Tanlanganlarga qoʻshish</span></button>' +
            '<h1 class="phero__name">' + esc(p.title) + "</h1>" +
            '<p class="phero__desc">' + esc(p.desc) + "</p>" +
          "</div>" +
        "</section>"
      : "";
    var uses = p.photo
      ? '<section class="block block--soft"><div class="block__head reveal"><p class="eyebrow">Qoʻllanilishi</p><h2 class="h50">Nimalar tayyorlash mumkin</h2></div>' +
          '<ul class="uses">' + p.uses.map(function (u, i) {
            return '<li class="reveal"><img src="' + p.useImgs[i] + '" alt="" loading="lazy" width="760" height="400"><p>' + esc(u) + "</p></li>";
          }).join("") + "</ul></section>"
      : "";

    host.innerHTML = hero + (p.photo ? "" :
      '<section class="phero sky' + tone + '">' +
        '<div class="phero__info">' +
          '<button class="phero__fav" type="button" data-fav="' + p.id + '" aria-pressed="false">' + ICON.heart + '<span data-fav-label>Tanlanganlarga qoʻshish</span></button>' +
          '<h1 class="phero__name">' + esc(p.title) + "</h1>" +
          (p.desc ? '<p class="phero__desc">' + esc(p.desc) + "</p>" : "") +
          '<p class="phero__desc">Katalog № ' + p.n + "</p>" +
        "</div>" +
        '<img class="phero__img feather" src="' + p.img + '" alt="' + esc(p.title + (p.variant ? ", " + p.variant : "")) + '" width="900" height="900" fetchpriority="high">' +
        (same.length
          ? '<a class="phero__vars" href="#variantlar"><span>' +
              same.slice(0, 2).map(function (o) { return '<img src="' + o.thumb + '" alt="" width="96" height="96">'; }).join("") +
            "</span>Variantlarni koʻrish</a>"
          : "") +
        '<button class="phero__night" type="button" data-night>' + ICON.moon + "<span>Tungi rejimda koʻrish</span></button>" +
      "</section>") +

      '<section class="statement"><p class="eyebrow">' + brand.name + " · " + cat.name + "</p>" +
        '<h2 class="h70 reveal">' + esc(p.name) +
          (p.photo ? " — " + p.packs.charAt(0).toLowerCase() + p.packs.slice(1) : (p.qty ? " — " + p.qty + " dona" : "") + (p.ply ? ", " + p.ply + " qatlam" : "")) +
        ".</h2></section>" +

      features.map(function (f, i) {
        if (p.photo) {
          return '<section class="split"><div class="reveal"><p class="eyebrow">' + f.eyebrow + '</p><h2 class="h50 accent">' + esc(f.title) + "</h2></div>" +
            '<div class="reveal"><p class="lead">' + p.text.join('</p><p class="lead">') + "</p></div></section>";
        }
        return '<section class="feature' + (i % 2 ? " feature--flip" : "") + '">' +
          '<div class="feature__media sky' + tone + '"><img class="feather" src="' + (i && same[0] ? same[0].img : p.img) + '" alt="" loading="lazy" width="900" height="900"></div>' +
          '<div class="feature__text reveal"><p class="eyebrow">' + f.eyebrow + '</p><h2 class="h70">' + esc(f.title) + "</h2><p>" + f.text + "</p></div>" +
        "</section>";
      }).join("") +

      uses +

      '<section class="specs">' +
        '<div class="specs__head"><div><h2 class="h50">Batafsil<br><span class="accent">xususiyatlar</span></h2><p>' + (p.photo ? brand.name + " · " + cat.name : "Katalog № " + p.n) + "</p></div>" +
          (p.photo
            ? '<div><img src="' + p.thumb + '" alt="" loading="lazy" width="840" height="350"></div></div>'
            : '<div class="sky' + tone + '"><img class="feather" src="' + p.img + '" alt="" loading="lazy" width="900" height="900"></div></div>') +
        '<div class="acc">' +
          acc.map(function (a, i) {
            return '<div class="acc__item"><h3><button class="acc__btn" type="button" aria-expanded="' + (i === 0) + '" aria-controls="acc-' + i + '">' + a[0] + "</button></h3>" +
              '<div class="acc__body" id="acc-' + i + '"' + (i ? " hidden" : "") + ">" + a[1] + "</div></div>";
          }).join("") +
        "</div>" +
      "</section>" +

      '<section class="dealer">' +
        (p.photo
          ? '<img class="dealer__img" src="assets/img/cover-food.jpg" alt="Margaritto va Smaylo mahsulotlari somsa bilan" loading="lazy">'
          : '<img class="dealer__img" src="assets/img/cover.jpg" alt="Bulut mahsulotlari yogʻoch stol ustida" loading="lazy">') +
        '<div class="dealer__text"><h2 class="h50">Savdo boʻlimi bilan bogʻlaning</h2>' +
          "<p>Narx, qadoq hajmi va yetkazib berish shartlari boʻyicha savdo boʻlimimiz maslahat beradi. Ulgurji xaridorlar, savdo tarmoqlari va HoReCa uchun alohida shartlar mavjud.</p>" +
          '<a class="link" href="' + ask + '">Soʻrov yuborish</a>' +
          '<a class="link link--plain" href="' + tel(contacts.phones[0]) + '">' + contacts.phones[0] + "</a></div>" +
      "</section>" +

      (related.length
        ? '<section class="related" id="variantlar"><div class="related__head"><h2 class="h20">' + (same.length ? "Variantlar va oʻxshash mahsulotlar" : "Oʻxshash mahsulotlar") + "</h2>" +
            '<p class="small">Ushbu mahsulot bilan birga quyidagilarni ham koʻrib chiqing.</p></div>' +
            '<ul class="grid grid--bare">' + related.map(card).join("") + "</ul></section>"
        : "") +

      '<section class="next"><p class="eyebrow">Keyingisi</p><h2 class="h70">' + cat.name + "</h2>" +
        '<a class="btn" href="products.html?cat=' + cat.id + '">Davom etish</a></section>';

    host.addEventListener("click", function (e) {
      var btn = e.target.closest(".acc__btn");
      if (btn) {
        var open = btn.getAttribute("aria-expanded") !== "true";
        btn.setAttribute("aria-expanded", String(open));
        $("#" + btn.getAttribute("aria-controls")).hidden = !open;
      }
      if (e.target.closest("[data-night]")) toggleTheme();
    });
  }

  /* ==========================================================
     Statik sahifalardagi mahsulot kartalari: <ul data-cards="s01,s02">
     ========================================================== */
  function initCards() {
    $$("[data-cards]").forEach(function (ul) {
      ul.innerHTML = ul.getAttribute("data-cards").split(",").map(function (id) {
        var p = DATA.byId[id.trim()];
        return p ? card(p) : "";
      }).join("");
    });
  }

  /* ==========================================================
     Aloqa formasi
     ========================================================== */
  function initForm() {
    var form = $("#contact-form");
    if (!form) return;
    var success = $(".form__success", form);

    var subject = params.get("mavzu");
    if (subject && $('option[value="' + subject.replace(/"/g, "") + '"]', form.elements.subject)) form.elements.subject.value = subject;
    var asked = DATA.byId[params.get("mahsulot")];
    if (asked) form.elements.message.value = T("Mahsulot") + ": " + T(asked.title) + (asked.desc ? " (" + T(asked.desc) + ")" : "") + ".\n";

    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Ismingizni kiriting"; },
      phone: function (v) { return v.replace(/\D/g, "").length >= 9 || "Telefon raqamni toʻliq kiriting"; },
      email: function (v) { return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Email manzil notoʻgʻri"; },
      subject: function (v) { return !!v || "Mavzuni tanlang"; },
      message: function (v) { return v.trim().length >= 10 || "Xabar kamida 10 ta belgidan iborat boʻlsin"; }
    };

    function validate(name) {
      var input = form.elements[name];
      var result = rules[name](input.value);
      var field = input.closest(".field");
      var ok = result === true;
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      $(".field__error", field).textContent = ok ? "" : result;
      return ok;
    }

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      input.addEventListener("blur", function () { validate(name); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("has-error")) validate(name);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = Object.keys(rules).filter(function (name) { return !validate(name); });
      if (bad.length) { form.elements[bad[0]].focus(); return; }
      // TODO: backend yoki Telegram bot manziliga yuborishni ulash
      form.reset();
      success.classList.add("is-visible");
      success.focus();
    });
  }

  /* ==========================================================
     Ishga tushirish
     ========================================================== */
  renderHeader();
  renderFooter();
  setupOverlays();
  setupHeaderScroll();

  initHome();
  initBanners();
  initList();
  initProduct();
  initCards();
  initForm();

  applyTheme(root.getAttribute("data-theme") || "light");
  applyMotion(store("motion") === "reduce");
  document.addEventListener("click", function (e) {
    var langBtn = e.target.closest("[data-lang]");
    if (langBtn) { I18N.set(langBtn.getAttribute("data-lang")); return; }
    var t = e.target.closest("[data-toggle]");
    if (!t) return;
    if (t.getAttribute("data-toggle") === "theme") toggleTheme();
    else {
      var reduce = root.getAttribute("data-motion") !== "reduce";
      applyMotion(reduce);
      store("motion", reduce ? "reduce" : null);
    }
  });

  favs.sync();
  setupReveal();
  I18N.start();
})();
