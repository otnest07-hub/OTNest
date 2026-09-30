/* Supabase project credentials — shared by login/index.html, account/index.html, auth-nav.js.
   This is a NEW business (OT Nest) and must use its OWN Supabase project, never the one
   from the site this was cloned from. Create a project at supabase.com, then paste
   Project -> Settings -> API -> Project URL + anon/publishable key below.
   Leave both empty until then: supabase-load.js treats a missing URL as "not configured"
   and every auth call degrades gracefully (e.g. the login page shows a phone/WhatsApp
   fallback instead of failing). Once a project exists, also run supabase/schema.sql
   against it (SQL Editor -> New query -> Run) to create the profiles/appointments tables. */
var SUPABASE_URL = "";
var SUPABASE_ANON_KEY = "";
