from pymongo import MongoClient
import datetime
import time
import random
import logging

from FlowApp.utils.mongodb import get_mongo_client
logger = logging.getLogger(__name__)
# Connect to MongoDB
# client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# db = client['Flow']

db = get_mongo_client()
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
        'last_info': last_info_data,
        'live_info': live_info_data,
        'applied_info': 'applied_info',
        'set_timer': random.randint(1, 3),
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
        set_timer_value = recent_document.get('set_timer')
        print(f"Recent set_timer value for location_id {location_id}: {set_timer_value}")
        return set_timer_value
    else:
        print(f"No document found with location_id {location_id}")
        return None

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

creation_main()
