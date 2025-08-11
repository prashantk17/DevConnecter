const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = 'mongodb+srv://prashantkatoch56:PjjaBmBNSX36z2R0@prashant17.dxjswvb.mongodb.net/test?retryWrites=true&w=majority&appName=Prashant17';
    console.log("Using hardcoded URI");
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
