from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv('info.env')

# MongoDB URI from .env
mongo_uri = os.getenv("MONGO_URI", "mongodb+srv://ht6:1234@ht6.wpk555k.mongodb.net/ht6?retryWrites=true&w=majority&appName=HT6")

client = MongoClient(mongo_uri)
db = client.get_database()  # You can specify the DB name explicitly like client["ht6"]
