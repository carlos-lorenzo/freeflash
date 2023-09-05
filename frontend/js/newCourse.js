

fetch("/frontend/host-info.json")
    .then(response => response.json())
    .then(hostData => {
        
        // Fetch CSRF token from Django server
        fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/get_csrf_token/`)  
        .then(response => response.json())
        .then(data => {
            
            const csrftoken = data.csrfToken; 
            const form = document.getElementById("course-form");
    
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                
                const formData = new FormData(form);

                fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/new_course/`, {
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

})

