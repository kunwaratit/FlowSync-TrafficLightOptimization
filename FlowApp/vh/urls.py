# vehicles/urls.py

from django.urls import path
from .views import VehicleCountAPIView

urlpatterns = [
    path('vehicle_counts/', VehicleCountAPIView.as_view(), name='vehicle_count_api'),
]
