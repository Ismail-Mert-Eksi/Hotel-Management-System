const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const { getOccupancyReport, getRevenueReport } = require('../controllers/adminController');
const router = express.Router();

router.get('/reports/occupancy', protect, admin, getOccupancyReport);
router.get('/reports/revenue', protect, admin, getRevenueReport);

module.exports = router;
