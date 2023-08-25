const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');

var state = "question";

fetch(`http://192.168.1.53:8000/api/next_card?course=${course}&deck=${deck}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    
    document.getElementById("promt-text").innerText = data.question;

    document.getElementById("card").addEventListener("click", function(){
        if (state == "question")
        {
            document.getElementById("promt-text").innerText = data.answer;

            state = "answer";
        } else {
            document.getElementById("promt-text").innerText = data.question;

            state = "question";
        }
    })
    
})