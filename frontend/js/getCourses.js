var courses = document.getElementById("courses");

fetch(`http://192.168.1.53:8000/api/courses/`, {method: "GET"})
.then(response => response.json())
.then(data => {
    data.forEach(course => {
        let courseContainer = document.createElement("div");
        courseContainer.className = "course-container"
        let courseName = document.createElement("h3");
        courseName.innerText = course.name;
        courseContainer.appendChild(courseName);

        courseContainer.addEventListener("click", function() {
            window.open(`courseDecks.html?course=${course.name}`, "_self");
        })

        courses.appendChild(courseContainer);

    });
})
