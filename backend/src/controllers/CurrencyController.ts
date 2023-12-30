import { Request, Response } from "express";
import { CryptoCurrency, FiatCurrency } from "../types/Currencies";
import axiosInstance from "../utils/axiosInstance";

export class CurrencyController {
  static getCurrencies(req: Request, res: Response): Promise<void> {
    return Promise.all([
      axiosInstance.get("/v1/cryptocurrency/listings/latest", {
        params: { limit: 100 },
      }),
      axiosInstance.get("/v1/fiat/map", {
        params: { limit: 10 },
      }),
    ])
      .then(([cryptoResponse, fiatResponse]) => {

        const top100Currencies = cryptoResponse.data.data.map((currency:CryptoCurrency) => ({
          id: currency.id,
          symbol: currency.symbol,
          name: currency.name,
          slug: currency.slug,
        }));

        const topFiatCurrencies = fiatResponse.data.data.map((fiatCurrency:FiatCurrency) => ({
          id: fiatCurrency.id,
          symbol: fiatCurrency.symbol,
          name: fiatCurrency.name,
          sign: fiatCurrency.sign,
        }));

        const combinedCurrencies = {
          cryptocurrencies: top100Currencies,
          fiatCurrencies: topFiatCurrencies,
        };

        res.json(combinedCurrencies);
      })
      .catch((error) => {
        console.error("Error fetching data from CoinMarketCap API:", error);

        if (error instanceof Error && error.message) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      });
  }
}


