const body = document.body;
const theme = document.getElementById("theme");
if (localStorage.getItem("nac-theme") === "dark") body.classList.add("dark");
function updateThemeIcon() {
  if (!theme) return;
  theme.textContent = body.classList.contains("dark") ? "☀" : "☾";
  theme.setAttribute("aria-label", body.classList.contains("dark") ? "Hellmodus aktivieren" : "Dunkelmodus aktivieren");
}
updateThemeIcon();
theme?.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("nac-theme", body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

const downloadTabs = [...document.querySelectorAll('[role="tab"][aria-controls]')];
function activateDownloadTab(tab, moveFocus = false) {
  downloadTabs.forEach(candidate => {
    const selected = candidate === tab;
    candidate.setAttribute("aria-selected", String(selected));
    candidate.tabIndex = selected ? 0 : -1;
    candidate.classList.toggle("is-active", selected);
    const panel = document.getElementById(candidate.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  if (moveFocus) tab.focus();
}
downloadTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateDownloadTab(tab));
  tab.addEventListener("keydown", event => {
    let nextIndex = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % downloadTabs.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + downloadTabs.length) % downloadTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = downloadTabs.length - 1;
    if (nextIndex !== index) { event.preventDefault(); activateDownloadTab(downloadTabs[nextIndex], true); }
  });
});

const detailsToggle = document.getElementById("container-details-toggle");
const featureDetails = document.getElementById("container-inspector-details");
let closeTimer;
detailsToggle?.addEventListener("click", () => {
  const isOpen = detailsToggle.getAttribute("aria-expanded") === "true";
  window.clearTimeout(closeTimer);
  if (isOpen) {
    featureDetails.style.maxHeight = featureDetails.scrollHeight + "px";
    featureDetails.style.opacity = "1";
    requestAnimationFrame(() => { featureDetails.style.maxHeight = "0px"; featureDetails.style.opacity = "0"; });
    detailsToggle.setAttribute("aria-expanded", "false");
    featureDetails.setAttribute("aria-hidden", "true");
    closeTimer = window.setTimeout(() => { featureDetails.hidden = true; }, 260);
  } else {
    featureDetails.hidden = false;
    featureDetails.style.maxHeight = "0px";
    featureDetails.style.opacity = "0";
    featureDetails.setAttribute("aria-hidden", "false");
    detailsToggle.setAttribute("aria-expanded", "true");
    requestAnimationFrame(() => { featureDetails.style.maxHeight = featureDetails.scrollHeight + "px"; featureDetails.style.opacity = "1"; });
    closeTimer = window.setTimeout(() => {
      if (detailsToggle.getAttribute("aria-expanded") === "true") featureDetails.style.maxHeight = "none";
    }, 280);
  }
});

const changelogModal = document.getElementById("changelogModal");
const changelogCloseButton = changelogModal?.querySelector(".modal-close");
const changelogButtons = document.querySelectorAll("[data-changelog]");
let lastChangelogTrigger = null;
function openChangelog(button) {
  if (!changelogModal) return;
  const targetId = button.getAttribute("data-changelog");
  changelogModal.querySelectorAll(".changelog-content").forEach(section => { section.hidden = section.id !== targetId; });
  lastChangelogTrigger = button;
  changelogModal.classList.add("open");
  changelogModal.setAttribute("aria-hidden", "false");
  body.classList.add("modal-open");
  window.setTimeout(() => changelogCloseButton?.focus(), 50);
}
function closeChangelog() {
  if (!changelogModal?.classList.contains("open")) return;
  changelogModal.classList.remove("open");
  changelogModal.setAttribute("aria-hidden", "true");
  body.classList.remove("modal-open");
  lastChangelogTrigger?.focus();
}
changelogButtons.forEach(button => button.addEventListener("click", () => openChangelog(button)));
changelogCloseButton?.addEventListener("click", closeChangelog);
changelogModal?.addEventListener("click", event => { if (event.target === changelogModal) closeChangelog(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeChangelog(); });
