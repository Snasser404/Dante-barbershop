# Dante Barbershop — Landing Page

A modern, responsive single-page landing site for **Dante Barbershop**: classic cuts, modern style.

## Sections

- **Hero** — headline, call-to-action, and key stats
- **Services & Pricing** — six service cards with prices and durations
- **About** — the shop's story with an animated barber pole
- **Gallery** — a hover-reveal grid of featured work
- **Reviews** — customer testimonials
- **Booking / Contact** — online booking via [BarberBook](https://barberbook.ca), address, hours, and contact details
- **Footer** — navigation and social links

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

- `index.html` — page markup
- `styles.css` — design tokens, layout, and responsive rules
- `script.js` — sticky nav, mobile menu, and scroll reveals

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
