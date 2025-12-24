const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['single', 'double', 'suite'], // Oda türü
  },
  price: {
    type: Number,
    required: true, // Fiyat bilgisi
  },
  capacity: {
    type: Number,
    required: true, // Maksimum kişi sayısı
  },
  isAvailable: {
    type: Boolean,
    default: true, // Oda uygunluk durumu
  },
  features: {
    type: [String], // Örnek: ['wifi', 'air conditioning', 'balcony']
    default: [],
  },
  imageUrls: {
    type: [String], // Resim URL'leri
    default: [],
  },
  description: {
    type: String,
    required: true
  },
  
 
  createdAt: {
    type: Date,
    default: Date.now, // Oluşturulma tarihi
  },
});



module.exports = mongoose.model('Room', roomSchema);
