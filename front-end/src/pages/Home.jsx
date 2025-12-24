import React from 'react';
import { Link } from 'react-router-dom';
import havuz from "../assets/image/havuz.jpg";
import spa from "../assets/image/spa.jpg";
import restoran from "../assets/image/restoran.jpg";
import konferans from "../assets/image/konferans.jpg";
import single from "../assets/image/Single.webp";
import double from "../assets/image/Double.webp";
import suite from "../assets/image/Suite.webp";
const Home = () => {
  
  return (
    <div className="bg-gray-100 text-brown-700 min-h-screen">

  {/* Hero Section */}
  <section
    className="relative w-full h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('https://i.pinimg.com/originals/1c/de/3c/1cde3c63f77453e1e7a985049aa37f4f.png')" }}
  >
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="relative z-10 container mx-auto flex items-center justify-center h-full text-center">
      <div className="text-center py-24">
        <h1 className="text-5xl font-bold text-white">Welcome to Nursiso Hotel</h1>
        <p className="text-xl text-white mt-7">A luxury experience, tailored just for you</p>
        <Link
          to="/rooms"
          className="mt-6 inline-block bg-[#D2B48C] text-white text-lg px-6 py-3 rounded-lg hover:bg-[#C3A27A]"
        >
          Book Now
        </Link>
      </div>
    </div>
  </section>

  {/* About Us */}
  <section className="container mx-auto py-20 text-center">
    <h2 className="text-3xl font-bold mb-4">About Our Hotel</h2>
    <p className="text-lg text-brown-700 mb-6">
      At Nursiso Hotel, we offer luxurious rooms, top-notch amenities, and
      world-class service to make your stay unforgettable. Located in the heart
      of the city, we provide easy access to all the local attractions and
      business districts.
    </p>
    
  </section>

  {/* Room Options */}
  <section className="bg-gray-200 py-20">
    <div className="container mx-auto text-center">
      <h2 className="text-3xl font-bold mb-6">Our Rooms</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold">Single Room</h3>
          <p className="text-lg text-brown-700">Comfortable and cozy with all necessary amenities</p>
          <p className="text-xl font-bold mt-4 text-brown-700">$100/night</p>
          <img src={single} alt="Single" className="rounded-lg shadow-md" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold">Double Room</h3>
          <p className="text-lg text-brown-700">A spacious room with a beautiful city view</p>
          <p className="text-xl font-bold mt-4 text-brown-700">$200/night</p>
          <img src={double} alt="Double" className="rounded-lg shadow-md" />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-2xl font-semibold">Suite Room</h3>
          <p className="text-lg text-brown-700">A luxurious suite with premium features</p>
          <p className="text-xl font-bold mt-4 text-brown-700">$300/night</p>
          <img src={suite} alt="Suite" className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  </section>

  {/* Features */}
  <section className="container mx-auto py-20 text-center">
    <h2 className="text-3xl font-bold mb-6">Our Features</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
      <div className="flex flex-col items-center">
        <i className="fas fa-swimming-pool text-4xl text-[#D2B48C] mb-4"></i>
        <p className="text-lg font-semibold mb-4">Swimming Pool</p>
        <img src={havuz} alt="Havuz" className="rounded-lg shadow-md" />
      </div>
      <div className="flex flex-col items-center">
        <i className="fas fa-spa text-4xl text-[#D2B48C] mb-4"></i>
        <p className="text-lg font-semibold mb-4">Spa Services</p>
        <img src={spa} alt="Spa" className="rounded-lg shadow-md" />
      </div>
      <div className="flex flex-col items-center">
        <i className="fas fa-utensils text-4xl text-[#D2B48C] mb-4"></i>
        <p className="text-lg font-semibold mb-4">Restaurant</p>
        <img src={restoran} alt="Restoran" className="rounded-lg shadow-md" />
      </div>
      <div className="flex flex-col items-center">
        <i className="fas fa-cogs text-4xl text-[#D2B48C] mb-4"></i>
        <p className="text-lg font-semibold mb-4">Conference Rooms</p>
        <img src={konferans} alt="Konferans" className="rounded-lg shadow-md" />
      </div>
    </div>
  </section>

</div>

  );
};

export default Home;
