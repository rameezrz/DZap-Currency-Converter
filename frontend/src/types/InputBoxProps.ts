type InputBoxProps = {
  label: string;
  amount: number;
  type: "source" | "target";
  onAmountChange?: (amount: number) => void;
  onCurrencyChange?: (currency: string) => void;
  currencyOptions?: CryptoCurrency[];
  selectedCurrency?: string;
  amountDisabled?: boolean;
  currencyDisabled?: boolean;
  className?: string;
};

type BaseCurrency = {
  id: number;
  symbol: string;
  name: string;
};

export type CryptoCurrency = BaseCurrency & {
  slug: string;
};

export type FiatCurrency = BaseCurrency & {
  sign: string;
};

export type CombinedCurrenciesResponse = {
  cryptocurrencies: CryptoCurrency[];
  fiatCurrencies: FiatCurrency[];
};

export default InputBoxProps;
