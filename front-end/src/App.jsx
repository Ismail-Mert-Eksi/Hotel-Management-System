import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Header from './Components/Header';
import Footer from './Components/Footer';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import AvailableRooms from './pages/AvailableRooms';
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import Report from './pages/Report';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<AvailableRooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
