import bgHero from "../assets/bg-hero.svg";
import CurrencyConverterForm from "../components/CurrencyConverterForm";
import DropDown from "../components/DropDown";
import useCurrencyContext from "../hooks/useCurrencyContext";
import { DropdownType } from "../types/CurrencyContextType";


const Home = () => {
  // Accessing the currency context using a custom hook
  const currencyContext = useCurrencyContext();

  // Determining the type of dropdown based on the context
  let type: DropdownType = "source";

  if (currencyContext.dropdownType === "target") {
    type = "target";
  }


  return (
    <div
      // Main container
      className="w-full h-screen flex flex-wrap flex-col justify-center items-center bg-cover bg-no-repeat px-6 sm:px-1"
      style={{
        backgroundImage: `url(${bgHero})`
      }}
    >
      {/* Application title */}
      <h1 className="text-white text-3xl mb-3 font-bold text-center sm:text-7xl sm:mb-6">
        Currency <span className="text-[#8afadc]">Converter</span>
      </h1>
      
      {/* Application description */}
      <p className="text-[#c7deff] mb-12 text-xl text-center sm:text-2xl">
        Calculate cryptocurrency exchange rates
      </p>

      {/* Currency Converter Form component */}
      <CurrencyConverterForm />

      {/* Copyright notice */}
      <p className="text-white absolute bottom-0 w-full text-center bg-black/40 py-4 backdrop-blur-sm text-sm sm:text-base">
        DZap © 2023 | All rights reserved
      </p>

      {/* Rendering the dropdown component if it's open */}
      {currencyContext && currencyContext.isListOpen ? (
        <DropDown type={type} />
      ) : null}
    </div>
  );
};


export default Home;
