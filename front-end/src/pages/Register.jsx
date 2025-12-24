import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',       // Boş string başlangıç değeri
        email: '',      // Boş string başlangıç değeri
        password: ''    // Boş string başlangıç değeri
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', formData);
            if (response.data.success) {
                alert('Registration successful!');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md bg-gray-200 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-brown-700 text-center mb-6">Register</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-brown-700 mb-2">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 bg-white text-brown-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-500"
                    required
                />
            </div>
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
                className="w-full p-3 bg-[#D2B48C] text-white rounded-lg hover:bg-[#C3A27A] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]">
                Register
            </button>
        </form>
    </div>
</div>

    );
};

export default Register;
