import { ConvertCurrencyRequest } from "../types/ConvertCurrency";
import { axiosInstance } from "./axiosInstance";

export const fetchCurrencies = () => {
  return axiosInstance.get("/currencies");
};

export const convertCurrency = async ({
  sourceCurrency,
  targetCurrency,
  amount,
}: ConvertCurrencyRequest) => {
  const response = await axiosInstance.get("/convert-currency", {
    params: {
      sourceCurrency,
      targetCurrency,
      amount,
    },
  });
  return response;
};
