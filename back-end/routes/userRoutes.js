const express = require('express');
const { registerUser, loginUser, getUserProfile, logoutUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

const router = express.Router();

// Kullanıcı kaydı için rota
router.post('/register', validateRegister, registerUser);

// Kullanıcı giriş için rota
router.post('/login', validateLogin, loginUser);

// Kullanıcı çıkışı
router.post('/logout', logoutUser);

// Kullanıcı profili görüntüleme
router.get('/profile', protect, getUserProfile);

// Giriş durumu kontrolü
router.get('/is-logged-in', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'The user is logged in.', user: req.user });
});

module.exports = router;
