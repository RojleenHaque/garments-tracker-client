import axios from "axios";

const api = axios.create({
  baseURL: "https://garments-tracker-server.onrender.com",
  withCredentials: true,
});

export default api;