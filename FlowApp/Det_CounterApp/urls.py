# urls.py
from django.urls import path
from .views import DetectionAPIView

urlpatterns = [
    path('detections/', DetectionAPIView.as_view(), name='detections_api'),
    #  path('detections/get', DetectionAPIView.as_view(), name='detections_api'),
]
