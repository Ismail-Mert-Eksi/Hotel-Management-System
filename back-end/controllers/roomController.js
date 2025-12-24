const Room = require('../models/Room');
const Booking = require('../models/Booking');
const { validationResult } = require('express-validator');


// Tüm odaları getir
const getRooms = async (req, res) => {
  try {
    const { type, isAvailable } = req.query; // Filtreleme parametreleri
    const query = {};

    if (type) query.type = type;
    if (isAvailable !== undefined) query.isAvailable = isAvailable === 'true';

    const rooms = await Room.find(query);
    res.status(200).json({ success: true, data: rooms });
  } catch (error) {
    console.error('Error while getting rooms:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving rooms.' });
  }
};



const getAvailableRooms = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, roomType } = req.query;

    // Tarih aralıkları zorunlu
    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ success: false, message: 'Check-in and check-out dates are required.' });
    }

    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);

    // Çakışan rezervasyonları bul
    const conflictingBookings = await Booking.find({
      checkInDate: { $lt: endDate }, // Yeni check-out tarihinden önce başlayan rezervasyonlar
      checkOutDate: { $gt: startDate }, // Yeni check-in tarihinden sonra biten rezervasyonlar
    }).distinct('roomId');

    // Çakışmayan odaları bul ve oda tipine göre filtrele
    const query = { _id: { $nin: conflictingBookings } };
    if (roomType && roomType !== 'all') {
      query.type = roomType;
    }

    const availableRooms = await Room.find(query);

    res.status(200).json({ success: true, data: availableRooms });
  } catch (error) {
    console.error('Error fetching available rooms:', error.message);
    res.status(500).json({ success: false, message: 'Rooms could not be fetched.' });
  }
};




// Yeni oda ekle
const createRoom = async (req, res) => {
  // Validasyon hatalarını kontrol et
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { roomNumber, type, price, capacity, features, imageUrls, description } = req.body;

  try {
    // Oda mevcut mu kontrol et
    const existingRoom = await Room.findOne({ roomNumber });
    if (existingRoom) {
      return res.status(400).json({ success: false, message: 'This room number already exists.' });
    }

    // Yeni oda oluştur
    const room = new Room({
      roomNumber,
      type,
      price,
      capacity,
      features: features || [],
      imageUrls: imageUrls || [],
      description, // Description alanını ekledik
    });

    await room.save();
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    console.error('Error while adding room:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while adding the room.' });
  }
};


// Oda güncelle
const updateRoom = async (req, res) => {
  // Validasyon hatalarını kontrol et
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { id } = req.params;
  const { type, price, capacity, isAvailable, features, imageUrls, description } = req.body;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'No room found.' });
    }

    // Güncellemeleri uygula
    if (type) room.type = type;
    if (price) room.price = price;
    if (capacity) room.capacity = capacity;
    if (isAvailable !== undefined) room.isAvailable = isAvailable;
    if (features) room.features = features;
    if (imageUrls) room.imageUrls = imageUrls;
    if (description) room.description = description; // Description güncelleme eklendi

    await room.save();
    res.status(200).json({ success: true, data: room });
  } catch (error) {
    console.error('Error while updating room:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while updating the room.' });
  }
};


// Oda sil
const deleteRoom = async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findById(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'No room found.' });
    }

    // Odayı sil
    await Room.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Room deleted successfully.' });
  } catch (error) {
    console.error('Error while deleting room:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while deleting the room.' });
  }
};


module.exports = { getRooms, createRoom, updateRoom, deleteRoom, getAvailableRooms };
