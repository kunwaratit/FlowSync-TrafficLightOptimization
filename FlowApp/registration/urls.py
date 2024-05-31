from django.urls import path,include
from registration.views import UserRegisterApi,LoginApi

urlpatterns = [
    path('register/',UserRegisterApi.as_view(),name='register'),
    path('login/',LoginApi.as_view(),name='login')
]