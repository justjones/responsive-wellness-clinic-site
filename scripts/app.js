// =========================
// Modal (Featured Services)
// =========================
const detailModal = document.getElementById("detailModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const modalBullets = document.getElementById("modalBullets");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const featuredGrid = document.getElementById("featuredGrid");
const modalCta = document.getElementById("modalCta");

let lastFocusedEl = null;

const DETAILS = {
  "service-massage": {
    title: "Massage Therapy",
    text: "Personalized sessions designed to reduce tension, support recovery, and help you feel rebalanced.",
    bullets: [
      "Relaxation + stress relief",
      "Targeted muscle work",
      "Comfort-first approach",
    ],
  },
  "service-sauna": {
    title: "Infrared Sauna",
    text: "A gentle, warming experience to support relaxation and help you unwind from the week.",
    bullets: [
      "Calming reset",
      "Supports circulation and recovery",
      "Great add-on service",
    ],
  },
  "service-facial": {
    title: "Skin & Facial Care",
    text: "Soothing treatments focused on hydration, clarity, and glow — customized to your skin needs.",
    bullets: ["Skin consultation", "Gentle products", "Relaxing experience"],
  },
  "service-coaching": {
    title: "Wellness Coaching",
    text: "Supportive guidance to build routines that are realistic, sustainable, and aligned with your goals.",
    bullets: [
      "Habit-focused plan",
      "Monthly check-ins",
      "Simple goals that stick",
    ],
  },
};

function openDetail(key) {
  const d = DETAILS[key];
  if (!d || !detailModal) return;

  modalTitle.textContent = d.title;
  modalText.textContent = d.text;

  modalBullets.innerHTML = "";
  d.bullets.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    modalBullets.appendChild(li);
  });

  detailModal.classList.remove("hidden");
  detailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");

  // focus close button for accessibility
  modalCloseBtn?.focus();
}

function closeDetail() {
  if (!detailModal) return;

  detailModal.classList.add("hidden");
  detailModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");

  // return focus to the card the user clicked
  if (lastFocusedEl) lastFocusedEl.focus();
}

// Attach modal listeners once (guarded)
if (featuredGrid && detailModal) {
  featuredGrid.addEventListener("click", (e) => {
    const card = e.target.closest(".service-card");
    if (!card) return;

    lastFocusedEl = card;
    openDetail(card.dataset.detail);
  });

  modalCloseBtn?.addEventListener("click", closeDetail);

  // click backdrop to close
  detailModal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close === "true") closeDetail();
  });

  // ESC key closes
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !detailModal.classList.contains("hidden")) {
      closeDetail();
    }
  });

  // CTA closes modal, then anchor jump happens
  modalCta?.addEventListener("click", () => {
    closeDetail();
  });
}

// =========================
// Testimonials
// =========================
const testimonialBox = document.getElementById("testimonialBox");

const TESTIMONIALS = [
  {
    quote:
      "I walked in tense and left feeling lighter. The space is so calming.",
    author: "Jamie R.",
  },
  {
    quote:
      "The staff is kind, professional, and truly listens. I felt supported.",
    author: "Morgan T.",
  },
  {
    quote:
      "Everything felt thoughtful and peaceful — exactly what I needed this week.",
    author: "Alex P.",
  },
  {
    quote: "Best wellness experience I’ve had in a long time. I’ll be back.",
    author: "Sam K.",
  },
];

// Must match CSS transition durations
const DISPLAY_MS = 4500; // visible time
const TRANSITION_MS = 700; // fade/slide time

let tIndex = 0;
let testimonialIntervalId = null;

function renderTestimonial(t) {
  testimonialBox.innerHTML = `
    <p class="quote">“${t.quote}”</p>
    <p class="author">— ${t.author}</p>
  `;
}

function showTestimonial(i) {
  renderTestimonial(TESTIMONIALS[i]);

  // animate in
  requestAnimationFrame(() => {
    testimonialBox.classList.add("show");
    testimonialBox.classList.remove("hide-up");
  });
}

function cycleTestimonials() {
  // animate out
  testimonialBox.classList.remove("show");
  testimonialBox.classList.add("hide-up");

  setTimeout(() => {
    tIndex = (tIndex + 1) % TESTIMONIALS.length;

    // reset before showing again
    testimonialBox.classList.remove("hide-up");
    renderTestimonial(TESTIMONIALS[tIndex]);

    requestAnimationFrame(() => testimonialBox.classList.add("show"));
  }, TRANSITION_MS);
}

if (testimonialBox) {
  showTestimonial(tIndex);

  // One clean loop: cycle every DISPLAY_MS
  testimonialIntervalId = setInterval(cycleTestimonials, DISPLAY_MS);
}

// =========================
// Contact Form (demo validation)
// =========================
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const service = (formData.get("service") || "").toString().trim();
    const message = (formData.get("message") || "").toString().trim();
    const consent = formData.get("consent");

    if (!name || !email || !service || !message || !consent) {
      formStatus.textContent = "Please complete all required fields.";
      return;
    }

    formStatus.textContent = "Thanks! Your message has been received (demo).";
    contactForm.reset();
  });
}

// =========================
// Footer Year
// =========================
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
