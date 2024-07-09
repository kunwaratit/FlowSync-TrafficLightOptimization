from django.urls import path
from .views import video_feed, stop_stream, select_video,list_videos

urlpatterns = [
    path('video_feed/', video_feed, name='video_feed'),
    path('stop_stream/', stop_stream, name='stop_stream'),
    path('select_video/', select_video, name='select_video'),
    path('list_videos/', list_videos, name='list_videos'),
]
