const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const user = new User({ email, password });
  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ message: 'Signup successful', token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: 'Login successful', token });
});

// Password Reset Route
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password updated successfully' });
});

module.exports = router;
