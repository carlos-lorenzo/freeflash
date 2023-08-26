const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');

var state = "question";
var confidenceColours = ["#FC7A1E", "#FFC759", "#55868C"]
var card = document.getElementById("card");
var promptText = document.getElementById("prompt-text");

fetch(`http://192.168.1.53:8000/api/next_card?course=${course}&deck=${deck}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    card.style.borderColor = confidenceColours[(data.confidence - 1)];

    promptText.innerText = data.question;

    updateImage(data, state);

    card.addEventListener("click", function(){
        if (state == "question")
        {
            promptText.innerText = data.answer;

            state = "answer";
        } else {
            promptText.innerText = data.question;

            state = "question";
        }

        updateImage(data, state);
    })

    document.addEventListener('keyup', event => {

        if (event.code === 'Space') {
            if (state == "question")
            {
                promptText.innerText = data.answer;
    
                state = "answer";
            } else {
                promptText.innerText = data.question;
    
                state = "question";
            }
    
            updateImage(data, state);

        } else if (event.code === "Digit1") {
            updateConfidence(data.id, 1);

        } else if (event.code === "Digit2") {
            updateConfidence(data.id, 2);

        } else if (event.code === "Digit3") {
            updateConfidence(data.id, 3);

        } 

        

      })

    let confidences = document.getElementsByClassName("confidence")

    for (let i = 0; i < confidences.length; i++) {
        confidences[i].addEventListener("click", function(){
            updateConfidence(data.id, confidences[i].id);
        })
    }
    
})

function updateConfidence(id, confidence) {
    fetch(`http://192.168.1.53:8000/api/update_confidence?id=${id}&confidence=${confidence}`, {method: "GET"})
    window.location.reload();
}

function updateImage(data, state) {
    let image_path = data[`${state}_image`];
    let img = document.getElementById("prompt-image");
    let prompt = document.getElementById("prompt");
    
    if (image_path) {
        img.src = image_path;
        img.style.visibility = "visible";

        if (!data[state]) {
            prompt.style.gridTemplateRows = "1fr";
        } else {
            prompt.style.gridTemplateRows = "1fr 3fr";
        }
    } else {
        img.style.visibility = "hidden";
        prompt.style.gridTemplateRows = "1fr";
    }
    
}