addEventListener("DOMContentLoaded", (event) => {
    imageElement = document.getElementById('recipe-image');
    imageElement.style.display = "block";
});

document.getElementById('share-button').addEventListener('click', function() {

    const currentPageURL = window.location.href;
    const encodedURL = encodeURIComponent(currentPageURL);
    console.log('Current Page URL:', encodedURL);

    // Use the fetch API to request the image generation
    fetch('/create-image?url=' + encodedURL)
        .then(response => response.blob())  // Parse the response as a Blob
        .then(blob => {
            // Create a temporary <a> element to trigger the download
            const a = document.createElement('a');
            a.style.display = 'none';

            // Create a Blob URL for the image data
            const url = window.URL.createObjectURL(blob);

            // Set the href and download attributes of the <a> element
            a.href = url;
            a.download = 'generated_image.png';

            // Trigger a click event on the <a> element to initiate the download
            document.body.appendChild(a);
            a.click();

            // Clean up by revoking the Blob URL and removing the <a> element
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});