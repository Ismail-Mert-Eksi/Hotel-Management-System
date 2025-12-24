const express = require('express');
const { getRooms, createRoom, updateRoom, deleteRoom, getAvailableRooms } = require('../controllers/roomController');
const { protect, admin } = require('../middleware/authMiddleware');
const { validateRoom } = require('../middleware/validationMiddleware');
const Room = require('../models/Room');
const router = express.Router();

// Tüm odaları listele
router.get('/', getRooms);

router.get('/available', getAvailableRooms);


// Yeni oda ekle (Sadece admin)
router.post('/', protect, admin, validateRoom, createRoom);

// Oda bilgilerini güncelle (Sadece admin)
router.put('/:id', protect, admin, validateRoom, updateRoom);

// Odayı sil (Sadece admin)
router.delete('/:id', protect, admin, deleteRoom);

// Oda detaylarını alma rotası
router.get('/:id', async (req, res) => {
    try {
      // Room.findById ile veritabanından odayı bulun
      const room = await Room.findById(req.params.id);
      if (!room) {
        return res.status(404).json({ success: false, message: 'Room not found' });
      }
      res.json({ success: true, room });
    } catch (error) {
      console.error('Error fetching room details:', error);
      res.status(500).json({ success: false, message: 'Server error' });
    }
  });

module.exports = router;
