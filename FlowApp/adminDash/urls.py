from django.urls import path
from .views import fetch_data_from_mongodb

urlpatterns = [
    path('fetch-data/', fetch_data_from_mongodb, name='fetch_data_api'),
    # Add more paths as needed
]
