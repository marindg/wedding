import { Request, Response } from "express";
import { errorHandler, sendResponse } from "@utils/index";
import dotenv from "dotenv";

dotenv.config();

export const getAccessLogin = errorHandler(async (req: Request, res: Response) => {
  const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();
  const { password } = req.body;

  if (!password) {
    return sendResponse(res, 400, "error", "password missing");
  }

  if (password.toUpperCase() !== flyerPassword) {
    return sendResponse(res, 401, "error", "wrong password");
  }

  return sendResponse(res, 200, "success", "token");
});
