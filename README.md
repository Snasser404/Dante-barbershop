# Dante Barbershop — Landing Page

A modern, responsive single-page landing site for **Dante Barbershop**: classic cuts, modern style.

## Brand

The site follows the shop's business-card identity:

- **Logo** — the barber-pole emblem with scissors, razor, and the Amharic
  wordmark **ደንቴ** (`assets/logo.png`, extracted from the business card).
- **Colors** — blue accent (`--accent: #2e7db0`) on a dark base, with the
  classic red/white/blue barber pole and a diagonal blue/black stripe motif
  echoing the card border.
- **Business cards** — both sides are showcased in the Contact section
  (`assets/card-front.png`, `assets/card-back.png`).

## Sections

- **Hero** — headline, call-to-action, and key stats over a looping
  three-panel video of real shop footage
- **Services & Pricing** — the shop's real menu (For Kids $25, For Adults
  $30, Haircut with Beard $35, Lineup with Beard $20, Black Color $20)
- **About** — the shop's story alongside a looping clip of the detail work
- **Gallery** — a hover-reveal grid of real cuts from the chair
- **Reviews** — customer testimonials
- **Booking / Contact** — online booking via [BarberBook](https://barberbook.ca),
  address, hours, contact details, and the business-card showcase
- **Footer** — navigation and social links

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

- `index.html` — page markup
- `styles.css` — design tokens, layout, and responsive rules
- `script.js` — sticky nav, mobile menu, and scroll reveals
- `assets/` — logo and business-card images

Fonts are loaded from Google Fonts (Bebas Neue, Oswald, Cormorant Garamond).

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Booking

Appointments are handled by the shop's booking partner, **BarberBook**.
All "Book" buttons and the booking panel link out to
[barberbook.ca](https://barberbook.ca). To change the destination, update
the `https://barberbook.ca` links in `index.html`.

## Media

All photography and footage is real work from the shop, derived from clips
supplied by the owner:

- `assets/gallery/cut-*.jpg` — six 3:4 stills used in the Gallery grid.
- `assets/gallery/about-craft.jpg` — the About still, doubling as the poster
  frame for the About clip.
- `assets/video/hero.{webm,mp4}` — a 10s three-panel montage used as the hero
  background, muted and looping, with `hero-poster.jpg` as the poster.
- `assets/video/craft.{webm,mp4}` — an 8s vertical clip of the detail work in
  the About section.

Both videos ship as WebM (VP9) and MP4 (H.264) so every browser gets one, and
both are muted, looping, and `playsinline`. The About clip only loads and
plays once it scrolls into view, and `script.js` pauses both when the visitor
prefers reduced motion, leaving the poster frame visible.

To swap in new media, replace the files above at the same paths and keep the
aspect ratios (3:4 for gallery stills, 4:5 for the About poster).

## Google reviews

The Reviews section has a Google rating badge with **Read Reviews** and
**Leave a Review** buttons, plus optional live review cards. Everything is
configured in the `GOOGLE` object at the top of `script.js`:

- `placeId` — the shop's Google Place ID. Powers the read/write deep links.
- `apiKey` — a **Places API (New)** key. When set, the badge rating, review
  count, and review cards auto-update live from Google (results cached in the
  browser for 12h to limit billable API calls). Leave it `""` to keep the
  static fallback reviews and numbers.
- `rating` / `count` — static fallback values shown until live data loads.

To enable live reviews: create a Google Cloud project, enable **Places API
(New)** with billing, create an API key, restrict it to your domain(s) by
HTTP referrer and to the Places API, then paste it into `apiKey`. A
referrer-restricted key is safe to ship client-side — it only works from
your own domains.
