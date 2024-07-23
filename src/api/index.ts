import axios from 'axios';

const api = axios.create({
  baseURL: 'https://back-simulation-orm-production.up.railway.app/api',
  withCredentials: true,
});

export default api;
