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
            

            let Title = data.title;
            let Ingredients = data.ingredients.replace(/\n/g, '<br>');
            let Instructions = data.instructions.replace(/\n/g, '<br>');
            location.href ="/page_1?title=" + Title + "&ingredients=" + Ingredients + "&instructions=" + Instructions;
            
            
        })
        .catch(error => console.error('Error:', error));
});
