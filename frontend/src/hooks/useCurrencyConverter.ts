// import { useEffect, useState } from "react";
// import { convertCurrency } from "../api/apiControllers";
// import {
//   ConversionResult,
//   ConvertCurrencyRequest,
// } from "../types/ConvertCurrency";

// // Custom hook for handling currency conversion
// const useCurrencyConverter = ({
//   sourceCurrency,
//   targetCurrency,
//   amount,
// }: ConvertCurrencyRequest) => {
//   // State to store the conversion result
//   const [result, setResult] = useState<ConversionResult | null>(null);

//   // State to track loading status during the API call
//   const [loading, setLoading] = useState(true);

//   // State to capture any errors during the API call
//   const [error, setError] = useState<Error | null>(null);

//   // Effect to initiate the currency conversion when the component mounts
//   useEffect(() => {
//     const convert = async () => {
//       try {
//         // Call the API to perform the currency conversion
//         const response = await convertCurrency({
//           sourceCurrency,
//           targetCurrency,
//           amount,
//         });

//         // Update the state with the conversion result
//         setResult(response.data);
//       } catch (error) {
//         // Capture and store any errors that occur during the API call
//         setError(error as Error);
//       } finally {
//         // Set loading to false regardless of success or failure
//         setLoading(false);
//       }
//     };

//     // Initiate the currency conversion when the component mounts
//     convert();
//   }, []); // Dependency array is empty to trigger the effect only once when the component mounts

//   // Return the result, loading status, and any errors for consumption by the component
//   return { result, loading, error };
// };

// export default useCurrencyConverter;

import { useEffect, useState } from "react";
import { convertCurrency } from "../api/apiControllers";
import {
  ConversionResult,
  ConvertCurrencyRequest,
} from "../types/ConvertCurrency";

// Function to format the converted amount
const formatAmount = (amount: number) => {
  return amount >= 1 ? amount.toFixed(2) : amount.toFixed(8);
};

// Custom hook for handling currency conversion
const useCurrencyConverter = ({
  sourceCurrency,
  targetCurrency,
  amount,
}: ConvertCurrencyRequest) => {
  // State to store the formatted converted amount
  const [formattedAmount, setFormattedAmount] = useState<string>("");

  // State to store the conversion result
  const [result, setResult] = useState<ConversionResult | null>(null);

  // State to track loading status during the API call
  const [loading, setLoading] = useState(true);

  // State to capture any errors during the API call
  const [error, setError] = useState<Error | null>(null);

  // Effect to initiate the currency conversion when the component mounts
  useEffect(() => {
    const convert = async () => {
      try {
        // Call the API to perform the currency conversion
        const response = await convertCurrency({
          sourceCurrency,
          targetCurrency,
          amount,
        });

        // Update the state with the conversion result
        setResult(response.data);

        // Format and set the converted amount
        const formatted = formatAmount(parseFloat(response.data.price));
        setFormattedAmount(formatted);
      } catch (error) {
        // Capture and store any errors that occur during the API call
        setError(error as Error);
      } finally {
        // Set loading to false regardless of success or failure
        setLoading(false);
      }
    };

    // Initiate the currency conversion when the component mounts
    convert();
  }, []); // Dependency array is empty to trigger the effect only once when the component mounts

  // Return the formatted amount, result, loading status, and any errors for consumption by the component
  return { formattedAmount, result, loading, error };
};

export default useCurrencyConverter;

