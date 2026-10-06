from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .models import Recipe, Ingredient

User = get_user_model()

class RecipeAPITests(APITestCase):
    def setUp(self):
        self.list_url = "/api/recipes/"
        
        # Helper to generate detail URLs
        self.detail_url = lambda pk: f"/api/recipes/{pk}/"

        # Create two distinct users to test permissions and filtering
        self.user1 = User.objects.create_user(username="user1", password="pw1")
        self.user2 = User.objects.create_user(username="user2", password="pw2")

        # Create a recipe owned by user1
        self.recipe1 = Recipe.objects.create(
            owner=self.user1,
            title="User 1 Pancakes",
            description="Fluffy",
            method="Cook it."
        )
        Ingredient.objects.create(recipe=self.recipe1, amount=1, measurement="cup", ingredient_name="Flour")

        # Create a recipe owned by user2
        self.recipe2 = Recipe.objects.create(
            owner=self.user2,
            title="User 2 Omelette",
            description="Cheesy",
            method="Fry it."
        )

        # Authenticate as User 1 for the majority of the tests
        self.client.force_authenticate(user=self.user1)

    # --- Create (POST) Tests ---

    def test_create_recipe_with_ingredients_success(self):
        """Test creating a recipe with nested ingredients."""
        payload = {
            "title": "New Smoothie",
            "description": "Healthy green smoothie",
            "method": "Blend everything.",
            "ingredients": [
                {"amount": 1, "measurement": "cup", "ingredient_name": "Spinach"},
                {"amount": 2, "measurement": "tablespoon", "ingredient_name": "Honey"}
            ]
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Recipe.objects.count(), 3)
        self.assertEqual(Ingredient.objects.filter(recipe_id=response.data["id"]).count(), 2)
        # Ensure the owner was automatically set to the authenticated user
        self.assertEqual(response.data["owner"], self.user1.id)

    def test_create_recipe_validation_error_missing_fields(self):
        """Test creation fails if required recipe fields are missing."""
        payload = {
            "title": "Incomplete Recipe",
            # Missing description and method
            "ingredients": []
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("description", response.data)
        self.assertIn("method", response.data)

    def test_create_recipe_validation_error_nested_ingredient(self):
        """Test creation fails and rolls back if an ingredient has invalid data."""
        payload = {
            "title": "Bad Recipe",
            "description": "Test",
            "method": "Test",
            "ingredients": [
                {
                    "amount": -5, # PositiveIntegerField required
                    "measurement": "cup",
                    "ingredient_name": "Milk"
                }
            ]
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Ensure nothing was saved to the database (transaction rollback worked)
        self.assertFalse(Recipe.objects.filter(title="Bad Recipe").exists())

    # --- Read / List (GET) Tests ---

    def test_list_recipes_only_shows_owned_recipes(self):
        """Test the get_queryset filter only returns the authenticated user's recipes."""
        response = self.client.get(self.list_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # User 1 should only see 1 recipe (User 1 Pancakes), even though 2 exist in DB
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "User 1 Pancakes")

    def test_retrieve_recipe_success(self):
        """Test getting a specific recipe includes nested ingredients."""
        response = self.client.get(self.detail_url(self.recipe1.id))
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "User 1 Pancakes")
        self.assertEqual(len(response.data["ingredients"]), 1)

    def test_retrieve_recipe_unauthorized_for_other_user(self):
        """Test a user gets a 404 when trying to view someone else's recipe."""
        # Trying to access user2's recipe while logged in as user1
        response = self.client.get(self.detail_url(self.recipe2.id))
        
        # It returns 404 instead of 403 because it's filtered out by get_queryset
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # --- Update (PUT / PATCH) Tests ---

    def test_put_recipe_replaces_ingredients(self):
        """Test a full PUT request completely replaces old ingredients."""
        payload = {
            "title": "User 1 Pancakes Updated",
            "description": "Now with blueberries",
            "method": "Cook it.",
            "ingredients": [
                {"amount": 2, "measurement": "cup", "ingredient_name": "Blueberries"}
            ]
        }
        response = self.client.put(self.detail_url(self.recipe1.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "User 1 Pancakes Updated")
        
        # Verify the old "Flour" ingredient is gone and replaced by "Blueberries"
        self.assertEqual(len(response.data["ingredients"]), 1)
        self.assertEqual(response.data["ingredients"][0]["ingredient_name"], "Blueberries")
        
        # Database check to ensure orphan ingredients were deleted
        self.assertEqual(Ingredient.objects.filter(recipe=self.recipe1).count(), 1)

    def test_patch_recipe_leaves_ingredients_alone(self):
        """Test a PATCH request updates parent fields without wiping ingredients."""
        payload = {
            "title": "Just updating the title"
        }
        response = self.client.patch(self.detail_url(self.recipe1.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], "Just updating the title")
        
        # Ingredients shouldn't have been touched
        self.assertEqual(len(response.data["ingredients"]), 1)
        self.assertEqual(response.data["ingredients"][0]["ingredient_name"], "Flour")

    def test_update_other_users_recipe_fails(self):
        """Test a user cannot update someone else's recipe."""
        payload = {"title": "Hacked Recipe"}
        response = self.client.patch(self.detail_url(self.recipe2.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    # --- Delete (DELETE) Tests ---

    def test_delete_recipe_success(self):
        """Test a user can delete their own recipe and it cascades to ingredients."""
        response = self.client.delete(self.detail_url(self.recipe1.id))
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Recipe.objects.filter(id=self.recipe1.id).exists())
        # Ensure the cascaded delete worked for the ingredient
        self.assertEqual(Ingredient.objects.count(), 0)

    def test_delete_other_users_recipe_fails(self):
        """Test a user cannot delete someone else's recipe."""
        response = self.client.delete(self.detail_url(self.recipe2.id))
        
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        # Ensure the recipe survived
        self.assertTrue(Recipe.objects.filter(id=self.recipe2.id).exists())

    # --- Authentication Failsafe Tests ---

    def test_unauthenticated_requests_fail(self):
        """Ensure all endpoints reject unauthenticated users."""
        self.client.force_authenticate(user=None) # Log out
        
        # Test List
        self.assertEqual(self.client.get(self.list_url).status_code, status.HTTP_401_UNAUTHORIZED)
        # Test Create
        self.assertEqual(self.client.post(self.list_url, {}).status_code, status.HTTP_401_UNAUTHORIZED)
        # Test Retrieve
        self.assertEqual(self.client.get(self.detail_url(self.recipe1.id)).status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Advanced Validation Tests (POST, PUT, PATCH) ---

    def test_create_recipe_invalid_measurement_choice(self):
        """Test POST fails if an invalid measurement choice is provided."""
        payload = {
            "title": "Invalid Measurement Recipe",
            "description": "Test description",
            "method": "Test method",
            "ingredients": [
                {
                    "amount": 2,
                    "measurement": "gallon",  # 'gallon' is not in Measurements.choices
                    "ingredient_name": "Water"
                }
            ]
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        # Check nested error structure for the first ingredient's measurement field
        self.assertIn("ingredients", response.data)
        self.assertIn("measurement", response.data["ingredients"][0])

    def test_create_recipe_title_exceeds_max_length(self):
        """Test POST fails if the title exceeds 200 characters."""
        payload = {
            "title": "A" * 201,  # Max length is 200
            "description": "Valid description",
            "method": "Valid method",
            "ingredients": []
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)

    def test_create_recipe_blank_string_fields(self):
        """Test POST fails when fields are empty strings instead of valid content."""
        payload = {
            "title": "",
            "description": "   ",  # Whitespace only
            "method": "",
            "ingredients": []
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)
        self.assertIn("description", response.data)
        self.assertIn("method", response.data)

    def test_create_recipe_ingredients_not_a_list(self):
        """Test POST fails if ingredients is sent as an object/string instead of a list."""
        payload = {
            "title": "Wrong Shape Recipe",
            "description": "Test",
            "method": "Test",
            "ingredients": "not-a-list"  # Serializer expects many=True (a list)
        }
        response = self.client.post(self.list_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("ingredients", response.data)

    def test_put_recipe_validation_failure_preserves_database(self):
        """Test an invalid PUT request fails validation and does NOT clear existing ingredients."""
        payload = {
            "title": "Updated Title",
            "description": "Updated Description",
            "method": "Updated Method",
            "ingredients": [
                {
                    "amount": "not-a-number",  # Invalid type for PositiveIntegerField
                    "measurement": "cup",
                    "ingredient_name": "Sugar"
                }
            ]
        }
        response = self.client.put(self.detail_url(self.recipe1.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("ingredients", response.data)
        
        # Verify the database was not modified (recipe retains original title and ingredients)
        self.recipe1.refresh_from_db()
        self.assertEqual(self.recipe1.title, "User 1 Pancakes")
        self.assertEqual(Ingredient.objects.filter(recipe=self.recipe1).count(), 1)

    def test_patch_recipe_validation_blank_title(self):
        """Test PATCH fails if trying to set an existing field to an invalid/blank value."""
        payload = {"title": ""}
        response = self.client.patch(self.detail_url(self.recipe1.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)
        
        # Ensure database record was not altered
        self.recipe1.refresh_from_db()
        self.assertEqual(self.recipe1.title, "User 1 Pancakes")

    def test_patch_recipe_invalid_nested_ingredient_data(self):
        """Test PATCH fails when updating ingredients with missing required fields."""
        payload = {
            "ingredients": [
                {
                    "amount": 2,
                    "measurement": "cup"
                    # Missing required 'ingredient_name'
                }
            ]
        }
        response = self.client.patch(self.detail_url(self.recipe1.id), payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("ingredients", response.data)
        self.assertIn("ingredient_name", response.data["ingredients"][0])
        print(response.data)