import { createContext } from "react";
import CurrencyContextType from "../types/CurrencyContextType";

// Creating a React context for managing currency-related state
const CurrencyContext = createContext<CurrencyContextType | null>(null);

export default CurrencyContext;
