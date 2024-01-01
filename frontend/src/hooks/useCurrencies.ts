// import { useEffect, useState } from 'react';
// import { fetchCurrencies } from '../api/apiControllers';
// import { CombinedCurrenciesResponse } from '../types/InputBoxProps';

// const useCurrencies = () => {
//   const [currencies, setCurrencies] = useState<CombinedCurrenciesResponse | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetchCurrencies();
//         setCurrencies(response.data);
//       } catch (error) {
//         setError(error as Error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   return { currencies, loading, error };
// };

// export default useCurrencies;

// useCurrencies.tsx
import { useEffect, useState } from 'react';
import { fetchCurrencies } from '../api/apiControllers';
import { CombinedCurrenciesResponse } from '../types/InputBoxProps';

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<CombinedCurrenciesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCurrencies();
        setCurrencies(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    if (!currencies) {
      fetchData();
    }
  }, []);

  return { currencies, loading, error };
};

export default useCurrencies;


