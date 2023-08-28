var decks = document.getElementById("decks");
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
var confidenceColours = ["#E99067", "#E37D16", "#004967"];

fetch("/frontend/host-info.json")
    .then(response => response.json())
    .then(hostData => {

        fetch(`http://${hostData["host-ip"]}:${hostData["host-port"]}/api/course_decks/?course=${course}`, {method: "GET"})
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(deck => {
        
                let deckContainer = document.createElement("div");
                deckContainer.className = "container";
                deckContainer.style.borderColor = confidenceColours[deck["mean-confidence"] - 1];
                let deckName = document.createElement("h3");
                deckName.className = "deck-name pointer";
                deckName.innerText = deck.name;
        
                deckName.addEventListener("click", function() {
                    window.open(`deckCards.html?course=${course}&deck=${deck.name}`, "_self");
                })
        
                deckContainer.appendChild(deckName);
                
        
                
                let studyIcon = document.createElement("i");
                studyIcon.className = "fa-solid fa-book-bookmark study-deck pointer";
                studyIcon.style.opacity = 0;
                
        
                studyIcon.addEventListener("click", function() {
                    window.open(`study.html?course=${course}&deck=${deck.name}`, "_self");
        
                })
        
        
                deckContainer.appendChild(studyIcon);
        
                deckContainer.addEventListener("mouseover", function(){
                    deckName.style.transform = "translate(0px, -35px)";
                    
                    studyIcon.style.opacity = 1;
                    studyIcon.style.scale = 1;
                    studyIcon.style.transform = "translate(0px, -15px)";
                })
        
                deckContainer.addEventListener("mouseleave", function(){
                    deckName.style.transform = "translate(0px, 0)";
                    studyIcon.style.opacity = 0;
                    studyIcon.style.scale = 0;
                    studyIcon.style.transform = "translate(0px, 0)";
                    
                })
        
                decks.appendChild(deckContainer);
        
            });
        })

})



var deckForm = document.getElementById("deck-container");

var addDeck = document.createElement("div");
addDeck.className = "pointer container";
addDeck.style.order = decks.children.length + 1;
var addIcon = document.createElement("i");
addIcon.className = "fa-solid fa-plus";
addIcon.style.zIndex = "1";
addDeck.appendChild(addIcon);

addDeck.addEventListener("click", function(){
    deckForm.style.scale = 1;
    deckForm.style.opacity = 1;
})

document.getElementById("close-popup").addEventListener("click", function(){
    deckForm.style.scale = 0;
    deckForm.style.opacity = 0;
})

decks.appendChild(addDeck);