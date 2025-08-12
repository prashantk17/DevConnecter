require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

function maskMongoUri(uri) {
  if (!uri) return 'Not set';
  // mask password in mongodb+srv://user:pass@...
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
}

console.log('--- ENV ---');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT (env):', process.env.PORT ? `${process.env.PORT} (provided by host)` : 'Not set (using default)');
console.log('MONGO_URI (masked):', maskMongoUri(process.env.MONGO_URI));
console.log('-----------');

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('❌ MONGO_URI not set. Add it in Railway Variables or use MongoDB service.');
  process.exit(1);
}

console.log('🔍 Connecting to MongoDB (masked):', maskMongoUri(mongoURI));
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('🔗 Attempted (masked):', maskMongoUri(mongoURI));
    if (err.message && err.message.toLowerCase().includes('authentication failed')) {
      console.error('❗ Authentication failed — check credentials in your MONGO_URI');
    }
    process.exit(1);
  });

app.use(express.json());
// your routes...
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server listening on ${PORT}`));
