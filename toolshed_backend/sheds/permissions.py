from rest_framework import permissions

class IsOwnerOrStaffElseReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if obj.owner.id == request.user.id or request.user.is_staff: 
            return True
        return request.method in permissions.SAFE_METHODS