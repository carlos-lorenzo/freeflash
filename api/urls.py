from django.urls import path
from . import views

urlpatterns = [
    path("get_csrf_token/", views.get_csrf_token),
    path("courses/", views.get_courses),
    path("decks/", views.get_decks),
    path("cards/", views.get_cards),
    path("course_decks/", views.get_course_decks),
    path("deck_cards/", views.get_deck_cards),
    path("next_card/", views.get_card_to_study),
    path("update_confidence/", views.update_card_confidence),
    path("new_course/", views.create_course)
]
