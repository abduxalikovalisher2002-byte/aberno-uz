/* ==========================================================
   Aberno Group — umumiy skriptlar
   ========================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");

  /* ---------- Header soyasi va "yuqoriga" tugmasi ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.querySelector(".to-top");

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 10);
    if (toTop) toTop.classList.toggle("is-visible", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mobil menyu ---------- */
  var burger = document.querySelector(".burger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = root.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", String(open));
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        root.classList.remove("nav-open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("nav-open")) {
        root.classList.remove("nav-open");
        burger.setAttribute("aria-expanded", "false");
        burger.focus();
      }
    });
  }

  /* ---------- Faol menyu bandi ---------- */
  var page = location.pathname.split("/").pop() || "index.html";
  var brandPages = ["brands.html", "margaritto.html", "smaylo.html", "bulut.html"];
  document.querySelectorAll(".nav__link").forEach(function (link) {
    var href = link.getAttribute("href");
    if (href === page || (href === "brands.html" && brandPages.indexOf(page) !== -1)) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* ---------- Paydo bo'lish animatsiyasi ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Raqamlar hisoblagichi ---------- */
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var start = parseInt(el.getAttribute("data-from") || "0", 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var duration = 1400;
    var t0 = null;
    function tick(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(start + (target - start) * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if (counters.length && "IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  }

  /* ---------- Mahsulotlar filtri ---------- */
  var filterBtns = document.querySelectorAll(".filter__btn");
  if (filterBtns.length) {
    var items = document.querySelectorAll(".product[data-brand]");
    var applyFilter = function (value) {
      filterBtns.forEach(function (b) {
        var active = b.getAttribute("data-filter") === value;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      items.forEach(function (item) {
        item.hidden = value !== "all" && item.getAttribute("data-brand") !== value;
      });
    };
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyFilter(btn.getAttribute("data-filter"));
      });
    });
    var initial = new URLSearchParams(location.search).get("brand");
    if (initial && document.querySelector('.filter__btn[data-filter="' + initial + '"]')) {
      applyFilter(initial);
    }
  }

  /* ---------- Aloqa formasi ---------- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var success = form.querySelector(".form__success");

    var subjectParam = new URLSearchParams(location.search).get("mavzu");
    var subjectSelect = form.querySelector("#subject");
    if (subjectParam && subjectSelect) {
      Array.prototype.forEach.call(subjectSelect.options, function (opt) {
        if (opt.value === subjectParam) subjectSelect.value = subjectParam;
      });
    }

    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Ismingizni kiriting"; },
      phone: function (v) {
        var digits = v.replace(/\D/g, "");
        return digits.length >= 9 || "Telefon raqamni toʻliq kiriting";
      },
      email: function (v) {
        return !v.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Email manzil notoʻgʻri";
      },
      subject: function (v) { return !!v || "Mavzuni tanlang"; },
      message: function (v) { return v.trim().length >= 10 || "Xabar kamida 10 ta belgidan iborat boʻlsin"; }
    };

    var validateField = function (name) {
      var input = form.elements[name];
      if (!input || !rules[name]) return true;
      var result = rules[name](input.value);
      var field = input.closest(".field");
      var err = field.querySelector(".field__error");
      var ok = result === true;
      field.classList.toggle("has-error", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      if (err) err.textContent = ok ? "" : result;
      return ok;
    };

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;
      input.addEventListener("blur", function () { validateField(name); });
      input.addEventListener("input", function () {
        if (input.closest(".field").classList.contains("has-error")) validateField(name);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true;
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        var ok = validateField(name);
        if (!ok && !firstBad) firstBad = form.elements[name];
        allOk = allOk && ok;
      });
      if (!allOk) {
        if (firstBad) firstBad.focus();
        return;
      }
      // TODO: backend yoki Telegram bot manziliga yuborishni ulash
      form.reset();
      if (success) {
        success.classList.add("is-visible");
        success.focus();
      }
    });
  }

  /* ---------- Yil ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
