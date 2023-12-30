import { useEffect, useState } from "react";
import CurrencyInfo from "../../types/UseCurrencyInfo";


const useCurrencyInfo = (currency: string) => {
  const [data, setData] = useState<CurrencyInfo>({});

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res: { [key: string]: CurrencyInfo }) => setData(res[currency]));
  }, [currency]);

  console.log(data);

  return data;
};

export default useCurrencyInfo;
