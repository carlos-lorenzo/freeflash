var cards = document.getElementById("cards");
const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');



let deckInfo = document.getElementById("deck-info");
deckInfo.innerText = `${course} - ${deck}`;
deckInfo.className = "pointer"
deckInfo.addEventListener("click", function() {
    window.open(`courseDecks.html?course=${course}`, "_self");
})

document.getElementById("study").addEventListener("click", function() {
    window.open(`study.html?course=${course}&deck=${deck}`, "_self");
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
        
        if (hasImage(card, "question")) {
            
            let questionImage = document.createElement("img");
            questionImage.src = card.question_image;
            questionImage.className = "image-preview";
            questionContainer.appendChild(questionImage);
        } else {
            questionContainer.style.gridTemplateRows = "1fr";
        }
        
        cardContainer.appendChild(questionContainer);


        let answerContainer = document.createElement("div");
        answerContainer.className = "card-side-preview";
        let answerText = document.createElement("h3");
        answerText.innerText = `A\n\n${card.answer}`;
        answerContainer.appendChild(answerText);

        if (hasImage(card, "answer")) {
           
            let answerImage = document.createElement("img");
            answerImage.src = card.answer_image;
            answerImage.className = "image-preview";
            answerContainer.appendChild(answerImage);
        }  else {
            answerContainer.style.gridTemplateRows = "1fr";
        }

        cardContainer.appendChild(answerContainer);
        

        

        cards.appendChild(cardContainer);
    });
})

function hasImage(data, state) {
    if (data[`${state}_image`]){
        return true
    } else {
        return false
    }
}
