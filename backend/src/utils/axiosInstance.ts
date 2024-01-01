require('dotenv').config();
import axios, { AxiosInstance } from "axios";

const baseConfig = {
  headers: {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
  },
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.CMC_BASE_URL,
  ...baseConfig,
});


export default axiosInstance;
