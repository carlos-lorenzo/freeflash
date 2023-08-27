# freeflash - flashcard app

A free flashcard app to create flashcards and study them.
<br/>
Inspired by [Brainscape](https://www.brainscape.com) (the flashcard app I used) and its paywall blocking me from including imgaes.
Therefore, I set out to build a clone to replicate its cruicial features, INCLUDING IMAGES.

## How to use
* Install [Python](https://www.python.org)
* Install (pip) dependecies: django, django-cors-headers, djangorestframework, Pillow
* Run "python manage.py createsuperuser" in terminal and follow instructions
* Run "python manage.py makemigrations"
* Run "python manage.py migrate" in terminal
* Run "python manage.py runserver" in terminal
* Open index.html in /frontend/templates/ (I recommend live-server within vs-code)
* To create courses, decks and cards use the admin dashboard (in brower type: 127.0.0.1:8000/admin/) and login with your credentials
* You may also create courses and decks from the web-app

## Technical info
* Backend: django (with django rest api)
* Frontend: vanilla js, html and css