from django.urls import path
from .views import CurrentLiveStatus,AdminDash
urlpatterns = [
    path('current-status/',CurrentLiveStatus.as_view(),name='current-status'),
    path('admin-dash/', AdminDash.as_view(), name='fetch_data_api'),   
]
