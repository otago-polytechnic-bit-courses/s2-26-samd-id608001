from django.contrib import admin
from .models import Studio, StudioClass, Booking


class StudioClassInline(admin.TabularInline):
    model = StudioClass
    extra = -1


@admin.register(Studio)
class StudioAdmin(admin.ModelAdmin):
    list_display = ("name", "suburb", "city", "accepting_members")
    search_fields = ("name", "suburb", "city")
    list_filter = ("suburb", "city")
    inlines = [StudioClassInline]


@admin.register(StudioClass)
class StudioClassAdmin(admin.ModelAdmin):
    search_fields = ("name", "studio__name", "studio__suburb", "studio__city")
    list_filter = ("studio", "studio__suburb", "studio__city")
    ordering = ("studio", "name")

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("member", "studio_class", "status", "attended", "booked_at")
    list_filter = ("status", "attended")