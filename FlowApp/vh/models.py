import datetime
from .mongodb import videos_collection

class Video:
    def __init__(self, video, uploaded_at):
        self.video = video
        self.uploaded_at = uploaded_at

    def save(self):
        video_data = {
            'video': self.video,
            'uploaded_at': self.uploaded_at,
        }
        videos_collection.insert_one(video_data)

    @staticmethod
    def all():
        return videos_collection.find()

    @staticmethod
    def get(video_id):
        return videos_collection.find_one({'_id': video_id})
