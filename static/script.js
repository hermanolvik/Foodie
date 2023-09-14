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
        body: JSON.stringify(jsonData)
    })
        .then(response => response.json())
        .then(data => {
            let title = data.title;
            let ingredients = data.ingredients.replace(/\n/g, '<br>');
            let instructions = data.instructions.replace(/\n/g, '<br>');

            const recipeElement = document.createElement('div');
            recipeElement.innerHTML = `<h2>${title}</h2><h3>Ingredients:</h3><p>${ingredients}</p><h3>Instructions:</h3><p>${instructions}</p>`;

            // Append it to the main content or to a specific container
            document.querySelector('main').appendChild(recipeElement);
        })
        .catch(error => console.error('Error:', error));
});
