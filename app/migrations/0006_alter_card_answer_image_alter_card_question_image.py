# Generated by Django 4.1 on 2023-08-25 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("app", "0005_alter_card_answer_alter_card_answer_image_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="card",
            name="answer_image",
            field=models.ImageField(blank=True, upload_to="images/"),
        ),
        migrations.AlterField(
            model_name="card",
            name="question_image",
            field=models.ImageField(blank=True, upload_to="images/"),
        ),
    ]
