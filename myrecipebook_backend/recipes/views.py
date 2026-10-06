from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner
from .models import Recipe
from .serializers import RecipeSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    queryset= Recipe.objects.prefetch_related('ingredients').all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        """
        Filter the queryset so users only see their own recipes,
        while maintaining an optimized prefetch query.
        """
        return Recipe.objects.prefetch_related('ingredients').filter(
            owner=self.request.user
        )

    def perform_create(self, serializer):
        """
        Automatically set the owner to the user making the request.
        """
        serializer.save(owner=self.request.user)