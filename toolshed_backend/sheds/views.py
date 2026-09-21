from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import ShedSerializer, ToolSerializer, ShedDetailSerializer
from .permissions import IsOwnerOrStaffElseReadOnly

from .models import Shed, Tool


class ShedViewSet(viewsets.ModelViewSet):
    queryset = Shed.objects.all().order_by("id")
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrStaffElseReadOnly]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ShedDetailSerializer
        return ShedSerializer

    def get_queryset(self):
        city = self.request.GET.get("city")
        if city:
            return Shed.objects.filter(city=city).order_by("id")
        return super().get_queryset()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)

class ToolListView(generics.ListAPIView):
    serializer_class = ToolSerializer

    def get_queryset(self):
        return Tool.objects.filter(shed_id=self.kwargs.get('id')).order_by("id")
