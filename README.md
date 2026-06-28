# Dante Barbershop — Landing Page

A modern, responsive single-page landing site for **Dante Barbershop**: classic cuts, modern style.

## Sections

- **Hero** — headline, call-to-action, and key stats
- **Services & Pricing** — six service cards with prices and durations
- **About** — the shop's story with an animated barber pole
- **Gallery** — a hover-reveal grid of featured work
- **Reviews** — customer testimonials
- **Booking / Contact** — appointment request form, address, hours, and contact details
- **Footer** — navigation and social links

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no dependencies.

- `index.html` — page markup
- `styles.css` — design tokens, layout, and responsive rules
- `script.js` — sticky nav, mobile menu, scroll reveals, and the booking form demo

Fonts are loaded from Google Fonts (Bebas Neue, Oswald, Cormorant Garamond).

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Notes

The booking form is a front-end demo — it validates input and shows a
confirmation message but does not submit anywhere. Wire it to your booking
provider or a backend endpoint to take real reservations.
