from django.urls import path
from .views import UserData,RegisterRequests

urlpatterns = [
    path('user-data/', UserData.as_view(), name='user-data'),
    path('modify-user-data/<int:user_id>/', UserData.as_view(), name='modify-user-data'),
    path('user-reg-requests/', RegisterRequests.as_view(), name='user-reg-requests'),
    path('user-reg-requests/<int:user_id>/', RegisterRequests.as_view(), name='user-reg-requests'),
]