from random import choices

from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt

from app.models import Course, Deck, Card
from .serialiser import CourseSerialiser, DeckSerialiser, CardSerialiser

from django.http import JsonResponse
from django.middleware.csrf import get_token

@api_view(["GET"])
def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrfToken': csrf_token})


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


@api_view(["POST",])
def create_course(request):
    
    course_serializer = CourseSerialiser(data=request.data)
    if course_serializer.is_valid():
        course_name = request.data["name"]
        course_names = [course.name for course in Course.objects.all()]
        
        if course_name not in course_names:
            item = course_serializer.save()
            
            return Response(course_serializer.data)
        
        else:
            return Response({"status": "not created",
                             "reason": f"{course_name} course already exists"})
    
    else:
        return Response({"status": "not created",
                         "reason": "invalid post data"})
        

@api_view(["POST",])
def create_deck(request):
    if "course" not in request.data or "name" not in request.data:
        return Response({"status": "not created",
                         "reason": "invalid post data"})
    else:
        deck_name = request.data["name"]
        course_name = request.data["course"]
        course = Course.objects.all().filter(name=course_name)[0]
        
        
        
        if deck_name not in [deck.name for deck in Deck.objects.all().filter(course__name=course_name)]:
        
            deck = Deck(name=deck_name, course=course)
            deck.save()
        
            return Response({"status": "deck created"})
    
    return Response({"status": "not created",
                     "reason": "invalid post data"})
        
        