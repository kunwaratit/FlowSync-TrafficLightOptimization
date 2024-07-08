from django.urls import path
from .views import  CurrentLiveStatus,HourStatus
urlpatterns = [
    path('current-status/',CurrentLiveStatus.as_view(),name='current-status'),
    
    path('hour-status/', HourStatus.as_view(), name='hour-status'),   
]
