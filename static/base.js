const darkLogo = document.getElementById('logoDark');
const lightLogo = document.getElementById('search-logo');

const darkCircle = document.querySelector(".dark-circle");
const lightedCircle = document.querySelector(".lighted-circle");
let mouseX, mouseY;



const toggleSwitchReallyDark = document.querySelector('.realDark');
const toggleSwitchDark = document.querySelector('.normalDark');
const sliders = document.querySelector('.sliderGroup');
const idElements = [ // array av ojects
    { id: 'Bbody', darkClass: 'dark-mode-body', lightClass: 'light-mode' },
    { id: 'Hheader', darkClass: 'dark-mode-head', lightClass: 'light-mode' },
    { id: 'IngredientsHead', darkClass: 'Ingredients-dark', lightClass: 'Ingredients-light' },
    { id: 'portions-id', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'aboutId', darkClass: 'about-dark', lightClass: 'about-light' },
    { id: 'unit', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'kitchens-id', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'restrictions', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'headerText', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'headerText2', darkClass: 'special-input-dark', lightClass: 'special-input-text' },
    { id: 'cooking-time-id', darkClass: 'special-input-dark', lightClass: 'special-input-text'},
    { id: 'only-specified-ingredients-label', darkClass: 'special-input-dark', lightClass: 'special-input-text'}
    
];

const classElements = [
    { className: 'tag', darkClass: 'dark-tag', lightClass: 'light-tag' }
];

// Function to save dark mode state to local storage
function saveDarkModeState(isDarkMode, isReallyDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
    localStorage.setItem('reallyDarkMode', isReallyDarkMode);
}

sliders.addEventListener('change', (e) => {

    const isDarkMode = toggleSwitchDark.checked;
    const isReallyDarkMode = toggleSwitchReallyDark.checked;
    
    
    saveDarkModeState(isDarkMode, isReallyDarkMode);

    const lightedCircle = document.querySelector('.lighted-circle');
    const darkCircle = document.querySelector('.dark-circle');

    if(isReallyDarkMode){
        lightedCircle.style.display = "block";
        darkCircle.style.display = "block";
        setCircles(mouseX, mouseY);
       
       
    }else{
        lightedCircle.style.display = "none";
        darkCircle.style.display = "none";
        
    }
 

    idElements.forEach(element => { // loopa igenom varje element i arrayn
        const el = document.getElementById(element.id); 

        if (!el) { // om elementet ej exitsterar på sidan, gå till nästa element
            return;
        }
        if (toggleSwitchDark.checked) { 
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

    if (lightLogo && darkLogo){
        if(isDarkMode){
            lightLogo.style.display = "none";
            darkLogo.style.display = "block";
        }else{
            darkLogo.style.display = "none";
            lightLogo.style.display = "block";
        }
    }       
});



// Check local storage for dark mode state on page load
const savedDarkModeState = localStorage.getItem('darkMode');
const savedReallyDarkModeState = localStorage.getItem('reallyDarkMode');
if (savedDarkModeState === 'true') {
    toggleSwitchDark.checked = true;
    sliders.dispatchEvent(new Event('change')); // Trigger change event to apply dark mode
}
if (savedReallyDarkModeState === 'true') {
    toggleSwitchReallyDark.checked = true;
    sliders.dispatchEvent(new Event('change')); // Trigger change event to apply dark mode
}

function onMouseMoveHandler(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    setCircles(mouseX, mouseY);
    
}

function setCircles(x, y){
    const darkCircleRadius = darkCircle.offsetWidth / 2;
    const lightCircleRadius = lightedCircle.offsetWidth / 2;

    const darkLeftPosition = mouseX - darkCircleRadius;
    const darkTopPosition = mouseY - darkCircleRadius;

    const lightLeftPosition = mouseX - lightCircleRadius;
    const lightTopPosition = mouseY - lightCircleRadius;

    darkCircle.style.left = darkLeftPosition + "px";
    darkCircle.style.top = darkTopPosition + "px";

    lightedCircle.style.left = lightLeftPosition + "px";
    lightedCircle.style.top = lightTopPosition + "px";
}

document.addEventListener("mousemove", onMouseMoveHandler);

