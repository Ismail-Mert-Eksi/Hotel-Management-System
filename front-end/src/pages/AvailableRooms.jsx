import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const AvailableRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [originalRooms, setOriginalRooms] = useState([]);
    const [filter, setFilter] = useState({
        roomType: 'all',
        checkInDate: '',
        checkOutDate: '',
        minPrice: '',
        maxPrice: '',
        persons: 1
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Yükleme durumu
    const navigate = useNavigate();

    // Odaları Fetch Etme
    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/rooms');
                setRooms(response.data.data); // Beklenen format: { success: true, data: [...] }
                setOriginalRooms(response.data.data);
                setError('');
            } catch (err) {
                setError('Failed to fetch rooms. Please try again later.');
            } finally {
                setLoading(false);
            }
            console.log('Filtered Rooms:', rooms);
        };

        fetchRooms();
    }, []);

    // Filtre Değişikliklerini Yönetme
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    // Fiyat ve Tarih Doğrulama
    const validateFilters = () => {
        const { checkInDate, checkOutDate } = filter;
      
        if (!checkInDate || !checkOutDate) {
          setError('Check-in and check-out dates are required.');
          return false;
        }
      
        setError('');
        return true;
      };
      
      
    

    // Filtreleme İşlemi
    const handleSearch = async () => {
        try {
          setLoading(true);
          
          const response = await axios.get('/rooms/available', {
            params: {
              checkInDate: filter.checkInDate,
              checkOutDate: filter.checkOutDate,
              roomType: filter.roomType,
            },
          }
          
        
        );
      
          setRooms(response.data.data); // Gelen odaları listele
          setError('');
        } catch (err) {
          console.error('Rooms fetch error:', err.message);
          setError('Failed to fetch available rooms.');
        } finally {
          setLoading(false);
        }

      };
      
      
    

    return (
        <div className="min-h-screen bg-gray-100 flex">
   {/* Sol Filtreleme Bölümü */}
   <div className="w-1/5 bg-gray-200 p-4 shadow-md">
        <h2 className="text-lg font-bold text-brown-700 mb-3">Search</h2>
        <div className="mb-3">
            <label className="block text-sm font-medium text-brown-700">Room Type</label>
            <select
                name="roomType"
                value={filter.roomType}
                onChange={handleFilterChange}
                className="w-full px-3 py-1.5 border rounded-lg bg-white text-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
            >
                <option value="all">All Rooms</option>
                <option value="single">Single</option>
                <option value="double">Double</option>
                <option value="suite">Suite</option>
            </select>
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium text-brown-700">Check In Date</label>
            <input
                type="date"
                name="checkInDate"
                value={filter.checkInDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-1.5 border rounded-lg bg-white text-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                min={new Date().toISOString().split('T')[0]}
            />
        </div>
        <div className="mb-3">
            <label className="block text-sm font-medium text-brown-700">Check Out Date</label>
            <input
                type="date"
                name="checkOutDate"
                value={filter.checkOutDate}
                onChange={handleFilterChange}
                className="w-full px-3 py-1.5 border rounded-lg bg-white text-brown-700 focus:outline-none focus:ring-2 focus:ring-brown-500"
                min={filter.checkInDate || new Date().toISOString().split('T')[0]}
            />
        </div>
        
        
        
        <button
            onClick={handleSearch}
            className="w-full px-3 py-1.5 text-white bg-[#D2B48C] rounded-lg hover:bg-[#C3A27A] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
        >
            Search
        </button>
    </div>


    {/* Sağ Oda Listeleme Bölümü */}
    <div className="w-3/4 p-6">
  <h2 className="text-2xl font-bold text-brown-700 mb-6">Available Rooms</h2>
  {error && <p className="text-red-500 mb-4">{error}</p>}
  {loading ? (
    <p className="text-brown-700">Loading rooms...</p>
  ) : (
    <div className="flex flex-col gap-8">
      {rooms.length > 0 ? (
        rooms.map((room) => (
          <div
            key={room._id}
            className="bg-gray-200 p-6 rounded-lg shadow-md flex"
          >
            {/* Sol: Oda Fotoğrafı */}
            <div className="w-1/3">
              <img
                src={room.imageUrls[0] || 'default-image-url.jpg'}
                alt={room.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Sağ: Oda Bilgileri */}
            <div className="w-2/3 pl-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-brown-700 mb-4">
                  {room.name}
                </h3>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Room Number:</strong> {room.roomNumber}
                </p>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Room Type:</strong> {room.type}
                </p>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Price:</strong> ${room.price}
                </p>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Capacity:</strong> {room.capacity} persons
                </p>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Features:</strong> {room.features.join(', ')}
                </p>
                <p className="text-lg text-brown-700 mb-2">
                  <strong>Description:</strong> {room.description}
                </p>
              </div>

              <button
                onClick={() => navigate(`/room/${room._id}`)}
                className="mt-6 px-6 py-3 text-white bg-[#D2B48C] rounded-lg hover:bg-[#C3A27A] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
              >
                View Room Details
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-lg text-brown-700">
          No rooms available for the selected criteria.
        </p>
      )}
    </div>
  )}
</div>



</div>


    );
};

export default AvailableRooms;
