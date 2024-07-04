"""
URL configuration for FlowApp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
# from .views import detect_objects, vehicle_detection_page,next_page_view,home_page,about_page
# from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include('WebApp.urls')),
    path('api/user/',include('registration.urls')),
    path('api/det/',include('Det_CounterApp.urls')),
    path('api/',include('vh.urls')),
     path('myapp/', include('myapp.urls')),
     path('user/',include('Users.urls')),
     path('api/dash/', include('adminDash.urls')),
     path('api/',include('FetchApp.urls')),
    # paxi change garamla milyo vaney aahile lai yeii rakham
    # path('', home_page, name='home_page'),
    # path('vehicle_detection_page/', vehicle_detection_page, name='vehicle_detection_page'), 
    # path('next_page/', next_page_view, name='next_page'),
    # path('detect_objects/', detect_objects, name='detect_objects'), 
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# ]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
