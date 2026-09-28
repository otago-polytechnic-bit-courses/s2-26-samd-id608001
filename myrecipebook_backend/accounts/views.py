from django.contrib.auth.models import User
from datetime import datetime
from django.conf import settings
from rest_framework.response import Response
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .serializers import RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

# Custom Login view to add the token expiry to the response
# Uses the TokenObtainPairView as a base and only alters the post data
class LoginView(TokenObtainPairView):
    def post(self, request, *args, **kwargs) -> Response:
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            lifetime = settings.SIMPLE_JWT.get('ACCESS_TOKEN_LIFETIME')
            
            expiry_timestamp = datetime.now() + lifetime
            response.data['access_expiration'] = expiry_timestamp.isoformat()
            
        return response