import { useState, FormEvent } from "react";
import "./App.css";
import bgHero from "./assets/bg-hero.svg"
import useCurrencyInfo from "./utils/hooks/useCurrencyInfo";
import { InputBox } from "./components/index";
import CurrencyInfo from "./types/UseCurrencyInfo";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("usd");
  const [toCurrency, setToCurrency] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo: CurrencyInfo = useCurrencyInfo(fromCurrency);
  const options: string[] = Object.keys(currencyInfo);

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  };

  

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[toCurrency]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${bgHero})`,
      }}
    >
      <h1 className="text-white text-7xl font-bold mb-12">Currency <span className="text-[#8afadc]">Converter</span></h1>
      <div className="w-full ">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form onSubmit={handleSubmit}>
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFromCurrency(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={fromCurrency}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-3">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToCurrency(currency)}
                selectedCurrency={toCurrency}
                amountDisabled
              />
            </div>
            <button
              type="submit"
              onClick={convert}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {fromCurrency.toUpperCase()} to {toCurrency.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
