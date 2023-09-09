const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');

var state = "question";
var confidenceColours = ["#E99067", "#E37D16", "#004967"];
var card = document.getElementById("card");
var promptText = document.getElementById("prompt-text");

let deckInfo = document.getElementById("deck-info");
deckInfo.className = "pointer"
deckInfo.innerText = `${course} - ${deck}`;
deckInfo.addEventListener("click", function() {
    window.open(`deckCards.html?course=${course}&deck=${deck}`, "_self");
})

fetch("/frontend/host-info.json")
    .then(response => response.json())
    .then(hostData => {
        fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/next_card?course=${course}&deck=${deck}`, {method: "GET"})
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
                
                let confidence = 0

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
                    confidence = 1;
                    
        
                } else if (event.code === "Digit2") {
                    confidence = 2;
        
                } else if (event.code === "Digit3") {
                    confidence = 3;
        
                } 
                
                updateConfidence(data.id, confidence, hostData);
                
                
              })
        
            let confidences = document.getElementsByClassName("confidence")
        
            for (let i = 0; i < confidences.length; i++) {
                confidences[i].addEventListener("click", function(){
                    updateConfidence(data.id, confidences[i].id, hostData);
                })
            }
            
        })

})



function updateConfidence(id, confidence, hostData) {
    fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/update_confidence?id=${id}&confidence=${confidence}`, {method: "GET"})
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