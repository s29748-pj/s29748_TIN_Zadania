const accordionButtons = document.querySelectorAll(".accordion");

function openAccordionItem(event) {
    accordionButtons.forEach(btn => {
        const panel = btn.nextElementSibling;
        if (btn !== event.target) {
            panel.classList.remove("open");
            btn.classList.remove("active");
        }
    });

    const panel = event.target.nextElementSibling;
    if (panel.classList.contains("open")) {
        panel.classList.remove("open");
        event.target.classList.remove("active");
    } else {
        panel.classList.add("open");
        event.target.classList.add("active");
    }
}

accordionButtons.forEach(button => {
    button.addEventListener("click", openAccordionItem);
});
