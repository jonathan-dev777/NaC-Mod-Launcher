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

  localStorage.setItem(
    "nac-theme",
    body.classList.contains("dark") ? "dark" : "light"
  );

  updateThemeIcon();
});
