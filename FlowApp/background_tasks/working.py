import json
import cv2
import time
import numpy as np
from collections import defaultdict, namedtuple
from multiprocessing import Process, Queue
from ultralytics import YOLO
import supervision as sv
from pymongo import MongoClient
import datetime
import logging
import random

logger = logging.getLogger(__name__)

client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']
collection = db['vehicle_count']
collection_live = db['live_count']

vehicle_count_collection = db['vehicle_count']
live_count_collection = db['live_count']

def get_last_info(location_id):
    last_recent_document = vehicle_count_collection.find_one(
        {'location_id': location_id}, 
        sort=[('timestamp', -1)]
    )

    if last_recent_document:
        last_info_data = last_recent_document.get('traffic_info', {})
        flag = last_recent_document.get('light_flag', None)
    else:
        last_info_data = "last_details"
        flag = None

    return {
        "traffic_info": last_info_data,
        "light_flag": flag
    }

def get_traffic_info(location_id):
    new_doc = collection_live.find_one({
        'location_id': location_id
    })

    if new_doc:
        traffic_info_data = new_doc.get('traffic_info', {})
    else:
        traffic_info_data = "live_details"

    return traffic_info_data

def timing_allocation(avg_vehicles):
    return random.randint(1, 3)

def insert_document(location_id, flag):
    last_info_data = get_last_info(location_id)
    traffic_info = get_traffic_info(location_id)
    last_traffic_info = last_info_data['traffic_info']
    last_flag = last_info_data['light_flag']
    allocated_time=0
    if last_flag == 0:
        camC_vehicle = last_traffic_info['incoming']['cam_C']['total_vehicles']
        camD_vehicle = last_traffic_info['incoming']['cam_D']['total_vehicles']
        avg_vehicles = (camC_vehicle + camD_vehicle) / 2
        allocated_time = timing_allocation(avg_vehicles)
        new_flag = 1
    else:
        camA_vehicle = last_traffic_info['incoming']['cam_A']['total_vehicles']
        camB_vehicle = last_traffic_info['incoming']['cam_B']['total_vehicles']
        avg_vehicles = (camA_vehicle + camB_vehicle) / 2
        allocated_time = timing_allocation(avg_vehicles)
        new_flag = 0
    print(f'------------------------------------------------------------{new_flag}')

    document = {
        'location_id': location_id,
        'traffic_info': traffic_info,
        'modes_applied': {
            'modes': 'auto',
            'set_timer': allocated_time,
        },
        "light_flag": new_flag,
        "timestamp": datetime.datetime.now().isoformat(),
    }
    vehicle_count_collection.insert_one(document)

def find_recent_set_timer(location_id):
    recent_document = vehicle_count_collection.find_one(
        {'location_id': location_id},
        sort=[('timestamp', -1)]
    )

    if recent_document:
        set_timer_value = recent_document.get('modes_applied', {}).get('set_timer')
        print(f"Recent set_timer value for location_id {location_id}: {set_timer_value}")

    else:
        set_timer_value = 1
        print(f"Recent set_timer value for location_id {location_id}: {set_timer_value}")

    return set_timer_value

def insert_after_seconds(seconds, location_id, light_flag):
    print(f"Waiting for {seconds} seconds for traffic light or inserting...")
    
    time.sleep(seconds)
    insert_document(location_id, light_flag)
    print("Document inserted")

def creation_main():
    print("creation_main started")
    try:
        logger.info("Creation main process started.")
        light_flag = 0
        while True:
            location_id = '81'
            set_timer_value = find_recent_set_timer(location_id)
            if set_timer_value is not None:
                insert_after_seconds(set_timer_value, location_id, light_flag)
            else:
                pass
    except Exception as e:
        logger.error(f"Error in creation_main: {str(e)}")

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
    counted_tracker_ids = {"cars": set(), "bikes": set(), 'buses': set()}
    frame_miss_count = defaultdict(int)
    left_ids = {
        "cars": set(),
        "bikes": set(),
        "buses": set()
    }

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
        current_frame_tracker_ids = set()

        for r in results:
            boxes = r.boxes
            for box in boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
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
            current_frame_tracker_ids.update(tracker_ids)
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
                if class_id == 0 and tracker_id not in counted_tracker_ids["cars"]:
                    counted_tracker_ids["cars"].add(tracker_id)
                elif class_id == 1 and tracker_id not in counted_tracker_ids["bikes"]:
                    counted_tracker_ids["bikes"].add(tracker_id)
                elif class_id == 3 and tracker_id not in counted_tracker_ids["buses"]:
                    counted_tracker_ids["buses"].add(tracker_id)

            to_remove = []
            for tracker_id in unique_tracker_ids:
                if tracker_id not in current_frame_tracker_ids:
                    frame_miss_count[tracker_id] += 1
                else:
                    frame_miss_count[tracker_id] = 0

                if frame_miss_count[tracker_id] > 15:
                    to_remove.append(tracker_id)

            for tracker_id in to_remove:
                for vehicle_type, trackers in counted_tracker_ids.items():
                    if tracker_id in trackers:
                        left_ids[vehicle_type].add(tracker_id)
                        trackers.remove(tracker_id)
                        break
                unique_tracker_ids.remove(tracker_id)

            collection_live.update_one(
                {"video_source": 'all'},
                {"$set": {
                    "location_id": "81",
                    f"traffic_info.incoming.{camera_id}.vehicles.cars": len(counted_tracker_ids["cars"]),
                    f"traffic_info.incoming.{camera_id}.vehicles.bikes": len(counted_tracker_ids["bikes"]),
                    f"traffic_info.incoming.{camera_id}.vehicles.buses": len(counted_tracker_ids["buses"]),
                    "timestamp": datetime.datetime.now().isoformat(),
                    f"traffic_info.incoming.{camera_id}.total_vehicles": len(unique_tracker_ids),
                    f"traffic_info.outgoing.{camera_id}.vehicles.cars": len(left_ids["cars"]),
                    f"traffic_info.outgoing.{camera_id}.vehicles.bikes": len(left_ids["bikes"]),
                    f"traffic_info.outgoing.{camera_id}.vehicles.buses": len(left_ids["buses"]),
                    f"traffic_info.outgoing.{camera_id}.total_vehicles": sum(len(left_ids[vehicle_type]) for vehicle_type in left_ids)
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

    if output_queue:
        output_queue.put((video_source, len(unique_tracker_ids)))

def working_main():
    try:
        logger.info("Working main process started.")
        with open('VideoMaintainer.json', 'r') as f:
            video_sources = json.load(f)

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

def mind():
    x = f'''
It's holding my mind
IT is what it is
Competing with what I was yesterday
'''
    return x

a = mind()
print(a)
