/* Swaps the nav "Login" link to "My Account" when a Supabase session exists.
   Requires supabase-config.js + supabase-load.js loaded first. */
(function () {
  function apply(session) {
    if (!session) return;
    var link = document.querySelector('a.navbar_link[href="/login/"]');
    if (!link) return;
    var label = link.querySelector("div");
    if (label) label.textContent = "My Account";
  }
  function boot() {
    loadSupabaseClient(function (client) {
      if (!client) return;
      client.auth.getSession().then(function (res) {
        apply(res.data && res.data.session);
      });
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
