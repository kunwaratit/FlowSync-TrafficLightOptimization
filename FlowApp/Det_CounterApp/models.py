from djongo import models

from djongo import models

class Detection(models.Model):
    _id = models.CharField(max_length=255, primary_key=True)  # Assuming _id is the primary key
    location_id = models.CharField(max_length=255)
    positions = models.JSONField()

    def __str__(self):
        return f"Detection ID: {self._id}, Location ID: {self.location_id}"

class CountedVehicles(models.Model):
    location_id = models.CharField(max_length=255, primary_key=True)  # Assuming location_id is the primary key
    total_x_vehicles = models.IntegerField()
    total_y_vehicles = models.IntegerField()
    total_z_vehicles = models.IntegerField()

    class Meta:
        db_table = 'counted_vehicles'

    def __str__(self):
        return f"Location ID: {self.location_id}, Total X Vehicles: {self.total_x_vehicles}, Total Y Vehicles: {self.total_y_vehicles}, Total Z Vehicles: {self.total_z_vehicles}"
