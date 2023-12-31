import { useContext } from "react";
import bgHero from "../assets/bg-hero.svg";
import ConverterForm from "../components/ConverterForm";
import DropDown from "../components/DropDown";
import CurrencyContext from "../context/CurrencyContext";
import { DropdownType } from "../types/CurrencyContextType";

const Home = () => {
  const currencyContext = useContext(CurrencyContext)
  let type: DropdownType = "source"; 

  if (currencyContext) {
    type = currencyContext?.dropdownType === "target" ? "target" : "source";
  }
  return (
    <div
      className="w-full h-screen flex flex-wrap flex-col justify-center items-center bg-cover bg-no-repeat px-6 sm:px-1"
      style={{
        backgroundImage: `url(${bgHero})`,
      }}
    >
      
      <h1 className="text-white text-3xl mb-3 font-bold  text-center sm:text-7xl sm:mb-6">
        Currency <span className="text-[#8afadc]">Converter</span>
      </h1>
      <p className="text-[#c7deff] mb-12 text-xl text-center sm:text-2xl ">Calculate cryptocurrency exchange rates</p>
      <ConverterForm />
      <p className="text-white absolute bottom-0 w-full text-center bg-black/40 py-4 backdrop-blur-sm text-sm sm:text-base">DZap © 2023 | All rights reserved</p>
      {currencyContext?.isListOpen ? (<DropDown type={type}/>) : null}
      
    </div>
  );
};

export default Home;
