from django.db import migrations


def set_default_status(apps, schema_editor):
    Booking = apps.get_model("studios", "Booking")
    Booking.objects.filter(status="").update(status="confirmed")


def reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [("studios", "0004_booking")]

    operations = [
        migrations.RunPython(set_default_status, reverse),
    ]