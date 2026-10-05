# OT Nest Occupational & Physiotherapy Centre

Website re-skinned from the Lumora template (the same engine used for the Dr. Asim Prakash
Dental Clinic build) for a new business: **OT Nest**, an occupational therapy and physiotherapy
practice with clinics in **Patna and Gurgaon** plus home visits in both cities, run by
**Dr. Satish** — occupational therapist and physiotherapist, MPT (Orthopaedics), dry-needling
certified, studied at TMU Medical College & Research Centre.

Content facts came from the client's own `otnest_booking 2.0.html` reference file (name, phone
+91 75493 77608, email otnest07@gmail.com, both addresses, specialities, stats, testimonials,
hours) and from the client's direct answers (OT practice, home visits, no public fees, Sunday
closed, domain `otnest.online`, Gurgaon Google Business Profile, Facebook page). Blog articles and
the treatment/location pages are original writing.

## Run locally
```
npx serve .
```
(No build step — plain static HTML/CSS/JS, same as the source template.)

## Site structure
- Main pages (Webflow-derived): `/`, `/about/`, `/service/`, `/blog/`.
- Lighter pages on the article template (`assets/css/article.css`): six blog posts, two location
  pages (`/physiotherapy-patna/`, `/physiotherapy-gurgaon/`), five condition pages
  (`/knee-pain-treatment/`, `/sciatica-treatment/`, `/frozen-shoulder-treatment/`,
  `/stroke-rehabilitation/`, `/autism-adhd-occupational-therapy/`) and `/home-visit-physiotherapy/`.
- Home-only sections: "Where does it hurt?" body map (`assets/js/body-map.js`) and "Plan your
  visit", styled by `assets/css/home-extras.css`.
- **One shared header on every page** (`<header class="otn-hd">`, styles in `toggles.css` section 7,
  behaviour in `assets/js/i18n-theme.js`). It replaced the Webflow navbar, whose phone menu left an
  invisible full-page layer after closing that blocked every tap. If you change a menu link, change
  it in all pages (search for `otn-hd__list`).
- **Liquid-glass styling** (header capsule, desktop nav bead, phone menu card, phone quick bar): the
  glass is clear and adapts to what is behind it — `i18n-theme.js` samples the page under the
  capsule/bar and adds `.tone-light` (navy ink, white/navy logo crossfade) over light content. In
  Chromium it also builds SVG displacement maps (`#otn-lens-bar`, `#otn-lens-dock`) for edge
  refraction; Safari/Firefox get the same glass without the bending. Solid fallbacks apply when
  `backdrop-filter` is unsupported or the visitor prefers reduced transparency. The four Webflow
  pages use `otn-hd--over` so their hero sits under the glass.
- **Home "Services" gallery on phones** is driven by `assets/js/service-scroll.js` (the Webflow
  interaction only runs on desktop, which left the cards frozen half off-screen on mobile).
- Every page loads `assets/js/mobile-bar.js` (Call / WhatsApp / Book bar on phones, replacing the
  floating WhatsApp bubble below 768px).

## SEO
- Canonicals, `og:*` and Twitter tags on every real page, all pointing at `https://otnest.online`,
  with a branded share image `assets/img/otnest-share.jpg` (1200×630).
- Structured data: the home page carries the full graph (website, organisation, Dr. Satish, both
  clinics with address and hours); location pages carry their clinic; condition pages are
  `MedicalWebPage`; blog posts are `BlogPosting`. No `aggregateRating` — Google doesn't show
  self-published ratings for local businesses and can penalise them.
- `sitemap.xml` lists all indexable pages. To change the domain, search-and-replace
  `otnest.online` site-wide (HTML, `sitemap.xml`, `robots.txt`).

## Deliberately changed from the cloned Lumora/dental codebase
- **Language selector removed**; `i18n-theme.js` only injects the light/dark toggle and the
  mobile-nav fix. The unused Devanagari font was removed from every page.
- **Google sign-in removed** and **`assets/js/supabase-config.js` / `cal-config.js` reset to
  empty values** — they pointed at the dental clinic's live Supabase project and Cal.com account.
  Login/account and `/book/` degrade to "call/WhatsApp us" until OT Nest supplies its own.
- **Real client brand mark**: `otnest-logo-navy.png`, `otnest-logo-white.png` (pure-white
  recolor), `otnest-favicon-32.png` (2 KB) and `otnest-apple-touch.png` (180px, white plate).
- **Performance**: Sora loads once via a stylesheet link (the blocking WebFont.js loader is gone);
  duplicate GSAP/ScrollTrigger copies in `<head>` removed; photos served as WebP; unused images
  deleted. A `<noscript>` rule plus a no-GSAP fallback make sure animated content can never stay
  invisible.
- **Honest copy**: template stats (92% comfort, 24/7 support, 7-minute wait…) replaced with the
  client's real figures; "team", "advanced technology" and "recognized worldwide" claims removed.

## Imagery
All photos are Pexels stock, each opened and checked before use. Photos showing a real person's
name or another clinic's branding were rejected or replaced — three so far, including
`otnest-balance-therapy` (embroidered "Funkcinės Terapijos Centras" on the scrubs). The consultation
photo was cropped to remove a legible "Hair Mineral Analysis" report. Children's-therapy images
(`otnest-child-ball-therapy`, `otnest-child-fine-motor`, `otnest-hand-putty`) support the OT side.
None of these are OT Nest's real staff or patients.

## Known gaps / next steps
- **Dr. Satish photo is real** (supplied by the client): `otnest-doctor-portrait.webp` (1080×1440 cards), `otnest-doctor-1.webp` (4:5, phone hero + About card), `otnest-doctor-hero.webp` (desktop hero banner, wall backdrop extended from the photo) and the About careers/awards tiles. The lanyard shows "BLK-MAX" branding — swap in a photo without it if the clinic prefers.
- **Testimonial avatars** are stock faces beside real patient names — replace with initials or
  consented photos.
- **Patna Google Business Profile link** — Patna directions currently use an address search.
- **Hero "Book a visit" form** only opens WhatsApp; leads are lost if the visitor never presses send.
  Connect it to an inbox/sheet (Apps Script, Formspree or the future Supabase project).
- **Login is visible in the menu but has no backend**; the video-consult button opens the
  generic `meet.google.com` page. Supabase, Cal.com and a Meet room link are pending from the client.
- **Careers section** on the about page lists three openings — confirm they're real.
- Not deployed yet; add a `CNAME` only once `otnest.online` points at the host.
