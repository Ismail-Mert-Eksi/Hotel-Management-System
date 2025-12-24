import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-[#D2B48C] mb-4">404</h1>
      <p className="text-xl text-brown-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="bg-[#D2B48C] text-white py-2 px-4 rounded-lg hover:bg-[#C3A27A] transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
