/* ==========================================================
   Aberno Group — savol-javob chati
   Toʻrtta tayyor savolga javob shu faylda. Boshqa savollar CHAT_ENDPOINT
   manzilidagi server orqali Claude'ga yuboriladi (server/README.md).
   Manzil boʻsh boʻlsa yoki server javob bermasa, katalog boʻyicha
   mahalliy javob qaytariladi.
   ========================================================== */
(function () {
  "use strict";

  var CHAT_ENDPOINT = "";

  var DATA = window.ABERNO;
  var T = window.I18N.t;
  var phones = DATA.contacts.phones;
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  };

  var FAQ = [
    {
      q: "Qanday mahsulotlar ishlab chiqarasiz?",
      a: "Uch brend ostida ishlaymiz. Bulut — qogʻoz salfetkalar, sochiqlar, tualet qogʻozi, nam salfetkalar va dispenserlar. Margaritto — margarin: uy uchun 200 va 500 g briketlar, korxonalar uchun 10 va 20 kg qutilar. Smaylo — spredlar. Katalogda jami 70 ta mahsulot bor.",
      links: [["products.html", "Barcha mahsulotlar"], ["brands.html", "Brendlar"]],
      keys: /mahsulot|assortiment|nima ishlab|продук|ассортимент|товар|product|range|what do you/i
    },
    {
      q: "Ulgurji buyurtma qanday beriladi?",
      a: "Aloqa sahifasidagi forma orqali soʻrov qoldiring yoki savdo boʻlimiga qoʻngʻiroq qiling: " + phones[0] + ". Menejer siz bilan bogʻlanib, assortiment va shartlarni kelishadi; shartnomadan soʻng birinchi yetkazib berish amalga oshiriladi.",
      links: [["contact.html?mavzu=ulgurji", "Soʻrov yuborish"], ["partners.html", "Hamkorlik shartlari"]],
      keys: /ulgurji|buyurtma|narx|hamkor|distrib|опт|заказ|цен|партн|дистриб|wholesale|order|price|partner|distribut/i
    },
    {
      q: "Mahsulotlar sertifikatlanganmi?",
      a: "Ha. Halol sertifikati, ISO 22000:2018 va HACCP (oziq-ovqat xavfsizligi tizimi), muvofiqlik sertifikati hamda sanitariya-epidemiologiya xulosasi mavjud.",
      links: [["production.html", "Ishlab chiqarish va sertifikatlar"]],
      keys: /sertifikat|halol|halal|iso|haccp|sifat|сертификат|халяль|качеств|certif|quality/i
    },
    {
      q: "Siz bilan qanday bogʻlanish mumkin?",
      a: "Telefon: " + phones[0] + " yoki " + phones[1] + ". Telegram: @" + DATA.contacts.social[0].tg + ". Manzil: " + DATA.contacts.address + ".",
      links: [["contact.html", "Aloqa sahifasi"]],
      keys: /aloqa|bogʻlan|boglan|telefon|manzil|qayerda|контакт|связ|телефон|адрес|где вы|contact|phone|address|where/i
    }
  ];

  var norm = function (s) { return s.toLowerCase().replace(/[ʻʼ'`’‘«»?!.,]/g, "").replace(/\s+/g, " ").trim(); };
  var index = DATA.products.map(function (p) {
    var words = [p.title, p.variant, DATA.catById[p.cat].name, DATA.brands[p.brand].name];
    return { p: p, text: norm(words.concat(words.map(T)).join(" ")) };
  });

  // Claude ulanmagan yoki javob bermagan holat uchun: avval tayyor javoblar, keyin katalog
  function localAnswer(question) {
    for (var i = 0; i < FAQ.length; i++) {
      if (FAQ[i].keys.test(question)) return { text: T(FAQ[i].a), links: FAQ[i].links };
    }
    // Soʻzlar koʻproq mos kelgan mahsulotlar birinchi chiqadi; bir xil nomlilar takrorlanmaydi
    var words = norm(question).split(" ").filter(function (w) { return w.length > 3; });
    var seen = {};
    var found = index.map(function (it) {
      return { p: it.p, score: words.filter(function (w) { return it.text.indexOf(w.slice(0, 6)) !== -1; }).length };
    }).filter(function (it) {
      if (!it.score || seen[it.p.title]) return false;
      seen[it.p.title] = true;
      return true;
    }).sort(function (a, b) { return b.score - a.score; }).slice(0, 4);
    if (found.length) {
      return {
        text: T("Katalogdan shu soʻrovga mos mahsulotlar topildi:"),
        links: found.map(function (it) { return [it.p.url, it.p.title]; })
      };
    }
    return {
      text: T("Bu savolga aniq javob berish uchun savdo boʻlimimiz bilan bogʻlaning:") + " " + phones[0] + ".",
      links: [["contact.html", "Aloqa sahifasi"]]
    };
  }

  var el = document.createElement("div");
  el.className = "chat";
  el.innerHTML =
    '<button class="chat__fab" type="button" aria-expanded="false" aria-controls="chat-panel">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2h-7.6L7 22v-4H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Zm3 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm5 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"/></svg>' +
      "<span>Savol bering</span></button>" +
    '<section class="chat__panel" id="chat-panel" aria-label="Savol-javob chati" hidden>' +
      '<header class="chat__head"><div><h2>Aberno yordamchisi</h2><p>Mahsulotlar va hamkorlik boʻyicha savollar</p></div>' +
        '<button class="chat__close" type="button" aria-label="Yopish"><span class="menu__close" aria-hidden="true"></span></button></header>' +
      '<div class="chat__log" aria-live="polite" data-no-i18n></div>' +
      '<div class="chat__faq"><p>Koʻp beriladigan savollar</p><ul>' +
        FAQ.map(function (f, i) { return '<li><button type="button" data-faq="' + i + '">' + f.q + "</button></li>"; }).join("") +
      "</ul></div>" +
      '<form class="chat__form"><label class="visually-hidden" for="chat-input">Savolingiz</label>' +
        '<input id="chat-input" type="text" placeholder="Savolingizni yozing" autocomplete="off" maxlength="500">' +
        '<button type="submit" aria-label="Yuborish"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20.5 21.5 12 3 3.5v6.6l11 1.9-11 1.9v6.6Z"/></svg></button></form>' +
    "</section>";
  document.body.appendChild(el);

  var fab = el.querySelector(".chat__fab");
  var panel = el.querySelector(".chat__panel");
  var log = el.querySelector(".chat__log");
  var form = el.querySelector(".chat__form");
  var input = form.querySelector("input");
  var history = [];
  var busy = false;

  function add(role, text, links) {
    var msg = document.createElement("div");
    msg.className = "chat__msg chat__msg--" + role;
    msg.innerHTML = "<p>" + esc(text).replace(/\n/g, "<br>") + "</p>" +
      (links && links.length
        ? '<div class="chat__links">' + links.map(function (l) { return '<a href="' + l[0] + '">' + esc(T(l[1])) + "</a>"; }).join("") + "</div>"
        : "");
    log.appendChild(msg);
    log.scrollTop = log.scrollHeight;
    return msg;
  }

  function toggle(open) {
    panel.hidden = !open;
    fab.setAttribute("aria-expanded", String(open));
    el.classList.toggle("is-open", open);
    if (open) {
      if (!log.children.length) add("bot", T("Assalomu alaykum! Mahsulotlarimiz, buyurtma va hamkorlik haqida savol bering."));
      input.focus();
    } else fab.focus();
  }

  function ask(question) {
    if (busy) return;
    add("user", question);
    history.push({ role: "user", content: question });

    var done = function (answer) {
      busy = false;
      add("bot", answer.text, answer.links);
      history.push({ role: "assistant", content: answer.text });
    };

    if (!CHAT_ENDPOINT) { done(localAnswer(question)); return; }

    busy = true;
    var wait = add("bot", "…");
    wait.classList.add("is-typing");
    fetch(CHAT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lang: window.I18N.lang, messages: history.slice(-10) })
    })
      .then(function (res) { return res.ok ? res.json() : Promise.reject(new Error("HTTP " + res.status)); })
      .then(function (data) {
        if (!data || !data.reply) throw new Error("empty reply");
        return { text: data.reply };
      })
      .catch(function () { return localAnswer(question); })
      .then(function (answer) { wait.remove(); done(answer); });
  }

  fab.addEventListener("click", function () { toggle(panel.hidden); });
  el.querySelector(".chat__close").addEventListener("click", function () { toggle(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !panel.hidden) toggle(false); });

  el.querySelector(".chat__faq").addEventListener("click", function (e) {
    var btn = e.target.closest("[data-faq]");
    if (!btn || busy) return;
    var f = FAQ[Number(btn.getAttribute("data-faq"))];
    add("user", T(f.q));
    add("bot", T(f.a), f.links);
    history.push({ role: "user", content: T(f.q) }, { role: "assistant", content: T(f.a) });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var q = input.value.trim();
    if (!q) return;
    input.value = "";
    ask(q);
  });
})();
