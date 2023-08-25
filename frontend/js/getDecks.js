var decks = document.getElementById("decks");
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');





fetch(`http://192.168.1.53:8000/api/course_decks/?course=${course}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    
    data.forEach(deck => {
        

        let deckContainer = document.createElement("div");
        deckContainer.className = "deck-container"
        let deckName = document.createElement("h3");
        deckName.className = "deck-name";
        deckName.innerText = deck.name;

        deckName.addEventListener("click", function() {
            window.open(`deckCards.html?course=${course}&deck=${deck.name}`, "_self");
        })

        deckContainer.appendChild(deckName);
        

        
        let studyIcon = document.createElement("i");
        studyIcon.className = "fa-solid fa-book-bookmark study-deck";
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
