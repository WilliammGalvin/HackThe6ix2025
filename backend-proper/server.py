from flask import Flask
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from routes.api_routes import api_blueprint
  # Make sure 'routes' is a Blueprint instance in routes.py



load_dotenv('info.env')

app = Flask(__name__)
app.register_blueprint(api_blueprint)   # 'routes' must be a Blueprint, not a module or function

# MongoDB Setup
mongo_uri = fmongo_uri = "mongodb+srv://ht6:1234@ht6.wpk555k.mongodb.net/ht6?retryWrites=true&w=majority&appName=HT6"

client = MongoClient(mongo_uri)
db = client.get_database()
client.server_info()  # This will raise an exception if the connection fails

if __name__ == '__main__':
    app.run(port=3000, debug=True)
