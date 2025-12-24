import axios from 'axios';

const api = axios.create({
  baseURL: 'https://garments-tracker-server-cgog.vercel.app',
  withCredentials: true, // if you use cookies for auth
});

export default api;


