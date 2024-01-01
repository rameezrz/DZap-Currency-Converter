// import { useState } from "react";
// import useCurrencyContext from "../hooks/useCurrencyContext";
// import InputBox from "./InputBoxNew2";
// import { AiOutlineSwap } from "react-icons/ai";

// const ConverterForm = () => {
//   const [amount, setAmount] = useState<number>(0)
//   const [convertedAmount, setConvertedAmount] = useState<number>(0);

//   const currencyContext = useCurrencyContext();

//   const swap = ()=>{
//     currencyContext?.setSourceCurrency(currencyContext?.targetCurrency)
//     currencyContext?.setTargetCurrency(currencyContext?.sourceCurrency)
//     setAmount(0)
//     setConvertedAmount(0)
//   }

//   return (
//     <div className="w-full ">
//       <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
//         <form onSubmit={(e)=>e.preventDefault()}>
//           <div className="w-full mb-1">
//             <InputBox
//               label="From"
//               amount={amount}
//               type="source"
//               onChangeAmount={(amount) => setAmount(amount)}
//             />
//           </div>
//           <div className="relative w-full h-0.5">
//             <button
//             onClick={swap}
//               className="text-3xl absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-[#44b496] text-[#000238] p-2 hover:rotate-90 scale-110 transition-all"
//             >
//               <AiOutlineSwap />
//             </button>
//           </div>
//           <div className="w-full mb-3">
//             <InputBox
//               label="To"
//               amount={convertedAmount}
//               amountDisabled
//               type="target"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-[#44b496] text-[#000238] font-bold text-lg px-4 py-3 rounded-lg transition-all hover:text-gray-300 hover:bg-[#0b2821] "
//           >
//             Convert {currencyContext?.sourceCurrency.symbol} to {currencyContext?.targetCurrency.symbol}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ConverterForm;

import { useEffect, useState } from "react";
import useCurrencyContext from "../hooks/useCurrencyContext";
import InputBox from "./InputBoxNew2";
import { AiOutlineSwap } from "react-icons/ai";
import { convertCurrency } from "../api/apiControllers";

const ConverterForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [isAmountError, setIsAmountError] = useState<boolean>(false);
  const [convertedAmount, setConvertedAmount] = useState<number>(0); // Store the converted amount
  const [loading, setLoading] = useState<boolean>(false);

  const currencyContext = useCurrencyContext();

  const swap = (e: React.FormEvent) => {
    e.preventDefault();
    currencyContext?.setSourceCurrency(currencyContext?.targetCurrency);
    currencyContext?.setTargetCurrency(currencyContext?.sourceCurrency);
    setAmount(0);
    setConvertedAmount(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !currencyContext?.sourceCurrency ||
      !currencyContext?.targetCurrency ||
      amount === 0
    ) {
      setIsAmountError(true);
      return;
    }
    setLoading(true);

    try {
      // Call your API to get the converted amount
      const response = await convertCurrency({
        sourceCurrency: currencyContext.sourceCurrency.symbol,
        targetCurrency: currencyContext.targetCurrency.symbol,
        amount,
      });

      console.log(response.data, "API Response");

      const roundedAmount =
        parseFloat(response.data.price) >= 1
          ? parseFloat(response.data.price).toFixed(2)
          : parseFloat(response.data.price).toFixed(8);

      // Convert the rounded amount back to a number
      const roundedAmountAsNumber =
        typeof roundedAmount === "string"
          ? parseFloat(roundedAmount)
          : roundedAmount;

      // Update the state with the rounded amount
      setConvertedAmount(roundedAmountAsNumber);
    } catch (error) {
      // Handle error from the API
      console.error("Error converting currency:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    if (amount > 0) {
      setIsAmountError(false);
    }
  }, [amount]);

  return (
    <div className="w-full ">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-1">
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
            <button
              onClick={swap}
              className="text-3xl absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-full bg-[#44b496] text-[#000238] p-2 hover:rotate-90 scale-110 transition-all"
            >
              <AiOutlineSwap />
            </button>
          </div>
          <div className="w-full mb-3">
            <InputBox
              label="To"
              amount={convertedAmount} // Display the converted amount or default to 0
              amountDisabled
              type="target"
            />
          </div>
          <button
            className={`w-full bg-[#44b496] text-[#000238] font-bold text-lg px-4 py-3 rounded-lg transition-all hover:text-gray-300 hover:bg-[#0b2821]  `}
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

export default ConverterForm;
