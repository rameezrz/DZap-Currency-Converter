type BaseCurrency = {
  id: number;
  symbol: string;
  name: string;
};

export type CryptoCurrency = BaseCurrency &{
  slug: string;
};

export type FiatCurrency = BaseCurrency & {
  sign: string;
};