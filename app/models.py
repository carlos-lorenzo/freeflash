from django.db import models

# Create your models here.
class Card(models.Model):
    question = models.CharField(max_length=100)
    answer = models.CharField(max_length=300)
    deck = models.ForeignKey("Deck", on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return f"{self.question}"
    
class Deck(models.Model):
    name = models.CharField(max_length=50)
    course = models.ForeignKey("Course", on_delete=models.CASCADE)
    
    def __str__(self) -> str:
        return self.name   
    
class Course(models.Model):
    name = models.CharField(max_length=50)
    
    def __str__(self) -> str:
        return self.name