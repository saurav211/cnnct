import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log('Request:', config); // Add logging
    return config;
  },
  (error) => {
    console.error('Request error:', error); // Add logging
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response); // Add logging
    return response;
  },
  (error) => {
    console.error('Response error:', error); // Add logging
    if (error.response.status === 401) {
      localStorage.removeItem('token');
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
