import { Request, Response } from "express";
import { sendResponse } from "utils";
import dotenv from "dotenv";
import { IGuest } from "typings/user";
import { IService } from "typings/commun";
import * as guestSerice from "service/auth/guestService";

dotenv.config();

export const createGuest = async (req: Request, res: Response) => {
  const newGuest: IGuest = req.body;
  if (!req.user) {
    return sendResponse(res, 401, "error", "No token provided");
  }
  const id: string = req.user._id.toString();
  const result: IService = await guestSerice.createGuest(newGuest, id);
  return sendResponse(res, result.code, result.status, result.message);
};
