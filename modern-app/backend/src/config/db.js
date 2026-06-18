const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || 'fast_food_db';

  if (!uri) {
    console.error('CRITICAL: MONGODB_URI is not defined in environment variables.');
    process.exit(1);
  }

  try {
    console.log(`Connecting to MongoDB Database [${dbName}]...`);
    await mongoose.connect(uri, {
      dbName: dbName
    });
    console.log('MongoDB connected successfully.');
  } catch (err) {
    console.error('CRITICAL: MongoDB connection error:', err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
