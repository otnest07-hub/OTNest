/* Lazy-loads supabase-js@2 and hands back a shared client. Requires
   SUPABASE_URL / SUPABASE_ANON_KEY to already be defined (supabase-config.js). */
function loadSupabaseClient(cb) {
  if (window.__sbClient) return cb(window.__sbClient);
  if (!window.SUPABASE_URL || !window.SUPABASE_ANON_KEY) return cb(null);
  if (window.supabase && window.supabase.createClient) {
    try { window.__sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch (e) { window.__sbClient = null; }
    return cb(window.__sbClient);
  }
  var s = document.createElement("script");
  s.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
  s.onload = function () {
    try { window.__sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } catch (e) { window.__sbClient = null; }
    cb(window.__sbClient);
  };
  s.onerror = function () { cb(null); };
  document.head.appendChild(s);
}
