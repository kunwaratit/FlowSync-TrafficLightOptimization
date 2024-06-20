import json
import cv2
import time
import numpy as np
from collections import namedtuple

from multiprocessing import Process, Queue
from ultralytics import YOLO
from myMind import area as masking_area
import supervision as sv 
from pymongo import MongoClient
client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Flow']
collection = db['vehicle_count']


def process_video(video_source, output_queue,area):
   
    Detection = namedtuple('Detection', ['xyxy', 'mask', 'confidence', 'class_id', 'tracker_id'])

    cap = cv2.VideoCapture(video_source)
    model = YOLO('best.pt')
    model = model.cpu()

    # Define the area polygon points
    
    # area = a


    start_time = time.time()
    frame_count = 0
    fps = 0

    # Annotators
    box_annotator = sv.BoxAnnotator(thickness=2)
    byte_tracker = sv.ByteTrack()
    zone_polygon = np.array(area)
    zone = sv.PolygonZone(zone_polygon, (1024, 740))
    zone_annotator = sv.PolygonZoneAnnotator(zone, color=sv.Color.red())

    # List to store all detections
    # all_detections = []
    unique_tracker_ids = set()

    while True:
        ret, img = cap.read()
        if not ret:
            print(f"Video Ended: {video_source}")
            break

        img_resized = cv2.resize(img, (1024, 740))  # Resize
        mask = np.zeros_like(img_resized, dtype=np.uint8)  # Mask
        cv2.fillPoly(mask, [np.array(area, np.int32)], (255, 255, 255))
        img_masked = cv2.bitwise_and(img_resized, mask)

        results = model.predict(img_masked, stream=True, imgsz=640)

        current_frame_boxes = []
        confidences = []
        class_ids = []
        tracker_ids = []

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

                # Append to lists
                current_frame_boxes.append([x1, y1, x2, y2])
                confidences.append(box.conf.item())
                class_ids.append(box.cls.item())
                tracker_ids.append(None)  # Assuming no tracker ID, add if needed

        # Check if there are any detections
        if current_frame_boxes:
            # Convert lists to numpy arrays
            current_frame_boxes = np.array(current_frame_boxes, dtype=np.float32)
            confidences = np.array(confidences, dtype=np.float32)
            class_ids = np.array(class_ids, dtype=np.int32)

            # Store the detection for the current frame
            detections = Detection(xyxy=current_frame_boxes, mask=None, confidence=confidences, class_id=class_ids, tracker_id=tracker_ids)
            # all_detections.append(detections)

            # Update tracker with detections
            tracked_detections = byte_tracker.update_with_detections(detections=detections)
            tracker_ids = [det[4] for det in tracked_detections]
            unique_tracker_ids.update(tracker_ids)

            labels = [
                f"#{tracker_id} {model.model.names[class_id]} {confidence:.2f}"
                for _, _, confidence, class_id, tracker_id in tracked_detections
            ]

            frame = box_annotator.annotate(img_resized, tracked_detections, labels=labels)
            zone.trigger(detections=tracked_detections)
            frame = zone_annotator.annotate(scene=frame)

            # Calculate and display FPS
            frame_count += 1
            if frame_count % 10 == 0:  # Calculate FPS every 10 frames
                end_time = time.time()
                elapsed_time = end_time - start_time
                fps = frame_count / elapsed_time
                start_time = time.time()
                frame_count = 0
            # print(fps)
            cv2.putText(frame, f"FPS: {fps:.1f}", (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

            # Show frame in a separate window for this video source
            cv2.imshow(f'Video Source: {video_source}', frame)
            cv2.imshow(f'Masked Image: {video_source}', img_masked)
            
            #every frame ma json ma store vairako xa
            data = {
                "total_vehicles": len(unique_tracker_ids)
                    }
            json_filename = f'database/{video_source.split("/")[-1].split(".")[0]}_total_vehicles_count.json'
            with open(json_filename, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            # Store in MongoDB
            collection.update_one(
                {"video_source": video_source},
                {"$set": {"total_vehicles": len(unique_tracker_ids), "timestamp": time.time()}},
                upsert=True
            )
            
        if cv2.waitKey(1) == 27:  # Use waitKey(1) for real-time processing
            break

    cap.release()
    cv2.destroyAllWindows()

    # Print total time taken to process the video
    end_time = time.time()
    total_time = end_time - start_time
    print(f"Total time taken to process {video_source}: {total_time} seconds")
    print(f"Total no of vehicles in {video_source}: {len(unique_tracker_ids)}")

  
    
    # Put result in the output queue for further processing or analysis
    output_queue.put((video_source, len(unique_tracker_ids)))

def main():
    # Define video sources (paths or indices)
    # video_sources = ['./videos/do.mp4', './videos/a.mp4', './videos/b.mp4','./videos/c.mp4']
    
    with open('VideoMaintainer.json', 'r') as f:
        video_sources = json.load(f)

    area=masking_area()
    print(area)
    # Queue for collecting results
    output_queue = Queue()

    # Start a process for each video source
    processes = []
    for video_source, area in video_sources.items():
        p = Process(target=process_video, args=(video_source, output_queue,area))
        p.start()
        processes.append(p)

    # Wait for all processes to finish
    for p in processes:
        p.join()

    # Collect results from the output queue
    results = {}
    while not output_queue.empty():
        result = output_queue.get()
        results[result[0]] = result[1]

    print("Total number of vehicles in each video source:")
    for video_source, vehicle_count in results.items():
        print(f"{video_source}: {vehicle_count}")

if __name__ == "__main__":
    main()
