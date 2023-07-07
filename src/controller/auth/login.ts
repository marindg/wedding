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
    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return sendResponse(res, 200, "success", token);
  }
});

export const createLogin = errorHandler(async (req: Request, res: Response) => {
  const newLogin = req.body.newLogin;
  const keyAccess = req.body.keyAccess;

  const flyerPassword: string = process.env.FLYER_PASSWORD!.toUpperCase();
  if (!keyAccess) {
    return sendResponse(res, 400, "error", "password missing");
  }
  if (keyAccess.toUpperCase() !== flyerPassword) {
    return sendResponse(res, 401, "error", "wrong password");
  }

  const user: IUser | undefined | null = await userModel.findOne({ login: newLogin });

  if (user) {
    return sendResponse(res, 409, "error", `login ${newLogin} already taken`);
  } else {
    const newUser = new userModel({
      login: req.body.newLogin,
    });
    const savedUser = await newUser.save();

    const token = jwt.sign({ savedUser }, process.env.JWT_SECRET!, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return sendResponse(res, 201, "success", token);
  }
});
