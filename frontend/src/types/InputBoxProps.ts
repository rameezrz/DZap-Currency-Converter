type InputBoxProps = {
  label: "From" | "To";
  amount: number;
  type: "source" | "target";
  amountDisabled?: boolean;
  onChangeAmount?: (newAmount: number) => void;
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
