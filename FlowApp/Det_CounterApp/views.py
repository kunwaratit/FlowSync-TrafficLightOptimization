from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Detection
from .serializers import DetectionSerializer
from bson import ObjectId

# class DetectionAPIView(APIView):
#     def post(self, request):
#         # Generate a unique _id if not provided
#         if '_id' not in request.data:
#             request.data['_id'] = str(ObjectId())

#         serializer = DetectionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # def get(self, request):
    #     detections = Detection.objects.all()
    #     serializer = DetectionSerializer(detections, many=True)
    #     return Response(serializer.data)
# class DetectionAPIView(APIView):
#     def post(self, request):
#         location_id = request.data.get('location_id')
#         if location_id:
#             detections = Detection.objects.filter(location_id=location_id)
#             serializer = DetectionSerializer(detections, many=True)
#             return Response(serializer.data)
#         else:
#             return Response({'error': 'Please provide a location_id in the request body.'}, status=status.HTTP_400_BAD_REQUEST)


from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.conf import settings
from pymongo import MongoClient
from .models import Detection
from .serializers import DetectionSerializer
from bson import ObjectId

class DetectionAPIView(APIView):
    def post(self, request):
        # Generate a unique _id if not provided
        if '_id' not in request.data:
            request.data['_id'] = str(ObjectId())

        serializer = DetectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        # Check if location_id is provided in the request query parameters
        location_id = request.query_params.get('location_id')
        if location_id:
            client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]
            collection = db[Detection._meta.db_table]

            # MongoDB aggregation to count the total number of vehicles
            pipeline = [
                {"$match": {"location_id": location_id}},
                {
                    "$project": {
                        "total_x_vehicles": {
                            "$sum": [
                                {"$ifNull": ["$positions.x.vehicles.cars", 0]},
                                {"$ifNull": ["$positions.x.vehicles.bikes", 0]}
                            ]
                        },
                        "total_y_vehicles": {
                            "$sum": [
                                {"$ifNull": ["$positions.y.vehicles.cars", 0]},
                                {"$ifNull": ["$positions.y.vehicles.bikes", 0]}
                            ]
                        },
                        "total_z_vehicles": {
                            "$sum": [
                                {"$ifNull": ["$positions.z.vehicles.cars", 0]},
                                {"$ifNull": ["$positions.z.vehicles.bikes", 0]}
                            ]
                        }
                    }
                }
            ]

            try:
                count_data = list(collection.aggregate(pipeline))
                if count_data:
                    return Response(count_data[0], status=status.HTTP_200_OK)
                else:
                    return Response({"error": "No data found for the given location_id"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": "Please provide a location_id in the request query parameters."}, status=status.HTTP_400_BAD_REQUEST)