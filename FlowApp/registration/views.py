from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getdata(request):
    person={'name':'atit','age':'21'}
    return Response(person)