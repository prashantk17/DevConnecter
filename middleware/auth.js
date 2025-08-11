const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('🔐 Received token:', token);

  // Check if no token
  if (!token) {
    console.log('❌ No token provided');
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Remove 'Bearer ' prefix
    const actualToken = token;

    const decoded = jwt.verify(actualToken, config.get('jwtSecret'));

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
