import axios from "axios";

const BASE_URL = "https://asset-register-6i7e.onrender.com/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
