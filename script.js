const body = document.body;
const theme = document.getElementById("theme");

if (localStorage.getItem("nac-theme") === "dark") {
  body.classList.add("dark");
}

function updateThemeIcon() {
  theme.textContent = body.classList.contains("dark") ? "☀" : "☾";
}

updateThemeIcon();

theme.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("nac-theme", body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});


/* =========================
   CHANGELOG MODAL
========================= */

const changelogModal = document.getElementById("changelogModal");
const changelogButtons = document.querySelectorAll("[data-changelog]");
const changelogCloseButton = document.querySelector(".modal-close");

function openChangelog() {
  if (!changelogModal) return;

  changelogModal.classList.add("open");
  changelogModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  if (changelogCloseButton) {
    setTimeout(() => changelogCloseButton.focus(), 50);
  }
}

function closeChangelog() {
  if (!changelogModal) return;

  changelogModal.classList.remove("open");
  changelogModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

changelogButtons.forEach(button => {
  button.addEventListener("click", openChangelog);
});

if (changelogCloseButton) {
  changelogCloseButton.addEventListener("click", closeChangelog);
}

if (changelogModal) {
  changelogModal.addEventListener("click", event => {
    if (event.target === changelogModal) {
      closeChangelog();
    }
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeChangelog();
  }
});
