from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView


@api_view(['GET'])
def getdata(request):
    person={'name':'atit','age':'21'}
    return Response(person)

class RegisterApi(APIView):
    def post():
        pass
    
class LoginApi(APIView):
    def post():
        pass
class logoutApi(APIView):
    pass