
document.getElementById('search-button').addEventListener('click', function () {
    doAnimations();

    // Create the JSON data to send to the backend
    //data will contain the string that was written in the search box on the first page
    const data = document.getElementById('tag-container');
    

    const tagElements = data.querySelectorAll(".tag");
    
    // Create an empty array to store the values
    const tagValuesArray = [];

    // Loop through the selected elements and extract their values
    tagElements.forEach(tag => {
        tagValuesArray.push(tag.textContent);
    });


    const ingredients = tagValuesArray;

   
    console.log(ingredients);
    //data is split into an array of strings, each string is the item separated by comma, it then trims the spaces on start and end

   // const ingredients = data.split(',').map(item => item.trim());

    const dietaryRestrictions = collectCheckedValues();
    const selectElement = document.getElementById('Portions-dd');
    const units = document.getElementById('Units-dd');

    const selectElement2 = document.getElementById('kitchens');

    // To get the selected option value:
    const selectedOptionIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedOptionIndex];
    const numPortions = selectedOption.value;

    const selectedUnitIndex = units.selectedIndex;
    const selectedUnit = units.options[selectedUnitIndex];
    const unit = selectedUnit.value;
    // To get the selected option value:
    const selectedOptionIndex2 = selectElement2.selectedIndex;
    const selectedOption2 = selectElement2.options[selectedOptionIndex2];
    const intKitchens = selectedOption2.value;
    const cookingTime = document.getElementById('cooking-time-input').value;
    console.log(cookingTime);
    
    console.log(numPortions);
    console.log(intKitchens);
    //This is the json structure to be sent to backend
    const jsonData = {
        ingredients: ingredients,
        dietary_restrictions: dietaryRestrictions,
        number_of_portions: numPortions,
        measurement_unit: unit,
        intKitchens: intKitchens,
        cookingTime: cookingTime
    };

    // Send a POST request to the backend
    fetch('/process_prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json()) //First wait for response, after make response to json
        .then(data => { //After it is made to json, use the data as a variable called "data"

            //data is a json object and attributes can be found with dots
            let Title = data.title;
            //<br> is html code for "\n"
            //We replace the \n with <br>
            let Ingredients = data.ingredients.replace(/\n/g, '<br>');
            let Instructions = data.instructions.replace(/\n/g, '<br>');
            //Sending the variables up to the app.py for the route of page_1 in flask


            location.href = "/recipe?title=" + Title + "&ingredients=" + Ingredients + "&instructions=" + Instructions + "&intKitchens=" + data.intKitchens + "&dietaryRestrictions=" + data.dietaryRestrictions + "&cookingTime=" + data.cookingTime;

            // timer
            setTimeout(function () {
                resetPageAppearance();
            }, 7000);
            

        })
        .catch(error => console.error('Error:', error));


});



document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById('add-tag');
    const inputBox = document.getElementById('ingredient-field');
    const tagContainer = document.getElementById('tag-container');

    // let darkModeState = localStorage.getItem('darkMode');
    // if(darkModeState){
    //     lightLogo.style.display = "none";
    //     darkLogo.style.display = "block";
    // }else{
    //     darkLogo.style.display = "none";
    //     lightLogo.style.display = "block";
    // }
    

    function addTag() {
        const tagValue = inputBox.value;
        if (tagValue.trim() === '') { // Om input är tom, returnera
            return;
        }

        // Check if tag already exists
        const existingTags = tagContainer.querySelectorAll('.tag');
        for (let i = 0; i < existingTags.length; i++) { // Gör inget om tag redan finns
            if (existingTags[i].textContent === tagValue) {
                return;
            }
        }

        const newTag = document.createElement('span');
        const toggleSwitch = document.getElementById('normalDarkToggle');
        newTag.classList.add('tag');
        if (toggleSwitch.checked) {
            newTag.classList.add('dark-tag');
        } else {
            newTag.classList.add('light-tag');
        }
        newTag.textContent = tagValue;
        newTag.addEventListener('click', removeTag);
        tagContainer.appendChild(newTag);

        inputBox.value = '';
        inputBox.focus();
    }

    addButton.addEventListener('click', addTag);

    // Lyssna på Enter-tangenten
    inputBox.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addTag();
        }
    });
    

});

function removeTag(event){
    const clickedTag = event.target;
    clickedTag.remove();
   
}


function collectCheckedValues() {
    const checkedCheckboxes = document.querySelectorAll('.dropdown-content input[type="checkbox"]:checked');
    const values = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
    const valuesString = values.join(', ');
    console.log(valuesString);
    return valuesString;
}

document.getElementById('something-else').addEventListener('click', function() {

    // Specify the URL you want to open
    var newUrl = 'https://www.foodora.se'; // Replace with your desired URL

    // Open the URL in the current window
    window.location.href = newUrl;
    
});



document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropbtn");
    

    // Toggle the dropdown when the button is clicked
    dropdown.addEventListener("click", function () {
        const drop = document.querySelector(".dropdown");
        drop.classList.toggle("active");
    });

    window.addEventListener("click", function (event) {
        const dropdownContent = document.querySelector(".dropdown");
        if (!dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove("active");
        }
    });


});

document.addEventListener("DOMContentLoaded", function() {
    const btn = document.getElementById('something-else');
    let hoverTimeout;
    
    btn.addEventListener('mouseover', function() {
      hoverTimeout = setTimeout(() => {
        btn.classList.add('hovered');
        btn.textContent = "Feeling Fabulous";
      }, 5000); // 5 sekunder
    });
  
    btn.addEventListener('mouseout', function() {
      clearTimeout(hoverTimeout);
      btn.classList.remove('hovered');
      btn.textContent = "Feeling Lazy";
    });
  });
  