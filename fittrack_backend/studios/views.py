from rest_framework import viewsets
from .models import Studio, StudioClass
from .serializers import StudioSerializer, StudioDetailSerializer, StudioClassSerializer


class StudioViewSet(viewsets.ModelViewSet):
    queryset = Studio.objects.all()

    def get_serializer_class(self):
        if self.action == "retrieve":
            return StudioDetailSerializer
        return StudioSerializer

    def get_queryset(self):
        city = self.request.query_params.get("city")
        if city:
            return Studio.objects.filter(city=city)
        return super().get_queryset()


class StudioClassViewSet(viewsets.ModelViewSet):
    queryset = StudioClass.objects.all()
    serializer_class = StudioClassSerializer