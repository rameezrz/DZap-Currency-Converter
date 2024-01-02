import React, { useEffect, useId, useState } from "react";
import InputBoxProps from "../types/InputBoxProps";
import { BiChevronDown } from "react-icons/bi";
import { BaseCurrency } from "../types/CurrencyType";
import useCurrencyContext from "../hooks/useCurrencyContext";

const InputBox: React.FC<InputBoxProps> = ({
  label,
  amount,
  onChangeAmount,
  amountDisabled = false,
}) => {
  // State for the selected currency and generating a unique ID
  const [selectedCurrency, setSelectedCurrency] = useState<BaseCurrency>();
  const id = useId();

  // Accessing currency context using a custom hook
  const currencyContext = useCurrencyContext();

  // useEffect to update the selected currency based on the label
  useEffect(() => {
    if (currencyContext) {
      if (label === "From") {
        setSelectedCurrency(currencyContext.sourceCurrency);
      } else if (label === "To") {
        setSelectedCurrency(currencyContext.targetCurrency);
      }
    }
  }, [currencyContext, label]);

  // Function to handle dropdown type and visibility
  const handleListType = () => {
    if (currencyContext) {
      if (label === "From") {
        currencyContext.setDropdownType("source");
      } else if (label === "To") {
        currencyContext.setDropdownType("target");
      }
      currencyContext.setIsListOpen(!currencyContext.isListOpen);
    }
  };

  // Function to handle button click and prevent propagation
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleListType();
  };

  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        {/* Label for the input */}
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        {/* Input field for amount */}
        <input
          id={id}
          type="number"
          className="text-2xl text-slate-700 outline-none w-full bg-transparent py-1.5"
          placeholder="0"
          disabled={amountDisabled}
          value={amount === 0 ? "" : amount} // Use toString to format the number
          onChange={(e) => {
            const newValue = e.target.value;

            // Callback to the parent component with the new amount
            onChangeAmount && onChangeAmount(Number(newValue));
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right relative">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        {/* Dropdown container for selecting currency */}
        <div className="custom-dropdown-container bg-gray-200 px-2 py-1 rounded-lg">
          <button
            className="custom-dropdown-toggle flex justify-center items-center gap-2 py-2 font-medium"
            onClick={(e) => handleClick(e)}
          >
            {/* Displaying selected currency information */}
            <img
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${selectedCurrency?.id}.png`}
              className="w-6"
              alt=""
            />
            {selectedCurrency?.symbol.toUpperCase()}
            <BiChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
