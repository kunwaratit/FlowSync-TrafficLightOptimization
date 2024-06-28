# urls.py

from django.urls import path
from g.views import UserRegisterApi

urlpatterns = [
    path('as/', UserRegisterApi.as_view(), name='register'),
    # Add other URLs as needed
]
