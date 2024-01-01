import bgHero from "../assets/bg-hero.svg";
import ConverterForm from "../components/ConverterFormNew";
import DropDown from "../components/DropDown";
import useCurrencyContext from "../hooks/useCurrencyContext";
import { DropdownType } from "../types/CurrencyContextType";

const Home = () => {
  const currencyContext = useCurrencyContext();
  let type: DropdownType = "source";

  if (currencyContext.dropdownType === "target") {
    type = "target";
  }
  return (
    <div
      className="w-full h-screen flex flex-wrap flex-col justify-center items-center bg-cover bg-no-repeat px-6 sm:px-1"
      style={{
        backgroundImage: `url(${bgHero})`
      }}
    >
      <h1 className="text-white text-3xl mb-3 font-bold  text-center sm:text-7xl sm:mb-6">
        Currency <span className="text-[#8afadc]">Converter</span>
      </h1>
      <p className="text-[#c7deff] mb-12 text-xl text-center sm:text-2xl ">
        Calculate cryptocurrency exchange rates
      </p>
      <ConverterForm />
      <p className="text-white absolute bottom-0 w-full text-center bg-black/40 py-4 backdrop-blur-sm text-sm sm:text-base">
        DZap © 2023 | All rights reserved
      </p>
      {currencyContext && currencyContext.isListOpen ? (
        <DropDown type={type} />
      ) : null}
    </div>
  );
};

export default Home;
