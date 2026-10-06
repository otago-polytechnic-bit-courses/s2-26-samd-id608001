from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class AuthAPITests(APITestCase):
    def setUp(self):
        # Base URLs
        self.register_url = "/api/auth/register/"
        self.login_url = "/api/auth/login/"
        self.refresh_url = "/api/auth/login/refresh/"
        
        # Create an existing user for login and duplicate-check tests
        self.test_username = "ana"
        self.test_password = "pw-ana-12345"
        self.test_user = User.objects.create_user(
            username=self.test_username,
            password=self.test_password
        )

    # --- RegisterView Tests ---

    def test_register_success(self):
        """Test successful user registration with valid data."""
        payload = {
            "username": "newuser",
            "password": "securepassword123"
        }
        response = self.client.post(self.register_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)
        self.assertEqual(response.data["username"], "newuser")
        self.assertNotIn("password", response.data)  # Ensure write_only is respected
        
        # Verify user was actually created in the database
        self.assertTrue(User.objects.filter(username="newuser").exists())

    def test_register_validation_error_password_too_short(self):
        """Test registration fails if the password is under 8 characters."""
        payload = {
            "username": "shortpwuser",
            "password": "short" # Only 5 chars, serializer requires 8
        }
        response = self.client.post(self.register_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)
        # Ensure user wasn't created
        self.assertFalse(User.objects.filter(username="shortpwuser").exists())

    def test_register_validation_error_duplicate_username(self):
        """Test registration fails if the username is already taken."""
        payload = {
            "username": self.test_username, # Already exists from setUp
            "password": "anotherpassword123"
        }
        response = self.client.post(self.register_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)

    def test_register_error_missing_fields(self):
        """Test registration fails when required fields are missing."""
        response = self.client.post(self.register_url, {}, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("username", response.data)
        self.assertIn("password", response.data)

    # --- LoginView Tests ---

    def test_login_success_returns_tokens_and_expiry(self):
        """Test login returns access, refresh, and custom access_expiry."""
        payload = {
            "username": self.test_username,
            "password": self.test_password
        }
        response = self.client.post(self.login_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        self.assertIn("access_expiry", response.data)

    def test_login_error_invalid_credentials(self):
        """Test login fails with incorrect password."""
        payload = {
            "username": self.test_username,
            "password": "wrongpassword"
        }
        response = self.client.post(self.login_url, payload, format="json")
        
        # SimpleJWT defaults to 401 Unauthorized for bad credentials
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)

    def test_login_error_nonexistent_user(self):
        """Test login fails for a user that does not exist."""
        payload = {
            "username": "ghostuser",
            "password": "somepassword123"
        }
        response = self.client.post(self.login_url, payload, format="json")
        
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)

    def test_login_validation_error_missing_fields(self):
        """Test login fails when fields are omitted."""
        # Missing password
        response = self.client.post(self.login_url, {"username": self.test_username}, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("password", response.data)

    # --- TokenRefreshView Tests ---

    def test_refresh_token_success(self):
        """Test obtaining a new access token using a valid refresh token."""
        # log in to get a valid refresh token
        login_response = self.client.post(
            self.login_url, 
            {"username": self.test_username, "password": self.test_password}, 
            format="json"
        )
        valid_refresh_token = login_response.data["refresh"]

        # use that refresh token to request a new access token
        response = self.client.post(
            self.refresh_url, 
            {"refresh": valid_refresh_token}, 
            format="json"
        )
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)
        

    def test_refresh_token_error_invalid_token(self):
        """Test refresh fails if the provided token is invalid, expired, or mangled."""
        response = self.client.post(
            self.refresh_url, 
            {"refresh": "this-is-not-a-valid-jwt-token"}, 
            format="json"
        )
        
        # SimpleJWT returns 401 Unauthorized for bad tokens
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertEqual(response.data["code"], "token_not_valid")

    def test_refresh_token_validation_error_missing_field(self):
        """Test refresh fails if the refresh token field is completely omitted."""
        response = self.client.post(
            self.refresh_url, 
            {}, # Empty payload 
            format="json"
        )
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("refresh", response.data)