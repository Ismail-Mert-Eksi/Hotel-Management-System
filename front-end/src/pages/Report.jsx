import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const Reports = () => {
  const [occupancyReport, setOccupancyReport] = useState(null);
  const [revenueReport, setRevenueReport] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOccupancyReport = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const response = await axios.get('/admin/reports/occupancy', { headers });
        setOccupancyReport(response.data.data);
      } catch (err) {
        console.error('Error while getting occupancy rate report:', err.message);
        setError('Occupancy rate report could not be obtained.');
      }
    };

    fetchOccupancyReport();
  }, []);

  const fetchRevenueReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const response = await axios.get('/admin/reports/revenue', { headers });
      setRevenueReport(response.data.data);
    } catch (err) {
      console.error('Error while getting income report:', err.message);
      setError('Income report could not be obtained.');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-100">
  <h1 className="text-2xl font-bold text-brown-700 mb-6">Reports</h1>

  {/* Doluluk Oranı Raporu */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-brown-700">Occupancy Rate</h2>
    {occupancyReport ? (
      <div className="p-4 bg-gray-200 border rounded-lg shadow">
        <p className="text-brown-700"><strong>Total Rooms:</strong> {occupancyReport.totalRooms}</p>
        <p className="text-brown-700"><strong>Occupied Rooms:</strong> {occupancyReport.bookedRooms}</p>
        <p className="text-brown-700"><strong>Occupancy Rate:</strong> {occupancyReport.occupancyRate.toFixed(2)}%</p>
      </div>
    ) : (
      <p className="text-brown-700">Loading occupancy rate...</p>
    )}
  </div>

  {/* Gelir Raporu */}
  <div className="mb-6">
    <h2 className="text-xl font-semibold text-brown-700">Income Report</h2>
    <button
      onClick={fetchRevenueReport}
      className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#C3A27A]"
    >
      View Income
    </button>
    {revenueReport !== null && (
      <div className="mt-4 p-4 bg-gray-200 border rounded-lg shadow">
        <p className="text-brown-700"><strong>Total Income:</strong> ${revenueReport} </p>
      </div>
    )}
  </div>

  {error && <p className="text-red-500">{error}</p>}
</div>

  );
};

export default Reports;
