from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ShedViewSet, ToolListView

router = DefaultRouter()
router.register("sheds", ShedViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("sheds/<int:id>/tools/", ToolListView.as_view()),
]