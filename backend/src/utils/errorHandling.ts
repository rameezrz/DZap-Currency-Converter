import { Response } from "express";

export const handleError = (res: Response, error: Error): void => {
  console.error("Error:", error.message || "Internal Server Error");

  if (error instanceof Error && error.message) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
