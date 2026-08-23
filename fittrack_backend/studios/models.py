from django.contrib.auth.models import User
from django.db import models
import datetime
from django.utils.timezone import now


class Studio(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="studios",
    )
    name = models.CharField(max_length=200)
    suburb = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    accepting_members = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Studio"
        verbose_name_plural = "Studios"

class StudioClass(models.Model):
    studio = models.ForeignKey(
        Studio,
        on_delete=models.CASCADE,
        related_name="classes",
    )
    name = models.CharField(max_length=200)
    duration = models.DurationField(default=datetime.timedelta(minutes=30))
    capacity = models.PositiveIntegerField(default=0)
    members = models.ManyToManyField(User, through="Booking", related_name="classes_booked")

    def __str__(self):
        return f"{self.name} ({self.studio.name})"

    class Meta:
        verbose_name = "Studio Class"
        verbose_name_plural = "Studio Classes"

class Booking(models.Model):
    class Status(models.TextChoices):
        CONFIRMED = "confirmed", "Confirmed"
        WAITLISTED = "waitlisted", "Waitlisted"
        CANCELLED = "cancelled", "Cancelled"

    member = models.ForeignKey(User, on_delete=models.CASCADE, related_name="bookings")
    studio_class = models.ForeignKey("StudioClass", on_delete=models.CASCADE, related_name="bookings")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.CONFIRMED)
    booked_at = models.DateTimeField(default=now)
    attended = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.member.username} - {self.studio_class.name}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["member", "studio_class"],
                name="unique_booking_per_member_per_class",
            ),
            models.CheckConstraint(
                condition=models.Q(attended=False) | models.Q(status="confirmed"),
                name="only_confirmed_bookings_can_be_attended",
            ),
        ]
