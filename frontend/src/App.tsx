import "./App.css";
import Home from "./pages/Home";
import CurrencyContextProvider from "./context/CurrencyContextProvider";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    // To catch all the errors in the entire application 
    <ErrorBoundary>
      {/* Wrapping the entire application with CurrencyContextProvider
       to provide currency context to components */}
      <CurrencyContextProvider>
        <Home />
      </CurrencyContextProvider>
    </ErrorBoundary>
  );
}

export default App;
