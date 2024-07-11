from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['led_timer_db']
collection = db['timers']

@app.route('/timers', methods=['GET'])
def get_timers():
    timers = collection.find_one({"name": "traffic"}, {'_id': 0})
    return jsonify(timers)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
