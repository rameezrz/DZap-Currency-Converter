import { useEffect, useState } from "react";
import { convertCurrency } from "../api/apiControllers";
import {
  ConversionResult,
  ConvertCurrencyRequest,
} from "../types/ConvertCurrency";

const useCurrencyConverter = ({
  sourceCurrency,
  targetCurrency,
  amount,
}: ConvertCurrencyRequest) => {
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const convert = async () => {
      try {
        const response = await convertCurrency({
          sourceCurrency,
          targetCurrency,
          amount,
        });
        setResult(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    convert();
  }, []);

  return { result, loading, error };
};

export default useCurrencyConverter;
