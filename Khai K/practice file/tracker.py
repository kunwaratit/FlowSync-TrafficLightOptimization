import math

class Tracker:
    def __init__(self, distance_threshold=35):
        self.center_points = {}  # Dictionary to store object IDs and their center points
        self.id_count = 0  # Counter for assigning unique IDs to new objects
        self.distance_threshold = distance_threshold  # Distance threshold for considering objects the same

    def update(self, objects_rect):
        objects_bbs_ids = []

        # Get center point of new object
        for rect in objects_rect:
            x, y, w, h = rect
            cx = (x + x + w) // 2
            cy = (y + y + h) // 2

            # Find out if that object was detected already
            same_object_detected = False
            for obj_id, pt in self.center_points.items():
                dist = math.hypot(cx - pt[0], cy - pt[1])

                if dist < self.distance_threshold:
                    self.center_points[obj_id] = (cx, cy)
                    objects_bbs_ids.append([x, y, w, h, obj_id])
                    same_object_detected = True
                    break

            # New object is detected we assign the ID to that object
            if not same_object_detected:
                self.center_points[self.id_count] = (cx, cy)
                objects_bbs_ids.append([x, y, w, h, self.id_count])
                self.id_count += 1

        # Clean the dictionary by center points to remove IDS not used anymore
        new_center_points = {}
        for obj_bb_id in objects_bbs_ids:
            _, _, _, _, object_id = obj_bb_id
            center = self.center_points[object_id]
            new_center_points[object_id] = center

        # Update dictionary with IDs not used removed
        self.center_points = new_center_points.copy()
        return objects_bbs_ids

# Example usage:
tracker = Tracker(distance_threshold=50)  # Adjust threshold as needed
objects_rectangles = [[100, 100, 50, 50], [120, 120, 60, 60], [300, 300, 40, 40]]
tracked_objects = tracker.update(objects_rectangles)
print(tracked_objects)
