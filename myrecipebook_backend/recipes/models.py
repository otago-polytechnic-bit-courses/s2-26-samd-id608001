from django.db import models
from django.conf import settings

class Recipe(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE,
        related_name="recipes"
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    method = models.TextField()

    def __str__(self):
        return self.title

class Ingredient(models.Model):
    class Measurements(models.TextChoices):
        TEASPOON = "teaspoon", "tsp"
        TABLESPOON = "tablespoon", "Tbsp"
        CUP = "cup", "Cup"
        MILLILITRE = "millilitre", "ml"
        GRAM = "gram", "g"

    recipe = models.ForeignKey(
        Recipe,
        on_delete=models.CASCADE,
        related_name="ingredients",
    )
    amount = models.PositiveIntegerField()
    measurement = models.CharField(
        max_length=10,
        choices=Measurements.choices,
        default=Measurements.TEASPOON,
    )
    ingredient_name = models.CharField(max_length=200)

    def __str__(self):
        return self.ingredient_name