import {toHtmlElement} from "./toHtmlElement.mjs";

const headerHTML = `
    <div class="mod-header">
        <div class="header-main">
            <header>
                <h1>Bernardo Lopez</h1>
                <nav class="header-nav">
                    <a href="index.html" aria-label="Homepage">Home</a>
                    <a href="hobbies.html" aria-label="Hobbies Page">Hobbies</a>
                </nav>
            </header>
            <label class="dark-toggle">
                <input type="checkbox" autocomplete="off" />
                Dark mode
            </label>
            <button class="menu">Menu</button>
        </div>
        <nav class="toggle-nav hidden">
            <a href="index.html" aria-label="Homepage">Home</a>
            <a href="hobbies.html" aria-label="Hobbies Page">Hobbies</a>
        </nav>
    </div>
`;

const headerModule = toHtmlElement(headerHTML);
document.body.prepend(headerModule);

const nav = document.querySelector(".toggle-nav");
const menu = document.querySelector(".menu");
const dark  = document.querySelector(".dark-toggle input");

menu.addEventListener("click",() => {
    nav.classList.toggle("hidden");
})

document.body.addEventListener("click", (e) => {
    const modHeader = document.querySelector(".mod-header")
     if (!modHeader.contains(e.target)) {
         nav.classList.toggle("hidden", true);
     }
})
window.addEventListener("resize", () => {
    if (window.innerWidth > 600) {
        nav.classList.toggle("hidden", true);
    }
})

dark.addEventListener("change", () => {
    const res = document.body.classList.toggle("dark-mode", dark.checked);
    localStorage.setItem("darkMode", res);
})

const darkModeState = localStorage.getItem("darkMode") === "true";
if (darkModeState) {
    document.body.classList.add("dark-mode");
    dark.checked = true;
}