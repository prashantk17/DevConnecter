const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "hardcoded-uri";
    
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ Using hardcoded MongoDB URI — set MONGO_URI in your .env file for security.");
    } else {
      console.log("✅ Using MONGO_URI from environment variables");
    }

    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
