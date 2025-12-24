import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
  const { isLoggedIn, isAdmin, userName, setIsLoggedIn, setUserName, setIsAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserName('');
    navigate('/login');
  };

  return (
    <header className="bg-[#D2B48C] text-white p-4 flex justify-between items-center">
      {/* Sol taraf: Otel İsmi */}
      <h1 className="text-2xl font-bold">Nursiso Hotel</h1>

      {/* Orta: Sayfa Linkleri */}
      <nav className="flex space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/rooms" className="hover:underline">Available Rooms</Link>
        {!isAdmin && isLoggedIn && (
          <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
        )}
        {isAdmin && <Link to="/admin-dashboard" className="hover:underline">Admin Dashboard</Link>}
        {isAdmin && <Link to="/report" className="hover:underline">Reports</Link>}
      </nav>

      {/* Sağ taraf: Kullanıcı Durumu */}
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <>
            <span className="font-medium">{userName}</span>
            <button onClick={handleLogout} className="hover:underline">Logout</button>
            
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
