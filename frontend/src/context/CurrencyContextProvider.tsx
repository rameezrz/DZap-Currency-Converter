import { ReactNode, useState } from "react";
import CurrencyContext from "./CurrencyContext";
import CurrencyContextType,{DropdownType} from "../types/CurrencyContextType";


const CurrencyContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sourceCurrency, setSourceCurrency] = useState<string>("xrp");
  const [targetCurrency, setTargetCurrency] = useState<string>("sol");
  const [isListOpen, setIsListOpen] = useState<boolean>(false)
  const [dropdownType, setDropdownType] = useState<DropdownType>("source");

  const contextValue: CurrencyContextType = {
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    isListOpen, 
    setIsListOpen,
    dropdownType,
    setDropdownType
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyContextProvider;
