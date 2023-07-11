import { Response } from "express";
import { ErrorHandler } from "middleware";
import { httpStatusCodes } from "constant";
import { sendResponse } from "utils";

export const handleControllerError = (error: unknown, res: Response) => {
  if (error instanceof ErrorHandler) {
    return sendResponse(res, error.statusCode, "error", error.message);
  } else {
    return sendResponse(res, httpStatusCodes.INTERNAL_SERVER_ERROR, "error", "An unexpected error occurred.");
  }
};
