import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const RoomDetails = () => {
  const { id } = useParams(); // URL'deki ID'yi al
  const navigate = useNavigate(); // Sayfa yönlendirme için
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (room?.imageUrls) {
      setImageUrls(room.imageUrls);
    }
  }, [room]);

  // Fotoğrafların otomatik geçişi için
  useEffect(() => {
    if (imageUrls.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % imageUrls.length
        );
      }, 5000); // 5 saniyede bir geçiş
      return () => clearInterval(interval); // Cleanup
    }
  }, [imageUrls]);


  

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`/rooms/${id}`);
        setRoom(response.data.room); // Doğru formatta ayarlandı
        setLoading(false);
      } catch (err) {
        setError('Room information could not be loaded.');
        setLoading(false);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleReservation = async () => {
    if (!checkInDate || !checkOutDate || guestCount < 1) {
      setError('Please fill in all fields.');
      return;
    }
    

    if (new Date(checkInDate) < new Date()) {
      setError('Entry date cannot be earlier than today.');
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError('The exit date cannot be earlier than the entry date.');
      return;
    }

    try {
      await axios.post(`/bookings`, {
        roomId: id,
        checkInDate,
        checkOutDate,
        guestCount,
      });
      setSuccess('Reservation completed successfully!');
      navigate('/my-bookings'); // Rezervasyon sonrası yönlendirme
    } catch (err) {
      setError('An error occurred during your reservation.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % imageUrls.length
    );
  };

  // room null ise bir kontrol ekleyin
  if (!room) {
    return <div>Room details not available.</div>;
  }
  return (
    <div className="container mx-auto p-8 flex flex-wrap md:flex-nowrap gap-8 items-start">
  {/* Left Side: Room Details */}
<div className="flex-1 flex flex-col gap-8">
  {/* Fotoğraf Slideshow */}
  <div className="relative w-full">
    {imageUrls.length > 0 ? (
      <img
        src={imageUrls[currentImageIndex]}
        alt={`Room Image ${currentImageIndex + 1}`}
        className="w-full h-auto rounded-lg shadow-md"
        style={{ maxHeight: '400px' }}  />
    ) : (
      <p className="text-brown-700">No images available.</p>
    )}
    <button
      onClick={handlePrevious}
      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-[#D2B48C] text-white px-4 py-2 rounded-full hover:bg-[#C3A27A]"
    >
      &lt;
    </button>
    <button
      onClick={handleNext}
      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-[#D2B48C] text-white px-4 py-2 rounded-full hover:bg-[#C3A27A]"
    >
      &gt;
    </button>
  </div>

  {/* Oda Bilgileri */}
  <div className="w-full bg-gray-200 p-6 rounded-lg shadow-md text-left">
    <h1 className="text-3xl font-bold text-brown-700 mb-4">{room.roomNumber}</h1>
    <p className="text-lg text-brown-700 mb-2">Type: {room.type}</p>
    <p className="text-lg text-brown-700 mb-2">Description: {room.description}</p>
    <p className="text-lg text-brown-700 mb-2">Price:  ${room.price} </p>
    <p className="text-lg text-brown-700 mb-2">Capacity: {room.capacity} persons</p>
  </div>
</div>

{/* Right Side: Reservation Form */}
<div
  className="w-full md:w-1/3 p-4 bg-gray-200 border rounded-lg shadow-lg space-y-4"
  style={{ alignSelf: 'flex-start' }} // Üst hizalamayı sağlamak için eklendi
>
  <h2 className="text-xl font-semibold text-center text-brown-700">Booking</h2>
  <form className="space-y-4">
    <div>
      <label htmlFor="checkInDate" className="block font-medium text-brown-700">Check In Date</label>
      <input
        type="date"
        id="checkInDate"
        value={checkInDate}
        onChange={(e) => setCheckInDate(e.target.value)}
        className="w-full p-2 border rounded bg-white text-brown-700"
        min={new Date().toISOString().split('T')[0]} // Minimum bugünün tarihi
      />
    </div>
    <div>
      <label htmlFor="checkOutDate" className="block font-medium text-brown-700">Check Out Date</label>
      <input
        type="date"
        id="checkOutDate"
        value={checkOutDate}
        onChange={(e) => setCheckOutDate(e.target.value)}
        className="w-full p-2 border rounded bg-white text-brown-700"
        min={checkInDate || new Date().toISOString().split('T')[0]} // Minimum giriş tarihi
      />
    </div>
    <div>
      <label htmlFor="guestCount" className="block font-medium text-brown-700">Persons</label>
      <input
        type="number"
        id="guestCount"
        value={guestCount}
        onChange={(e) => setGuestCount(e.target.value)}
        className="w-full p-2 border rounded bg-white text-brown-700"
        min="1"
      />
    </div>
    <button
      type="button"
      onClick={handleReservation}
      className="bg-[#D2B48C] text-white px-4 py-2 rounded hover:bg-[#C3A27A]"
    >
      Booking
    </button>
  </form>

  {success && <div className="text-green-500 mt-4">{success}</div>}
</div>
</div>

  );
};

export default RoomDetails;
