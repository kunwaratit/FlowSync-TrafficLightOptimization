from rest_framework import serializers

class VideoSerializer(serializers.Serializer):
    video = serializers.FileField()
