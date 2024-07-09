from django.urls import path
from .views import  CurrentLiveStatus,HourStatus
from. import views
urlpatterns = [
    path('current-status/',CurrentLiveStatus.as_view(),name='current-status'),
    
    path('hour-status/', HourStatus.as_view(), name='hour-status'),  
     path('predict/', views.get_video_url, name='get_video_url'), 
]
