from rest_framework.views import APIView
from rest_framework.response import Response
from pymongo import MongoClient
from utils.mongodb import get_mongo_client
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated

db = get_mongo_client()

class CurrentLiveStatus(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        user_id = request.user.id  # Assuming you retrieve the user ID from your authentication method
        collection = db['registration_users']
        user_data = collection.find_one({'_id': user_id})

        if user_data:
            # Format the data as needed
            response_data = {
                'email': user_data['email'],
                'phone_number': user_data['phone_number'],
                'district': user_data['district'],
                'intersection': user_data['intersection'],
                # Add other fields as needed
            }
            return JsonResponse(response_data)  # Return formatted data
        else:
            return JsonResponse({'error': 'Admin user not found'}, status=404)