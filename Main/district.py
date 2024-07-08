from pymongo import MongoClient

from FlowApp.utils.mongodb import get_mongo_client

# Connect to MongoDB
# client=MongoClient('mongodb://localhost:27017/')  # Adjust the host and port if necessary
# client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

# # Create or connect to the database
# db = client['Flow']
db = get_mongo_client()
# Create or connect to the collection
collection = db['districts']

# Data to be inserted
data = [
    {
"_id":1,"province": "Province No. 1", "districts": ["Bhojpur", "Dhankuta", "Ilam", "Jhapa", "Khotang", "Morang", "Okhaldhunga", "Panchthar", "Sankhuwasabha", "Solukhumbu", "Sunsari", "Taplejung", "Terhathum", "Udayapur"]},
    {"_id":2,"province": "Province No. 2", "districts": ["Bara", "Dhanusha", "Mahottari", "Parsa", "Rautahat", "Saptari", "Sarlahi", "Siraha"]},
    {"_id":3,"province": "Bagmati Province", "districts": ["Bhaktapur", "Chitwan", "Dhading", "Dolakha", "Kavrepalanchok", "Kathmandu", "Lalitpur", "Makwanpur", "Nuwakot", "Ramechhap", "Rasuwa", "Sindhuli", "Sindhupalchok"]},
    {"_id":4,"province": "Gandaki Province", "districts": ["Baglung", "Gorkha", "Kaski", "Lamjung", "Manang", "Mustang", "Myagdi", "Nawalpur", "Parbat", "Syangja", "Tanahun"]},
    {"_id":5,"province": "Lumbini Province", "districts": ["Arghakhanchi", "Banke", "Bardiya", "Dang", "Gulmi", "Kapilvastu", "Parasi (Nawalparasi West)", "Palpa", "Pyuthan", "Rolpa", "Rukum (East)", "Rupandehi"]},
    {"_id":6,"province": "Karnali Province", "districts": ["Dailekh", "Dolpa", "Humla", "Jajarkot", "Jumla", "Kalikot", "Mugu", "Rukum (West)", "Salyan", "Surkhet"]},
    {"_id":7,"province": "Sudurpashchim Province", "districts": ["Achham", "Baitadi", "Bajhang", "Bajura", "Dadeldhura", "Darchula", "Doti", "Kailali", "Kanchanpur"]}
]

# Insert data into the collection
collection.insert_many(data)

print("Data inserted successfully")
