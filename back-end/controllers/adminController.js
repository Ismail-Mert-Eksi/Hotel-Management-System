const Booking = require('../models/Booking');
const Room = require('../models/Room');

const getOccupancyReport = async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const bookedRooms = (await Booking.distinct('roomId')).length;
    const occupancyRate = (bookedRooms / totalRooms) * 100;

    res.status(200).json({ success: true, data: { totalRooms, bookedRooms, occupancyRate } });
  } catch (error) {
    console.error('Error while getting occupancy rate report:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving the report.' });
  }
};

const getRevenueReport = async (req, res) => {
  try {
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalPrice' } } },
    ]);

    res.status(200).json({ success: true, data: totalRevenue[0]?.totalRevenue || 0 });
  } catch (error) {
    console.error('Error while getting income report:', error.message);
    res.status(500).json({ success: false, message: 'An error occurred while retrieving the report.' });
  }
};

module.exports = { getOccupancyReport, getRevenueReport };
