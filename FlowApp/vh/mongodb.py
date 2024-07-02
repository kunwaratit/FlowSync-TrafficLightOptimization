from pymongo import MongoClient
from django.conf import settings

client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']  # Replace 'mydatabase' with your database name
videos_collection = db['videos']
