import { Request, Response } from "express";
import { CurrencyController } from "../controllers/CurrencyController";

describe("CurrencyController", () => {
  test("getCurrencies should return the combined list of cryptocurrencies and fiat currencies", async () => {
    const mockRequest = {} as Request;
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    await CurrencyController.getCurrencies(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
    // Add more assertions based on your expected behavior
  });

  test("convertCurrency should return the converted amount", async () => {
    // Mock request and response objects
    const mockRequest = {
      query: {
        sourceCurrency: "BTC",
        amount: "10",
        targetCurrency: "USD",
      },
    } as unknown as Request;
    
    const mockResponse = {
      json: jest.fn(),
    } as unknown as Response;

    await CurrencyController.convertCurrency(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalled();
    // Add more assertions based on your expected behavior
  });
});
