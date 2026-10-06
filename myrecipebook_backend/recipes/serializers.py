from rest_framework import serializers
from .models import Recipe, Ingredient

class IngredientSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Ingredient
        fields = ["id", "amount", "measurement", "ingredient_name"]

    def validate(self, attrs):
        """
        Ensure every ingredient payload contains all required fields,
        even if the parent Recipe is being updated via PATCH.
        """
        required_fields = ["amount", "measurement", "ingredient_name"]
        errors = {}
        
        for field_name in required_fields:
            if field_name not in attrs:
                errors[field_name] = "This field is required."
                
        if errors:
            raise serializers.ValidationError(errors)
            
        return attrs

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ["id", "owner", "title", "description", "method", "ingredients"]
        read_only_fields = ["owner"]

    def create(self, validated_data):
        # Pop the nested ingredients data out of the validated_data
        ingredients_data = validated_data.pop('ingredients')
        
        # Create the parent Recipe instance
        recipe = Recipe.objects.create(**validated_data)
        
        # Iterate over the ingredients data and create each one, linking it to the newly created recipe
        for ingredient_data in ingredients_data:
            Ingredient.objects.create(recipe=recipe, **ingredient_data)
            
        return recipe

    def update(self, instance, validated_data):
        ingredients_data = validated_data.pop('ingredients', None)
        
        # Update the parent Recipe fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # Handle nested ingredients if they were included in the request
        if ingredients_data is not None:
            # Clear existing ingredients
            instance.ingredients.all().delete()
            
            # Recreate them with the new data
            for ingredient_data in ingredients_data:
                Ingredient.objects.create(recipe=instance, **ingredient_data)
                    
        return instance