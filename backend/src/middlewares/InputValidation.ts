import { Request, Response, NextFunction } from "express";
import { validationResult, check } from "express-validator";

export const validateConvertCurrencyInput = [
  check("sourceCurrency")
    .notEmpty().withMessage("Source currency is required"),

  check("amount")
    .notEmpty().withMessage("Amount is required")
    .isNumeric().withMessage("Amount must be a number")
    .custom((value) => {
      if (Number(value) <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),

  check("targetCurrency")
    .notEmpty().withMessage("Target currency is required"),
    

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    // Additional check for SQL Injection prevention (sanitize inputs)
    const sourceCurrency = req.query.sourceCurrency as string;
    const targetCurrency = req.query.targetCurrency as string;
    const amount = req.query.amount as string;

    if (containsSQLInjection(sourceCurrency) || containsSQLInjection(targetCurrency) || containsSQLInjection(amount)) {
      return res.status(400).json({ success: false, error: "Invalid input" });
    }

    next();
  },
];

// Function to check if a string contains potential SQL injection
function containsSQLInjection(str: string | undefined): boolean {
  const sqlInjectionKeywords = ["SELECT", "UPDATE", "DELETE", "INSERT", "DROP", "UNION", "OR", "AND"];
  return str ? sqlInjectionKeywords.some(keyword => str.includes(keyword)) : false;
}
