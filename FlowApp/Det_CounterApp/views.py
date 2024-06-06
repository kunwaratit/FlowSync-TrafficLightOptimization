import jsonschema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from bson import ObjectId
from django.conf import settings
from pymongo import MongoClient

# Define the detection schema
from .schemas import detection_schema



def convert_objectid_to_str(data):
    if isinstance(data, list):
        return [convert_objectid_to_str(item) for item in data]
    elif isinstance(data, dict):
        return {key: convert_objectid_to_str(value) for key, value in data.items()}
    elif isinstance(data, ObjectId):
        return str(data)
    return data

class DetectionAPIView(APIView):
    def post(self, request):
        # Generate a unique _id if not provided
        if '_id' not in request.data:
            request.data['_id'] = str(ObjectId())

        # Validate the data against the schema
        try:
            jsonschema.validate(instance=request.data, schema=detection_schema)
        except jsonschema.ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Connect to MongoDB and save data
        client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        collection = db['Det_CounterApp_detection']

        try:
            collection.insert_one(request.data)
            client.close()
            return Response(request.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            client.close()
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    def get(self, request):
        location_id = request.query_params.get('location_id')
        if location_id:
            client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]
            collection = db['Det_CounterApp_detection']
            counted_vehicles_collection = db['counted_vehicles']

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
                    # Save the aggregation result to the counted_vehicles collection
                    aggregated_data = {
                        "location_id": location_id,
                        "total_x_vehicles": count_data[0]["total_x_vehicles"],
                        "total_y_vehicles": count_data[0]["total_y_vehicles"],
                        "total_z_vehicles": count_data[0]["total_z_vehicles"]
                    }
                    counted_vehicles_collection.insert_one(aggregated_data)
                    client.close()

                    # Convert ObjectId to string
                    aggregated_data = convert_objectid_to_str(aggregated_data)

                    return Response(aggregated_data, status=status.HTTP_200_OK)
                else:
                    client.close()
                    return Response({"error": "No data found for the given location_id"}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                client.close()
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({"error": "Please provide a location_id in the request query parameters."}, status=status.HTTP_400_BAD_REQUEST)
