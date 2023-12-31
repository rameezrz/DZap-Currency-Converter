import { Dispatch, SetStateAction } from "react";

type CurrencyContextType = {
  sourceCurrency: string; // Adjust the type accordingly
  setSourceCurrency: Dispatch<SetStateAction<string>>; // Adjust the type accordingly
  targetCurrency: string; // Adjust the type accordingly
  setTargetCurrency: Dispatch<SetStateAction<string>>; // Adjust the type accordingly
  isListOpen: boolean;
  setIsListOpen: Dispatch<SetStateAction<boolean>>;
};

export default CurrencyContextType