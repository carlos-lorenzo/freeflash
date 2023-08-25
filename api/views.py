from random import choices

from rest_framework.response import Response
from rest_framework.decorators import api_view

from app.models import Course, Deck, Card
from .serialiser import CourseSerialiser, DeckSerialiser, CardSerialiser


@api_view(["GET"])
def get_courses(request):
    courses = Course.objects.all()
    serialiser = CourseSerialiser(courses, many=True)
    return Response(serialiser.data)


@api_view(["GET"])
def get_decks(request):
    decks = Deck.objects.all()
    serialiser = DeckSerialiser(decks, many=True)
    return Response(serialiser.data)


@api_view(["GET"])
def get_cards(request):
    cards = Card.objects.all()
    serialiser = CardSerialiser(cards, many=True)
    return Response(serialiser.data)
    
@api_view(["GET"])
def get_course_decks(request):
    decks = Deck.objects.all()
    course = request.query_params.get("course")
    if course is not None:
        decks = decks.filter(course__name=course)
        
    serialiser = DeckSerialiser(decks, many=True)
    
    return Response(serialiser.data)


@api_view(["GET"])
def get_deck_cards(request):
    decks = Deck.objects.all()
    cards = Card.objects.all()
    course = request.query_params.get("course")
    deck = request.query_params.get("deck")
    
    if course is not None:
        decks = decks.filter(course__name=course)
        
    if deck is not None:
        cards = cards.filter(deck__name=deck)
        
    serialiser = CardSerialiser(cards, many=True)
    
    return Response(serialiser.data)

@api_view(["GET"])
def get_card_to_study(request):
    decks = Deck.objects.all()
    cards = Card.objects.all()
    course = request.query_params.get("course")
    deck = request.query_params.get("deck")
    
    if course is not None:
        decks = decks.filter(course__name=course)
        
    if deck is not None:
        cards = cards.filter(deck__name=deck)
    
    next_card = choices(cards, weights=[1/card.confidence for card in cards], k=1)[0]
    
    
    serialiser = CardSerialiser(cards[list(cards).index(next_card)], many=False) 
    
    
    return Response(serialiser.data)


@api_view(["GET"])
def update_card_confidence(request):
    

    confidence = request.query_params.get("confidence")
    
    if int(confidence) not in range(1, 4):
        return Response({"error": "invalid confidence"})
    
    card_id = request.query_params.get("id")
    
    
    cards = Card.objects.all()
    card_to_update = cards.filter(id=card_id)[0]
    card_to_update.confidence = confidence
    card_to_update.save()
    
    
    return Response({"status": "confidence updated"})

        
    