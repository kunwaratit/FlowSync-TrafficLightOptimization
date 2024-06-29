import numpy as np
import supervision as sv
from ultralytics import YOLO
import cv2
# COLORS=sv.ColorPalette.default()
model = YOLO("./best.pt")


# tracker = sv.ByteTrack()
box_annotator=sv.BoundingBoxAnnotator()
# label_annotator = sv.LabelAnnotator()
# trace_annotator = sv.TraceAnnotator()
source_path="../videos/Do.mp4"
class video_processor():
    def __init__(self,vid,model,box_annotator):
        self.vid=vid
        self.model=model
        self.box_annotator = box_annotator
    
    def process_video(self):
        frame_generator=sv.get_video_frames_generator(self.vid)
        for frame in frame_generator:
            processed_frame=self.process_frame(frame)
            cv2.imshow('frame',processed_frame)
            if cv2.waitKey(0) & 0xFF == ord('q'):
                break
        cv2.destroyAllWindows()
    
    def process_frame(self,frame):
        result=self.model(frame)[0]
        detections=sv.Detections.from_ultralytics(result)
        return self.annotate_frame(frame,detections)
    def annotate_frame(self,frame,detections):
        annotated_frame=frame.copy()
        annotated_frame=self.box_annotator.annotate(annotated_frame,detections)
        return annotated_frame
    

if __name__=='__main__':
    processor=video_processor(source_path,model,box_annotator)
    processor.process_video()

# def callback(frame: np.ndarray, _: int) -> np.ndarray:
#     results = model(frame)[0]
#     detections = sv.Detections.from_ultralytics(results)
#     detections = tracker.update_with_detections(detections)

#     labels = [
#         f"#{tracker_id} {results.names[class_id]}"
#         for class_id, tracker_id
#         in zip(detections.class_id, detections.tracker_id)
#     ]

#     annotated_frame = box_annotator.annotate(
#         frame.copy(), detections=detections)
#     annotated_frame = label_annotator.annotate(
#         annotated_frame, detections=detections, labels=labels)
#     return trace_annotator.annotate(
#         annotated_frame, detections=detections)

# sv.process_video(
#     source_path="../videos/Do.mp4",
#     target_path="result.mp4",
#     callback=callback
# )