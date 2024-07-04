
from pymongo import MongoClient

from utils.mongodb import get_mongo_client
db = get_mongo_client()
counter_collection = db['user_counter'] 
def get_next_sequence_value(sequence_name):
    counter_doc = counter_collection.find_one_and_update(
        {'_id': sequence_name},
        {'$inc': {'sequence_value': 1}},
        upsert=True,
        return_document=True
    )
    return counter_doc['sequence_value']
