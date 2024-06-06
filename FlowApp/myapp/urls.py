# myapp/urls.py
from django.urls import path
from .views import BookListCreate

urlpatterns = [
#     path('api/get_books/', get_books, name='get_books'),
    
#     path('api/add_book/', add_book, name='add_book'),
 path('api/books/', BookListCreate.as_view(), name='book-list-create'),
]
