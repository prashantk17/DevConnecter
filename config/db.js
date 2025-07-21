const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  console.log("🔧 connectDB() called"); // Step 1: confirm it's being called
  console.log("🔑 mongoURI:", db);      // Step 2: check URI is loaded

  try {
    await mongoose.connect(db);
    console.log("✅ MongoDB Connected...");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
