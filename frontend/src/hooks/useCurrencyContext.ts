import { useContext } from "react";
import CurrencyContext from "../context/CurrencyContext";
import CurrencyContextType from "../types/CurrencyContextType";

const useCurrencyContext = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);

  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyContextProvider"
    );
  }

  return context;
};

export default useCurrencyContext;
