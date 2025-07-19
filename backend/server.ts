const express = require('express');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/info.env' });

const app = express();
const PORT = process.env.PORT || 3000;

// Use environment variables for MongoDB credentials
const mongoUser = `ht6`;
const mongoPass = `1234`;
const mongoUri = `mongodb+srv://${mongoUser}:${mongoPass}@ht6.wpk555k.mongodb.net/?retryWrites=true&w=majority&appName=HT6`;
if (!mongoUser || !mongoPass) {
    throw new Error('MongoDB credentials not found in environment variables. Make sure your .env file contains MONGO_USER and MONGO_PASS.');
}

// Connect to MongoDB and then start the server
async function startServer() {
  try {
    const client = new MongoClient(mongoUri);
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db(); // optionally pass db name if needed

    app.get('/', (req, res) => {
      res.send('Hello from Express!');
    });

    app.listen(PORT, () => {
      console.log(`🚀 Express server running at http://localhost:${PORT}/`);
    });

  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

startServer();
