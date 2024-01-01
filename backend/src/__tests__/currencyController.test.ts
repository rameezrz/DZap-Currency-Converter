import { Request, Response, NextFunction } from 'express';
import { convertCurrency, getCurrencies, convertCurrencyManually } from '../controllers/CurrencyController';
import axiosInstance from '../utils/axiosInstance';

describe('CurrencyController', () => {
  test('getCurrencies should return the combined list of cryptocurrencies and fiat currencies', async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;
    const mockNext = jest.fn();

    await getCurrencies(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalled();
  });

  test('convertCurrency should return the converted amount', async () => {
    const mockRequest = {
      query: {
        sourceCurrency: 'BTC',
        amount: '10',
        targetCurrency: 'USD',
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn();

    await convertCurrency(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalled();
  });
  

  test('convertCurrencyManually should return the converted amount', async () => {
    const mockRequest = {
      query: {
        sourceCurrency: 'BTC',
        amount: '10',
        targetCurrency: 'USD',
      },
    } as unknown as Request;

    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    const mockNext = jest.fn();

    jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: {
        data: {
          BTC: [
            {
              quote: {
                USD: {
                  price: 50000, // Assuming a conversion rate of 1 BTC to USD is 50000
                },
              },
            },
          ],
        },
      },
    });

    await convertCurrencyManually(mockRequest, mockResponse, mockNext);

    expect(mockResponse.json).toHaveBeenCalled();
  });
});
