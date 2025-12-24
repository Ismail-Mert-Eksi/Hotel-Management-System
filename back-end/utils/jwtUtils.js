const jwt = require('jsonwebtoken');

// Token oluşturma
const generateToken = (id, role, expiresIn = '30d') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};

// Token doğrulama
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error('Token verification failed!');
  }
};

// Token çözümleme (decode)
const decodeToken = (token) => {
  try {
    return jwt.decode(token, { complete: true });
  } catch (error) {
    throw new Error('Token parsing failed!');
  }
};

module.exports = { generateToken, verifyToken, decodeToken };
