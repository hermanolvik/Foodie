// Get all elements with class "dropdown"
const dropdowns = document.querySelectorAll(".dropdown");

// Add click event listeners to each dropdown
dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", () => {
        dropdown.classList.toggle("open");
        const content = dropdown.querySelector(".dropdown-content");
        if (content.style.maxHeight) {
            content.style.maxHeight = null; // Close the dropdown
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Open the dropdown
        }
    });
});
