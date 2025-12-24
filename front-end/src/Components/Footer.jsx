import React from "react";
import facebookIcon from "../assets/icons/facebook-icon.svg";
import twitterIcon from "../assets/icons/twitter-icon.svg";
import instagramIcon from "../assets/icons/instagram-icon.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-brown-700 py-10 mt-10">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-lg font-bold mb-4">About Us</h4>
          <p className="text-sm">
            Welcome to Nursiso Hotel, your perfect getaway destination. Enjoy a relaxing stay with premium services.
          </p>
        </div>

        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-bold mb-4">Contact Us</h4>
          <ul className="text-sm space-y-2">
            <li>Phone: +90 537 225 05 61</li>
            <li>Email: info@nursisohotel.com</li>
            <li>Address: Ankara/Yenimahalle Yeni Batı mah. 5402.Sok </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-4">Quick Links</h4>
          <ul className="text-sm space-y-2">
            <li><a href="/" className="hover:text-[#D2B48C]">Home</a></li>
            <li><a href="/rooms" className="hover:text-[#D2B48C]">Room Availability</a></li>
            <li><a href="/my-bookings" className="hover:text-[#D2B48C]">My Bookings</a></li>
            
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="text-lg font-bold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={facebookIcon} alt="Facebook" className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twitterIcon} alt="Twitter" className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-sm text-gray-600 mt-10">
        © 2024 Nursiso Hotel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
