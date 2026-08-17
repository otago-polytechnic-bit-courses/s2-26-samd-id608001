from rest_framework import permissions
from .models import Studio

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user

class IsStudioOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.studio.owner == request.user

class IsStudioOwnerForCreate(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            studio_id = request.data.get('studio')
            return Studio.objects.get(id=studio_id).owner == request.user
        else:
            return True