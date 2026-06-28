// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Google reviews =====
// Wire up your real Google Business Profile here.
//  - placeId: your Google Place ID (find it at
//    https://developers.google.com/maps/documentation/places/web-service/place-id).
//    When set, the buttons deep-link straight to reading/writing a Google review.
//    Leave it "" to fall back to a Google Maps search for the shop.
//  - rating / count: update to match your real Google numbers (shown on the badge).
const GOOGLE = {
  placeId: "", // e.g. "ChIJN1t_tDeuEmsRUsoyG83frY4"
  name: "Dante Barbershop",
  address: "125 Monarch Park Ave, Toronto",
  rating: "4.9",
  count: "120+",
};

(function setupGoogleReviews() {
  const readBtn = document.getElementById("googleReadBtn");
  const writeBtn = document.getElementById("googleWriteBtn");
  if (!readBtn || !writeBtn) return;

  const ratingEl = document.getElementById("googleRating");
  const countEl = document.getElementById("googleCount");
  if (ratingEl && GOOGLE.rating) ratingEl.textContent = GOOGLE.rating;
  if (countEl && GOOGLE.count) countEl.textContent = GOOGLE.count;

  const search =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(GOOGLE.name + ", " + GOOGLE.address);

  if (GOOGLE.placeId) {
    readBtn.href = "https://search.google.com/local/reviews?placeid=" + GOOGLE.placeId;
    writeBtn.href = "https://search.google.com/local/writereview?placeid=" + GOOGLE.placeId;
  } else {
    readBtn.href = search;
    writeBtn.href = search;
  }
})();

// Sticky nav shadow on scroll
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

// Mobile menu toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// Reveal-on-scroll for sections
const revealTargets = document.querySelectorAll(
  ".section__head, .service-card, .about__text, .about__media, .gallery__item, .review, .goog, .contact__info, .booking, .cardshow"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => io.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("in"));
}

