import "./App.css";
import Home from "./pages/Home";
import CurrencyContextProvider from "./context/CurrencyContextProvider";

function App() {
  return(
    <CurrencyContextProvider>
      <Home />
    </CurrencyContextProvider>
  )
    
}

export default App;
