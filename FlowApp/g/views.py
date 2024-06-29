# views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from g.serializers import UserRegisterSerializer
from g.utils import register_user_to_mongodb
from g.renderers import UserRenderer  # Import your custom renderer

class UserRegisterApi(APIView):
    renderer_classes = [UserRenderer]  # Assign the custom renderer here

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # email = serializer.validated_data['email']
            # password = serializer.validated_data['password']
            # phone_number = serializer.validated_data['phone_number']
            # district = serializer.validated_data.get('district', '')
            # intersection = serializer.validated_data.get('intersection', '')

            try:
                user_data=serializer.save()
                # user_id = register_user_to_mongodb(email, password, phone_number, district, intersection)
                return Response({'user_id': user_data['user_id'], 'msg': 'Registration successful'}, status=status.HTTP_201_CREATED)
            except ValueError as ve:
                return Response({'errors': {'email': str(ve)}}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'errors': {'detail': 'Failed to register user'}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
