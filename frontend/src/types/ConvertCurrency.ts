export type ConvertCurrencyRequest = {
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
};

export type ConversionResult = {
  price:number;
  last_updated:string;
}

export type CurrencyConverterHookResult = {
  loading: boolean;
  error: Error | null;
  convertCurrency: (request: ConvertCurrencyRequest) => Promise<void>;
  conversionResult: ConversionResult;
};
