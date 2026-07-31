// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Background videos: respect reduced-motion, and only play the About clip
// once it scrolls into view so it costs nothing on first paint.
(function setupVideos() {
  const videos = Array.from(document.querySelectorAll("video"));
  if (!videos.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    videos.forEach((v) => {
      v.removeAttribute("autoplay");
      v.pause();
    });
    return;
  }

  const lazy = document.querySelector(".about__video");
  if (lazy && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          lazy.preload = "auto";
          lazy.load();
          const p = lazy.play();
          if (p && p.catch) p.catch(() => {});
          io.disconnect();
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(lazy);
  }
})();

// ===== Google reviews =====
// Wire up your real Google Business Profile here.
//
//  placeId  Your Google Place ID. Powers the "Read"/"Leave a review" deep links.
//
//  apiKey   A Google Places API (New) key. When set, the badge rating, review
//           count and the review cards auto-update live from Google. Leave it ""
//           to keep the static fallback below.
//           Setup:
//             1. console.cloud.google.com -> create/select a project
//             2. Enable "Places API (New)" and turn on billing
//             3. APIs & Services -> Credentials -> Create API key
//             4. Restrict the key:
//                  Application restrictions -> HTTP referrers, add:
//                     https://snasser404.github.io/*   (+ your custom domain, + http://localhost:*)
//                  API restrictions -> restrict to "Places API (New)"
//             5. Paste the key below. (A referrer-restricted key is safe to ship
//                client-side — it only works from your own domains.)
//
//  rating / count  Static fallback shown until the live data loads (or if no apiKey).
const GOOGLE = {
  placeId: "ChIJNRrYNwDN1IkRWXqKAmp2KGY",
  apiKey: "",
  name: "Dante Barbershop",
  address: "125 Monarch Park Ave, Toronto",
  rating: "4.9",
  count: "120+",
};

(function setupGoogleReviews() {
  const readBtn = document.getElementById("googleReadBtn");
  const writeBtn = document.getElementById("googleWriteBtn");
  const ratingEl = document.getElementById("googleRating");
  const countEl = document.getElementById("googleCount");
  const grid = document.getElementById("reviewsGrid");

  // Deep links / fallback for the badge buttons
  if (readBtn && writeBtn) {
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
  }

  // Static fallback numbers
  if (ratingEl && GOOGLE.rating) ratingEl.textContent = GOOGLE.rating;
  if (countEl && GOOGLE.count) countEl.textContent = GOOGLE.count;

  // Live data (only when an API key is configured)
  if (GOOGLE.apiKey && GOOGLE.placeId) {
    loadLiveReviews({ ratingEl, countEl, grid });
  }

  function loadLiveReviews(els) {
    const CACHE_KEY = "dante_google_reviews_v1";
    const TTL = 12 * 60 * 60 * 1000; // 12h — limits billable Places API calls

    function apply(data) {
      if (typeof data.rating === "number" && els.ratingEl) {
        els.ratingEl.textContent = data.rating.toFixed(1);
      }
      if (typeof data.userRatingCount === "number" && els.countEl) {
        els.countEl.textContent = data.userRatingCount.toLocaleString();
      }
      if (Array.isArray(data.reviews) && data.reviews.length && els.grid) {
        renderReviews(els.grid, data.reviews);
      }
    }

    // Serve from cache when fresh, to avoid an API call on every page load
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
      if (cached && Date.now() - cached.t < TTL) {
        apply(cached.d);
        return;
      }
    } catch (e) {
      /* ignore cache errors */
    }

    fetch("https://places.googleapis.com/v1/places/" + GOOGLE.placeId, {
      headers: {
        "X-Goog-Api-Key": GOOGLE.apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Places API " + res.status);
        return res.json();
      })
      .then((data) => {
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: data }));
        } catch (e) {
          /* ignore quota errors */
        }
        apply(data);
      })
      .catch((err) => console.warn("Live Google reviews unavailable:", err));
  }

  function renderReviews(grid, reviews) {
    grid.innerHTML = "";
    reviews.slice(0, 6).forEach((r) => {
      const card = document.createElement("blockquote");
      card.className = "review reveal in";

      const stars = document.createElement("div");
      stars.className = "review__stars";
      const n = Math.round(r.rating || 5);
      stars.textContent = "★★★★★".slice(0, n) + "☆☆☆☆☆".slice(0, 5 - n);
      card.appendChild(stars);

      const text = document.createElement("p");
      const body = (r.text && r.text.text) || (r.originalText && r.originalText.text) || "";
      text.textContent = "“" + body + "”";
      card.appendChild(text);

      const cite = document.createElement("cite");
      const who = (r.authorAttribution && r.authorAttribution.displayName) || "Google reviewer";
      const when = r.relativePublishTimeDescription ? " · " + r.relativePublishTimeDescription : "";
      cite.textContent = "— " + who + when;
      card.appendChild(cite);

      grid.appendChild(card);
    });
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

