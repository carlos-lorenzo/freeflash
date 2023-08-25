from django.db import models

# Create your models here.
class Card(models.Model):
    class Confidences(models.IntegerChoices):
        WEAK = 1
        MEDIUM = 2
        STRONG = 3
    
    question = models.CharField(max_length=100, blank=True)
    answer = models.CharField(max_length=300, blank=True)
    confidence = models.IntegerField(Confidences.choices, default=1)
    deck = models.ForeignKey("Deck", on_delete=models.CASCADE)
    question_image = models.ImageField(blank=True, upload_to="images/")
    answer_image = models.ImageField(blank=True, upload_to="images/")
    
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