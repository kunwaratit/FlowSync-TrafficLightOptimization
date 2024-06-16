import cv2
import time
from ultralytics import YOLO
import math
import numpy as np
from tracker import *
from area import mouse_callback 
# import torch.backends.cudnn as cudnn

# cudnn.benchmark = True
# cudnn.deterministic = True

# Open the video file
cap = cv2.VideoCapture('ssdg/do.mp4')  # Use your video source


model = YOLO('best.pt')


classes = ['car', 'motorbike', 'truck', 'bus', 'Emergency']

# Define the area polygon points
area = [(348, 293), (147 ,699),  (1022, 688),(790, 300),]

# Define the display dimensions
display_width = 1024
display_height = 740


total_time = 0
frame_count = 0


start_time = time.time()
tracker=Tracker()



# Create a window
cv2.namedWindow("Image")
cv2.setMouseCallback("Image", mouse_callback)
vh_ile={}
counter=[]
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
    list=[]
    cy1=472
    cy2= 471
    offset=6
            
    for r in results:
        boxes = r.boxes
        for box in boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            cx, cy = (x1 + x2) // 2, (y1 + y2) // 2
              
            list.append([x1, y1, x2, y2])
            bbox_id=tracker.update(list)
           
           
            # Check if the center point of the box is within the defined area
            if cv2.pointPolygonTest(np.array(area, np.int32), (cx, cy), False) > 0:
                cls = int(box.cls[0])
                conf = math.ceil(box.conf[0] * 100) / 100
                for bbox in bbox_id:
                        x3,y3,x4,y4,id=bbox
                        cx=int(x3+x4)//2
                        cy=int(y3+y4)//2
                        
                        if cy1<(cy+offset) and cy1>(cy-offset):
                            vh_ile[id]=cy
                            cv2.circle(img_resized, (cx, cy), 3, (0, 0, 255), -1)
                            cv2.putText(img_resized,str(id),(cx,cy),cv2.FONT_HERSHEY_COMPLEX,0.8,(0,255,255),2)
                            if counter.count(id)==0:
                                counter.append(id)
                        # cv2.putText(img_resized, f'#{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)
                # cv2.line(img_resized,(104 , cy1),(360, cy1),(255,255,255),2)  
                # cv2.putText(img_resized,('line'),(104,cy1),cv2.FONT_HERSHEY_COMPLEX,0.8,(0,255,255),2)
               
                cv2.rectangle(img_resized, (x1, y1), (x2, y2), (255, 0, 255), 3)
                
                text_size = cv2.getTextSize(f'#{classes[cls]} {conf}', cv2.FONT_HERSHEY_SIMPLEX, 0.9, 2)[0]
                cv2.rectangle(img_resized, (x1, y1 - text_size[1] - 5), (x1 + text_size[0], y1), (255, 0, 255), -1)
                cv2.putText(img_resized, f'#{id}{classes[cls]} {conf}', (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (255, 255, 255), 2, cv2.LINE_AA)
                cv2.circle(img_resized, (cx, cy), 3, (0, 0, 255), -1)

    # Draw the polygon area on the image
    # cv2.polylines(img_resized, [np.array(area, np.int32)], True, (0, 0, 225), 2)
    cv2.polylines(img_resized, [np.array(area, np.int32)], True, (0, 0, 225), 2)
    
    cv2.line(img_resized,(262 , cy1),(891, cy1),(255,255,255),2)  
    cv2.putText(img_resized,('line'),(262,cy1),cv2.FONT_HERSHEY_COMPLEX,0.8,(0,255,255),2)
    counted_vehivle=len(counter)
    print(counter)
    print(vh_ile)
    cv2.putText(img_resized,('no of vehivle=')+str(counted_vehivle),(60,40),cv2.FONT_HERSHEY_COMPLEX,0.8,(0,255,255),2)
    
    cv2.imshow('Image', img_resized)
    
    
    frame_count += 1
    
    if cv2.waitKey(0) & 0xFF == ord('q'):
        break


end_time = time.time()

total_time = end_time - start_time

cap.release()
cv2.destroyAllWindows()

print("Total time taken to process the video:", total_time, "seconds")
