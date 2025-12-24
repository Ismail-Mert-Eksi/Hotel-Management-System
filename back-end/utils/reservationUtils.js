const Booking = require('../models/Booking');

const isRoomAvailable = async (roomId, checkInDate, checkOutDate) => {
  try {
    if (!roomId || !checkInDate || !checkOutDate) {
      throw new Error('Missing password: RoomId, checkInDate and checkOutDate are required.');
    }

    // Tarih formatını kontrol et ve düzelt
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Tarihlerin doğruluğunu kontrol et
    if (checkIn >= checkOut) {
      throw new Error('Check-in date must be before check-out date.');
    }

    // Çakışan rezervasyonları kontrol et
    const conflictingBooking = await Booking.findOne({
      roomId,
      checkInDate: { $lt: checkOut },
      checkOutDate: { $gt: checkIn },
    });

    return !conflictingBooking; // Eğer çakışma yoksa true döner
  } catch (error) {
    console.error('Error during room availability check:', error.message);
    throw new Error('An error occurred during room availability check.');
  }
};

module.exports = { isRoomAvailable };
