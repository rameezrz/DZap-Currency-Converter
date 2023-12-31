import { FormEvent, useContext, useEffect, useState } from "react";
import InputBox from "./InputBoxNew";
import useCurrencies from "../hooks/useCurrencies";
import { convertCurrency } from "../api/apiControllers";
import CurrencyContext from "../context/CurrencyContext";

const ConverterForm = () => {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("btc");
  const [toCurrency, setToCurrency] = useState<string>("usd");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyContext = useContext(CurrencyContext)

  useEffect(()=>{
    if(currencyContext){
      setFromCurrency(currencyContext.sourceCurrency)
      setToCurrency(currencyContext.targetCurrency)
    }
  },[])


  const { currencies } = useCurrencies();
  const crypto = currencies ? currencies.cryptocurrencies : [];


  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);

    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = async () => {
    const result = await convertCurrency({sourceCurrency:fromCurrency, targetCurrency:toCurrency, amount})
    console.log(result.data, "Converted Result");
    const {price, last_updated} = result.data
    setConvertedAmount(price)
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="w-full ">
      <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
        <form onSubmit={handleSubmit}>
          <div className="w-full mb-1">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={crypto}
              onCurrencyChange={(currency) => setFromCurrency(currency)}
              onAmountChange={(amount) => setAmount(amount)}
              selectedCurrency={fromCurrency}
            />
          </div>
          <div className="relative w-full h-0.5">
            <button
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-[#44b496] text-[#000238] px-2 py-0.5"
              onClick={swap}
            >
              Swap
            </button>
          </div>
          <div className="w-full mb-3">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={crypto}
              onCurrencyChange={(currency) => setToCurrency(currency)}
              selectedCurrency={toCurrency}
              amountDisabled
            />
          </div>
          <button
            type="submit"
            onClick={convert}
            className="w-full bg-[#44b496] text-[#000238] font-bold text-lg px-4 py-3 rounded-lg"
          >
            Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConverterForm;
