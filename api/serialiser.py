from rest_framework import serializers
from app.models import Card, Deck, Course

class CardSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = "__all__"
        

class DeckSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Deck
        fields = "__all__"
        
        
class CourseSerialiser(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = "__all__"
        