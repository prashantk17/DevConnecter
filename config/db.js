const mongoose = require('mongoose');
require('dotenv').config(); // Make sure this is at the top

const connectDB = async () => {
  try {
    console.log('🔧 connectDB() called');
    const mongoURI = process.env.MONGO_URI; // ✅ Correct casing
    console.log('🔑 mongoURI:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
