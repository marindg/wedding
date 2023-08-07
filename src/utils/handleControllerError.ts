import { Response } from "express";
import { httpStatusCodes } from "constant";
import { sendResponse } from "utils";

export const handleControllerError = (error: unknown, res: Response) => {
  return sendResponse(res, httpStatusCodes.INTERNAL_SERVER_ERROR, "error", error);
};
