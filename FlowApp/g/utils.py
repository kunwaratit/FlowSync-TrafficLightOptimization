# registration/utils.py

from pymongo import MongoClient
from passlib.hash import django_pbkdf2_sha256 as handler
from datetime import datetime
# MongoDB connection (assuming it's running locally on default port)
client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']
users_collection = db['users']
users_collection.create_index([('email', 1)], unique=True)

def register_user_to_mongodb(email, password, phone_number,district,intersection):
    try:
        hashed_password = handler.hash(password)
        user_data = {
            'email': email,
            'phone_number': phone_number,
            'password': hashed_password,
            'district':district,
            'intersection':intersection,
            'is_active': True,
            'is_admin': False,
            'is_user': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
    
        result = users_collection.insert_one(user_data)
        client.close()
        return str(result.inserted_id)
    except Exception as e:
        if 'E11000' in str(e):
            raise ValueError("Email already exists")
        else:
            raise e
  