
const toggleSwitch = document.getElementById('toggleSwitch');
const contentB = document.getElementById('Bbody');
const contentH = document.getElementById('Hheader');
const contentI = document.getElementById('IngredientsHead');
const contentP = document.getElementById('portions-id');
const contentA = document.getElementById('aboutId');


toggleSwitch.addEventListener('change', () => {
    if (toggleSwitch.checked) {
        contentB.classList.add('dark-mode-body');
        contentH.classList.add('dark-mode-head');
        contentI.classList.add('Ingredients-dark');
        contentP.classList.add('dark-portions');
        contentA.classList.add('about-dark');
        contentH.classList.remove('light-mode');
        contentB.classList.remove('light-mode');
        contentI.classList.remove('Ingredients-light');
        contentP.classList.remove('portions');
        contentA.classList.remove("about-light");
    } else {
        contentB.classList.remove('dark-mode-body');
        contentH.classList.remove('dark-mode-head');
        contentI.classList.remove('Ingredients-dark');
        contentP.classList.remove('dark-portions');
        contentA.classList.remove('about-dark');
        contentB.classList.add('light-mode');
        contentH.classList.add('light-mode');
        contentI.classList.add('Ingredients-light');
        contentP.classList.add('portions');
        contentA.classList.add('about-light');
    }
});
