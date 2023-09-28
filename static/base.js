
const toggleSwitch = document.getElementById('toggleSwitch');
const elements = [ // array av ojects
    { id: 'Bbody', darkClass: 'dark-mode-body', lightClass: 'light-mode' },
    { id: 'Hheader', darkClass: 'dark-mode-head', lightClass: 'light-mode' },
    { id: 'IngredientsHead', darkClass: 'Ingredients-dark', lightClass: 'Ingredients-light' },
    { id: 'portions-id', darkClass: 'dark-portions', lightClass: 'portions' },
    { id: 'aboutId', darkClass: 'about-dark', lightClass: 'about-light' },
];

toggleSwitch.addEventListener('change', () => {
    elements.forEach(element => { // loopa igenom varje element i arrayn
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
});
