import json
from django.shortcuts import render
from pymongo import MongoClient
from django.http import JsonResponse
from datetime import datetime, timedelta
from bson import json_util, ObjectId

# Create your views here.
client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/')
db = client['Flow']  # Replace with your MongoDB database name
collection = db['vehicle_count']

def fetch_data_from_mongodb(request):
    # Calculate the time one hour ago from now
    one_hour_ago = datetime.utcnow() - timedelta(hours=1)

    # Query MongoDB for documents within the last hour
    query = { 'timestamp': { '$gte': one_hour_ago } }
    results = list(collection.find(query))

    # Convert ObjectId to string for JSON serialization
    for result in results:
        if '_id' in result:
            result['_id'] = str(result['_id'])

    return JsonResponse(results, safe=False)
