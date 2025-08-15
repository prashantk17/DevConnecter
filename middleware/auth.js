// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // 1️⃣ Try to get token from custom header or Authorization
  let token =
    req.header('x-auth-token') ||
    (req.header('Authorization') && req.header('Authorization').split(' ')[1]);

  // 2️⃣ If no token found
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // 3️⃣ Ensure JWT_SECRET is set
  if (!process.env.JWT_SECRET) {
    console.error('❌ JWT_SECRET environment variable is not set.');
    return res.status(500).json({ msg: 'Server configuration error: JWT_SECRET not set' });
  }

  // 4️⃣ Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user; // Attach decoded user payload
    next();
  } catch (err) {
    console.error('❌ Token verification failed:', err.message);
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};
