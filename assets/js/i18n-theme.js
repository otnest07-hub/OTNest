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
    var host = document.querySelector(".navbar-button_wrapper") ||
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

/* ---------- mobile nav fix ------------------------------------------------
 * The Webflow export leaves .navbar_menu translated off-screen even when the
 * hamburger is "open". Mirror the button's open state onto <html> so the CSS
 * in toggles.css (section 4) can pull the panel into view, and close the menu
 * when a link inside it is tapped.                                          */
(function () {
  "use strict";
  var FORCED = ["transform", "transition", "position", "top", "left", "right",
                "width", "z-index", "max-height", "overflow-y"];
  function init() {
    var btn = document.querySelector(".w-nav-button");
    var menu = document.querySelector(".navbar_menu.w-nav-menu");
    var overlay = document.querySelector(".w-nav-overlay");
    var bar = document.querySelector(".navbar_wrap") || document.querySelector(".navbar_container");
    if (!btn || !menu) return;
    var root = document.documentElement;

    // make sure the current page's link carries .w--current (Webflow's build-time
    // marker is unreliable across this export) so the menu active-state shows
    function markCurrent() {
      var norm = function (p) {
        // clean URLs (/about/) end in a trailing slash, so drop empty segments
        // before taking the last one, or "/about/" would wrongly normalise to "".
        var parts = (p || "").split("?")[0].split("#")[0].split("/").filter(Boolean);
        var f = (parts.pop() || "").toLowerCase().replace(/\.html?$/, "");
        return f || "index";
      };
      var here = norm(location.pathname);
      menu.querySelectorAll("a.navbar_link").forEach(function (a) {
        var on = norm(a.getAttribute("href") || "") === here;
        a.classList.toggle("w--current", on);
        if (on) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
    }
    markCurrent();
    // re-assert after Webflow's own nav script has run (it manages w--current)
    window.addEventListener("load", function () { setTimeout(markCurrent, 60); setTimeout(markCurrent, 400); });

    function navH() {
      // sit the sheet flush against the header (tuck 1px under its border)
      return bar ? Math.max(0, Math.round(bar.getBoundingClientRect().bottom) - 1) : 63;
    }
    function open() {
      root.classList.add("dapdc-nav-open");
      markCurrent();
      var h = navH();
      // Webflow positions .w-nav-overlay at top:<navbar height>; since both the
      // overlay and .navbar_wrap now carry backdrop-filter (containing block for
      // fixed children), the menu is laid out relative to the overlay -> its top
      // must be 0 to sit flush against the header with no gap.
      menu.style.setProperty("transform", "none", "important");
      menu.style.setProperty("transition", "none", "important");
      menu.style.setProperty("position", "fixed", "important");
      menu.style.setProperty("top", "0", "important");
      menu.style.setProperty("left", "0", "important");
      menu.style.setProperty("right", "0", "important");
      menu.style.setProperty("width", "100%", "important");
      menu.style.setProperty("z-index", "2147482000", "important");
      menu.style.setProperty("max-height", "calc(100vh - " + h + "px)", "important");
      menu.style.setProperty("overflow-y", "auto", "important");
      if (overlay) {
        overlay.style.setProperty("z-index", "2147481000", "important");
        overlay.style.setProperty("top", h + "px", "important");
      }

      // one-time: append a booking CTA block at the bottom of the menu
      if (!menu.querySelector(".dapdc-menu-foot")) {
        var f = document.createElement("div");
        f.className = "dapdc-menu-foot";
        f.innerHTML =
          '<a class="dm-cta" href="tel:+917549377608">' +
            '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z"/></svg>' +
            'Book an appointment</a>' +
          '<div class="dm-row">' +
            '<a href="tel:+917549377608"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z"/></svg>Call</a>' +
            '<a href="https://wa.me/917549377608?text=Hi%2C%20I%27d%20like%20to%20book%20an%20appointment%20with%20OT%20Nest." target="_blank" rel="noopener"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5.3A10.7 10.7 0 0 0 6.8 21.3L5.3 26.7l5.5-1.4A10.7 10.7 0 1 0 16 5.3Zm0 19.2a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A8.9 8.9 0 1 1 16 24.5Zm4.9-6.6c-.3-.2-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.2c-.3-.5.3-.4.7-1.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c2.3 1 2.3.7 2.7.6a2.6 2.6 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>WhatsApp</a>' +
          '</div>';
        menu.appendChild(f);
      }
    }
    function close() {
      root.classList.remove("dapdc-nav-open");
      FORCED.forEach(function (p) { menu.style.removeProperty(p); });
    }
    function sync() { btn.classList.contains("w--open") ? open() : close(); }

    btn.addEventListener("click", function () {
      setTimeout(sync, 0); setTimeout(sync, 50); setTimeout(sync, 160);
    });
    new MutationObserver(sync).observe(btn, { attributes: true, attributeFilter: ["class"] });

    // Webflow's nav script preventDefaults link taps inside an open menu, then
    // fails to navigate (its close animation is broken in this export). Take over:
    // capture-phase, so we run before Webflow and can navigate ourselves.
    menu.addEventListener("click", function (e) {
      var a = e.target.closest("a");
      if (!a) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#" || /^javascript:/i.test(href)) return;
      e.stopImmediatePropagation();
      e.preventDefault();
      if (btn.classList.contains("w--open")) close();
      if (a.target === "_blank") window.open(href, "_blank", "noopener");
      else window.location.href = a.href;
    }, true);

    if (overlay) overlay.addEventListener("click", function () {
      if (btn.classList.contains("w--open")) btn.click();
    });
    sync();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
