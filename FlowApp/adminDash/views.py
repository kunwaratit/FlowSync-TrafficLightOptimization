from django.http import HttpResponseBadRequest, JsonResponse
from pymongo import MongoClient
from datetime import datetime
import pytz
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView

from utils.mongodb import get_mongo_client

db=get_mongo_client()
collection = db['vehicle_count']
users_collection = db['registration_users']

class UserData(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        is_admin=request.user.is_admin
        if is_admin:
            fields_to_include = ['email',"phone_number","district","intersection","location_id","is_user","is_admin"]
            projection = {}
            for field in fields_to_include:
                projection[field] = 1
            all_users = list(users_collection.find({},projection,))

            return JsonResponse(all_users, safe=False)
        else:
            print("Unauthorized access attempted.")
            return JsonResponse({"error": "Unauthorized"}, status=403)
        
    def post(self, request, user_id):
        print(type(user_id))
        if not request.user.is_admin:
            return JsonResponse({"error": "Unauthorized"}, status=403)
        
        data = request.data
        allowed_fields = ['email',"phone_number","district","intersection","location_id","is_user","is_admin"]
        if not data:
            return HttpResponseBadRequest("No data provided")
        update_fields = {}
        for key in allowed_fields:
            if key in data:
                update_fields[key] = data[key]

        
        try:
            result = users_collection.update_one(
                {'_id': user_id},  
                {'$set': update_fields}  
            )
            
            if result.modified_count > 0:
                return JsonResponse({"message": "User data updated successfully"})
            else:
                return JsonResponse({"error": "User not found or no updates applied"}, status=404)
        
        except Exception as e:
            return JsonResponse({"error": f"Error updating user data: {str(e)}"}, status=500)
class RegisterRequests(APIView):      
    def get(self, request):
        permission_classes=[IsAuthenticated]
        is_admin=request.user.is_admin
        if is_admin:
            
            filter_query = {"is_active": False}
            fields_to_include = ['created_at','updated_at']
            projection = {}
            for field in fields_to_include:
                projection[field] = 0
            all_users = list(users_collection.find(filter_query,projection,))
            return JsonResponse(all_users, safe=False)
    def post(self,request,user_id):
        if not request.user.is_admin:
            return JsonResponse({"error": "Unauthorized"}, status=403)
        data = request.data
        user_cond = data.get('is_user')
        if not data:
            return HttpResponseBadRequest("No data provided")
        users_collection.update_one(
                {'_id': user_id},  
                {'$set': {'is_user':user_cond} } 
            )
        return JsonResponse({'User updated':'Accepted'})
    