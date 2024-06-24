import json
import cv2
import time
import numpy as np
from collections import namedtuple
from multiprocessing import Process, Queue
from ultralytics import YOLO
from myMind import mind 
import supervision as sv
from pymongo import MongoClient
import datetime
import logging
logger = logging.getLogger(__name__)
client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Flow']
collection = db['vehicle_count']
collection_live = db['live_count']



from pymongo import MongoClient
import datetime
import time
import random
import logging
logger = logging.getLogger(__name__)
# Connect to MongoDB
client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Flow']

# Define collections
vehicle_count_collection = db['vehicle_count']
live_count_collection = db['live_count']

def get_last_info(location_id):
    # Find most recent vehicle_count document for last_info with the same location_id
    last_recent_document = vehicle_count_collection.find_one(
        {'location_id': location_id},  # Ensure to fetch from the same location_id
        sort=[('timestamp', -1)]  # Get the most recent document based on timestamp
    )

    if last_recent_document:
        last_info_data = last_recent_document.get('live_info', {})
    else:
        last_info_data = "last_details"

    return last_info_data

def get_live_info(location_id):
    # Find document in live_count by location_id for live_info
    new_doc = live_count_collection.find_one({
        'location_id': location_id
    })

    if new_doc:
        live_info_data = {
            'positions': new_doc.get('positions', {})
        }
    else:
        live_info_data = "live_details"

    return live_info_data

def insert_document(location_id):
    # Retrieve last_info and live_info based on location_id
    last_info_data = get_last_info(location_id)
    live_info_data = get_live_info(location_id)

    # Insert a document into vehicle_count collection
    document = {
        'location_id': location_id,
        # 'last_info': last_info_data,
        'live_info': live_info_data,
        'traffic_info':{
            "cam_A": {
                "total_vehicles": 6,
                "vehicles": {
                    "bikes": 0,
                    "buses": 0,
                    "cars": 6
                }
            },
            "cam_B": {
                "total_vehicles": 7,
                "vehicles": {
                    "bikes": 0,
                    "buses": 0,
                    "cars": 7
                }
            },
            "cam_C": {
                "total_vehicles": 11,
                "vehicles": {
                    "bikes": 2,
                    "buses": 2,
                    "cars": 7
                }
            },
            "cam_D": {
                "total_vehicles": 34,
                "vehicles": {
                    "bikes": 5,
                    "buses": 0,
                    "cars": 29
                }
            }
        },
        'modes_applied': {
            'modes': 'auto',
            'set_timer': random.randint(1, 3),
        },
        "light_flag":0,
        
        "timestamp": datetime.datetime.now().isoformat(),
    }
    vehicle_count_collection.insert_one(document)

def find_recent_set_timer(location_id):
    # Find the most recent document with the specified location_id
    recent_document = vehicle_count_collection.find_one(
        {'location_id': location_id},
        sort=[('timestamp', -1)]  # Sort by timestamp descending to get the most recent document first
    )

    if recent_document:
        set_timer_value = recent_document.get('modes_applied', {}).get('set_timer')
        print(f"Recent set_timer value for location_id {location_id}: {set_timer_value}")
        return set_timer_value
    else:
        set_timer_value = 10
        print(f"Recent set_timer value for location_id {location_id}: {set_timer_value}")
        return set_timer_value

# Function to insert document after waiting for specified seconds
def insert_after_seconds(seconds, location_id):
    print(f"Waiting for {seconds} seconds before inserting...")
    time.sleep(seconds)
    insert_document(location_id)
    print("Document inserted after waiting.")

# Main script logic
def creation_main():
    try:
        # Your creation_main logic here
        logger.info("Creation main process started.")
    
        while True:
            location_id = '81'  # Replace with your specific location_id
            set_timer_value = find_recent_set_timer(location_id)
            if set_timer_value is not None:
                insert_after_seconds(set_timer_value, location_id)
            else:
                # Handle case where no recent set_timer value is found
                pass
    except Exception as e:
        logger.error(f"Error in creation_main: {str(e)}")





# working 
def process_video(video_source, camera_id, output_queue, area):
    Detection = namedtuple('Detection', ['xyxy', 'mask', 'confidence', 'class_id', 'tracker_id'])

    cap = cv2.VideoCapture(video_source)
    model = YOLO('best.pt')
    model = model.cpu()

    start_time = time.time()
    frame_count = 0
    fps = 0

    box_annotator = sv.BoxAnnotator(thickness=2)
    byte_tracker = sv.ByteTrack()
    zone_polygon = np.array(area)
    zone = sv.PolygonZone(zone_polygon, (1024, 740))
    zone_annotator = sv.PolygonZoneAnnotator(zone, color=sv.Color.red())

    unique_tracker_ids = set()
    counted_tracker_ids = {"cars": set(), "bikes": set(),'buses':set()}

    while True:
        ret, img = cap.read()
        if not ret:
            print(f"Video Ended: {video_source}")
            break

        img_resized = cv2.resize(img, (1024, 740))
        mask = np.zeros_like(img_resized, dtype=np.uint8)
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
                # cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

                current_frame_boxes.append([x1, y1, x2, y2])
                confidences.append(box.conf.item())
                class_ids.append(box.cls.item())
                tracker_ids.append(None)

        if current_frame_boxes:
            current_frame_boxes = np.array(current_frame_boxes, dtype=np.float32)
            confidences = np.array(confidences, dtype=np.float32)
            class_ids = np.array(class_ids, dtype=np.int32)

            detections = Detection(xyxy=current_frame_boxes, mask=None, confidence=confidences, class_id=class_ids, tracker_id=tracker_ids)
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

            frame_count += 1
            if frame_count % 10 == 0:
                end_time = time.time()
                elapsed_time = end_time - start_time
                fps = frame_count / elapsed_time
                start_time = time.time()
                frame_count = 0

            cv2.putText(frame, f"FPS: {fps:.1f}", (10, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
            cv2.imshow(f'Video Source: {video_source}', frame)
            cv2.imshow(f'Masked Image: {video_source}', img_masked)

            for det in tracked_detections:
                tracker_id = det[4]
                class_id = det[3]
                if class_id == 0 and tracker_id not in counted_tracker_ids["cars"]:  # Assuming class_id 0 is car
                    counted_tracker_ids["cars"].add(tracker_id)
                elif class_id == 1 and tracker_id not in counted_tracker_ids["bikes"]:  # Assuming class_id 1 is bike
                    counted_tracker_ids["bikes"].add(tracker_id)
                elif class_id == 3 and tracker_id not in counted_tracker_ids["buses"]:  # Assuming class_id 1 is bike
                    counted_tracker_ids["buses"].add(tracker_id)
            data = {
                "total_vehicles": len(unique_tracker_ids)
            }
            json_filename = f'database/{video_source.split("/")[-1].split(".")[0]}_total_vehicles_count.json'
            with open(json_filename, 'w') as json_file:
                json.dump(data, json_file, indent=4)

            collection_live.update_one(
                {"video_source": 'all'},
                {"$set": {
                    "location_id": "81",  
                    f"positions.{camera_id}.vehicles.cars": len(counted_tracker_ids["cars"]),
                    f"positions.{camera_id}.vehicles.bikes": len(counted_tracker_ids["bikes"]),
                    f"positions.{camera_id}.vehicles.buses": len(counted_tracker_ids["buses"]),
                    "timestamp": datetime.datetime.now().isoformat(),
                    f"positions.{camera_id}.total_vehicles": len(unique_tracker_ids)
                }},
                upsert=True
            )

        if cv2.waitKey(1) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()

    end_time = time.time()
    total_time = end_time - start_time
    print(f"Total time taken to process {video_source}: {total_time} seconds")
    print(f"Total no of vehicles in {video_source}: {len(unique_tracker_ids)}")

    output_queue.put((video_source, len(unique_tracker_ids)))

def working_main():
    try:
        logger.info("Working main process started.")
        with open('VideoMaintainer.json', 'r') as f:
            video_sources = json.load(f)

        my_mind = mind()
        print(my_mind)
        
        output_queue = Queue()

        processes = []
        for camera_id, video_info in video_sources.items():
            video_source = video_info['video_source']
            area = video_info['area']
            p = Process(target=process_video, args=(video_source, camera_id, output_queue, area))
            p.start()
            processes.append(p)

        for p in processes:
            p.join()

        results = {}
        while not output_queue.empty():
            result = output_queue.get()
            results[result[0]] = result[1]

        print("Total number of vehicles in each video source:")
        for video_source, vehicle_count in results.items():
            print(f"{video_source}: {vehicle_count}")
    except Exception as e:
        logger.error(f"Error in working_main: {str(e)}")
        