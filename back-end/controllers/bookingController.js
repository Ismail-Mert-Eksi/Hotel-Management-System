const Booking = require('../models/Booking');
const Room = require('../models/Room');
const { isRoomAvailable } = require('../utils/reservationUtils');
const { sendEmail } = require('../utils/emailUtils');
const { validationResult } = require('express-validator');

// Tüm rezervasyonları getir
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('roomId', 'roomNumber type price');
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    console.error('Error while taking reservations:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving reservations.' });
  }
};

// Yeni rezervasyon oluştur
const createBooking = async (req, res) => {
  console.log('Reservation request received:', req.body);

  const { roomId, checkInDate, checkOutDate } = req.body;

  try {
    if (!roomId || !checkInDate || !checkOutDate) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Odanın varlığını kontrol et
    const room = await Room.findById(roomId);
    if (!room) {
      console.log('No room found:', roomId);
      return res.status(404).json({ success: false, message: 'No room found.' });
    }

    // Tarih çakışması kontrolü
    const conflictingBooking = await Booking.findOne({
      roomId,
      checkInDate: { $lt: new Date(checkOutDate) },
      checkOutDate: { $gt: new Date(checkInDate) },
    });

    if (conflictingBooking) {
      console.log('Date conflict:', conflictingBooking);
      return res.status(400).json({ success: false, message: 'The room is not available on these dates.' });
    }

    // Toplam fiyat hesaplama
    const totalDays = Math.ceil(
      (new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = totalDays * room.price;

    // Rezervasyonu kaydet
    const booking = new Booking({
      userId: req.user._id,
      roomId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    console.log('Saving a reservation:', booking);
    await booking.save();

    
    // Kullanıcıya e-posta gönder
    const user = req.user;
    await sendEmail(user.email, 'Reservation Confirmation: ', `Your reservation is confirmed! Check-in: ${checkInDate}, Check-out: ${checkOutDate}`);

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    console.error('Error during booking:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred during your reservation.' });
  }





  
};

// Rezervasyonu güncelle
const updateBooking = async (req, res) => {
  // Validasyon hatalarını kontrol et
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const { checkInDate, checkOutDate, status } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Rezervasyon bulunamadı.' });
    }

    // Tarih çakışma kontrolü
    if (checkInDate || checkOutDate) {
      const isAvailable = await isRoomAvailable(
        booking.roomId,
        checkInDate || booking.checkInDate,
        checkOutDate || booking.checkOutDate
      );
      if (!isAvailable) {
        return res.status(400).json({ success: false, message: 'Güncellenen tarihlerde oda müsait değil.' });
      }
    }

    // Güncellemeleri uygula
    booking.checkInDate = checkInDate || booking.checkInDate;
    booking.checkOutDate = checkOutDate || booking.checkOutDate;
    booking.status = status || booking.status;

    await booking.save();
    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.error('Rezervasyon güncellenirken hata:', error.message);
    res.status(500).json({ success: false, message: 'Rezervasyon güncellenirken bir hata oluştu.' });
  }
};

// Rezervasyonu sil
const cancelBooking = async (req, res) => {
  console.log('Rezervasyon iptal isteği alındı. Rezervasyon ID:', req.params.id);

  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      console.log('Rezervasyon bulunamadı:', req.params.id);
      return res.status(404).json({ success: false, message: 'Rezervasyon bulunamadı.' });
    }

    // Kullanıcı kendi rezervasyonunu iptal edebilir, admin tüm rezervasyonları iptal edebilir
    if (booking.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      console.log('Yetkisiz erişim. Kullanıcı:', req.user._id, 'Rezervasyon sahibi:', booking.userId);
      return res.status(403).json({ success: false, message: 'Bu rezervasyonu iptal etme yetkiniz yok.' });
    }

    // Rezervasyonu sil
    await Booking.findByIdAndDelete(req.params.id);
    console.log('Rezervasyon başarıyla silindi:', req.params.id);
    res.status(200).json({ success: true, message: 'Rezervasyon başarıyla iptal edildi.' });
  } catch (error) {
    console.error('Rezervasyon iptali sırasında hata:', error.message);
    res.status(500).json({ success: false, message: 'Rezervasyon iptali sırasında bir hata oluştu.' });
  }
};



// Toplam fiyat hesaplama
const calculateTotalPrice = (price, checkInDate, checkOutDate) => {
  const totalDays = Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24));
  return totalDays * price;
};

module.exports = { getBookings, createBooking, updateBooking, cancelBooking,calculateTotalPrice };
