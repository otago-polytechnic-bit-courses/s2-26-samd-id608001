from django.db import models
import datetime


class Studio(models.Model):
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

    def __str__(self):
        return f"{self.name} ({self.studio.name})"

    class Meta:
        verbose_name = "Studio Class"
        verbose_name_plural = "Studio Classes"
