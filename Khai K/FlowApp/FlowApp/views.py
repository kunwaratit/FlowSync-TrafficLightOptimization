import cv2
import time
from ultralytics import YOLO
import math
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def detect_objects(request):
    cap = cv2.VideoCapture('static/ssdg/a3.mp4')  # Use your video source
    model = YOLO('best.pt')
    classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']
    area = [(136, 419), (8, 577), (480, 713), (342, 413), (136, 419)]
    results_list = []
    total_time = 0
    frame_count = 0
    start_time = time.time()
    frame_counter = 0

    while True:
        ret, img = cap.read()
        if not ret:
            break

        img_resized = cv2.resize(img, (640, 480))
        mask = np.zeros_like(img_resized, dtype=np.uint8)
        cv2.fillPoly(mask, [np.array(area, np.int32)], (255, 255, 255))
        
        # Apply the mask to the image
        img_masked = cv2.bitwise_and(img_resized, mask)
    
        results = model.predict(img_masked, stream=True, imgsz=640)

        frame_results = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
                if cv2.pointPolygonTest(np.array(area, np.int32), (cx, cy), False) > 0:
                    cls = int(box.cls[0])
                    conf = math.ceil(box.conf[0] * 100) / 100
                    frame_results.append({
                        'class': classes[cls],
                        'confidence': conf,
                        'bbox': [x1, y1, x2, y2]
                    })
        results_list.append(frame_results)
        frame_counter += 1
    end_time = time.time()
    
    # Calculate total time taken
    total_time = end_time - start_time

    cap.release()
    print("Total time taken to process the video:", total_time, "seconds")
    average_fps = frame_counter / (time.time() - start_time)
    response_data = {
        'average_fps': average_fps,
        'detection_results': results_list
    }
    return JsonResponse(response_data, safe=False)
from django.shortcuts import render

def vehicle_detection_page(request):
    return render(request, 'vehicle_detection.html')
from django.shortcuts import render

def next_page_view(request):
    return render(request, 'next_page.html')
