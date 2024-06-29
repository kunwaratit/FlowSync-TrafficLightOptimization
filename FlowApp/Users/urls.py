# urls.py

from django.urls import path
from Users.views import UserRegisterApi

urlpatterns = [
    path('register/', UserRegisterApi.as_view(), name='register'),
]
