var courses = document.getElementById("courses");
var closeIcon = document.getElementById("close-popup");



fetch("/frontend/host-info.json")
    .then(response => response.json())
    .then(hostData => {
        
        fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/courses/`, {method: "GET"})
            .then(response => response.json())
            .then(data => {
                data.forEach(course => {
                    let courseContainer = document.createElement("div");
                    courseContainer.className = "container pointer"
                    let courseName = document.createElement("h3");
                    courseName.className = "pointer";
                    courseName.innerText = course.name;
                    courseContainer.appendChild(courseName);

                    courseContainer.addEventListener("click", function() {
                        window.open(`courseDecks.html?course=${course.name}`, "_self");
                    })

                    courses.appendChild(courseContainer);

                });
            })

        var courseForm = document.getElementById("course-container");

        var addCourse = document.createElement("div");
        addCourse.className = "pointer container";
        addCourse.style.order = courses.children.length + 1;
        var addIcon = document.createElement("i");
        addIcon.className = "fa-solid fa-plus";
        addIcon.style.zIndex = "1";
        addCourse.appendChild(addIcon);

        addCourse.addEventListener("click", function(){
            courseForm.style.scale = 1;
            courseForm.style.opacity = 1;
        })

        document.getElementById("close-popup").addEventListener("click", function(){
            courseForm.style.scale = 0;
            courseForm.style.opacity = 0;
        })

        courses.appendChild(addCourse);
        
})
    





