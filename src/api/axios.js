import axios from "axios";

const api = axios.create({
  baseURL: "https://garments-tracker-server-hl9x.vercel.app",
  withCredentials: true,
});

export default api;