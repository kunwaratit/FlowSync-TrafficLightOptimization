import re
from pymongo import MongoClient

# MongoDB connection setup
client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']  # Replace with your MongoDB database name
collection = db['vehicle_count']  # Replace with your MongoDB collection name

def check_timestamp_format():
    try:
        # Fetch a sample document from MongoDB
        sample_document = collection.find_one()

        if sample_document and 'timestamp' in sample_document:
            timestamp = sample_document['timestamp']
            print(f"Sample Timestamp: {timestamp}")

            # Regular expression to match 'YYYY-MM-DDTHH:MM:SS.mmmmmm' format
            pattern = re.compile(r'^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}$')

            if pattern.match(timestamp):
                print("Timestamp format is correct.")
                return True
            else:
                print("Timestamp format is incorrect.")
                return False
        else:
            print("No document found or 'timestamp' field missing.")
            return False

    except Exception as e:
        print(f"Error checking timestamp format: {str(e)}")
        return False

# Call the function to check timestamp format
check_timestamp_format()
