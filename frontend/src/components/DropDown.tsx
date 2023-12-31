import { useEffect, useState, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import { data2 } from "../utils/data";
import CurrencyContext from "../context/CurrencyContext";
import { CryptoCurrency, FiatCurrency } from "../types/CurrencyType";

type DropDownProps = {
  type: 'source' | 'target';
};

const DropDown = ({ type = 'target' }: DropDownProps) => {
  const [cryptocurrencies, setCryptoCurrencies] = useState<CryptoCurrency[]>([]);
  const [fiatcurrencies, setFiatCurrencies] = useState<FiatCurrency[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedCurrency, setSelectedCurrency] = useState("");

  useEffect(() => {
    const cryptocurrencies: CryptoCurrency[] = data2.cryptocurrencies;
    const fiatcurrencies: FiatCurrency[] = data2.fiatCurrencies;
    setCryptoCurrencies(cryptocurrencies);
    setFiatCurrencies(fiatcurrencies);
  }, []);

  const handleSelect = (currency: string) => {
    setSelectedCurrency(currency);
  };

  const currencyContext = useContext(CurrencyContext);

  useEffect(() => {
    // This useEffect will be triggered whenever selectedCurrency changes
    if (currencyContext) {
      // Check the type prop to determine whether to update source or target currency
      if (type === 'source') {
        currencyContext.setSourceCurrency(selectedCurrency);
      } else if (type === 'target') {
        currencyContext.setTargetCurrency(selectedCurrency);
      }
    }
  }, [selectedCurrency, type, currencyContext]);

  const handleClose = () => {
    // Update the isListOpen state in the global context
    if (currencyContext) {
      currencyContext.setIsListOpen(false);
    }
  };

  // Conditionally render the component based on the value of isListOpen
  return currencyContext?.isListOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[30rem] h-[40rem] bg-gray-50 rounded-2xl py-5 px-8">
        <div className="font-bold mb-5 flex justify-between">
          <p>Convert from</p>
          <button className="text-gray-500 text-2xl" onClick={handleClose}>
            <IoCloseOutline />
          </button>
        </div>
        <div className="relative mb-4">
          <div className="absolute top-1/2 -translate-y-1/2 mx-4">
            <AiOutlineSearch size={22} />
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchValue}
            className="w-full h-14 bg-gray-200 rounded-lg pl-12"
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
        </div>
        <div>
          <ul className="max-h-[29rem] mt-6 overflow-y-auto w-full">
            <p>Fiat</p>
            {fiatcurrencies.map((fiat) => (
              <li
                key={fiat.id}
                className={`hover:bg-gray-100 px-3 py-2 flex cursor-pointer ${
                  fiat?.name?.toLowerCase().startsWith(searchValue) ? "block" : "hidden"
                }`}
                onClick={() => handleSelect(fiat.symbol)}
              >
                <div>
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${fiat.id}.png`}
                    className="w-10 mr-3 p-1"
                    alt="coin-icon"
                  />
                </div>
                <div className="flex flex-col justify-center ml-2">
                  <p className="text-lg -mb-1">{fiat.symbol}</p>
                  <small className="text-gray-600">{fiat.name}</small>
                </div>
              </li>
            ))}

            <p className="mt-4">Crypto</p>
            {cryptocurrencies.map((crypto) => (
              <li
                key={crypto.id}
                className={`hover:bg-gray-100 px-3 py-2 flex cursor-pointer ${
                  crypto?.name?.toLowerCase().startsWith(searchValue) ? "block" : "hidden"
                }`}
                onClick={() => handleSelect(crypto.symbol)}
              >
                <div>
                  <img
                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${crypto.id}.png`}
                    className="w-10 mr-3 p-1"
                    alt="coin-icon"
                  />
                </div>
                <div className="flex flex-col justify-center ml-2">
                  <p className="text-lg -mb-1">{crypto.symbol}</p>
                  <small className="text-gray-600">{crypto.name}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  ) : null;
};

export default DropDown;

