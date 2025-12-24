const express = require('express');
const { getBookings, createBooking, updateBooking, cancelBooking, getUserBookings} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateBooking } = require('../middleware/validationMiddleware');
const Booking = require('../models/Booking');
const router = express.Router();

// Tüm rezervasyonları listele (Admin yetkisi gerekebilir)
router.get('/', protect, admin, getBookings);

// Yeni rezervasyon oluştur
router.post('/', protect, validateBooking, createBooking);

// Rezervasyonu güncelle
router.put('/:id', protect, validateBooking, updateBooking);

// Rezervasyonu sil
router.delete('/:id', protect, cancelBooking);

// Kullanıcının rezervasyonlarını al
router.get('/bookings', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }) // Sadece giriş yapan kullanıcının rezervasyonları
      .populate('roomId', 'roomNumber type price') // Oda detaylarını ekle
      .populate('userId', 'name email'); // Kullanıcı detaylarını ekle

    res.status(200).json({ success: true, bookings });
  } catch (err) {
    console.error('Error while taking reservations:', err.message);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
});

  
  

module.exports = router;
