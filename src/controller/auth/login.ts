import { Request, Response } from "express";
import { errorHandler, sendResponse } from "utils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userModel from "@models/userModel";
import { IUser } from "typings/user";

dotenv.config();

export const getAccessLogin = errorHandler(async (req: Request, res: Response) => {
  const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();
  const { login } = req.body;

  if (!login) {
    return sendResponse(res, 400, "error", "login missing");
  }

  const user: IUser | undefined | null = await userModel.findOne({ login: login });

  if (!user) {
    if (login.toUpperCase() === flyerPassword) {
      return sendResponse(res, 200, "success", "create new user.");
    }
    return sendResponse(res, 401, "error", "wrong login");
  } else {
    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return sendResponse(res, 200, "success", token);
  }
});
