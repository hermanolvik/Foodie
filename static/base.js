
const toggleSwitch = document.getElementById('toggleSwitch');
const contentB = document.getElementById('Bbody');
const contentH = document.getElementById('Hheader');
const contentI = document.getElementById('IngredientsHead');
const contentP = document.getElementById('portions-id');
const contentA = document.getElementById('aboutId');


toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        if (contentB) contentB.classList.add('dark-mode-body');
        if (contentH) contentH.classList.add('dark-mode-head');
        if (contentP) contentP.classList.add('dark-portions');
        if (contentI) contentI.classList.add('Ingredients-dark');
        if (contentA) contentA.classList.add('about-dark');

        if (contentH) contentH.classList.remove('light-mode');
        if (contentB) contentB.classList.remove('light-mode');
        if (contentI) contentI.classList.remove('Ingredients-light');
        if (contentP) contentP.classList.remove('portions');
        if (contentA) contentA.classList.remove('about-light');
    } else {
        if (contentB) contentB.classList.remove('dark-mode-body');
        if (contentH) contentH.classList.remove('dark-mode-head');
        if (contentP) contentP.classList.remove('dark-portions');
        if (contentI) contentI.classList.remove('Ingredients-dark');
        if (contentA) contentA.classList.remove('about-dark');

        if (contentB) contentB.classList.add('light-mode');
        if (contentH) contentH.classList.add('light-mode');
        if (contentI) contentI.classList.add('Ingredients-light');
        if (contentP) contentP.classList.add('portions');
        if (contentA) contentA.classList.add('about-light');
    }
});
