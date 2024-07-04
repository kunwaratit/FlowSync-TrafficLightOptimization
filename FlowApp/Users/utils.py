# registration/utils.py

from pymongo import MongoClient
from passlib.hash import django_pbkdf2_sha256 as handler
from datetime import datetime

from utils.counter import get_next_sequence_value
client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']
users_collection = db['registration_users']
users_collection.create_index([('email', 1)], unique=True)
import random

def generate_intersection_id(intersection):
    random_number = random.randint(100, 999)
    return f"{intersection}_{random_number}"

def register_user_to_mongodb(email, password, phone_number,district,intersection):
    try:
        hashed_password = handler.hash(password)
        intersection_id = generate_intersection_id(intersection)
        next_id = get_next_sequence_value('user_id_counter')  # Get next integer ID
        
        user_data = {
            '_id': next_id,
            'email': email,
            'phone_number': phone_number,
            'password': hashed_password,
            'district':district,
            'intersection':intersection,
            'location_id': intersection_id,
            'is_active': False,
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
  
  
def authenticate_user(email, password):
    try:
        user = users_collection.find_one({'email': email})
        if user and handler.verify(password, user['password']):
           
            return user
        return None
    except Exception as e:
     
        return None