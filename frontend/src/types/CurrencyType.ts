export type BaseCurrency = {
  id: number;
  symbol: string;
  name: string;
  slug?: string;
  sign?: string;
};

export type CryptoCurrency = {
  id: number;
  symbol: string;
  name: string;
  slug: string;
};

export type FiatCurrency = {
  id: number;
  symbol: string;
  name: string;
  sign: string;
};
