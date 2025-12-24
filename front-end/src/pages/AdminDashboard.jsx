import React, { useState, useEffect,useRef } from 'react';
import axios from '../api/axios';

const AdminDashboard = () => {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    roomNumber: '',
    type: '',
    price: '',
    capacity: '',
    isAvailable: true,
    features: '',
    imageUrls: '',
    description: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [editRoomId, setEditRoomId] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const roomsResponse = await axios.get('/rooms', { headers });
        setRooms(roomsResponse.data.data || []);

        const bookingsResponse = await axios.get('/bookings', { headers });
        setBookings(bookingsResponse.data.data || []);

        setLoading(false);
      } catch (err) {
        console.error('Error:', err.message);
        setError('An error occurred while loading data.');
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        features: formData.features.split(',').map((f) => f.trim()),
        imageUrls: formData.imageUrls.split(',').map((url) => url.trim()),
      };

      const response = await axios.post('/rooms', roomData, { headers });
      setRooms((prev) => [...prev, response.data.data]);
      setFormData({
        roomNumber: '',
        type: '',
        price: '',
        capacity: '',
        isAvailable: true,
        features: '',
        imageUrls: '',
        description: '',
      });
    } catch (err) {
      console.error('Error while adding room:', err.message);
      setError('An error occurred while adding the room.');
    }
  };

  const updateRoom = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };

      const roomData = {
        ...formData,
        price: parseFloat(formData.price),
        capacity: parseInt(formData.capacity),
        features: formData.features.split(',').map((f) => f.trim()),
        imageUrls: formData.imageUrls.split(',').map((url) => url.trim()),
      };

      const response = await axios.put(`/rooms/${editRoomId}`, roomData, { headers });
      setRooms((prev) =>
        prev.map((room) => (room._id === editRoomId ? response.data.data : room))
      );
      setFormData({
        roomNumber: '',
        type: '',
        price: '',
        capacity: '',
        isAvailable: true,
        features: '',
        imageUrls: '',
        description: '',
      });
      setEditMode(false);
      setEditRoomId(null);
    } catch (err) {
      console.error('Error while updating room:', err.message);
      setError('An error occurred while updating the room.');
    }
  };

  const handleEdit = (room) => {
    setEditMode(true);
    setEditRoomId(room._id);
    setFormData({
      roomNumber: room.roomNumber,
      type: room.type,
      price: room.price,
      capacity: room.capacity,
      isAvailable: room.isAvailable,
      features: room.features.join(', '),
      imageUrls: room.imageUrls.join(', '),
      description: room.description,
    });
    formRef.current.scrollIntoView({ behavior: 'smooth' })
  };

  const deleteRoom = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/rooms/${id}`, { headers });
      setRooms((prev) => prev.filter((room) => room._id !== id));
    } catch (err) {
      console.error('Error while deleting room:', err.message);
      setError('An error occurred while deleting the room.');
    }
  };

  const deleteBooking = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(`/bookings/${id}`, { headers });
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
    } catch (err) {
      console.error('Error while deleting reservation:', err.message);
      setError('An error occurred while deleting the reservation.');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-100">
    {/* Sol: Odalar ve Oda İşlemleri */}
    <div>
      <h1 className="text-2xl font-bold text-brown-700 mb-4">Rooms</h1>
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room._id} className="p-4 bg-gray-200 border rounded-lg">
            <div className="text-brown-700">
              <p>Room Number: {room.roomNumber}</p>
              <p>Type: {room.type}</p>
              <p>Price: ${room.price}</p>
              <p>Capacity: {room.capacity}</p>
              <p>Status: {room.isAvailable ? 'available' : 'not available'}</p>
              <p>Features: {room.features.join(', ')}</p>
              <p>Images: {room.imageUrls.join(', ')}</p>
              <p>Description: {room.description}</p>
            </div>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(room)}
                className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#C3A27A]"
              >
                Update
              </button>
              <button
                onClick={() => deleteRoom(room._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
  
      <div className="mt-6" ref={formRef}>
        <h2 className="text-xl font-semibold text-brown-700">{editMode ? 'Update Room' : 'Add New Room'}</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleInputChange}
            placeholder="Room Number"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded bg-white text-brown-700"
          >
            <option value="">Select Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <input
            type="text"
            name="features"
            value={formData.features}
            onChange={handleInputChange}
            placeholder="Properties (Comma Separated)"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <input
            type="text"
            name="imageUrls"
            value={formData.imageUrls}
            onChange={handleInputChange}
            placeholder="Image URLs (Comma Separated)"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            placeholder="Capacity"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 border rounded bg-white text-brown-700"
          />
          <button
            type="button"
            onClick={editMode ? updateRoom : addRoom}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {editMode ? 'Update' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  
    {/* Sağ: Rezervasyonlar */}
    <div>
      <h1 className="text-2xl font-bold text-brown-700 mb-4">Bookings</h1>
      <ul className="space-y-2">
        {bookings.map((booking) => (
          <li key={booking._id} className="p-4 bg-gray-200 border rounded-lg">
            <div className="text-brown-700">
              <p>
                <strong>Room Number:</strong> {booking.roomId?.roomNumber || 'Bilinmiyor'}
              </p>
              <p>
                <strong>Room Type:</strong> {booking.roomId?.type || 'Bilinmiyor'}
              </p>
              <p>
                <strong>Room Price:</strong> ${booking.roomId?.price || 'Bilinmiyor'} 
              </p>
              <p>
                <strong>Booked By:</strong> {booking.userId?.name || 'Bilinmiyor'} - {booking.userId?.email || ''}
              </p>
              <p>
                <strong>Tarih:</strong> {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteBooking(booking._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
  
  );
};

export default AdminDashboard;
