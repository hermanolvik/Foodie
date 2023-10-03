addEventListener("DOMContentLoaded", (event) => {
    imageElement = document.getElementById('recipe-image');
    imageElement.style.display = "block";
});

//document.getElementById('share-button').addEventListener('click', function() {
//
//    const currentPageURL = window.location.href;
//
//    const encodedURL = encodeURIComponent(currentPageURL);
//
//    console.log('Current Page URL:', currentPageURL);
//
//    fetch('/create-image?url=' + encodedURL)
//        .then(response => response.text())
//        .then(data => {
//            document.getElementById('result').textContent = data;
//        })
//        .catch(error => {
//            console.error('Error:', error);
//        });
//
//});