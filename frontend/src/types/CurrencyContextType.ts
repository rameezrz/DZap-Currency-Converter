import { Dispatch, SetStateAction } from "react";
import { BaseCurrency } from "./CurrencyType";
import { CombinedCurrenciesResponse } from "./InputBoxProps";

export type DropdownType = "source" | "target";

type CurrencyContextType = {
  sourceCurrency: BaseCurrency;
  setSourceCurrency: Dispatch<SetStateAction<BaseCurrency>>;
  targetCurrency: BaseCurrency;
  setTargetCurrency: Dispatch<SetStateAction<BaseCurrency>>;
  isListOpen: boolean;
  setIsListOpen: Dispatch<SetStateAction<boolean>>;
  dropdownType: DropdownType;
  setDropdownType: Dispatch<SetStateAction<DropdownType>>;
  currencies: CombinedCurrenciesResponse | null; 
  setCurrencies : Dispatch<SetStateAction<CombinedCurrenciesResponse | null>>
  loading: boolean; 
  error: Error | null;
};

export default CurrencyContextType;
