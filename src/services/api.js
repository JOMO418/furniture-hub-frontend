import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - Add token to all requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle responses and errors
api.interceptors.response.use(
  (response) => {
    // Return the data directly for convenience
    return response.data;
  },
  (error) => {
    // Extract error message
    const message = error.response?.data?.error?.message || 'Something went wrong';
    const statusCode = error.response?.data?.error?.statusCode || 500;
    
    // Handle 401 errors (unauthorized)
    if (statusCode === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    // Return formatted error
    return Promise.reject({
      message,
      statusCode,
      details: error.response?.data?.error?.details || []
    });
  }
);

export default api;
