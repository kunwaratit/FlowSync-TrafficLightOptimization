from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from utils.mongodb import get_mongo_client
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from datetime import datetime, timedelta
import pytz
db = get_mongo_client()

class CurrentLiveStatus(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = int(request.user.id)
        print(user_id)
        # Assuming 'registration_users' collection has 'location_id' field
        users_collection = db['registration_users']

        pipeline = [
            {'$match': {'_id': user_id}},

            {'$lookup': {
                'from': 'live_count',
                'let': {'location_id': '$location_id'},
                'pipeline': [
                    {'$match': {'$expr': {'$eq': ['$location_id', '$$location_id']}}},
                    {'$project': {'_id': 0,
                                   "location_id": 1,
                                   "timestamp": 1,
                                   "traffic_info":1
                                  
                                  
                                  }}  
                ],
                'as': 'related_data'
            }},

            {'$project': {
                '_id': 0, 
                'district': 1,
                'intersection': 1,
                'related_data': 1,
                #  "video_source":0
            }}
        ]

        aggregation_result = list(users_collection.aggregate(pipeline))

        if aggregation_result:
            response_data = aggregation_result[0]
            return JsonResponse(response_data)
        else:
            return JsonResponse({'error': 'Related data not found'}, status=404)

class HourStatus(APIView):
    permission_classes = [IsAuthenticated]
    def get(self,request):
        try:
            user_id = int(request.user.id) 
            
            users_collection = db['registration_users']
            
            # Retrieve user's location_id or adjust based on your user structure
            user_data = users_collection.find_one({'_id': user_id})
            if not user_data:
                return JsonResponse({'error': 'User not found'}, status=404)

            location_id = user_data.get('location_id')

            vehicle_count_collection = db['vehicle_count']
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
                'location_id': location_id,
                'timestamp': {
                    '$gte': start_time_utc.isoformat(),
                    '$lte': end_time_utc_545.isoformat()
                }
            }

            results = list(vehicle_count_collection.find(query))
            data=[]
            for result in results:
                if '_id' in result:
                    result['_id'] = str(result['_id'])
                timestamp = result.get('timestamp')
                traffic_info = result.get('traffic_info', {})
                incoming = traffic_info.get('incoming', {})
                
                
                if isinstance(timestamp, str):
                    timestamp = datetime.fromisoformat(timestamp)
                
                formatted_time = timestamp.astimezone(kathmandu_tz).strftime("%H:%M")
                print(formatted_time)
                for cam, cam_data in incoming.items():
                    entry = {
                        'time': formatted_time,
                        'camera': cam,
                        'total_vehicles': cam_data.get('total_vehicles', 0),
                        'cars': cam_data.get('vehicles', {}).get('cars', 0),
                        'bikes': cam_data.get('vehicles', {}).get('bikes', 0),
                        'buses': cam_data.get('vehicles', {}).get('buses', 0)
                    }
                    data.append(entry)
            if not data:
                default_entry = {
                    'time': start_time_utc.strftime("%H:%M"),
                    'camera': 'N/A',
                    'total_vehicles': 0,
                    'cars': 0,
                    'bikes': 0,
                    'buses': 0
                }
                data.append(default_entry)
            response_data = {
                'time_range': {
                    'start': start_time_utc.strftime("%Y-%m-%d %H:%M:%S %z"),
                    'end': end_time_utc_545.strftime("%Y-%m-%d %H:%M:%S %z")
                },
                'data': data
            }

            return JsonResponse(response_data, safe=False)

        except Exception as e:
            print(f"Error fetching data from MongoDB: {str(e)}")
            return JsonResponse({'error': 'Failed to fetch data'}, status=500)


from django.http import JsonResponse

def get_video_url(request):
    # Replace this with your logic to fetch the actual video URL from your storage or database
    video_url = './videos/w.mp4'
    return JsonResponse({'video_url': video_url})