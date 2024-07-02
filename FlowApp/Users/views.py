# views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from Users.serializers import LoginApiSerializer, UserRegisterSerializer
from Users.utils import authenticate_user
from Users.renderers import UserRenderer 
from rest_framework_simplejwt.tokens import RefreshToken

class UserRegisterApi(APIView):
    renderer_classes = [UserRenderer]  

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            try:
                user=serializer.save()
                return Response({'user_id': user['user_id'], 'msg': 'Registration successful'}, status=status.HTTP_201_CREATED)
            except ValueError as ve:
                return Response({'errors': {'email': str(ve)}}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({'errors': {'detail': 'Failed to register user'}}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


class LoginApi(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request):
        serializer = LoginApiSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate_user(email, password)

            if user:
                token = get_tokens_for_user(user)
                return Response({'token': token, 'msg': 'Login successful'}, status=status.HTTP_200_OK)
            else:
                return Response({'errors': {'non_field_errors': ['Invalid Email or password']}}, status=status.HTTP_400_BAD_REQUEST)
def get_tokens_for_user(user_data):
    refresh = RefreshToken()

    refresh['user_id'] = str(user_data['_id'])  
    refresh['email'] = user_data['email']

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }