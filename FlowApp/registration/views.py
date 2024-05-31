from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView

from registration.serializers import UserRegisterSerializer,LoginApiSerializer
from django.contrib.auth import authenticate

@api_view(['GET'])
def getdata(request):
    person={'name':'atit','age':'21'}
    return Response(person)

class UserRegisterApi(APIView):
    def post(self,request):
        serializer=UserRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user=serializer.save()
            return Response({'msg':'Registration successful'},status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class LoginApi(APIView):
    def post(self,request):
        serializer=LoginApiSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email=serializer.data.get('email')
            password=serializer.data.get('password')
            user=authenticated_user = authenticate(
                email=email, password=password)
            if user is not None:
                return Response({'msg':'Login successful'},status=status.HTTP_201_CREATED)
            else:
                return Response({'errors':{'non_field_errors':['email or password is not valid']}}
                                ,status=status.HTTP_400_BAD_REQUEST)
class logoutApi(APIView):
    pass