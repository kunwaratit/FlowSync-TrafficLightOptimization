# utils/mongodb.py
from pymongo import MongoClient
from django.conf import settings

def get_mongo_client():
    client = MongoClient(settings.MONGODB_SETTINGS['HOST'])
    db = client[settings.MONGODB_SETTINGS['DB_NAME']]
    return db
