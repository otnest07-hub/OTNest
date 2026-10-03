/* Home "Services" gallery on phones/tablets: slide the card row sideways as the
 * pinned camera is scrolled through. Desktop is driven by the Webflow
 * interaction; its phone layout pins .scroll-mobile_camera but nothing moved the
 * row, leaving the cards frozen half off-screen.                              */
(function () {
  "use strict";
  var camera = document.querySelector(".scroll-mobile_camera");
  var track = camera && camera.querySelector(".scroll_track");
  if (!track) return;
  var trigger = camera.parentElement;
  var active = false, queued = false;

  function update() {
    queued = false;
    var cs = getComputedStyle(camera);
    var pinned = cs.position === "sticky";
    if (!pinned) {
      if (active) { track.style.transform = ""; active = false; }
      return;
    }
    active = true;
    var top = parseFloat(cs.top) || 0;
    var t = trigger.getBoundingClientRect();
    var range = t.height - camera.offsetHeight;
    var p = range > 0 ? Math.min(1, Math.max(0, (top - t.top) / range)) : 0;
    // -100% of the track = exactly the overflow (the list carries margin-right:-100cqw)
    track.style.transform = "translate3d(" + (-p * 100).toFixed(3) + "%,0,0)";
  }
  function queue() { if (!queued) { queued = true; requestAnimationFrame(update); } }

  // pin just below the floating header when the screen is tall enough for the whole card
  function fit() {
    camera.style.top = "";
    if (getComputedStyle(camera).position !== "sticky") return;
    var header = document.querySelector(".otn-hd");
    var clear = header ? header.offsetHeight + 6 : 0;
    var room = window.innerHeight - camera.offsetHeight;
    if (room > 0) camera.style.top = Math.min(clear, room) + "px";
    queue();
  }
  window.addEventListener("scroll", queue, { passive: true });
  window.addEventListener("resize", fit);
  window.addEventListener("load", fit);
  fit();
})();
