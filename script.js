// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

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
  ".section__head, .service-card, .about__text, .about__media, .gallery__item, .review, .contact__info, .booking"
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

// Prevent past dates in the booking form
const dateInput = document.querySelector('input[name="date"]');
if (dateInput) {
  dateInput.min = new Date().toISOString().split("T")[0];
}

// Booking form (front-end demo — no backend)
const form = document.getElementById("bookingForm");
const note = document.getElementById("bookingNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.style.color = "#e08b6b";
    note.textContent = "Please fill in your name, phone, service and date.";
    form.reportValidity();
    return;
  }
  const name = form.elements["name"].value.trim().split(" ")[0];
  note.style.color = "";
  note.textContent = `Thanks${name ? ", " + name : ""}! We'll text you to confirm your chair. ✂`;
  form.reset();
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
});
