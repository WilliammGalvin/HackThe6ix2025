from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from routes.api_routes import api_blueprint
from flask_cors import CORS
  # Make sure 'routes' is a Blueprint instance in routes.py



load_dotenv('info.env')
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.register_blueprint(api_blueprint)   # 'routes' must be a Blueprint, not a module or function

# MongoDB Setup
mongo_uri = f"mongodb+srv://ht6:1234@ht6.wpk555k.mongodb.net/ht6?retryWrites=true&w=majority&appName=HT6"
client = MongoClient(mongo_uri)
db = client.get_database()
client.server_info()  # This will raise an exception if the connection fails

if __name__ == '__main__':
    app.run(port=5173, debug=True)
