/* Home "Services" gallery: slide the card row sideways while its pinned
 * "camera" is scrolled through. Replaces the Webflow interaction, which only
 * ran on desktop, sometimes not at all, and started moving while the heading
 * was still hidden under the floating header.
 * Layout: whichever camera is sticky at this width is used — the desktop
 * .service_sticky-camera or the phone .scroll-mobile_camera. Its parent is the
 * tall trigger. The track is -100% wide relative to the overflow (the list
 * carries margin-right:-100cqw), so its width is exactly how far to slide.  */
(function () {
  "use strict";
  var track = document.querySelector(".section_service .scroll_track");
  var list = track && track.querySelector(".scroll_list");
  if (!list) return;
  var cams = [document.querySelector(".scroll-mobile_camera"), document.querySelector(".service_sticky-camera")].filter(Boolean);
  var HOLD = 0.12; // share of the pinned scroll spent still at the start and end, so it can be read
  var cam = null, queued = false;

  function sticky(el) { return getComputedStyle(el).position === "sticky"; }

  // pin just below the floating header when the whole camera fits; otherwise
  // pin so the cards are fully on screen and let the heading scroll past first
  function fit() {
    cams.forEach(function (c) { c.style.top = ""; });
    cam = null;
    for (var i = 0; i < cams.length; i++) if (sticky(cams[i])) { cam = cams[i]; break; }
    if (!cam) { list.style.transform = ""; return; }
    var header = document.querySelector(".otn-hd");
    var clear = (header ? header.offsetHeight : 0) + 6;
    var room = window.innerHeight - cam.offsetHeight;
    cam.style.top = (room >= clear ? clear : Math.min(clear, room - 12)) + "px";
    queue();
  }

  function update() {
    queued = false;
    if (!cam) return;
    var top = parseFloat(cam.style.top) || 0;
    var t = cam.parentElement.getBoundingClientRect();
    var range = t.height - cam.offsetHeight;
    var p = range > 0 ? (top - t.top) / range : 0;
    var q = Math.min(1, Math.max(0, (p - HOLD) / (1 - 2 * HOLD)));
    list.style.transform = "translate3d(" + (-q * track.offsetWidth).toFixed(1) + "px,0,0)";
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }

  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  fit();
})();
