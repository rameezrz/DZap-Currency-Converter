import { Dispatch, SetStateAction } from "react";

export type DropdownType = "source" | "target";

type CurrencyContextType = {
  sourceCurrency: string;
  setSourceCurrency: Dispatch<SetStateAction<string>>;
  targetCurrency: string;
  setTargetCurrency: Dispatch<SetStateAction<string>>;
  isListOpen: boolean;
  setIsListOpen: Dispatch<SetStateAction<boolean>>;
  dropdownType: DropdownType;
  setDropdownType: Dispatch<SetStateAction<DropdownType>>;
};

export default CurrencyContextType;
