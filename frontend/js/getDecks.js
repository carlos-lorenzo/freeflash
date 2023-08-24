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
        deckName.innerText = deck.name;
        deckContainer.appendChild(deckName);

        deckContainer.addEventListener("click", function() {
            window.open(`deckCards.html?course=${course}&deck=${deck.name}`, "_self");
        })

        decks.appendChild(deckContainer);

    });
})
