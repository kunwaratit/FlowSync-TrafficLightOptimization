# import json
# from rest_framework import serializers
# from .models import Detection

# class VehiclesSerializer(serializers.Serializer):
#     cars = serializers.IntegerField()
#     bikes = serializers.IntegerField()
#     total = serializers.IntegerField()

# class PositionSerializer(serializers.Serializer):
#     value = serializers.FloatField()
#     vehicles = VehiclesSerializer()

# class DetectionSerializer(serializers.ModelSerializer):
#     positions = serializers.DictField(child=PositionSerializer())

#     class Meta:
#         model = Detection
#         fields = ['_id', 'location_id', 'positions']
# serializers.py
from rest_framework import serializers
from .models import Detection

class DetectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Detection
        fields = ['_id', 'location_id', 'positions']
