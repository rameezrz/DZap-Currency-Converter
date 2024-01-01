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
  const [selectedCurrency, setSelectedCurrency] = useState<BaseCurrency>();
  const id = useId();

  const currencyContext = useCurrencyContext();


  useEffect(() => {
    if (currencyContext) {
      if (label === "From") {
        setSelectedCurrency(currencyContext.sourceCurrency);
      } else if (label === "To") {
        setSelectedCurrency(currencyContext.targetCurrency);
      }
    }
  }, [currencyContext]);

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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleListType();
  };

  console.log(amount);

  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {label}
        </label>
        <input
          id={id}
          type="text" // Change type to text to allow float input
          className="text-2xl text-slate-700 outline-none w-full bg-transparent py-1.5"
          placeholder="0"
          disabled={amountDisabled}
          value={amount === null ? "" : amount.toString()} // Use toString to format the number
          onChange={(e) => {
            const newValue = e.target.value;

            // Allow only digits, one decimal point, and optional minus sign
            const sanitizedValue = newValue.replace(/[^0-9.-]/g, "");

            // Replace leading zeros if any
            const formattedValue = sanitizedValue.replace(/^0+/, "0");

            // Prevent multiple leading zeros and limit one decimal point
            const regex = /^(-?\d*\.?\d{0,2})/;
            const matched = formattedValue.match(regex);

            const newAmount = matched ? matched[0] : null;

            onChangeAmount &&
              onChangeAmount(newAmount !== null ? parseFloat(newAmount) : 0);
          }}
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right relative">
        <p className="text-black/40 mb-2 w-full">Currency Type</p>
        <div className="custom-dropdown-container bg-gray-200 px-2 py-1 rounded-lg">
          <button
            className="custom-dropdown-toggle flex justify-center items-center gap-2 py-2 font-medium"
            onClick={(e) => handleClick(e)}
          >
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
