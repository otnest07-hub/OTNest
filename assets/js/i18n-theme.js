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

/* ---------- site header menu ------------------------------------------------
 * Opens/closes the phone menu sheet in the shared header (.otn-hd) by toggling
 * html.otn-nav-open, and marks the current page's link.                       */
(function () {
  "use strict";
  function init() {
    var header = document.querySelector(".otn-hd");
    if (!header) return;
    var btn = header.querySelector(".otn-hd__burger");
    var nav = header.querySelector(".otn-hd__nav");
    var root = document.documentElement;
    var desktop = window.matchMedia("(min-width: 992px)");

    var norm = function (p) {
      var parts = (p || "").split("?")[0].split("#")[0].split("/").filter(Boolean);
      return (parts.pop() || "index").toLowerCase().replace(/\.html?$/, "") || "index";
    };
    var here = norm(location.pathname);
    header.querySelectorAll(".otn-hd__link").forEach(function (a) {
      if (norm(a.getAttribute("href")) === here) a.setAttribute("aria-current", "page");
    });

    function setOpen(open) {
      root.classList.toggle("otn-nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (open) root.style.setProperty("--otn-hd-h", Math.round(header.getBoundingClientRect().bottom) + "px");
    }
    btn.addEventListener("click", function () { setOpen(!root.classList.contains("otn-nav-open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && root.classList.contains("otn-nav-open")) { setOpen(false); btn.focus(); }
    });
    var onDesktop = function () { if (desktop.matches) setOpen(false); };
    if (desktop.addEventListener) desktop.addEventListener("change", onDesktop); else desktop.addListener(onDesktop);
    window.addEventListener("pageshow", function () { setOpen(false); });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
