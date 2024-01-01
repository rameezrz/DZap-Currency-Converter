import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import useCurrencyContext from "../hooks/useCurrencyContext";
import { fetchCurrencies } from "../api/apiControllers";
import { CombinedCurrenciesResponse } from "../types/CurrencyType";
import { BaseCurrency } from "../types/CurrencyType";

type DropDownProps = {
  type: "source" | "target";
};

const DropDown = ({ type }: DropDownProps) => {
  const currencyContext = useCurrencyContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch currencies when component mounts or currencyContext changes
    const fetchData = async () => {
      try {
        const response = await fetchCurrencies();
        const currenciesData: CombinedCurrenciesResponse = response.data;
        if (currencyContext) {
          currencyContext.setCurrencies(currenciesData);
          setLoading(false);
        }
      } catch (error) {
        setError(error as Error);
      }
    };

    if (!currencyContext || !currencyContext.currencies) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [currencyContext]);

  const handleClose = () => {
    // Close the dropdown
    if (currencyContext) {
      currencyContext.setIsListOpen(false);
    }
  };

  const handleSelect = (currency: BaseCurrency) => {
    // Handle currency selection
    if (currencyContext) {
      if (type === "source") {
        currencyContext.setSourceCurrency(currency);
      } else if (type === "target") {
        currencyContext.setTargetCurrency(currency);
      }
    }
    handleClose();
  };

  const renderCurrencyList = (currencies: BaseCurrency[] | undefined) =>
    currencies?.map((currency) => (
      <li
        key={currency.id}
        className={`hover:bg-gray-100 px-3 py-2 flex cursor-pointer ${
          currency.symbol.toLowerCase().includes(searchValue) ||
          currency.name.toLowerCase().includes(searchValue)
            ? "block"
            : "hidden"
        }`}
        onClick={() => handleSelect(currency)}
      >
        <div>
          <img
            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`}
            className="w-10 mr-3 p-1"
            alt="coin-icon"
          />
        </div>
        <div className="flex flex-col justify-center ml-2">
          <p className="text-lg -mb-1">{currency.symbol}</p>
          <small className="text-gray-600">{currency.name}</small>
        </div>
      </li>
    ));

  if (loading) {
    // Show loading spinner while fetching currencies
    return (
      <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500 border-4"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[30rem] h-[40rem] bg-gray-50 rounded-2xl py-5 px-8">
        <div className="font-bold mb-5 flex justify-between">
          {/* Dropdown header */}
          <p>Convert {type === "source" ? "from" : "to"}</p>
          <button className="text-gray-500 text-2xl" onClick={handleClose}>
            <IoCloseOutline />
          </button>
        </div>
        <div className="relative mb-4">
          {/* Search input */}
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
          {/* Currency list */}
          <ul className="max-h-[29rem] mt-6 overflow-y-auto w-full">
            {type === "source" && (
              <>
                <p>Crypto</p>
                {renderCurrencyList(
                  currencyContext?.currencies?.cryptocurrencies
                )}
                <p className="mt-4">Fiat</p>
                {renderCurrencyList(
                  currencyContext?.currencies?.fiatCurrencies
                )}
              </>
            )}
            {type === "target" && (
              <>
                <p>Fiat</p>
                {renderCurrencyList(
                  currencyContext?.currencies?.fiatCurrencies
                )}
                <p className="mt-4">Crypto</p>
                {renderCurrencyList(
                  currencyContext?.currencies?.cryptocurrencies
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
