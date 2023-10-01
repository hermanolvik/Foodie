
document.getElementById('search-button').addEventListener('click', function () {

    doAnimations();
    // Create the JSON data to send to the backend
    //data will contain the string that was written in the search box on the first page
    const data = document.querySelector('.search-box').value;
    //data is split into an array of strings, each string is the item separated by comma, it then trims the spaces on start and end
    const ingredients = data.split(',').map(item => item.trim());

    const dietaryRestrictions = collectCheckedValues();

    const selectElement = document.getElementById('Portions-dd');

    // To get the selected option value:
    const selectedOptionIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedOptionIndex];
    const numPortions = selectedOption.value;
    
    console.log(numPortions);
    //This is the json structure to be sent to backend
    const jsonData = {
        ingredients: ingredients,
        dietary_restrictions: dietaryRestrictions,
        number_of_portions: numPortions
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
            resetPageAppearance();

        })
        .catch(error => console.error('Error:', error));


});



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

