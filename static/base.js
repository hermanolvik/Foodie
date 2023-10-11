
const toggleSwitch = document.getElementById('toggleSwitch');
const idElements = [ // array av ojects
    { id: 'Bbody', darkClass: 'dark-mode-body', lightClass: 'light-mode' },
    { id: 'Hheader', darkClass: 'dark-mode-head', lightClass: 'light-mode' },
    { id: 'IngredientsHead', darkClass: 'Ingredients-dark', lightClass: 'Ingredients-light' },
    { id: 'portions-id', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'aboutId', darkClass: 'about-dark', lightClass: 'about-light' },
    { id: 'unit', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'kitchens-id', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'restrictions', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'cooking-time-id', darkClass: 'special-input-dark', lightClass: 'special-input-text'},
    { id: 'only-specified-ingredients-label', darkClass: 'special-input-dark', lightClass: 'special-input-text'}
    
];

const classElements = [
    { className: 'tag', darkClass: 'dark-tag', lightClass: 'light-tag' }
];

// Function to save dark mode state to local storage
function saveDarkModeState(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
}

toggleSwitch.addEventListener('change', () => {

    const isDarkMode = toggleSwitch.checked;
    saveDarkModeState(isDarkMode);

    idElements.forEach(element => { // loopa igenom varje element i arrayn
        const el = document.getElementById(element.id); 

        if (!el) { // om elementet ej exitsterar på sidan, gå till nästa element
            return;
        }
        if (toggleSwitch.checked) { 
            el.classList.add(element.darkClass);
            el.classList.remove(element.lightClass);
        } else {
            el.classList.add(element.lightClass);
            el.classList.remove(element.darkClass);
        }
    });


    classElements.forEach(element => {
        const els = document.querySelectorAll('.' + element.className);

        els.forEach(el => {
            if (isDarkMode) {
                el.classList.add(element.darkClass);
                el.classList.remove(element.lightClass);
            } else {
                el.classList.add(element.lightClass);
                el.classList.remove(element.darkClass);
            }
        });
    });
});



// Check local storage for dark mode state on page load
const savedDarkModeState = localStorage.getItem('darkMode');
if (savedDarkModeState === 'true') {
    toggleSwitch.checked = true;
    toggleSwitch.dispatchEvent(new Event('change')); // Trigger change event to apply dark mode
}

