from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['Flow']

# Query for district name
district_name = "Bhojpur"

# Query provinces collection
provinces_collection = db['districts']
province_info = provinces_collection.find_one({'districts': district_name})

# Query intersections collection
intersections_collection = db['location_info']
intersection_info = intersections_collection.find_one({'intersection': 'satdobato'})

# Print results
if province_info:
    print("Province Info:")
    print(province_info)

if intersection_info:
    print("Intersection Info:")
    print(intersection_info)

# Close MongoDB connection
client.close()
