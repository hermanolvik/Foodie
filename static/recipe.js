document.getElementById("share-button").addEventListener("click", function() {
    // Get the current page URL
    var pageUrl = window.location.href;

    // Send an AJAX request to your Flask server to trigger the download
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/download_image?url=" + encodeURIComponent(pageUrl), true);
    xhr.responseType = "blob";  // Set the response type to blob

    xhr.onload = function() {
        if (xhr.status === 200) {
            // Create a URL for the blob response
            var blob = new Blob([xhr.response], { type: "image/png" });
            var url = window.URL.createObjectURL(blob);

            // Create a temporary <a> element to trigger the download
            var a = document.createElement("a");
            a.href = url;
            a.download = "generated_image.png";

            // Trigger the click event on the <a> element to initiate the download
            a.click();

            // Clean up by revoking the object URL
            window.URL.revokeObjectURL(url);
        }
    };

    xhr.send();
});