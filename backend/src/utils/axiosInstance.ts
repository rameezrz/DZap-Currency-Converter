import axios, { AxiosInstance } from "axios";

const baseConfig = {
  headers: {
    "X-CMC_PRO_API_KEY": "1a2a7c57-a358-40fa-be36-6bbd190f2927",
  },
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  ...baseConfig,
});


export default axiosInstance;
