import axios from 'axios';

// Axios instance oluşturma
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend'in base URL'si
  withCredentials: false, // 
});

// Her isteğe Authorization Header ekleme
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
