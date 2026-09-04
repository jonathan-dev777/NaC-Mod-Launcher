const body = document.body;
const theme = document.getElementById("theme");


// Gespeichertes Theme laden

if (
  localStorage.getItem("nac-theme") === "dark"
) {

  body.classList.add("dark");

}


// Icon aktualisieren

function updateThemeIcon() {

  theme.textContent =
    body.classList.contains("dark")
      ? "☀"
      : "☾";

}


updateThemeIcon();


// Hell / Dunkel wechseln

theme.onclick = () => {

  body.classList.toggle("dark");

  localStorage.setItem(
    "nac-theme",
    body.classList.contains("dark")
      ? "dark"
      : "light"
  );

  updateThemeIcon();

};