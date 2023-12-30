import { Router } from 'express';
import { CurrencyController } from '../controllers/CurrencyController';

export const router = Router();

router.get('/currencies', CurrencyController.getCurrencies);
