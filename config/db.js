const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
  try {
    console.log('🔧 connectDB() called');
    const mongoURI = config.get('mongoURI');
    console.log('🔑 mongoURI:', mongoURI);
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
