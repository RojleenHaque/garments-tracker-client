import axios from "axios";

const api = axios.create({
  baseURL: "https://garments-tracker-server-zeta.vercel.app",
  withCredentials: true,
});

export default api;