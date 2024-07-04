from django.urls import path
from .views import CurrentLiveStatus
urlpatterns = [
    path('current-status/',CurrentLiveStatus.as_view(),name='current-status')    
]
