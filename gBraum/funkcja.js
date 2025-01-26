const linksEl = document.getElementById("links");
const hamburgerEl = document.getElementById("hamburger");
const hamburgerContainerEl = document.getElementById("hamburger-container");
const closeEl = document.getElementById("close");

hamburgerContainerEl.addEventListener("click", () => {
    linksEl.classList.toggle("links--hamburger");
    hamburgerEl.classList.toggle("hamburger--hidden");
    closeEl.classList.toggle("close--hidden");
})