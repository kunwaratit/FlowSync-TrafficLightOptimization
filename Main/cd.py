from pymongo import MongoClient

# Connect to MongoDB
client=MongoClient('mongodb://localhost:27017/')  # Adjust the host and port if necessary

# Create or connect to the database
db = client['Flow']

# Create or connect to the collection
collection = db['districts']
