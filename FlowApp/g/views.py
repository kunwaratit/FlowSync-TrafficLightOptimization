# registration/views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from g.serializers import UserRegisterSerializer  # Define this serializer as per your needs
from g.utils import register_user_to_mongodb

class UserRegisterApi(APIView):

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            # Register user in MongoDB
            user_id = register_user_to_mongodb(email, password)

            return Response({'user_id': user_id, 'msg': 'Registration successful'}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
