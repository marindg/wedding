import { sendResponse } from "utils";
import { NextFunction, Request, Response } from "express";

export class ErrorHandler extends Error {
  constructor(
    public statusCode: number,
    public message: string
  ) {
    super();
    Object.setPrototypeOf(this, ErrorHandler.prototype);
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode, message } = err;
  sendResponse(res, statusCode || 500, "error", message || "An unexpected error occurred.");
};

export const errorHandler = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  handleError(err, res);
  res.end();
};
