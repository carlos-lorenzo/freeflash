const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const course = parameters.get('course');
const deck = parameters.get('deck');



fetch(`http://192.168.1.53:8000/api/next_card?course=${course}&deck=${deck}`, {method: "GET"})
.then(response => response.json())
.then(data => {
    console.log(data);
    
})