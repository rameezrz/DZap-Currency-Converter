import express from "express";
import { router } from "./routes";
require("dotenv").config();
import axios, { AxiosResponse } from "axios";

interface CryptoData {
  symbol: string;
  quote: {
    USD: {
      price: number;
    };
  };
}

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/api", router);

const apiKey = process.env.CMC_API_KEY;

app.get('/api/currencies', async (req, res) => {
    try {
      const response: AxiosResponse<{ data: { id: number; symbol: string; name: string; slug:string }[] }> = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        {
          params: {
            limit: 100,
          },
          headers: {
            'X-CMC_PRO_API_KEY': apiKey,
          },
        }
      );
  
      const top100Currencies = response.data.data.map((currency) => ({
        id: currency.id,
        symbol: currency.symbol,
        name: currency.name,
        slug: currency.slug
      }));
      
  
      res.json(top100Currencies);
    } catch (error) {
      console.error('Error fetching data from CoinMarketCap API:', error);
  
      if (error instanceof Error && error.message) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
