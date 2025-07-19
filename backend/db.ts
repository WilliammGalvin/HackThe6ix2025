// Use environment variables for MongoDB credentials
const mongoUser = `ht6`;
const mongoPass = `1234`;
const mongoUri = `mongodb+srv://${mongoUser}:${mongoPass}@ht6.wpk555k.mongodb.net/?retryWrites=true&w=majority&appName=HT6`;
if (!mongoUser || !mongoPass) {
    throw new Error('MongoDB credentials not found in environment variables. Make sure your .env file contains MONGO_USER and MONGO_PASS.');
}