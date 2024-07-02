from django.http import JsonResponse
from pymongo import MongoClient
from datetime import datetime, timedelta
import pytz

client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']
collection = db['vehicle_count']

def fetch_data_from_mongodb(request):
    try:
        kathmandu_tz = pytz.timezone('Asia/Kathmandu')
        
        end_time_utc = datetime.utcnow() 
        end_time_utc_545 = end_time_utc.replace(tzinfo=pytz.utc).astimezone(kathmandu_tz)

        # print(end_time_utc_545)

        # print("Original End Time (UTC):")
        # print("Hours:", end_time_utc.hour)
        # print("Minutes:", end_time_utc.minute)
        # print("Seconds:", end_time_utc.second)

        end_time_utc = end_time_utc_545.replace(minute=0, second=0, microsecond=0)
        # print(end_time_utc)

        # print("Modified End Time (UTC):")
        # print("Hours:", end_time_utc.hour)
        # print("Minutes:", end_time_utc.minute)
        # print("Seconds:", end_time_utc.second)

        start_time_utc = end_time_utc 
       
        print("Start Time (UTC+5:45):", start_time_utc.strftime("%Y-%m-%d %H:%M:%S %z"))
        print("End Time (UTC+5:45):", end_time_utc_545.strftime("%Y-%m-%d %H:%M:%S %z"))

        query = {
            'timestamp': {
                '$gte': start_time_utc.isoformat(),
                '$lte': end_time_utc_545.isoformat()
            }
        }

        results = list(collection.find(query))

        total_vehicles = 0
        total_cars = 0
        total_bikes = 0
        total_buses = 0

        for result in results:
            if '_id' in result:
                result['_id'] = str(result['_id'])
            traffic_info = result.get('traffic_info', {})
            incoming = traffic_info.get('incoming', {})
            for cam, cam_data in incoming.items():
                total_vehicles += cam_data.get('total_vehicles', 0)
                vehicles = cam_data.get('vehicles', {})
                total_cars += vehicles.get('cars', 0)
                total_bikes += vehicles.get('bikes', 0)
                total_buses += vehicles.get('buses', 0)

        response_data = {
            'total_vehicles': total_vehicles,
            'total_cars': total_cars,
            'total_bikes': total_bikes,
            'total_buses': total_buses
        }

        return JsonResponse(response_data, safe=False)

    except Exception as e:
        print(f"Error fetching data from MongoDB: {str(e)}")
        return JsonResponse({'error': 'Failed to fetch data'}, status=500)
