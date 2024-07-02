from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['led_timer_db']
collection = db['vehicle_count']

@app.route('/timers', methods=['GET'])
def get_timers():
    timers = collection.find_one({"location_id": "81"})
    if timers:
        # Extract modes_applied field and set_timers subfield if they exist
        modes_applied = timers.get('modes_applied', {})
        set_timers = modes_applied.get('set_timers', {})
        return jsonify(set_timers)
    else:
        return jsonify({'error': 'Timers not found'}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
