const { check } = require('express-validator');

// Kullanıcı kaydı için validasyon kuralları
const validateRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
];

// Kullanıcı giriş için validasyon kuralları
const validateLogin = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').not().isEmpty(),
];

// Oda validasyon kuralları
const validateRoom = [
  check('roomNumber', 'Room number is required').not().isEmpty(),
  check('type', 'Room type is required').not().isEmpty(),
  check('price', 'Room price must be a number').isNumeric(),
  check('capacity', 'Room capacity must be a number').isNumeric(),
];

// Rezervasyon validasyon kuralları
const validateBooking = [
  check('roomId', 'Room ID is required').not().isEmpty(),
  check('checkInDate', 'Check-in date is required').not().isEmpty(),
  check('checkOutDate', 'Check-out date is required').not().isEmpty(),
  check('checkOutDate').custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.checkInDate)) {
      throw new Error('Check-out date must be after check-in date');
    }
    return true;
  }),
];

module.exports = { validateRegister, validateLogin, validateRoom,validateBooking };
