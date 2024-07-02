from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import VideoSerializer
from .models import Video
import datetime
import logging

logger = logging.getLogger(__name__)
#
class VideoUploadView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info("Received request data: %s", request.data)
        logger.info("Received request files: %s", request.FILES)

        data = request.data.copy()
        data['uploaded_at'] = datetime.datetime.now()

        serializer = VideoSerializer(data=data)
        if serializer.is_valid():
            video_file = request.FILES['video']
            video_path = f'media/{video_file.name}'

            with open(video_path, 'wb+') as destination:
                for chunk in video_file.chunks():
                    destination.write(chunk)

            video = Video(
                video=video_path,
                uploaded_at=data['uploaded_at']
            )
            video.save()
            return Response({'video': video_path}, status=status.HTTP_201_CREATED)
        logger.error("Serializer errors: %s", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
