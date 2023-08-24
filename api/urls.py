from django.urls import path
from . import views

urlpatterns = [
    path("courses/", views.get_courses),
    path("decks/", views.get_decks),
    path("cards/", views.get_cards),
    path("course_decks/", views.get_course_decks),
    path("deck_cards/", views.get_deck_cards),
    path("next_card/", views.get_card_to_study),
]
