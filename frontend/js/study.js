const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');

var state = "question";

fetch(`http://192.168.1.53:8000/api/next_card?course=${course}&deck=${deck}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    console.log(data);

    document.getElementById("prompt-text").innerText = data.question;

    updateImage(data, state)

    document.getElementById("card").addEventListener("click", function(){
        if (state == "question")
        {
            document.getElementById("prompt-text").innerText = data.answer;

            state = "answer";
        } else {
            document.getElementById("prompt-text").innerText = data.question;

            state = "question";
        }

        updateImage(data, state);
    })

    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            if (state == "question")
            {
                document.getElementById("prompt-text").innerText = data.answer;
    
                state = "answer";
            } else {
                document.getElementById("prompt-text").innerText = data.question;
    
                state = "question";
            }
    
            updateImage(data, state); //whatever you want to do when space is pressed
        }
      })

    let confidences = document.getElementsByClassName("confidence")

    for (let i = 0; i < confidences.length; i++) {
        confidences[i].addEventListener("click", function(){
            updateConfidence(data.id, confidences[i].id);
            //window.location.reload();
        })
    }
    
})

function updateConfidence(id, confidence) {
    fetch(`http://192.168.1.53:8000/api/update_confidence?id=${id}&confidence=${confidence}`, {method: "GET"})
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}

function updateImage(data, state) {
    let image_path = data[`${state}_image`];
    let img = document.getElementById("prompt-image");

    if (image_path) {
        img.src = image_path;
        img.style.visibility = "visible";
    } else {
        img.style.visibility = "hidden";
    }
    
}