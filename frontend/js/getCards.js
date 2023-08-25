var cards = document.getElementById("cards");
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');



document.getElementById("deck-info").innerText = `${course} - ${deck}`;

document.getElementById("study").addEventListener("click", function() {
    window.open(`study.html?course=${course}&deck=${deck}`, "_self")
})

fetch(`http://192.168.1.53:8000/api/deck_cards?course=${course}&deck=${deck}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    data.forEach(card => {
        let cardContainer = document.createElement("div");
        cardContainer.className = "card-preview"
    
        let questionContainer = document.createElement("div");
        questionContainer.className = "card-side-preview";
        let questionText = document.createElement("h3");
        questionText.innerText = `Q\n\n${card.question}`;
        questionContainer.appendChild(questionText);

        cardContainer.appendChild(questionContainer);


        let answerContainer = document.createElement("div");
        answerContainer.className = "card-side-preview";
        let answerText = document.createElement("h3");
        answerText.innerText = `A\n\n${card.answer}`;
        answerContainer.appendChild(answerText);
        cardContainer.appendChild(answerContainer);
        

        

        cards.appendChild(cardContainer);
    });
})
