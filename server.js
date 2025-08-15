require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Mask Mongo URI for logs
function maskMongoUri(uri) {
  if (!uri) return 'Not set';
  return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, '$1****$3');
}

// Env logs
console.log('--- ENV ---');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT (env):', process.env.PORT ? `${process.env.PORT} (provided by host)` : 'Not set (using default)');
console.log('MONGO_URI (masked):', maskMongoUri(process.env.MONGO_URI));
console.log('-----------');

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

// Start server after DB connects
const PORT = process.env.PORT || 5000;
(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not set. Add it in Railway Variables or MongoDB service.');
    }
    await connectDB();
    app.listen(PORT, '0.0.0.0', () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    process.exit(1);
  }
})();
