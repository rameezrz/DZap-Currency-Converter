import { Request, Response } from "express";
import {
  CryptoCurrency,
  FiatCurrency,
  CombinedCurrenciesResponse,
} from "../types/Currencies";
import axiosInstance from "../utils/axiosInstance";
import { handleError } from "../utils/errorHandling";

export class CurrencyController {
  static async getCurrencies(req: Request, res: Response): Promise<void> {
    return Promise.all([
      axiosInstance.get("/v1/cryptocurrency/listings/latest", {
        params: { limit: 100 },
      }),
      axiosInstance.get("/v1/fiat/map", {
        params: { limit: 10 },
      }),
    ])
      .then(([cryptoResponse, fiatResponse]) => {
        const top100Currencies = cryptoResponse.data.data.map(
          (currency: CryptoCurrency) => ({
            id: currency.id,
            symbol: currency.symbol,
            name: currency.name,
            slug: currency.slug,
          })
        );

        const topFiatCurrencies = fiatResponse.data.data.map(
          (fiatCurrency: FiatCurrency) => ({
            id: fiatCurrency.id,
            symbol: fiatCurrency.symbol,
            name: fiatCurrency.name,
            sign: fiatCurrency.sign,
          })
        );

        const combinedCurrencies: CombinedCurrenciesResponse = {
          cryptocurrencies: top100Currencies,
          fiatCurrencies: topFiatCurrencies,
        };

        res.json(combinedCurrencies);
      })
      .catch((error) => {
        handleError(res, error);
      });
  }

  static async convertCurrency(req: Request, res: Response) {
    try {
      const { sourceCurrency, amount } = req.query;
      const targetCurrency: string = req.query.targetCurrency as string;

      if (!sourceCurrency || !amount || !targetCurrency) {
        return res.status(400).json({ error: "Invalid Parameters" });
      }

      const exchangeRateResponse = await axiosInstance.get(
        "/v2/tools/price-conversion",
        {
          params: {
            amount,
            id: sourceCurrency,
            convert: targetCurrency,
          },
        }
      );

      const convertedAmount =
        exchangeRateResponse.data.data.quote[targetCurrency];

      res.json(convertedAmount);
    } catch (error: any) {
      handleError(res, error);
    }
  }
}
