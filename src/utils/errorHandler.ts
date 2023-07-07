import { Request, Response, NextFunction } from "express";
import { sendResponse } from "@utils/index";

export const errorHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch((err: unknown) => {
    if (err instanceof Error) {
      sendResponse(res, 400, "error", err.message);
    } else {
      sendResponse(res, 500, "error", "An unexpected error occurred.");
    }
  });
