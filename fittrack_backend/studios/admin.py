from django.contrib import admin
from .models import Studio, StudioClass


class StudioClassInline(admin.TabularInline):
    model = StudioClass
    extra = -1


@admin.register(Studio)
class StudioAdmin(admin.ModelAdmin):
    list_display = ("name", "suburb", "city", "accepting_members")
    search_fields = ("name", "suburb", "city")
    inlines = [StudioClassInline]


@admin.register(StudioClass)
class StudioClassAdmin(admin.ModelAdmin):
    list_display = ("name", "studio", "duration", "capacity")
    list_filter = ("studio",)
    ordering = ("studio", "name")