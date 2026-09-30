const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector("#site-nav");

function closeNav() {
  if (!nav || !toggle) return;
  nav.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("nav-open");
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 980px)").matches) closeNav();
    });
  });
}

document.querySelectorAll(".drop-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const item = button.closest(".nav-drop");
    const willOpen = !item.classList.contains("is-open");
    document.querySelectorAll(".nav-drop").forEach((other) => {
      other.classList.remove("is-open");
      const otherButton = other.querySelector(".drop-btn");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("is-open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNav();
});

const heroVideo = document.querySelector(".hero-video-el");
if (heroVideo) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  } else {
    const play = () => heroVideo.play().catch(() => {});
    play();
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) play();
    });
  }
}

const form = document.querySelector("#appointment-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      `Name: ${data.get("name") || ""}`,
      `Phone: ${data.get("phone") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `I am a: ${data.get("who") || ""}`,
      `Reason for visit: ${data.get("reason") || ""}`,
      "",
      data.get("message") || "",
    ];
    const href = `mailto:admin@apcpaincare.com?subject=${encodeURIComponent("Appointment request")}&body=${encodeURIComponent(lines.join("\n"))}`;
    const note = form.querySelector(".form-status");
    if (note) {
      note.hidden = false;
      note.textContent = "Your email app should open with this request addressed to the clinic. If it does not, call (919) 510-7901.";
    }
    window.location.href = href;
  });
}
