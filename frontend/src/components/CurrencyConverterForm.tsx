import { useEffect, useState } from "react";
import useCurrencyContext from "../hooks/useCurrencyContext";
import InputBox from "./InputBox";
import { AiOutlineSwap } from "react-icons/ai";
import { convertCurrency } from "../api/apiControllers";


const CurrencyConverterForm = () => {
  // State variables for input, error, converted amount, and loading status
  const [amount, setAmount] = useState<number>(0);
  const [isAmountError, setIsAmountError] = useState<boolean>(false);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  // Accessing currency context using a custom hook
  const currencyContext = useCurrencyContext();

  // Function to swap source and target currencies
  const swap = (e: React.FormEvent) => {
    e.preventDefault();
    currencyContext?.setSourceCurrency(currencyContext?.targetCurrency);
    currencyContext?.setTargetCurrency(currencyContext?.sourceCurrency);
    setAmount(0);
    setConvertedAmount(0);
  };

  // Function to handle form submission and currency conversion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate source currency, target currency, and amount
    if (
      !currencyContext?.sourceCurrency ||
      !currencyContext?.targetCurrency ||
      amount === 0
    ) {
      setIsAmountError(true);
      return;
    }

    // Set loading state to true during API call
    setLoading(true);

    try {
      // Call API to get the converted amount
      const response = await convertCurrency({
        sourceCurrency: currencyContext.sourceCurrency.symbol,
        targetCurrency: currencyContext.targetCurrency.symbol,
        amount,
      });

      // Format and set the converted amount
      const roundedAmount =
        parseFloat(response.data.data.price) >= 1
          ? parseFloat(response.data.data.price).toFixed(2)
          : parseFloat(response.data.data.price).toFixed(8);

      // Convert rounded amount back to a number
      const roundedAmountAsNumber =
        typeof roundedAmount === "string"
          ? parseFloat(roundedAmount)
          : roundedAmount;

      // Update state with the rounded amount
      setConvertedAmount(roundedAmountAsNumber);
    } catch (error) {
      // Handle error from the API
      console.error("Error converting currency:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  // Effect to clear amount error when amount is greater than 0
  useEffect(() => {
    if (amount > 0) {
      setIsAmountError(false);
    }
  }, [amount]);

  // Rendering the ConverterForm component
  return (
    <div className="w-full">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-1">
            {/* InputBox component for source currency */}
            <InputBox
              label="From"
              amount={amount}
              type="source"
              onChangeAmount={(amount) => setAmount(amount)}
            />
            {isAmountError && (
              <p className="text-red-500 bg-white my-2 px-3">
                Amount Required*
              </p>
            )}
          </div>
          <div className="relative w-full h-0.5">
            {/* Button to swap source and target currencies */}
            <button
              onClick={swap}
              className="text-3xl absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-[#44b496] text-[#000238] p-2 hover:rotate-90 scale-110 transition-all"
            >
              <AiOutlineSwap />
            </button>
          </div>
          <div className="w-full mb-3">
            {/* InputBox component for target currency */}
            <InputBox
              label="To"
              amount={convertedAmount} // Display the converted amount or default to 0
              amountDisabled
              type="target"
            />
          </div>
          {/* Button to initiate currency conversion */}
          <button
            className={`w-full bg-[#44b496] text-[#000238] font-bold text-lg px-4 py-3 rounded-lg transition-all hover:text-gray-300 hover:bg-[#0b2821]`}
            disabled={loading} // Disable the button while loading
          >
            {loading
              ? "Converting..."
              : `Convert ${currencyContext?.sourceCurrency.symbol} to ${currencyContext?.targetCurrency.symbol}`}
          </button>
        </form>
      </div>
    </div>
  );
};


export default CurrencyConverterForm;
