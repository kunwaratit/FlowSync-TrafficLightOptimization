from django.urls import path
from .views import MaskAreaAPIView, UserData,RegisterRequests
from . import views
urlpatterns = [
    path('user-data/', UserData.as_view(), name='user-data'),
    path('modify-user-data/<int:user_id>/', UserData.as_view(), name='modify-user-data'),
    path('user-reg-requests/', RegisterRequests.as_view(), name='user-reg-requests'),
    path('user-reg-requests/<int:user_id>/', RegisterRequests.as_view(), name='user-reg-requests'),
    path('mask-area/', MaskAreaAPIView.as_view(), name='mask-area'),
    
    path('list-videos/', views.list_videos, name='list-videos'),
    path('select-video/', views.select_video, name='select-video'),
    path('get-selected-video/', views.get_selected_video, name='get-selected-video'),
   
]