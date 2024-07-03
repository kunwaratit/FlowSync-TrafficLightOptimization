from django.http import JsonResponse
from pymongo import MongoClient
from datetime import datetime, timedelta
from django.utils import timezone
import pytz

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']  # Replace with your MongoDB database name
collection = db['vehicle_count']  # Replace with your MongoDB collection name

def fetch_data_from_mongodb(request):
    try:
        # Calculate the time 30 minutes ago from now in UTC
        end_time_utc = datetime.utcnow()  # Current UTC time
        start_time_utc = end_time_utc - timedelta(minutes=30)  # 30 minutes ago

        # Convert UTC times to UTC+5:45 for MongoDB query
        utc_545 = pytz.timezone('Asia/Kathmandu')
        start_time_utc_545 = start_time_utc.astimezone(utc_545)
        end_time_utc_545 = end_time_utc.astimezone(utc_545)

        print("Start Time (UTC+5:45):", start_time_utc_545)
        print("End Time (UTC+5:45):", end_time_utc_545)

        # Query MongoDB for documents within the last 30 minutes in UTC+5:45
        query = {
            'timestamp': {
                '$gte': start_time_utc_545,
                '$lte': end_time_utc_545
            }
        }

        results = list(collection.find(query))

        # Convert ObjectId to string for JSON serialization
        for result in results:
            if '_id' in result:
                result['_id'] = str(result['_id'])

        # Return the results as JSON response
        return JsonResponse(results, safe=False)

    except Exception as e:
        # Handle exceptions appropriately (logging, error response, etc.)
        print(f"Error fetching data from MongoDB: {str(e)}")
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)
