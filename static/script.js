

document.getElementById('search-button').addEventListener('click', function () {
    // Create the JSON data to send to the backend
    const data = document.querySelector('.search-box').value;
    const prompt = data.split(',').map(item => item.trim());

    const jsonData = {
        ingredients: prompt
    };

    // Send a POST request to the backend
    fetch('/process_prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData) //Sending the json object
    })
    .then(response => response.json())
    .then(data => {
        // Update the content area with the response
        let answer =  data.answer;
    })
    .catch(error => console.error('Error:', error));
});


document.getElementById('something-else').addEventListener('click', function() {
    // Specify the URL you want to open
    var newUrl = 'https://www.foodora.se'; // Replace with your desired URL

    // Open the URL in the current window
    window.location.href = newUrl;
});

