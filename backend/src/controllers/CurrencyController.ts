import { Request, Response, NextFunction } from "express";
import {
  CryptoCurrency,
  FiatCurrency,
  CombinedCurrenciesResponse,
} from "../types/Currencies";
import axiosInstance from "../utils/axiosInstance";

const CRYPTO_API_ENDPOINT = "/v1/cryptocurrency/listings/latest";
const FIAT_API_ENDPOINT = "/v1/fiat/map";
const CONVERSION_API_ENDPOINT = "/v2/tools/price-conversion";
const CRYPTO_QUOTES_API_ENDPOINT = "/v2/cryptocurrency/quotes/latest";

/**
 * @swagger
 * tags:
 *   name: Currencies
 *   description: API endpoints for managing currencies
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CombinedCurrenciesResponse:
 *       type: object
 *       properties:
 *         cryptocurrencies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/CryptoCurrency'
 *         fiatCurrencies:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FiatCurrency'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CryptoCurrency:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         symbol:
 *           type: string
 *         name:
 *           type: string
 *         slug:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FiatCurrency:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         symbol:
 *           type: string
 *         name:
 *           type: string
 *         sign:
 *           type: string
 */

/**
 * @swagger
 * /api/currencies:
 *   get:
 *     summary: Get a list of supported currencies
 *     description: Returns a combined list of top 100 cryptocurrencies and 10 supporting fiat currencies.
 *     tags: [Currencies]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CombinedCurrenciesResponse'
 *       '500':
 *         description: Internal server error
 */

export const getCurrencies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [cryptoResponse, fiatResponse] = await Promise.all([
      axiosInstance.get(CRYPTO_API_ENDPOINT, { params: { limit: 100 } }),
      axiosInstance.get(FIAT_API_ENDPOINT, { params: { limit: 10 } }),
    ]);

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

    res.json({ success: true, data: combinedCurrencies });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/convert-currency:
 *   get:
 *     summary: Convert currency
 *     description: Converts the specified amount from one currency to another.
 *     tags: [Currencies]
 *     parameters:
 *       - in: query
 *         name: sourceCurrency
 *         description: The source currency code
 *         required: true
 *       - in: query
 *         name: amount
 *         description: The amount to convert
 *         required: true
 *       - in: query
 *         name: targetCurrency
 *         description: The target currency code
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: number
 *       '500':
 *         description: Internal server error
 */
export const convertCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sourceCurrency, amount } = req.query;
    const targetCurrency: string = req.query.targetCurrency as string;

    const exchangeRateResponse = await axiosInstance.get(
      CONVERSION_API_ENDPOINT,
      {
        params: {
          amount,
          symbol: sourceCurrency,
          convert: targetCurrency,
        },
      }
    );

    const convertedAmount =
      exchangeRateResponse.data.data[0].quote[targetCurrency];

    res.json({ success: true, data: convertedAmount });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /api/convert-currency-manually:
 *   get:
 *     summary: Convert currency manually
 *     description: Converts the specified amount from one currency to another using a manual conversion.
 *     tags: [Currencies]
 *     parameters:
 *       - in: query
 *         name: sourceCurrency
 *         description: The source currency code
 *         required: true
 *       - in: query
 *         name: amount
 *         description: The amount to convert
 *         required: true
 *       - in: query
 *         name: targetCurrency
 *         description: The target currency code
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: number
 *       '500':
 *         description: Internal server error
 */
export const convertCurrencyManually = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { sourceCurrency, amount, targetCurrency } = req.query as {
      sourceCurrency: string;
      amount: string;
      targetCurrency: string;
    };

    const marketData = await axiosInstance.get(CRYPTO_QUOTES_API_ENDPOINT, {
      params: {
        symbol: sourceCurrency,
        convert: targetCurrency,
      },
    });

    const exchangeRate =
      marketData?.data?.data?.[sourceCurrency][0]?.quote?.[targetCurrency]
        ?.price;
    const convertedAmount = Number(amount) * exchangeRate;

    res.json({ success: true, data: convertedAmount });
  } catch (error) {
    next(error);
  }
};
