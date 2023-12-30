type InputBoxProps = {
  label: string;
  amount: number;
  onAmountChange?: (amount: number) => void;
  onCurrencyChange?: (currency: string) => void;
  currencyOptions?: string[];
  selectedCurrency?: string;
  amountDisabled?: boolean;
  currencyDisabled?: boolean;
  className?: string;
};

export default InputBoxProps;
