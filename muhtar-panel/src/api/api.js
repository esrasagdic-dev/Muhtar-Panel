import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://localhost:7034/api'  // Yayın (Babanın PC) sürümü
        : 'https://localhost:7034/api', // Geliştirme sürümü
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;