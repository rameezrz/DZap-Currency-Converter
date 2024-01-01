import { useContext } from "react";
import CurrencyContext from "../context/CurrencyContext";
import CurrencyContextType from "../types/CurrencyContextType";

// Custom hook for accessing the CurrencyContext
const useCurrencyContext = (): CurrencyContextType => {
  // Retrieve context from React context provider
  const context = useContext(CurrencyContext);

  // Throw an error if the context is not found
  if (!context) {
    throw new Error(
      "useCurrencyContext must be used within a CurrencyContextProvider"
    );
  }

  return context;
};

export default useCurrencyContext;
