const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Kullanıcı kimliğini doğrula
const protect = async (req, res, next) => {
  let token;

  // Authorization header'dan token al
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token); // Token'ı logla

      // Token'i doğrula
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Çözülmüş token bilgisi

      // Kullanıcıyı al ve req.user'a ekle
      req.user = await User.findById(decoded.id).select('-password');
      console.log('User:', req.user); // Kullanıcı bilgisi

      if (!req.user) {
        throw new Error('User not found.');
      }

      next();
    } catch (error) {
      console.error('Authentication failed:', error.message);
      return res.status(401).json({ success: false, message: 'Unauthorized access, invalid token.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized access, token not found.' });
  }
};


const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(403).send({ message: 'Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Kullanıcıyı doğrula
    next();
  } catch (err) {
    res.status(403).send({ message: 'Invalid token.' });
  }
};

// Yalnızca admin yetkisi için kontrol
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Unauthorized access. Only admin can do this.' });
  }
};

module.exports = { protect, admin, authenticateUser };