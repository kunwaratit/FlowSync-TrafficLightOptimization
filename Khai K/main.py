import cv2
import time
from ultralytics import YOLO
import math

# Open webcam capture
cap = cv2.VideoCapture('./videos/a3.mp4')  # Specify the RTSP URL for your IP camera

model = YOLO('best.pt')
classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']

# Constant width and height for display
display_width = 540
display_height = 720

# Initialize variables for FPS calculation
fps_start_time = time.time()
fps_counter = 0

# mask=cv2.imread('ssdg/a3mask.png')
while True:
    ret, img = cap.read()
    
    img_resized = cv2.resize(img, (display_width, display_height))
    # imgRegion=cv2.bitwise_and(img_resized,mask)
    results = model.predict(img_resized, stream=True,show=True)
   
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = box.xyxy[0]
            x1, y1, x2, y2 = int(x1), int(y1), int(x2), int(y2)
            cv2.rectangle(img_resized, (x1, y1), (x2, y2), (255, 0, 255), 3)
            
            cls = int(box.cls[0])
            conf = math.ceil(box.conf[0] * 100) / 100
            
            # Draw filled rectangle as background for confidence score text
            text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
            cv2.rectangle(img_resized, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)
            
            # Draw confidence score text
            cv2.putText(img_resized, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)
   
        # Calculate FPS
    fps_counter += 1
    if time.time() - fps_start_time >= 1:
        fps = fps_counter / (time.time() - fps_start_time)
        fps_counter = 0
        fps_start_time = time.time()
        
    # Display FPS and Timer
    cv2.putText(img_resized, f'FPS: {int(fps)}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
    cv2.putText(img_resized, f'Time: {time.strftime("%H:%M:%S")}', (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 2, cv2.LINE_AA)
     
    cv2.imshow('Image', img_resized)
    # cv2.imshow('ImageReg', imgRegion)
    cv2.waitKey(1)
    if cv2.getWindowProperty('Image', cv2.WND_PROP_VISIBLE) < 1:
        break
    
cap.release()
cv2.destroyAllWindows()
