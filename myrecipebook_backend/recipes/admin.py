from django.contrib import admin
from .models import Recipe, Ingredient

class IngredientInline(admin.TabularInline):
    model = Ingredient
    extra = 1
    fields = ["amount", "measurement", "ingredient_name"]

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ["title", "owner", "ingredient_count"]
    list_filter = ["owner"]
    search_fields = ["title", "description"]
    inlines = [IngredientInline]

    def ingredient_count(self, obj):
        return obj.ingredients.count()
    ingredient_count.short_description = "Ingredients"

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ["ingredient_name", "amount", "measurement", "recipe"]
    list_filter = ["measurement"]
    search_fields = ["ingredient_name", "recipe__title"]