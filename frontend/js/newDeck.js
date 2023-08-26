


// Fetch CSRF token from Django server
fetch('http://192.168.1.53:8000/api/get_csrf_token/')  
    .then(response => response.json())
    .then(data => {
        
        const csrftoken = data.csrfToken; 
        const form = document.getElementById("deck-form");
       

        form.addEventListener("submit", function(event) {
            event.preventDefault();

            let formData = new FormData(form);
            formData.append("course", new URLSearchParams(window.location.search).get('course'));
            fetch(form.action, {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                window.location.reload();
            })
            .catch(error => {
                // Handle errors
            });
        });
    })
    .catch(error => {
        console.error("Failed to fetch CSRF token:", error);
    });
