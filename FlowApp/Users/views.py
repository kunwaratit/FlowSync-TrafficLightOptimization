# views.py

from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from Users.serializers import UserRegisterSerializer
from Users.utils import register_user_to_mongodb
from Users.renderers import UserRenderer 
from rest_framework_simplejwt.tokens import RefreshToken
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
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
