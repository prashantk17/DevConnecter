require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('config');  // add this

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define API routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || config.get('port') || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  // You can also log mongoURI from config for debugging
  console.log('Loaded MONGO_URI:', config.has('mongoURI') ? 'Yes' : 'No');
});
