const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Rotalar
const roomRoutes = require('./routes/roomRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();

const app = express();

// Middleware'ler
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' })); // Dinamik CORS
app.use(morgan('dev')); // Logging için

// Rota Tanımları
app.use('/api/rooms', roomRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/rooms', roomRoutes);

// Hata Yönetimi Middleware'i
app.use(errorHandler);

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
