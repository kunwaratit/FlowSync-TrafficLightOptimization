# urls.py

from django.urls import path
from Users.views import UserRegisterApi,LoginApi

urlpatterns = [
    path('register/', UserRegisterApi.as_view(), name='register'),
    path('login/', LoginApi.as_view(), name='login'),
]
