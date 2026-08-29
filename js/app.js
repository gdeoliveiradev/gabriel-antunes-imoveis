const menuButton = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");

menuButton.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
});