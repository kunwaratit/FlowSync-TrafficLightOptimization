# your_app/views.py
import time
import cv2
from django.http import StreamingHttpResponse
from django.shortcuts import render
from ultralytics import YOLO
import math

def generate_frames():
    cap = cv2.VideoCapture('static/ssdg/a3.mp4')
    model = YOLO('best.pt')
    classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']
    display_width = 540
    display_height = 720
    fps_start_time = time.time()
    fps_counter = 0

    while True:
        ret, img = cap.read()
        if not ret:
            break

        img_resized = cv2.resize(img, (display_width, display_height))
        results = model.predict(img_resized, stream=True, show=True)

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                cv2.rectangle(img_resized, (x1, y1), (x2, y2), (255, 0, 255), 3)

                cls = int(box.cls[0])
                conf = math.ceil(box.conf[0] * 100) / 100

                text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                cv2.rectangle(img_resized, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)
                cv2.putText(img_resized, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)

        fps_counter += 1
        if time.time() - fps_start_time >= 1:
            fps = fps_counter / (time.time() - fps_start_time)
            fps_counter = 0
            fps_start_time = time.time()

        cv2.putText(img_resized, f'FPS: {int(fps)}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        cv2.putText(img_resized, f'Time: {time.strftime("%H:%M:%S")}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)

        ret, jpeg = cv2.imencode('.jpg', img_resized)
        frame_bytes = jpeg.tobytes()

        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

    cap.release()


from django.http import StreamingHttpResponse

def video_stream(request):
    response = StreamingHttpResponse(generate_frames(), content_type='multipart/x-mixed-replace; boundary=frame')
    return response