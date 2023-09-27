

function fadeInById(elementId) {
    const fadeInArea = document.getElementById(elementId);

    fadeInArea.style.display = 'block';
    fadeInArea.style.opacity = 0;

    getComputedStyle(fadeInArea).opacity;

    // slutgiltiga värdet för opacity
    fadeInArea.style.opacity = 0.8;
}

function displayBlockByClass(className) {
    let animation = document.getElementsByClassName(className);
    for (let i = 0; i < animation.length; i++) {
        animation[i].style.display = 'block';
        animation[i].style.opacity = 1;
    }
}

function dimAllButLoadingAnimation() {
     // Få alla element i sidan
    let header = document.getElementsByTagName('header')[0];
    header.classList.add('dimmed');

    // Hitta  och lägg till 'dimmed' klassen
    let searchContainers = document.querySelectorAll('.search-container');
    searchContainers.forEach(function(container) {
        container.classList.add('dimmed');
    });
}

// Funktion  sidans utseende
function resetPageAppearance() {
    
    let header = document.getElementsByTagName('header')[0];
    header.classList.remove('dimmed');

    let searchContainers = document.querySelectorAll('.search-container');
    searchContainers.forEach(function(container) {
        container.classList.remove('dimmed');
    });

    let fadeInArea = document.getElementById('logo-animation-area');
    fadeInArea.style.display = 'none';
    fadeInArea.style.opacity = 0;

    let animations = document.getElementsByClassName('loading-animation');
    for (let i = 0; i < animations.length; i++) {
        animations[i].style.display = 'none';
        animations[i].style.opacity = 0;
    }

}

function doAnimations() {
    dimAllButLoadingAnimation();
    displayBlockByClass('loading-animation');
    fadeInById('logo-animation-area');
}