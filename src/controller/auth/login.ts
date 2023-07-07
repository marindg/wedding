import { Request, Response } from "express";
import { errorHandler, sendResponse } from "utils";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
// import { IUser } from "typings/user";

dotenv.config();

export const getAccessLogin = errorHandler(async (req: Request, res: Response) => {
  const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();
  const { password } = req.body;

  if (!password) {
    return sendResponse(res, 400, "error", "password missing");
  }

  // const user: IUser | undefined = await XXXmodel.findOne({ login: password });

  // const user = { name: "ABC", password: "PPP" };
  const user = undefined;

  if (!user) {
    if (password.toUpperCase() === flyerPassword) {
      return sendResponse(res, 200, "success", "create new user.");
    }
    return sendResponse(res, 401, "error", "wrong password");
  } else {
    const token = jwt.sign(user, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return sendResponse(res, 200, "success", token);
  }
});
