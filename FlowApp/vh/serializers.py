# vehicles/serializers.py

from rest_framework import serializers

class VehicleCountSerializer(serializers.Serializer):
    cars = serializers.IntegerField()
    bikes = serializers.IntegerField()
    total = serializers.IntegerField()

class PositionSerializer(serializers.Serializer):
    value = serializers.IntegerField()
    vehicles = VehicleCountSerializer()

class LocationSerializer(serializers.Serializer):
    location_id = serializers.CharField(required=False)  # Mark the field as optional
    positions = serializers.DictField(child=PositionSerializer())
