# serializers.py
from rest_framework import serializers
from .models import Detection

class PositionSerializer(serializers.Serializer):
    value = serializers.FloatField()
    vehicles = serializers.DictField(child=serializers.IntegerField())

class DetectionSerializer(serializers.ModelSerializer):
    positions = serializers.DictField(child=PositionSerializer())

    class Meta:
        model = Detection
        fields = [ 'location_id', 'positions']
