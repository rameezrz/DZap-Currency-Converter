// import { ReactNode, useState } from "react";
// import CurrencyContext from "./CurrencyContext";
// import CurrencyContextType, {
//   DropdownType,
// } from "../types/CurrencyContextType";
// import { BaseCurrency } from "../types/CurrencyType";

// const initialValue: BaseCurrency[] = [
//   {
//     id: 1,
//     symbol: "BTC",
//     name: "Bitcoin",
//   },
//   {
//     id: 2781,
//     symbol: "USD",
//     name: "United States Dollar",
//   },
// ];

// const CurrencyContextProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [sourceCurrency, setSourceCurrency] = useState<BaseCurrency>(
//     initialValue[0]
//   );
//   const [targetCurrency, setTargetCurrency] = useState<BaseCurrency>(
//     initialValue[1]
//   );
//   const [isListOpen, setIsListOpen] = useState<boolean>(false);
//   const [dropdownType, setDropdownType] = useState<DropdownType>("source");

//   const contextValue: CurrencyContextType = {
//     sourceCurrency,
//     setSourceCurrency,
//     targetCurrency,
//     setTargetCurrency,
//     isListOpen,
//     setIsListOpen,
//     dropdownType,
//     setDropdownType,
//   };

//   return (
//     <CurrencyContext.Provider value={contextValue}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export default CurrencyContextProvider;

import { ReactNode, useEffect, useState } from 'react';
import CurrencyContext from './CurrencyContext';
import CurrencyContextType, { DropdownType } from '../types/CurrencyContextType';
import { BaseCurrency } from '../types/CurrencyType';
import { fetchCurrencies } from '../api/apiControllers';
import { CombinedCurrenciesResponse } from '../types/InputBoxProps';

const CurrencyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sourceCurrency, setSourceCurrency] = useState<BaseCurrency>({
    id: 1,
    symbol: 'BTC',
    name: 'Bitcoin',
  });
  const [targetCurrency, setTargetCurrency] = useState<BaseCurrency>({
    id: 2781,
    symbol: 'USD',
    name: 'United States Dollar',
  });
  const [isListOpen, setIsListOpen] = useState<boolean>(false);
  const [dropdownType, setDropdownType] = useState<DropdownType>('source');
  const [currencies, setCurrencies] = useState<CombinedCurrenciesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCurrencies();
        setCurrencies(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (!currencies) {
      fetchData();
    }
  }, [currencies]);

  const contextValue: CurrencyContextType = {
    sourceCurrency,
    setSourceCurrency,
    targetCurrency,
    setTargetCurrency,
    isListOpen,
    setIsListOpen,
    dropdownType,
    setDropdownType,
    currencies,
    setCurrencies,
    loading,
    error,
  };

  return <CurrencyContext.Provider value={contextValue}>{children}</CurrencyContext.Provider>;
};

export default CurrencyContextProvider;

