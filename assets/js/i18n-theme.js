/* OT Nest Occupational & Physiotherapy Centre
 * Header toggle: light/dark theme only. Progressive enhancement — injects its
 * own control, no template markup edited.                                    */
(function () {
  "use strict";

  var LS_THEME = "dapdc_theme";
  var root = document.documentElement;

  /* ---------- storage helpers (never throw) ---------- */
  function get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  /* ---------- resolve initial theme ---------- */
  function detectTheme() {
    var stored = get(LS_THEME);
    if (stored === "light" || stored === "dark") return stored;
    return "light"; // default to light regardless of device/OS preference until the user picks
  }

  var theme = detectTheme();

  function applyTheme(t) {
    theme = t;
    root.setAttribute("data-theme", t);
    var tb = document.getElementById("dapdc-theme");
    if (tb) tb.setAttribute("aria-label", (t === "dark" ? "Dark" : "Light") + " mode — click to toggle");
  }

  /* ---------- control ---------- */
  function buildControls() {
    if (document.querySelector(".dapdc-toggles")) return;
    var host = document.querySelector(".otn-hd__actions") ||
               document.querySelector(".navbar-button_wrapper") ||
               document.querySelector(".navbar_container") ||
               document.querySelector(".navbar_wrap");
    if (!host) return;

    var wrap = document.createElement("div");
    wrap.className = "dapdc-toggles";
    wrap.setAttribute("role", "group");
    wrap.setAttribute("aria-label", "Theme");

    var themeBtn = document.createElement("button");
    themeBtn.type = "button";
    themeBtn.id = "dapdc-theme";
    themeBtn.className = "dapdc-toggle";
    themeBtn.title = "Light / Dark";
    themeBtn.innerHTML =
      '<svg class="dapdc-ico-sun" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 17a5 5 0 100-10 5 5 0 000 10zm0 4a1 1 0 011 1v0a1 1 0 01-2 0v0a1 1 0 011-1zm0-20a1 1 0 011 1v0a1 1 0 01-2 0v0a1 1 0 011-1zm11 11a1 1 0 010 2h0a1 1 0 010-2h0zM3 12a1 1 0 010 2H3a1 1 0 010-2h0zm16.66 6.24a1 1 0 011.41 1.41l0 0a1 1 0 01-1.41-1.41l0 0zM4.93 4.93a1 1 0 011.41 1.41l0 0A1 1 0 014.93 4.93l0 0zm14.14 1.41a1 1 0 01-1.41-1.41l0 0a1 1 0 011.41 1.41l0 0zM6.34 19.07a1 1 0 01-1.41-1.41l0 0a1 1 0 011.41 1.41l0 0z"/></svg>' +
      '<svg class="dapdc-ico-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    themeBtn.addEventListener("click", function () {
      var next = theme === "dark" ? "light" : "dark";
      set(LS_THEME, next);
      applyTheme(next);
    });

    wrap.appendChild(themeBtn);
    host.insertBefore(wrap, host.firstChild);
  }

  /* ---------- boot ---------- */
  applyTheme(theme);                 // <html data-theme> already set by head script; keep in sync
  buildControls();

  // Theme now defaults to light and only ever changes via the toggle button
  // (detectTheme() above) — no longer follows OS/device dark-mode changes.
})();

/* ---------- site header (liquid glass) --------------------------------------
 * Opens/closes the phone menu card (html.otn-nav-open), marks the current
 * page, glides the glass bead between desktop links, slims the capsule once
 * the page scrolls, and lets the glass catch light under the pointer.        */
(function () {
  "use strict";
  function init() {
    var header = document.querySelector(".otn-hd");
    if (!header) return;
    var bar = header.querySelector(".otn-hd__bar");
    var btn = header.querySelector(".otn-hd__burger");
    var nav = header.querySelector(".otn-hd__nav");
    var root = document.documentElement;
    var desktop = window.matchMedia("(min-width: 992px)");

    var norm = function (p) {
      var parts = (p || "").split("?")[0].split("#")[0].split("/").filter(Boolean);
      return (parts.pop() || "index").toLowerCase().replace(/\.html?$/, "") || "index";
    };
    var here = norm(location.pathname);
    var current = null;
    header.querySelectorAll(".otn-hd__link").forEach(function (a) {
      if (norm(a.getAttribute("href")) === here) { a.setAttribute("aria-current", "page"); current = a; }
    });

    /* phone menu */
    function setOpen(open) {
      root.classList.toggle("otn-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { setOpen(!root.classList.contains("otn-nav-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    header.addEventListener("click", function (e) { if (e.target === header) setOpen(false); }); // the dimmed backdrop
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("otn-nav-open")) { setOpen(false); btn.focus(); }
    });
    var onDesktop = function () { if (desktop.matches) setOpen(false); placeBead(current); };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop); else desktop.addListener(onDesktop);
    window.addEventListener("pageshow", function () { setOpen(false); });

    /* desktop: the glass bead rests on the current page and glides to whatever is hovered or focused */
    var bead = document.createElement("span");
    bead.className = "otn-hd__bead";
    bead.setAttribute("aria-hidden", "true");
    nav.insertBefore(bead, nav.firstChild);
    function placeBead(link) {
      if (!link || !desktop.matches) { bead.classList.remove("is-on"); return; }
      var n = nav.getBoundingClientRect(), r = link.getBoundingClientRect();
      bead.style.left = (r.left - n.left) + "px";
      bead.style.width = r.width + "px";
      bead.classList.add("is-on");
    }
    nav.addEventListener("mouseover", function (e) { var a = e.target.closest(".otn-hd__link"); if (a) placeBead(a); });
    nav.addEventListener("mouseleave", function () { placeBead(current); });
    nav.addEventListener("focusin", function (e) { var a = e.target.closest(".otn-hd__link"); if (a) placeBead(a); });
    nav.addEventListener("focusout", function () { placeBead(current); });
    window.addEventListener("resize", function () { placeBead(current); });
    placeBead(current);
    // place without animating first, then let it glide
    requestAnimationFrame(function () { header.classList.add("is-ready"); });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { placeBead(current); });

    /* slimmer, denser glass once the page scrolls */
    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () { header.classList.toggle("is-scrolled", window.scrollY > 12); ticking = false; });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* the glass catches light where the pointer is (mouse/trackpad only) */
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      bar.addEventListener("pointermove", function (e) {
        var r = bar.getBoundingClientRect();
        bar.style.setProperty("--mx", (e.clientX - r.left) + "px");
        bar.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
      bar.addEventListener("pointerleave", function () { bar.style.removeProperty("--mx"); bar.style.removeProperty("--my"); });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

/* ---------- liquid glass: adaptive ink + edge refraction ---------------------
 * 1) Samples what sits behind the header capsule and the phone quick bar and
 *    switches them to navy ink (.tone-light) over light content, white ink over
 *    photos and dark sections — the way Apple's glass adapts.
 * 2) In Chromium (the only engine that renders SVG filters in backdrop-filter)
 *    builds a displacement map per glass element so the content behind it
 *    bends at the edges like a lens. Other browsers keep the plain clear glass. */
(function () {
  "use strict";
  var root = document.documentElement;

  function luminance(rgb) {
    var c = rgb.map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  }
  // what is painted at (x, y) underneath `skip`? "light" or "dark"
  function toneAt(x, y, skip) {
    var els = document.elementsFromPoint(x, y);
    for (var i = 0; i < els.length; i++) {
      var n = els[i];
      if (skip.some(function (s) { return s && s.contains(n); })) continue;
      for (; n && n !== root; n = n.parentElement) {
        if (/^(IMG|VIDEO|IFRAME|PICTURE|CANVAS)$/.test(n.tagName)) return "dark";
        var cs = getComputedStyle(n);
        if (cs.backgroundImage && cs.backgroundImage !== "none") return "dark";
        var m = cs.backgroundColor.match(/[\d.]+/g);
        if (m && (m.length < 4 || +m[3] > 0.5)) return luminance([+m[0], +m[1], +m[2]]) > 0.45 ? "light" : "dark";
      }
      break;
    }
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }
  // majority vote across the left, middle and right of a glass element
  function toneOf(rect, skip) {
    var y = rect.top + rect.height / 2, votes = 0;
    [0.12, 0.5, 0.88].forEach(function (f) { if (toneAt(rect.left + rect.width * f, y, skip) === "light") votes++; });
    return votes >= 2;
  }

  /* lens: a displacement map whose red/green channels push pixels toward the
     centre near the edges, sized exactly to the element it is applied to */
  var chromium = !!(navigator.userAgentData && navigator.userAgentData.brands &&
    navigator.userAgentData.brands.some(function (b) { return /Chromium/.test(b.brand); }));
  var reduced = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
  var svgNS = "http://www.w3.org/2000/svg", defs = null;
  function lensMap(w, h) {
    var e = Math.min(h * 0.42, 26), ex = (e / w).toFixed(4), ey = (e / h).toFixed(4);
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '">' +
      '<defs><linearGradient id="x"><stop offset="0" stop-color="rgb(0,0,0)"/><stop offset="' + ex + '" stop-color="rgb(128,0,0)"/>' +
      '<stop offset="' + (1 - ex) + '" stop-color="rgb(128,0,0)"/><stop offset="1" stop-color="rgb(255,0,0)"/></linearGradient>' +
      '<linearGradient id="y" x2="0" y2="1"><stop offset="0" stop-color="rgb(0,0,0)"/><stop offset="' + ey + '" stop-color="rgb(0,128,0)"/>' +
      '<stop offset="' + (1 - ey) + '" stop-color="rgb(0,128,0)"/><stop offset="1" stop-color="rgb(0,255,0)"/></linearGradient></defs>' +
      '<rect width="100%" height="100%" fill="url(#x)"/><rect width="100%" height="100%" fill="url(#y)" style="mix-blend-mode:screen"/></svg>';
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  }
  function lens(id, el, strength) {
    if (!defs) {
      var holder = document.createElementNS(svgNS, "svg");
      holder.setAttribute("aria-hidden", "true");
      holder.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
      defs = document.createElementNS(svgNS, "defs");
      holder.appendChild(defs);
      document.body.appendChild(holder);
    }
    var f = document.getElementById(id);
    if (!f) {
      f = document.createElementNS(svgNS, "filter");
      f.id = id;
      f.setAttribute("filterUnits", "userSpaceOnUse");
      f.setAttribute("color-interpolation-filters", "sRGB");
      f.innerHTML = '<feImage result="map" preserveAspectRatio="none"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G"/>';
      defs.appendChild(f);
    }
    var w = Math.max(1, Math.round(el.offsetWidth)), h = Math.max(1, Math.round(el.offsetHeight));
    ["x", "y"].forEach(function (k) { f.setAttribute(k, 0); });
    f.setAttribute("width", w); f.setAttribute("height", h);
    var img = f.querySelector("feImage");
    img.setAttribute("x", 0); img.setAttribute("y", 0); img.setAttribute("width", w); img.setAttribute("height", h);
    img.setAttribute("href", lensMap(w, h));
    f.querySelector("feDisplacementMap").setAttribute("scale", strength);
  }

  function init() {
    var header = document.querySelector(".otn-hd");
    var bar = header && header.querySelector(".otn-hd__bar");
    var fab = document.querySelector(".dapdc-wa");
    var queued = false;
    function update() {
      queued = false;
      var dock = document.querySelector(".otn-bar");
      if (bar && !root.classList.contains("otn-nav-open"))
        header.classList.toggle("tone-light", toneOf(bar.getBoundingClientRect(), [header, dock, fab]));
      if (dock && dock.offsetWidth)
        dock.classList.toggle("tone-light", toneOf(dock.getBoundingClientRect(), [header, dock, fab]));
    }
    function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    window.addEventListener("load", queue);
    new MutationObserver(queue).observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });
    setTimeout(queue, 60);
    setTimeout(queue, 400); // the quick bar is added by mobile-bar.js (deferred)

    if (chromium && !reduced && window.ResizeObserver) {
      root.classList.add("has-lens");
      var watch = function (el, id, s) {
        if (!el) return;
        lens(id, el, s);
        new ResizeObserver(function () { lens(id, el, s); }).observe(el);
      };
      watch(bar, "otn-lens-bar", 34);
      var tries = 0, t = setInterval(function () {
        var dock = document.querySelector(".otn-bar");
        if (dock || ++tries > 20) { clearInterval(t); watch(dock, "otn-lens-dock", 30); }
      }, 150);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
