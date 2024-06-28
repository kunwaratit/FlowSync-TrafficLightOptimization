# registration/utils.py

from pymongo import MongoClient
from django.conf import settings
from passlib.hash import django_pbkdf2_sha256 as handler


def register_user_to_mongodb(email, password):
    client = MongoClient(settings.MONGO_DB['HOST'], settings.MONGO_DB['PORT'])
    db = client[settings.MONGO_DB['NAME']]
    collection = db['users']

    # Hash password securely
    hashed_password = handler.hash(password)

    # Insert user data into MongoDB
    user_id = collection.insert_one({
        'email': email,
        'password': hashed_password,
    }).inserted_id

    client.close()

    return str(user_id)
