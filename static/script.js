document.getElementById('search-button').addEventListener('click', function () {
    // Create the JSON data to send to the backend
    //data will contain the string that was written in the search box on the first page
    const data = document.querySelector('.search-box').value;
    //data is split into an array of strings, each string is the item separated by comma, it then trims the spaces on start and end
    const prompt = data.split(',').map(item => item.trim());

    //This is the json structure to be sent to backend
    const jsonData = {
        ingredients: prompt
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
            location.href ="/page_1?title=" + Title + "&ingredients=" + Ingredients + "&instructions=" + Instructions;
        
            
            
        })
        .catch(error => console.error('Error:', error));
});



document.getElementById('something-else').addEventListener('click', function() {
    // Specify the URL you want to open
    var newUrl = 'https://www.foodora.se'; // Replace with your desired URL

    // Open the URL in the current window
    window.location.href = newUrl;
});
document.addEventListener("DOMContentLoaded", function () {
    const dropdown = document.querySelector(".dropdown");
    const checkboxes = document.querySelectorAll(".dropdown-content input[type='checkbox']");

    // Toggle the dropdown when the button is clicked
    dropdown.addEventListener("click", function () {
        this.classList.toggle("active");
    });

    // Close the dropdown when the user clicks outside of it
    window.addEventListener("click", function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("active");
        }
    });

    // Handle checkbox selections
    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            // You can handle checkbox selections here
            console.log("Selected value: " + this.value + ", Checked: " + this.checked);
        });
    });
});