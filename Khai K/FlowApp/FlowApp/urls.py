# yolo_detection/urls.py
from django.urls import path
from .views import video_stream

urlpatterns = [
    path('', video_stream, name='video_stream'),
]
