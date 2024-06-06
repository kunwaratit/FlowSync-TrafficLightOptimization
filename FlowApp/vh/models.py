# vehicles/models.py

from djongo import models

class VehicleData(models.Model):
    location_id = models.CharField(max_length=100)
    positions = models.JSONField()
