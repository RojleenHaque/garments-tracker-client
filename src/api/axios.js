import axios from 'axios';

const api = axios.create({
  baseURL: 'https://garments-tracker-server-3cwzf4fnc-rojleens-projects.vercel.app',
  withCredentials: true, // 🔴 THIS is the key fix
});

export default api;
