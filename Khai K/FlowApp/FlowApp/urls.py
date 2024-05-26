from django.urls import path
from .views import detect_objects, vehicle_detection_page,next_page_view,home_page

urlpatterns = [
    path('g', home_page, name='home_page'),
    path('', vehicle_detection_page, name='vehicle_detection_page'),  # Serves the HTML page
    # path('next_page/' name='next_page'),
    path('next_page/', next_page_view, name='next_page'),
    
    path('detect_objects/', detect_objects, name='detect_objects'),  # AJAX endpoint
]
