from django.db import models

class Detection(models.Model):
    _id = models.CharField(max_length=255)
    location_id = models.CharField(max_length=255)
    positions = models.JSONField()

    def __str__(self):
        return f"Detection - Location ID: {self.location_id}"
