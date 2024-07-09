from django.http import StreamingHttpResponse, HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import cv2
import os
import json
from django.shortcuts import render

# Create your views here.
import cv2
import time
from ultralytics import YOLO
import math
import numpy as np
from django.http import JsonResponse
import torch



# working.py
import json
import cv2
import time
import numpy as np
from collections import defaultdict, namedtuple
from multiprocessing import Process, Queue
from ultralytics import YOLO
# from FlowApp.utils.mongodb import get_mongo_client
# from myMind import mind
import supervision as sv
from pymongo import MongoClient
import datetime
import logging
import random
import torch
import pytz
from datetime import timedelta
# Global variable to control streaming
streaming = False
video_file_path = None
VIDEOS_DIR = './videos/'

def list_videos(request):
    videos = [f for f in os.listdir(VIDEOS_DIR) if os.path.isfile(os.path.join(VIDEOS_DIR, f))]
    return JsonResponse(videos, safe=False)

@csrf_exempt
def select_video(request):
    global video_file_path
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            video_name = data.get('video_name')
            if video_name:
                video_file_path = os.path.join(VIDEOS_DIR, video_name)
                return HttpResponse('Video selected successfully.')
            else:
                return HttpResponse('No video name provided.', status=400)
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON data.', status=400)
    return HttpResponse('Failed to select video.', status=400)

def video_feed(request):
    global streaming, video_file_path
    if not video_file_path:
        return HttpResponse('No video selected.', status=400)

    streaming = True

    def generate():
        cap = cv2.VideoCapture(video_file_path)
        model = YOLO('best.pt')
        Detection = namedtuple('Detection', ['xyxy', 'mask', 'confidence', 'class_id', 'tracker_id'])

        if torch.cuda.is_available():
            print("CUDA is available. GPU will be used for prediction.")
            model.cuda()
        else:
            print("CUDA is not available. Using CPU for prediction.")
            model = model.cpu()

        start_time = time.time()
        frame_count = 0
        fps = 0

        box_annotator = sv.BoxAnnotator(thickness=2)
        byte_tracker = sv.ByteTrack()
        area = [[348, 293], [147, 699], [1022, 688], [790, 300]]
        zone_polygon = np.array(area)
        zone = sv.PolygonZone(zone_polygon, (1024, 740))
        zone_annotator = sv.PolygonZoneAnnotator(zone, color=sv.Color.red())

        unique_tracker_ids = set()
        counted_tracker_ids = {"cars": set(), "bikes": set(), 'buses': set()}
        frame_miss_count = defaultdict(int)
        left_ids = {
            "cars": set(),
            "bikes": set(),
            "buses": set()
        }
        classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']

        while True:
            ret, img = cap.read()
            if not ret:
                print(f"Video Ended: ")
                break

            img_resized = cv2.resize(img, (1024, 740))
            mask = np.zeros_like(img_resized, dtype=np.uint8)
            cv2.fillPoly(mask, [np.array(area, np.int32)], (255, 255, 255))
            img_masked = cv2.bitwise_and(img_resized, mask)
            cv2.polylines(img_resized,[np.array(area,np.int32)],True,(0,0,225),2)

            results = model.predict(img_masked, stream=True, imgsz=640)

            frame = img_resized.copy() 
            for r in results:
                boxes = r.boxes
                for box in boxes:
                    x1, y1, x2, y2 = map(int, box.xyxy[0])
                    x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), (255, 0, 255), 3)

                    cls = int(box.cls[0])
                    conf = math.ceil(box.conf[0] * 100) / 100

                    # Draw filled rectangle as background for confidence score text
                    text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                    cv2.rectangle(frame, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)

                    # Draw confidence score text
                    cv2.putText(frame, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)

            frame_count += 1
            if frame_count % 10 == 0:
                end_time = time.time()
                elapsed_time = end_time - start_time
                fps = frame_count / elapsed_time
                start_time = time.time()
                frame_count = 0

            try:
                _, buffer = cv2.imencode('.jpg', frame)
                if buffer is None:
                    continue  # Skip this frame if encoding fails

                frame = buffer.tobytes()
                yield (b'--frame\r\n'
                    b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
            except cv2.error as e:
                print(f"Error encoding frame: {e}")
                continue

        cap.release()



    return StreamingHttpResponse(generate(), content_type='multipart/x-mixed-replace; boundary=frame')

def stop_stream(request):
    global streaming
    streaming = False
    return HttpResponse('Stream stopped.')
