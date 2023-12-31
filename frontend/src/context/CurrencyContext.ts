import { createContext } from "react";
import CurrencyContextType from "../types/CurrencyContextType";

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export default CurrencyContext;
