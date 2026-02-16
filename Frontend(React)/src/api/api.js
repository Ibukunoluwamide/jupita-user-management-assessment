import axios from 'axios';

// Create an Axios instance with base URL and default headers
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Base URL from environment variables
  headers: {
    'Content-Type': 'application/json', 
    'Accept': 'application/json',      
  },
});

// Add a request interceptor to attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; 
  }
  return config;
});

export default api;
