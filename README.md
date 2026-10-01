# OT Nest Physiotherapy Clinic

Website re-skinned from the Lumora template (the same engine used for the Dr. Asim Prakash
Dental Clinic build) for a new business: **OT Nest**, a physiotherapy clinic with locations
in **Patna and Gurgaon**, run by **Dr. Satish** (MPT — Orthopaedics, Dry Needling Certified).

All content facts came from the client's own `otnest_booking 2.0.html` reference file: brand
name, doctor identity, phone (+91 75493 77608), email (otnest07@gmail.com), the two clinic
addresses, the six specialities (Sports Rehab, Post-Surgery Recovery, Back & Spine, Neurological,
Paediatric, Geriatric), stats, and the patient testimonials. The 3 blog articles linked from the
home page (plus 3 more reachable from `/blog/`) are original writing, not from that file.

## Run locally
```
npx serve .
```
(No build step — plain static HTML/CSS/JS, same as the source template.)

## Deliberately changed from the cloned Lumora/dental codebase
- **Language selector removed.** `assets/js/i18n-dict.js` deleted; `i18n-theme.js` now only
  injects the light/dark theme toggle (the mobile-nav-fix logic is untouched). Every page's head
  bootstrap script was simplified to drop the `en`/`hi` detection.
- **Google sign-in removed.** The "Continue with Google" button + its `signInWithOAuth` handler
  are gone from `login/index.html`. **`assets/js/supabase-config.js` was reset to empty
  `SUPABASE_URL`/`SUPABASE_ANON_KEY`** — it was pointed at the dental clinic's live Supabase
  project, which this business must never share. Every auth call already degrades gracefully to
  a "not connected yet, call/WhatsApp us" message when the client is null, so the login/account
  pages work as an honest placeholder until OT Nest creates its own Supabase project (run
  `supabase/schema.sql` against it once it exists) and, separately, enables Google as an OAuth
  provider there if they still want it.
- **Cal.com booking link cleared**, same reasoning — `assets/js/cal-config.js` was wired to the
  dentist's real Cal.com account. Both `CAL_LINK_CLINIC`/`CAL_LINK_VIDEO` are now `""`, so
  `/book/` falls back to WhatsApp/phone until OT Nest supplies its own Cal.com event links.
- **New placeholder brand mark**: `assets/img/otnest-logo-navy.svg` / `-white.svg` /
  `otnest-favicon.svg` (simple wordmark + pulse-line icon in the existing navy palette). Replace
  with real logo art whenever the client supplies one — same situation the dental project was in
  before its own logo arrived.
- `variant-blue/` and the six dental blog articles were not carried over (dead weight for a
  different business).

## Known gaps / next steps
- **Domain is a placeholder** (`otnest.in` in canonical/OG tags and `sitemap.xml`) — nothing is
  deployed or DNS-configured. Confirm the real domain before publishing, and add a `CNAME` file
  only once it's owned and pointed at GitHub Pages (or skip it entirely for another host).
- **Imagery has been replaced and visually verified.** Every dental-era `gen_*.jpg` photo is gone.
  People-depicting shots (the doctor portrait, hero, testimonials, service cards) were re-sourced
  from Pexels, each one opened and checked before use — Dr. Satish and all three named testimonials
  (cricketer, software engineer, retired officer) are Indian, matched to their stated role/age.
  Two of the original stock photos had a real stranger's name legible on an embroidered badge
  (one even a different real clinic's branding) and were replaced for that reason alone, not just
  style. A handful of decorative/equipment shots (job listings, locations, "success" stats, awards)
  are still generic Webflow stock with no visible people or branding issue — fine to leave, or swap
  for real clinic photos later. Licensing note: the Pexels photos are free-to-use stock under the
  Pexels license, not photos of OT Nest's actual staff or patients — swap in real photography
  (with consent) whenever the clinic can provide it.
- Cal.com, Supabase, and the domain above are the three "pending real credentials" items —
  see the section above for exactly what to fill in and where.
