const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tarih validasyonu: checkOutDate, checkInDate'den önce olmalı
bookingSchema.pre('save', function (next) {
  if (this.checkOutDate <= this.checkInDate) {
    return next(new Error('Check-out date cannot be earlier than check-in date.'));
  }
  next();
});

bookingSchema.index({ userId: 1, roomId: 1 }); // Kullanıcı ve oda için indeks

module.exports = mongoose.model('Booking', bookingSchema);
