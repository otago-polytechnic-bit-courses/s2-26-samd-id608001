from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .models import Studio, StudioClass
from .serializers import StudioSerializer, StudioDetailSerializer, StudioClassSerializer
from .permissions import IsOwnerOrReadOnly, IsStudioOwnerOrReadOnly, IsStudioOwnerForCreate


class StudioViewSet(viewsets.ModelViewSet):
    queryset = Studio.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return StudioDetailSerializer
        return StudioSerializer

    def get_queryset(self):
        city = self.request.query_params.get("city")
        if city:
            return Studio.objects.filter(city=city)
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class StudioClassViewSet(viewsets.ModelViewSet):
    queryset = StudioClass.objects.all()
    serializer_class = StudioClassSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsStudioOwnerForCreate]