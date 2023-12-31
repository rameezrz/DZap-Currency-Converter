// import { useId } from "react";
// import InputBoxProps,{ CryptoCurrency} from "../types/InputBoxProps";

// const InputBox: React.FC<InputBoxProps> = ({
//   label,
//   amount,
//   onAmountChange,
//   onCurrencyChange,
//   currencyOptions = [],
//   selectedCurrency = "USD",
//   amountDisabled = false,
//   currencyDisabled = false,
//   className = "",
// }) => {
//   const id = useId();
//   return (
//     <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
//       <div className="w-1/2">
//         <label htmlFor={id} className="text-black/40 mb-2 inline-block">
//           {label}
//         </label>
//         <input
//           id={id}
//           type="number"
//           className="outline-none w-full bg-transparent py-1.5"
//           placeholder="0"
//           disabled={amountDisabled}
//           value={amount === null ? '' : amount.toString()} 
//           onChange={(e) => {
//             const newValue = e.target.value;
//             const newAmount = newValue === '' ? null : Number(newValue); // Use null for empty value
//             onAmountChange && onAmountChange(newAmount !== null ? newAmount : 0); // Provide a default value if newAmount is null
//           }}
//         />
//       </div>
//       <div className="w-1/2 flex flex-wrap justify-end text-right">
//         <p className="text-black/40 mb-2 w-full">Currency Type</p>
//         <select
//           className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
//           value={selectedCurrency}
//           onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
//           disabled={currencyDisabled}
//         >
//           {currencyOptions.map((currency:CryptoCurrency) => (
//             <option key={currency.id} value={currency.symbol}>
//               {currency.symbol.toUpperCase()}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default InputBox;

import React,{useState} from "react";
import { useId } from "react";
import InputBoxProps from "../types/InputBoxProps";
import {BiChevronDown} from "react-icons/bi"

const InputBox: React.FC<InputBoxProps> = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "USD",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) => {
  const id = useId();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className={`bg-white p-3 rounded-lg text-sm flex ${className}`}>
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="outline-none w-full bg-transparent py-1.5"
          placeholder="0"
          disabled={amountDisabled}
          value={amount === null ? "" : amount.toString()}
          onChange={(e) => {
            const newValue = e.target.value;
            const newAmount =
              newValue === "" ? null : Number(newValue); // Use null for empty value
            onAmountChange &&
              onAmountChange(newAmount !== null ? newAmount : 0); // Provide a default value if newAmount is null
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right relative">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <div className="custom-dropdown-container bg-gray-200 px-2 py-1 rounded-lg">
          <button
            className="custom-dropdown-toggle flex items-center gap-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedCurrency.toUpperCase()}
            <BiChevronDown size={18}/>
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default InputBox;

