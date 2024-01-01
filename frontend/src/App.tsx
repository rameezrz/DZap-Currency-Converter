import "./App.css";
import Home from "./pages/Home";
import CurrencyContextProvider from "./context/CurrencyContextProvider";


function App() {
  return (
    // Wrapping the entire application with CurrencyContextProvider to provide currency context to components
    <CurrencyContextProvider>
      <Home />
    </CurrencyContextProvider>
  );
}


export default App;
