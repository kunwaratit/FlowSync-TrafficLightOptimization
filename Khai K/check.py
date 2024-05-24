import cv2
import time
from ultralytics import YOLO
import math
import threading
import numpy as np

# Function to process frames using YOLO
def process_frames(cap, model, area, display_width, display_height):
    total_frames = 0
    start_time = time.time()
    while True:
        ret, frame = cap.read()
        if not ret:
            print("Video ended.")
            break

        # Start time for processing the current frame
        start_frame_time = time.time()

        img_resized = cv2.resize(frame, (display_width, display_height))
        results = model.predict(img_resized, stream=True, imgsz=640)

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = box.xyxy[0]
                x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
                # center of object
                cx = int(x1 + x2) // 2
                cy = int(y1 + y2) // 2
                # Check if center of object is inside the defined area
                if cv2.pointPolygonTest(np.array(area, np.int32), (cx, cy), False) > 0:
                    cls = int(box.cls[0])
                    conf = math.ceil(box.conf[0] * 100) / 100
                    cv2.rectangle(img_resized, (x1, y1), (x2, y2), (255, 0, 255), 3)
                    text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                    cv2.rectangle(img_resized, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)
                    cv2.putText(img_resized, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)
                    cv2.circle(img_resized, (cx, cy), 3, (0, 0, 255), -1)

        cv2.polylines(img_resized, [np.array(area, np.int32)], True, (0, 0, 225), 2)
        
        # Display FPS
        fps = total_frames / (time.time() - start_time)
        cv2.putText(img_resized, f'FPS: {int(fps)}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
        cv2.imshow('Image', img_resized)

        # Measure the end time for processing the current frame
        end_frame_time = time.time()
        total_frames += 1

        # Wait for key press and check if window is closed
        key = cv2.waitKey(1)
        if key == ord('q') or cv2.getWindowProperty('Image', cv2.WND_PROP_VISIBLE) < 1:
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Open webcam capture
    cap = cv2.VideoCapture('ssdg/a3.mp4')  # Specify the RTSP URL for your IP camera

    # Initialize YOLO model
    model = YOLO('best.pt')
    classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']

    # Constant width and height for display
    display_width = 540
    display_height = 720

    # Define area of interest
    area = [(136, 419), (8, 577), (480, 713), (342, 413), (136, 419)]

    # Start processing frames using threads
    process_thread = threading.Thread(target=process_frames, args=(cap, model, area, display_width, display_height))
    process_thread.start()
    process_thread.join()
