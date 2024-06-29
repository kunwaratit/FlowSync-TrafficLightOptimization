import cv2
import time
from ultralytics import YOLO
import math
import numpy as np
# import torch.backends.cudnn as cudnn

# cudnn.benchmark = True
# cudnn.deterministic = True

# Open the video file
cap = cv2.VideoCapture('./videos/a3.mp4')  # Use your video source

# Load the YOLO model
model = YOLO('best.pt')

# Define the classes
classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']

# Define the area polygon points
area = [(136, 419), (8, 577), (480, 713), (342, 413), (136, 419)]

# Define the display dimensions
display_width = 540
display_height = 720

# Initialize variables for total time and frame count
total_time = 0
frame_count = 0

# Start the timer
start_time = time.time()

while True:
    ret, img = cap.read()
    # Check if the frame is successfully read
    if not ret:
        print("Video Ended.")
        break

    # Resize the image
    img_resized = cv2.resize(img, (display_width, display_height))
    
    # Create a mask for the polygonal area
    mask = np.zeros_like(img_resized, dtype=np.uint8)
    cv2.fillPoly(mask, [np.array(area, np.int32)], (255, 255, 255))
    
    # Apply the mask to the image
    img_masked = cv2.bitwise_and(img_resized, mask)
    
    # Perform object detection on the masked image
    results = model.predict(img_masked, stream=True, imgsz=640)
   
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

            # Check if the center point of the box is within the defined area
            if cv2.pointPolygonTest(np.array(area, np.int32), (cx, cy), False) > 0:
                cls = int(box.cls[0])
                conf = math.ceil(box.conf[0] * 100) / 100
                cv2.rectangle(img_resized, (x1, y1), (x2, y2), (255, 0, 255), 3)
                
                text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                cv2.rectangle(img_resized, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)
                cv2.putText(img_resized, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)
                cv2.circle(img_resized, (cx, cy), 3, (0, 0, 255), -1)
    
    # Draw the polygon area on the image
    cv2.polylines(img_resized, [np.array(area, np.int32)], True, (0, 0, 225), 2)
    
    # Display the image
    cv2.imshow('Image', img_resized)
    
    # Increment frame count
    frame_count += 1
    
    # Break the loop if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# End the timer
end_time = time.time()

# Calculate total time taken
total_time = end_time - start_time

# Release the video capture
cap.release()
cv2.destroyAllWindows()

print("Total time taken to process the video:", total_time, "seconds")
