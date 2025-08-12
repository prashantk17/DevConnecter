require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db'); // your existing db.js

const app = express();

// --- Mask Mongo URI for safe logging ---
function maskMongoUri(uri) {
  if (!uri) return 'Not set';
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
}

// --- Env Logs ---
console.log('--- ENV ---');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT (env):', process.env.PORT ? `${process.env.PORT} (provided by host)` : 'Not set (using default)');
console.log('MONGO_URI (masked):', maskMongoUri(process.env.MONGO_URI));
console.log('-----------');

// --- DB Connection ---
if (!process.env.MONGO_URI) {
  console.error('❌ MONGO_URI not set. Add it in Railway Variables or use MongoDB service.');
  process.exit(1);
}
connectDB();

// --- Middleware ---
app.use(express.json());

// --- Routes ---
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// --- Serve Static Assets in Production ---
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

// --- Server Listen ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
