(function () {
  if (document.querySelector(".otn-bar")) return;
  var path = location.pathname;
  var wa = "https://wa.me/917549377608?text=" + encodeURIComponent("Hi, I'd like to book an appointment with OT Nest.");
  var bar = document.createElement("nav");
  bar.className = "otn-bar";
  bar.setAttribute("aria-label", "Quick contact");
  bar.innerHTML =
    '<a href="tel:+917549377608"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.9 15.9 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.4 11.4 0 0 0 .58 3.6 1 1 0 0 1-.24 1z"/></svg>Call</a>' +
    '<a class="otn-bar-wa" href="' + wa + '" target="_blank" rel="noopener"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 5.3A10.7 10.7 0 0 0 6.8 21.3L5.3 26.7l5.5-1.4A10.7 10.7 0 1 0 16 5.3Zm0 19.2a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-3.3.9.9-3.2-.2-.3A8.9 8.9 0 1 1 16 24.5Zm4.9-6.6c-.3-.2-1.6-.8-1.8-.9-.3-.1-.4-.1-.6.1s-.7.9-.9 1-.3.2-.6.1a7.3 7.3 0 0 1-3.6-3.2c-.3-.5.3-.4.7-1.4.1-.2 0-.3 0-.5s-.6-1.5-.8-2-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c2.3 1 2.3.7 2.7.6a2.6 2.6 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.6-.3Z"/></svg>WhatsApp</a>' +
    '<a class="otn-bar-book" href="/book/"' + (path.indexOf("/book") === 0 ? ' aria-current="page"' : "") + '><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3v2M17 3v2M4 9h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm4 9 2 2 4-4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>Book visit</a>';
  document.body.appendChild(bar);
  document.documentElement.classList.add("has-otn-bar");
})();
