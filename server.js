require('dotenv').config();

console.log('--- Environment Variables ---');
console.log('MONGO_URI:', process.env.MONGO_URI || '❌ Not set');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('PORT:', process.env.PORT || '5000');
console.log('-----------------------------');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('❌ MONGO_URI environment variable is NOT defined.');
  console.error('💡 Make sure it is set in Railway under Variables.');
  process.exit(1);
}

console.log(`🔍 Attempting MongoDB connection to: ${mongoURI}`);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected successfully');
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  console.error(`🔗 Tried connecting to: ${mongoURI}`);
  if (err.message && err.message.toLowerCase().includes('authentication failed')) {
    console.error('❗ Check your MongoDB username/password in the URI.');
  }
  process.exit(1);
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));
