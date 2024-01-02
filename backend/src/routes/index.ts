import { Router } from 'express';
import { getCurrencies, convertCurrency, convertCurrencyManually } from '../controllers/CurrencyController';
import { validateConvertCurrencyInput } from '../middlewares/InputValidation';

export const router = Router();

/**
 * @swagger
 * /api/currencies:
 *   get:
 *     summary: Get a list of supported currencies
 *     description: Returns a combined list of cryptocurrencies and fiat currencies.
 *     responses:
 *       '200':
 *         description: Successful response
 */
router.get('/currencies', getCurrencies);

/**
 * @swagger
 * /api/convert-currency:
 *   get:
 *     summary: Convert currency
 *     description: Converts the specified amount from one currency to another.
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
 *       '400':
 *         description: Invalid parameters
 *       '500':
 *         description: API error
 */
router.get('/convert-currency', validateConvertCurrencyInput, convertCurrency);

/**
 * @swagger
 * /api/convert-currency-manually:
 *   get:
 *     summary: Convert currency manually
 *     description: Converts the specified amount from one currency to another using a manual conversion.
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
 *       '400':
 *         description: Invalid parameters
 *       '500':
 *         description: API error
 */
router.get('/convert-currency-manually', validateConvertCurrencyInput, convertCurrencyManually);

