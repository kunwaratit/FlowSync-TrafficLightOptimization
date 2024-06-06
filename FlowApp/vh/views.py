# vehicles/views.py

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import LocationSerializer

class VehicleCountAPIView(APIView):
    sample_document = {
        "positions": {
            "x": {
                "value": 10,
                "vehicles": {
                    "cars": 5,
                    "bikes": 3,
                    "total": 8
                }
            },
            "y": {
                "value": 20,
                "vehicles": {
                    "cars": 2,
                    "bikes": 1,
                    "total": 3
                }
            },
            "z": {
                "value": 15,
                "vehicles": {
                    "cars": 1,
                    "bikes": 0,
                    "total": 1
                }
            }
        }
    }

    def get(self, request):
        serializer = LocationSerializer(data=self.sample_document)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)
