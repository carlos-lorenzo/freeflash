# Generated by Django 4.1 on 2023-08-25 08:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0004_rename_answer_photo_card_answer_image_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="card",
            name="answer",
            field=models.CharField(blank=True, max_length=300),
        ),
        migrations.AlterField(
            model_name="card",
            name="answer_image",
            field=models.ImageField(blank=True, upload_to="Images/"),
        ),
        migrations.AlterField(
            model_name="card",
            name="question",
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="card",
            name="question_image",
            field=models.ImageField(blank=True, upload_to="Images/"),
        ),
    ]
