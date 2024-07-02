from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from registration.serializers import UserProfileSerializer, UserRegisterSerializer,LoginApiSerializer
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from registration.renderers import UserRenderer
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['GET'])
def getdata(request):
    person={'name':'atit','age':'21'}
    return Response(person)

class UserRegisterApi(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            token=get_tokens_for_user(user)
            return Response({'token':token,'msg':'Registration successful'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginApi(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request):
        serializer=LoginApiSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            user=authenticated_user = authenticate(
                email=email, password=password)
            if user is not None:
                token=get_tokens_for_user(user)
                return Response({'token':token,'msg':'Login successful'},status=status.HTTP_201_CREATED)
            else:
                return Response({'errors':{'non_field_errors':['Invalid Email or password']}}
                                ,status=status.HTTP_400_BAD_REQUEST)
                

class UserProfileApi(APIView):
    renderer_classes=[UserRenderer]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        serializer=UserProfileSerializer(request.user)
        return Response(serializer.data,status=status.HTTP_200_OK)
class logoutApi(APIView):
    pass