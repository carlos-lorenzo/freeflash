from django.contrib import admin

from app.models import Card, Course, Deck


# Register your models here.
admin.site.register(Course)
admin.site.register(Deck)
admin.site.register(Card)