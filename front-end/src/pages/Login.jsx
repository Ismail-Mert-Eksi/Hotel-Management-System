import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import axios from '../api/axios';

const Login = () => {
  const { setIsLoggedIn, setUserName, setIsAdmin } = useContext(UserContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/users/login', formData);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setIsLoggedIn(true);
      setUserName(user.name);
      setIsAdmin(user.role === 'admin');

      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-brown-700 text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-brown-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-white text-brown-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-brown-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-white text-brown-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 ${loading ? 'bg-[#C3A27A]' : 'bg-[#D2B48C]'} text-white rounded-lg hover:bg-[#C3A27A] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]`}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
