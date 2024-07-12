from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)


client = MongoClient('mongodb+srv://atit191508:463vLueggjud8Lt9@cluster0.lzqevpf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Flow']
collection = db['timers']

@app.route('/timers', methods=['GET'])
def get_timers():
    timers = collection.find_one({"name": "traffic"}, {'_id': 0})
    return jsonify(timers)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
