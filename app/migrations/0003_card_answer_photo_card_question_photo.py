# Generated by Django 4.1 on 2023-08-25 08:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0002_card_confidence"),
    ]

    operations = [
        migrations.AddField(
            model_name="card",
            name="answer_photo",
            field=models.ImageField(blank=True, upload_to=""),
        ),
        migrations.AddField(
            model_name="card",
            name="question_photo",
            field=models.ImageField(blank=True, upload_to=""),
        ),
    ]
