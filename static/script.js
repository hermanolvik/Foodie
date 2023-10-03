
document.getElementById('search-button').addEventListener('click', function () {
    doAnimations();

    // Create the JSON data to send to the backend
    //data will contain the string that was written in the search box on the first page
    const data = document.getElementById('tag-container');
    
    
    const tagContainer = document.getElementById('tag-container');

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
    
    console.log(numPortions);
    console.log(intKitchens);
    //This is the json structure to be sent to backend
    const jsonData = {
        ingredients: ingredients,
        dietary_restrictions: dietaryRestrictions,
        number_of_portions: numPortions,
        measurement_unit: unit,
        intKitchens: intKitchens
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


            location.href = "/recipe?title=" + Title + "&ingredients=" + Ingredients + "&instructions=" + Instructions;
            // timer
            setTimeout(function () {
                resetPageAppearance();
            }, 6000);
            

        })
        .catch(error => console.error('Error:', error));


});

document.addEventListener("DOMContentLoaded", function () {

    const addButton = document.getElementById('add-tag');
    const inputBox = document.getElementById('ingredient-field');
    const tagContainer = document.getElementById('tag-container');
    

    addButton.addEventListener('click', function(e) {

        const tagValue = inputBox.value;
        console.log(tagValue);
        
        const newTag = document.createElement('span');
        newTag.classList.add('tag'); 
        newTag.textContent = tagValue; // add text to element
        newTag.addEventListener('click',removeTag);
        tagContainer.appendChild(newTag); 

        inputBox.value = '';
    })

    // Add event listener to all elements with class 'tag'
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', function(e) {
            console.log('Clicked on tag:', tag.textContent);
            // Add your code here to handle the click event
        });
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

