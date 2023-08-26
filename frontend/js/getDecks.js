var decks = document.getElementById("decks");
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');


fetch(`http://192.168.1.53:8000/api/course_decks/?course=${course}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    
    data.forEach(deck => {

        let deckContainer = document.createElement("div");
        deckContainer.className = "container"
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
            studyIcon.style.transform = "translate(0px, -15px)";
        })

        deckContainer.addEventListener("mouseleave", function(){
            deckName.style.transform = "translate(0px, 0)";
            studyIcon.style.opacity = 0;
            studyIcon.style.transform = "translate(0px, 0)";
            
        })

        decks.appendChild(deckContainer);

    });
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