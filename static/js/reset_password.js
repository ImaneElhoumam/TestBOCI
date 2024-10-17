document.getElementById("resetPasswordForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent the form from submitting the normal way

    // Get the email input value
    const email = document.getElementById("email").value;
    
    // Prepare data for the API request
    const data = JSON.stringify({
        email: email
    });

    // Make an AJAX request to the password reset API
    fetch('/api/accounts/password-reset/', { // Adjust the URL based on your endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    .then(response => response.json())
    .then(result => {
        // Display a success message if the request was successful
        if (result.message) {
            document.getElementById("message").innerHTML = `<p style="color:green;">${result.message}</p>`;
        } else {
            // Handle errors (if any)
            let errors = result.errors ? result.errors : result.detail;
            document.getElementById("message").innerHTML = `<p style="color:red;">${errors}</p>`;
        }
    })
    .catch(error => {
        // Handle any network or server errors
        document.getElementById("message").innerHTML = `<p style="color:red;">An error occurred: ${error.message}</p>`;
    });
});
