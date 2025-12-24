import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  

  useEffect(() => {
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Token'i logla
      if (!token) throw new Error('Token not found.');

      const response = await axios.get('/bookings/bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('API Response:', response.data); // Gelen yanıtı kontrol et
      setBookings(response.data.bookings);
      setLoading(false);
    } catch (err) {
      console.error('Error:', err.message); // Hata mesajını logla
      setError('An error occurred while loading reservations.');
      setLoading(false);
    }
  };

  fetchBookings();
}, []);


  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found.');
      }

      await axios.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Rezervasyonu iptal et
      setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
    } catch (err) {
      console.error('Error while canceling reservation:', err.message); 
      setError('The reservation could not be cancelled.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 bg-gray-100">
  <h1 className="text-2xl font-bold text-brown-700 mb-4">My Bookings</h1>
  {bookings.length === 0 ? (
    <p className="text-brown-700">You don't have a booking yet.</p>
  ) : (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <li key={booking._id} className="p-4 bg-gray-200 border rounded-lg">
          <div className="text-brown-700">
            <p><strong>Room Number:</strong> {booking.roomId?.roomNumber || 'Bilinmiyor'}</p>
            <p><strong>Room Type:</strong> {booking.roomId?.type || 'Bilinmiyor'}</p>
            <p><strong>Room Price:</strong> {booking.roomId?.price || 'Bilinmiyor'} TL</p>
            <p><strong>Booked by:</strong> {booking.userId?.name || 'Bilinmiyor'}</p>
            <p><strong>Date Range:</strong> {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}</p>
          </div>
          <button
            onClick={() => cancelBooking(booking._id)}
            className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#C3A27A] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
          >
            Cancel
          </button>
        </li>
      ))}
    </div>
  )}
</div>

  );
};

export default MyBookings;
