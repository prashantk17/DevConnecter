const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const config = require('config');

const User = require('../../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    res.json(user);
  } catch (err) {
    console.error('💥 GET /api/auth error:', err);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

      const payload = { user: { id: user.id } };
      const jwtSecret = process.env.JWT_SECRET || config.get('jwtSecret');
      if (!jwtSecret) return res.status(500).json({ errors: [{ msg: 'JWT Secret not set' }] });

      jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
        if (err) {
          console.error('💥 JWT sign error:', err);
          return res.status(500).json({ errors: [{ msg: 'Server Error' }] });
        }
        res.json({ token });
      });
    } catch (err) {
      console.error('💥 POST /api/auth error:', err);
      res.status(500).json({ errors: [{ msg: 'Server Error' }] });
    }
  }
);

module.exports = router;
