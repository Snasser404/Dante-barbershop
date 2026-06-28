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

- **Hero** — headline, call-to-action, and key stats
- **Services & Pricing** — the shop's real menu (For Kids $25, For Adults
  $30, Haircut with Beard $35, Lineup with Beard $20, Black Color $20)
- **About** — the shop's story with an animated barber pole
- **Gallery** — a hover-reveal grid of featured work
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
