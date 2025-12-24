const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const { validationResult } = require('express-validator');

// Kullanıcı kaydı
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'This email is already registered.' });
    }

    const user = await createUser(name, email, password);
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User created successfully.',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred during registration.' });
  }
};

const createUser = async (name, email, password) => {
  const user = new User({
    name,
    email,
    password,
  });
  return await user.save();
};

// Kullanıcı girişi
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password.' });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while logging in.' });
  }
};

// Kullanıcı çıkışı (Server-side logout not needed for Authorization Header management)
const logoutUser = (req, res) => {
  res.status(200).json({ success: true, message: 'Exit successful.' });
};

const getUserProfile = async (req, res) => {
  if (!req.user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

module.exports = { registerUser, loginUser, getUserProfile, logoutUser };