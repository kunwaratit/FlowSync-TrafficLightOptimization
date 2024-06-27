# myapp/urls.py
from django.urls import path
from . import views

urlpatterns = [
#     path('api/get_books/', get_books, name='get_books'),
    
#     path('api/add_book/', add_book, name='add_book'),
  path('api/districts/', views.get_districts, name='get_districts'),
 
]
