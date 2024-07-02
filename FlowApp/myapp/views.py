# In your Django app views.py
from django.http import JsonResponse
from pymongo import MongoClient

def get_districts(request):
    # Connect to MongoDB
    client = MongoClient('mongodb://localhost:27017/')
    db = client['Flow']
    collection = db['districts']  # Replace with your MongoDB collection name

    # Query all districts from MongoDB
    districts = list(collection.find({}, {'_id': 0}))  # Exclude _id field if not needed

    # Close MongoDB connection
    client.close()

    # Return districts as JSON response
    return JsonResponse(districts, safe=False)
